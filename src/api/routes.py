"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Valla, Client, Owner, Order
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/person", methods=['POST', 'GET']) # aquí especificamos que estos endpoints aceptan solicitudes POST y GET.
def handle_person():
  if request.method == 'POST': # podemos entender qué tipo de request estamos manejando usando un condicional
    return "Se recibió un POST"
  else:
    return "Se recibió un GET"

######################################## Get all users ###############################################

@api.route("/user/", methods=["GET"])  
def get_all_users():

        all_users = User.query.all()  
        all_users = list(map(lambda x: x.serialize(), all_users)) #Returns a list of dictionaries
        return jsonify(all_users), 200  # list object has no attribute 'serialize'

# Handle single user:    
    
@api.route("/user/<int:id>", methods=["GET", "PUT"])  
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
        user.updated_on= request.json["updated_on"]

        db.session.commit()
        return jsonify(user.serialize()), 200

################################## Get all vallas:##########################

@api.route("/valla/", methods=["GET"])   
def get_vallas():

    all_vallas = Valla.query.all()
    all_vallas = list(map(lambda x: x.serialize(), all_vallas)) 
    return jsonify(all_vallas), 200

################################ Get or Edit single valla: ##########################

@api.route("/valla/<int:id>", methods=["GET", "PUT"])  
def get_single_valla(id):

    if request.method == 'GET':                                           
        single_valla = Valla.query.get(id)
        return jsonify(single_valla.serialize()), 200
    
    ###Edit single Valla#######
    if request.method == 'PUT':   
        valla = Valla.query.get(id)
        
        valla.code = request.json['code'] 
        valla.name = request.json['name']  
        valla.tipology = request.json['tipology']
        valla.layout = request.json['layout'] 
        valla.size = request.json['size'] 
        valla.light = request.json['light']
        valla.price_low = request.json['price_low']
        valla.price_high = request.json['price_high']
        valla.view = request.json['view']
        valla.route = request.json['route']
        valla.modified_on = request.json['modified_on']
        valla.updated_on = request.json['updated_on']
        valla.comment = request.json['comment']
        valla.owner_id = request.json['owner_id'] 
        valla.client_id = request.json['client_id']  

        db.session.add(valla) 
        db.session.commit()
        return jsonify(valla.serialize()), 200

###########################################   Create single valla   ###################

@api.route("/valla/", methods=[ "POST"])  
def create_single_valla():
    
        valla = Valla()
        
        valla.code = request.json['code'] 
        valla.name = request.json['name']  
        valla.tipology = request.json['tipology']
        valla.layout = request.json['layout'] 
        valla.size = request.json['size'] 
        valla.light = request.json['light']
        valla.price_low = request.json['price_low']
        valla.price_high = request.json['price_high']
        valla.view = request.json['view']
        valla.route = request.json['route']
        valla.modified_on = request.json['modified_on']
        valla.updated_on = request.json['updated_on']
        valla.comment = request.json['comment']
        valla.owner_id = request.json['owner_id'] 
        valla.client_id = request.json['client_id']
       
        db.session.add(valla)   
        db.session.commit()
        return jsonify(valla.serialize()), 200

    
######################### Get all owners ############################################

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
        owner.modified_on = request.json['modified_on']
        owner.phone = request.json['owner_phone']
        owner.email = request.json['owner_email'] 
        owner.company = request.json['owner_company']
        db.session.commit()
        return jsonify(owner.serialize()), 200

        
############################### Get all clients#####################################

@api.route("/client/", methods=["GET"])   
def get_all_clients():

    all_clients = Owner.query.all()
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
        client.modified_on = request.json['modified_on']
        client.phone = request.json['phone']
        client.email = request.json['email'] 
        client.company = request.json['company']
        db.session.commit()
        return jsonify(client.serialize()), 200





   
   