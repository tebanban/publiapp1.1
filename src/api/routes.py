"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, flash
from api.models import db, User, Valla, Client, Owner, Order, Payment
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary.uploader

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
###################################################################### POST TOKEN  (LOG IN)
@api.route("/token", methods=["POST"])
def get_token():
    email = request.json.get("email", None)
    passwd = request.json.get("password", None)
    expires = timedelta(minutes=60)                           ##Could use a env variable

    user = User.query.filter_by(email=email).one_or_none()
  
    if not user:
        return jsonify({"msg": "Tebanban: Email non existent" }), 401
    elif not check_password_hash( user.password, passwd) :       
        return jsonify({"msg": "Tebanban: Incorrect  password" }), 401

    access_token = create_access_token(identity=email, expires_delta=expires)
    return jsonify( access_token=access_token ) 
    #################################################################### GET CURRENT_USER 
@api.route('/private', methods=['GET'])
@jwt_required()
def getCurrentUSer():

    # Access the identity of the current user with get_jwt_identity.
    # The argument is the identity that was used when creating a JWT.
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()
    #return current user data:
    return jsonify(user.serialize()), 200

#######################################################################  REGISTER NEW USER
@api.route("/register", methods=["POST"])
def register_user():
    email = request.json.get("email", None)
    passwd = request.json.get("password" , None)
    name = request.json.get("name" , None)
    role = request.json.get("role" , None)
    
    user = User.query.filter_by(email=email).one_or_none()

    if user:
        return jsonify(({"msg": "User already exist"})), 401
    
    new_user = User(email=email, name=name, role=role, password=generate_password_hash(passwd, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    return jsonify(({"msg": "Tebanban: User succesfully created"}, new_user.serialize())) ,200

#################################################################### Get all users 

@api.route("/user/", methods=["GET"])  
def get_all_users():

        all_users = User.query.all()  
        all_users = list(map(lambda x: x.serialize(), all_users)) #Returns a list of dictionaries
        return jsonify(all_users), 200  # list object has no attribute 'serialize'

################################################################### GET and UPDATE  single user: 
    
@api.route("/user/<int:id>", methods=["GET", "PUT"])  
# @jwt_required()
def get_single_user(id):

    if request.method == "GET":
        single_user = User.query.get(id)  
        return jsonify(single_user.serialize()), 200

    if request.method == "PUT":
        user= User.query.get(id)
        user.name= request.json.get("name", None)
        user.email= request.json.get["email", None]
        user.is_active= request.json.get["is_active", None]
        user.role= request.json.get["role", None]
        user.modified_on= request.json.get["modified_on", None]
        

        db.session.commit()
        return jsonify(user.serialize()), 200

#####################################################################   Delete single User 
@api.route("/user/<int:id>", methods= ["DELETE"])
@jwt_required()
def delete_single_user(id):
        user= User.query.get(id)

        if user is None:
            raise APIException("User not found", status_code=404)
        
        db.session.delete(user)
        db.session.commit()
        return jsonify("The user was deleted", user.serialize()), 200


################################################################# Get all vallas

@api.route("/valla/", methods=["GET"])   
def get_vallas():

    all_vallas = Valla.query.all()
    all_vallas = list(map(lambda x: x.serialize(), all_vallas)) 
    return jsonify(all_vallas), 200

#######################################################################  GET single valla

@api.route("/valla/<int:id>", methods=["GET", "PUT"])  
@jwt_required()
def get_single_valla(id):

    if request.method == 'GET':                                           
        single_valla = Valla.query.get(id)
        return jsonify(single_valla.serialize()), 200
    
    #################################################################### UPDATE single Valla
    if request.method == 'PUT':   
    
        valla = Valla.query.get(id)

        if valla is None:
            raise APIException("valla not found", status_code=404)
        
        if "code" in request.json:
            valla.code = request.json.get('code')
        if "name" in request.json:
            valla.name = request.json.get('name', None)  
        if "status" in request.json:
            valla.status = request.json.get('status', None)  
        if "typology" in request.json:    
            valla.typology = request.json.get('typology', None)
        if "layout" in request.json:
            valla.layout = request.json.get('layout', None)
        if "size" in request.json: 
            valla.size = request.json.get('size', None) 
        if "light" in request.json:
            valla.light = request.json.get('light', None)
        if "price_low" in request.json:
            valla.price_low = request.json.get('price_low', None)
        if "price_high" in request.json:
            valla.price_high = request.json.get('price_high', None)
        if "view" in request.json:
            valla.view = request.json.get('view', None)
        if "route" in request.json:
            valla.route = request.json.get('route', None)
        if "lat" in request.json:
            valla.lat = request.json.get('lat', None)
        if "lng" in request.json:
            valla.lng = request.json.get('lng', None)
        if "comment" in request.json:
            valla.comment = request.json.get('comment', None)
        if "owner_id" in request.json:
            valla.owner_id = request.json.get('owner_id', None) 
        if "client_id" in request.json:
            valla.client_id = request.json.get('client_id', None)
        if "user_id" in request.json:
            valla.user_id = request.json.get('user_id', None) 
        
            
       
        db.session.commit()
        return jsonify(valla.serialize()), 200
    else:
        raise APIException('Tebanban: error ...')

#################################################################### UPDATE  Valla File
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
      

#####################################################################   Delete Valla 
@api.route("/valla/<int:id>", methods= ["DELETE"])
@jwt_required()
def delete_single_valla(id):
        valla= Valla.query.get(id)
        response_body = {
        "message": " se eliminó correctamente"}

        if valla is None:
            raise APIException("Valla not found", status_code=404)

        
        db.session.delete(valla)
        db.session.commit()
        return jsonify( response_body), 200



#####################################################################   POST New valla  

@api.route("/valla/", methods=["POST"]) 
@jwt_required() 
def create_new_valla():
    
        valla = Valla()
        if not request.json['code'] or not request.json['name'] or not request.json['status'] or not request.json['typology']:
            return jsonify('Please enter all the fields'), 200 
        else:
            valla.code = request.json.get('code') 
            valla.name = request.json.get('name')  
            valla.status = request.json.get('status')  
            valla.typology = request.json.get('typology')
            valla.layout = request.json.get('layout', None) 
            valla.size = request.json.get('size', None) 
            valla.light = request.json.get('light', None)
            valla.price_low = request.json.get('price_low', None)
            valla.price_high = request.json.get('price_high', None)
            valla.view = request.json.get('view', None)
            valla.route = request.json.get('route', None)
            valla.lat = request.json.get('lat', None)
            valla.lng = request.json.get('lng', None)
            valla.comment = request.json.get('comment', None)
            valla.owner_id = request.json.get('owner_id', None)
            valla.client_id = request.json.get('client_id', None)
        
            db.session.add(valla)   
            db.session.commit()
            return jsonify(valla.serialize()), 200

    
############################################################### Get all owners 

@api.route("/owner/", methods=["GET"])   
def get_owners():

    all_owners = Owner.query.all()
    all_owners = list(map(lambda x: x.serialize(), all_owners)) 
    return jsonify(all_owners), 200

# Handle single owner:

@api.route("/owner/<int:id>", methods=["GET", "PUT"])  
def get_single_owner(id):

    if request.method == 'GET':                                           
        single_owner = Owner.query.get(id)
        return jsonify(single_owner.serialize()), 200
    
    if request.method == 'PUT':   
        owner = Owner.query.get(id)

        owner.name = request.json['name']  
        owner.code = request.json['code'] 
        owner.phone = request.json['owner_phone']
        owner.email = request.json['owner_email'] 
        owner.company = request.json['owner_company']
        
        db.session.commit()
        return jsonify(owner.serialize()), 200

        
############################################################### Get all clients

@api.route("/client/", methods=["GET"])   
def get_all_clients():

    all_clients = Client.query.all()
    all_clients = list(map(lambda x: x.serialize(), all_clients)) 
    return jsonify(all_clients), 200

# Handle single client:

@api.route("/client/<int:id>", methods=["GET", "PUT"])  
def get_single_client(id):

    if request.method == 'GET':                                           
        single_client = Client.query.get(id)
        return jsonify(single_client.serialize()), 200
    
    if request.method == 'PUT':   
        client = Client.query.get(id)
        
        client.name = request.json['name']  
        client.code = request.json['code'] 
        client.phone = request.json['phone']
        client.email = request.json['email'] 
        client.company = request.json['company']
        db.session.commit()
        return jsonify(client.serialize()), 200

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



   
   