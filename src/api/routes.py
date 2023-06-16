"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, flash
from api.models import db, User, Valla, Client, Owner, Order, Payment, Format
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary.uploader
import os

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
###################################################################### POST TOKEN  (LOG IN)
@api.route("/token", methods=["POST"])
def get_token():
    email = request.json.get("email")
    passwd = request.json.get("password")
    expires_minutes = int(os.environ.get("EXPIRES_MINUTES", 60))
    expires = timedelta(minutes=expires_minutes)
                 

    user = User.query.filter_by(email=email).one_or_none()
    userData= user.serialize()
  
    if not user:
        return jsonify({"msg": "Email non existent" }), 401
    elif not check_password_hash( user.password, passwd) :       
        return jsonify({"msg": "Incorrect  password" }), 401

    access_token = create_access_token(identity=email, expires_delta=expires, additional_claims={"role": user.role} )
    return jsonify( {"access_token": access_token, "msg" : "Login succesfull!", "user_name": user.name, "user": userData}) 
    
## GET CURRENT_USER 
# @api.route('/private', methods=['GET'])
# @jwt_required()
# def get_current_user():
#     # Access the identity of the current user with get_jwt_identity.
#     # The argument is the identity that was used when creating a JWT.
#     current_user = get_jwt_identity()

#     # Retrieve the user from the database based on the current user's email
#     user = User.query.filter_by(email=current_user).first()

#     # Return the serialized user data as a JSON response with a 200 status code
#     return jsonify(user.serialize()), 200


# REGISTER NEW USER
@api.route("/register", methods=["POST"])
def register_user():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    role = request.json.get("role")

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 401

    new_user = User(email=email, name=name, role=role, password=generate_password_hash(password, method='sha256'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User successfully created", **new_user.serialize()}), 200


#Get all users 
@api.route("/user/", methods=["GET"])  
def get_all_users():

        all_users = User.query.all()  
        all_users = list(map(lambda x: x.serialize(), all_users)) #Returns a list of dictionaries
        return jsonify(all_users), 200  # list object has no attribute 'serialize'

#GET and UPDATE  single user: 
@api.route("/user/<int:id>", methods=["GET", "PUT"])
def handle_single_user(id):
    user = User.query.get(id)

    if request.method == "GET":
        return jsonify(user.serialize()), 200

    if request.method == "PUT":
        user.name = request.json.get("name", user.name)
        user.email = request.json.get("email", user.email)
        user.is_active = request.json.get("is_active", user.is_active)
        user.role = request.json.get("role", user.role)
        user.modified_on = request.json.get("modified_on", user.modified_on)

        db.session.commit()
        return jsonify(user.serialize()), 200

#Delete single User 
@api.route("/user/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_single_user(id):
    user = User.query.get(id)

    if user is None:
        raise APIException("User not found", status_code=404)

    db.session.delete(user)
    db.session.commit()
    return jsonify("The user was deleted", user.serialize()), 200


#############################################################################   VALLAS
#Get all vallas
@api.route("/valla/", methods=["GET"])   
def get_vallas():

    all_vallas = Valla.query.all()
    all_vallas = list(map(lambda x: x.serialize(), all_vallas)) 
    return jsonify(all_vallas), 200

# Post new valla
@api.route("/valla/", methods=["POST"]) 
@jwt_required() 
def create_new_valla():
    valla = Valla()
    if not request.json['code'] or not request.json['name']:
        return jsonify('Required code and name'), 200

    fields = {
        'code': None,
        'name': None,
        'status': None,
        'light': None,
        'price_low': 1100,  #  is the default value
        'price_high': 1300,
        'price_canvas': 950,
        'traffic': 55,
        'way': None,
        'route': None,
        'province': None,
        'address': None,
        'lat': 9.987,
        'lng': -84.148,
        'shape': None,
        'comment': None,
        'format_size': None,
        'owner_name': None,
        'client_name': None
    }

    for field, default_value in fields.items():
        setattr(valla, field, request.json.get(field, default_value))
        

    db.session.add(valla)
    db.session.commit()

    return jsonify(valla.serialize()), 200

# Hendle single valla
@api.route("/valla/<int:id>", methods=["GET", "PUT", "DELETE"])  
@jwt_required()
def handle_single_valla(id):

    if request.method == 'GET':                                           
        single_valla = Valla.query.get(id)
        return jsonify(single_valla.serialize()), 200


    if request.method == 'PUT':
        valla = Valla.query.get(id)

        if valla is None:
            raise APIException("valla not found", status_code=404)

        allowed_fields = [
            "code", "name", "status", "light", "price_low", "price_high", "price_canvas",
            "traffic", "way", "route", "province", "address", "lat", "lng", "shape",
            "comment", "format_size", "owner_name", "client_name"
        ]

        for field in allowed_fields:
            if field in request.json:
                setattr(valla, field, request.json.get(field, None))

        db.session.commit()
        response = jsonify({'message': 'Datos actualizados exitosamente', 'data': valla.serialize()})
        response.status_code = 200
        return response
    else:
        raise APIException('Error: Método no permitido')

# Delete Valla 
    if request.method == 'DELETE':
        
        valla= Valla.query.get(id)
        response_body = {
        "message": " La Valla se eliminó correctamente"}

        if valla is None:
            raise APIException("Valla not found", status_code=404)

        db.session.delete(valla)
        db.session.commit()
        return jsonify( response_body), 200


# UPDATE  Valla File
@api.route("/vallaFile/<int:id>", methods=["PUT"])  
@jwt_required()
def update_valla_file(id):

        valla = Valla.query.get(id)

        if valla is None:
            raise APIException("valla not found", status_code=404)
        
        if "picture_url" in request.files:
            # upload file to cloudinary
            result = cloudinary.uploader.upload(request.files['picture_url'] , folder = "Publiapp")
            # update the user with the given cloudinary image URL
            valla.picture_url = result['secure_url']  
       
        db.session.commit()
        return jsonify(valla.serialize()), 200
      

    
############################################################### OWNERS 
 
# Get all owners
@api.route("/owner/", methods=["GET"]) 
def get_all_owners():
    all_owners = [owner.serialize() for owner in Owner.query.all()]
    return jsonify(all_owners), 200


# Post new owner
@api.route("/owner/", methods=[ "POST"])   
@jwt_required() 
def create_new_owner():
    if request.method == 'POST':
        if not request.json.get('code') or not request.json.get('name'):
            return jsonify('Missing form fields'), 200
        else:
            owner = Owner(
                name=request.json['name'],
                code=request.json['code'],
                number_id=request.json['number_id'],
                picture_url=request.json['picture_url'],
                address=request.json['address'],
                phone1=request.json.get('phone1'),
                phone2=request.json.get('phone2'),
                email=request.json.get('email'),
                contact=request.json.get('contact'),
                comment=request.json.get('comment'),
                is_active=request.json.get('is_active')
            )
            db.session.add(owner)
            db.session.commit()
            return jsonify(owner.serialize()), 200

            
# Handle single owner:
@api.route("/owner/<int:id>", methods=["GET", "PUT"])  
def handle_single_owner(id):
    single_owner = Owner.query.get(id)
    
    if request.method == 'GET':
        return jsonify(single_owner.serialize()), 200
    
    if request.method == 'PUT':
        single_owner.name = request.json['name']
        single_owner.code = request.json['code']
        single_owner.number_id = request.json['number_id']
        single_owner.address = request.json['address']
        single_owner.phone1 = request.json['phone1']
        single_owner.phone2 = request.json['phone2']
        single_owner.email = request.json['email']
        single_owner.contact = request.json['contact']
        single_owner.contact = request.json['comment']
        single_owner.is_active = request.json['is_active']
        db.session.commit()
        return jsonify(single_owner.serialize()), 200

        
############################################################### CLIENTS
# Get all clients
@api.route("/client/", methods=["GET"]) 
def get_all_clients():
    all_clients = [client.serialize() for client in Client.query.all()]
    return jsonify(all_clients), 200


#Post new client
@api.route("/client/", methods=[ "POST"])   
@jwt_required() 
def create_new_client():
    if request.method == 'POST':
        if not request.json.get('code') or not request.json.get('name'):
            return jsonify('Missing form fields'), 200
        else:
            client = Client(
                name=request.json['name'],
                code=request.json['code'],
                number_id=request.json['number_id'],
                picture_url=request.json['picture_url'],
                address=request.json['address'],
                phone1=request.json.get('phone1'),
                phone2=request.json.get('phone2'),
                email=request.json.get('email'),
                contact=request.json.get('contact'),
                comment=request.json.get('comment'),
                is_active=request.json.get('is_active')
            )
            db.session.add(client)
            db.session.commit()
            return jsonify(client.serialize()), 200

            
# Handle single client:
@api.route("/client/<int:id>", methods=["GET", "PUT"])  
def handle_single_client(id):
    single_client = Client.query.get(id)
    
    if request.method == 'GET':
        return jsonify(single_client.serialize()), 200
    
    if request.method == 'PUT':
        single_client.name = request.json['name']
        single_client.code = request.json['code']
        single_client.number_id = request.json['number_id']
        single_client.address = request.json['address']
        single_client.phone1 = request.json['phone1']
        single_client.phone2 = request.json['phone2']
        single_client.email = request.json['email']
        single_client.contact = request.json['contact']
        single_client.is_active = request.json['is_active']
        db.session.commit()
        return jsonify(single_client.serialize()), 200

################################################################### FORMAT: 
# Get all formats
@api.route("/format/", methods=["GET", "POST"])   
def get_all_formats():
    if request.method == 'GET':
        all_formats = Format.query.all()
        all_formats = list(map(lambda x: x.serialize(), all_formats)) 
        return jsonify(all_formats), 200

#Post new format
def create_new_format():
    if request.method == 'POST':
        format = Format()
        if not request.json['code'] or not request.json['size'] :
            return jsonify('Missing form fields'), 200 
        else:
            format.code = request.json.get('code') 
            format.size = request.json.get('size')  
            format.area = request.json.get('area')  
            db.session.add(format)   
            db.session.commit()
            return jsonify(format.serialize()), 200

# Handle single format:
@api.route("/format/<int:id>", methods=["GET", "PUT"])  

def get_format(id):

    if request.method == "GET":
        single_format = Format.query.get(id)  
        return jsonify(single_format.serialize()), 200

    if request.method == "PUT":
        format= User.query.get(id)
        format.size= request.json.get("size", None)
        format.area= request.json.get("area", None)
        format.modified_on= request.json.get["modified_on", None]
        db.session.commit()
        return jsonify(format.serialize()), 200

#################################################################### HELLO 
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend" 
    }
    
    return jsonify(response_body), 200
    
#################################################################### PERSON 
@api.route("/person", methods=['POST', 'GET']) 
def handle_person():
  if request.method == 'POST': 
    return "Se recibió un POST"
  else:
    return "Se recibió un GET"



   
   