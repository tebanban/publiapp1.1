"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Valla, Client
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


@api.route("/user/", methods=["GET"])   # Get all users
def get_users():

    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))

    return jsonify(all_users), 200

@api.route("/valla/", methods=["GET"])   # Get all vallas
def get_vallas():

    all_vallas = Valla.query.all()
    all_vallas = list(map(lambda x: x.serialize(), all_vallas))

    print(all_vallas)
    

    return jsonify(all_vallas), 200

@api.route("/valla/<int:id>", methods=["GET"])   # Get a single valla
def get_single_valla(id):

    single_valla = Valla.query.filter_by(id=id).all()
    single_valla = list(map(lambda x: x.serialize(), single_valla))

    return jsonify(single_valla), 200

@api.route("/valla/<int:id>", methods=["PATCH"])   # Update a single valla
def update_single_valla(id):

    # error_messages=[]
    valla = Valla.query.first()
    valla.name = request.json['name']  #'name' should be in the body
    valla.code =  request.json['code'] 
    valla.status_name = request.json['status_name']   
    valla.owner_name = request.json['owner_name']
    
    print(valla.status)
    
    db.session.add(valla)
    db.session.commit()
 

    response_body = {
        "msg": "La valla fue actualizada correctamente"
    }

    return jsonify(response_body), 200



   
   