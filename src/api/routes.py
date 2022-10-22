"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, flash
from api.models import db, User, Valla, Client, Owner, Order, Payment
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
###################################################################### POST TOKEN  (LOG IN)
@api.route("/token", methods=["POST"])
def get_token():
    email = request.json.get("email", None)
    passwd = request.json.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()
  
    if not user:
        return jsonify({"msg": "Tebanban: Email non existent" }), 401
    elif not check_password_hash( user.password, passwd) :       
        return jsonify({"msg": "Tebanban: Incorrect  password" }), 401

    access_token = create_access_token(identity=email)
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
        user.name= request.json["name"]
        user.email= request.json["email"]
        user.is_active= request.json["is_active"]
        user.role= request.json["role"]
        user.modified_on= request.json["modified_on"]
        

        db.session.commit()
        return jsonify(user.serialize()), 200

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
    
    ############################################################### UPDATE single Valla
    if request.method == 'PUT':   
        valla = Valla.query.get(id)

        if valla is None:
            raise APIException("valla not found", status_code=404)
        
        if "code" in request.json:
            valla.code = request.json['code']
        if "name" in request.json:
            valla.name = request.json['name']  
        if "typology" in request.json:    
            valla.typology = request.json['typology']
        if "layout" in request.json:
            valla.layout = request.json['layout']
        if "size" in request.json: 
            valla.size = request.json['size'] 
        if "light" in request.json:
            valla.light = request.json['light']
        if "price_low" in request.json:
            valla.price_low = request.json['price_low']
        if "price_high" in request.json:
            valla.price_high = request.json['price_high']
        if "view" in request.json:
            valla.view = request.json['view']
        if "route" in request.json:
            valla.route = request.json['route']
        if "comment" in request.json:
            valla.comment = request.json['comment']
        if "owner_id" in request.json:
            valla.owner_id = request.json['owner_id'] 
        if "client_id" in request.json:
            valla.client_id = request.json['client_id']
        if "user_id" in request.json:
            valla.user_id = request.json['user_id']   

        
        db.session.commit()
        return jsonify(valla.serialize()), 200

#####################################################################   Delete single Valla 
@api.route("/valla/<int:id>", methods= ["DELETE"])
@jwt_required()
def delete_single_valla(id):
        valla= Valla.query.get(id)

        if valla is None:
            raise APIException("Valla not found", status_code=404)
        
        db.session.delete(valla)
        db.session.commit()
        return jsonify(valla.serialize()), 200



#####################################################################   POST single valla  

@api.route("/valla/", methods=["POST"]) 
@jwt_required() 
def create_single_valla():
    
        valla = Valla()
        
        valla.code = request.json['code'] 
        valla.name = request.json['name']  
        valla.typology = request.json['typology']
        valla.layout = request.json['layout'] 
        valla.size = request.json['size'] 
        valla.light = request.json['light']
        valla.price_low = request.json['price_low']
        valla.price_high = request.json['price_high']
        valla.view = request.json['view']
        valla.route = request.json['route']
        valla.comment = request.json['comment']
        valla.owner_id = request.json['owner_id']
        valla.client_id = request.json['client_id']
       
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



   
   