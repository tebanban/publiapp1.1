from enum import unique
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import  get_jwt_identity


db = SQLAlchemy()

# This is a BaseModel,  models will automatically include this fields
class BaseModel(db.Model):
    __abstract__ = True
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)
    updated_on = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)
    created_by = db.Column(db.String(150), nullable=True)

    def __init__(self, *args, **kwargs):
        current_user = get_jwt_identity()
        kwargs['created_by'] = current_user
        super(BaseModel, self).__init__(*args, **kwargs)

class User(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    picture_url = db.Column(db.String(400), nullable=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='CASCADE'), nullable=True) #FK
   
    

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}', email='{self.email}')"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active,
            "role": self.role.name if self.role else None,
            "picture_url": self.picture_url,
            "created_on": self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }
class Role(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=True)
    users= db.relationship('User', backref='role', lazy=True)   # relationship

    def __repr__(self):
        return '%r' % self.name    # <'Role %r'> % self.name
    
    def serialize(self):
        return {
            "role_id": self.id,
            "role_name": self.name,
        }   

class Valla(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150),  nullable=False)
    light = db.Column(db.String(10), default= 'Sí', nullable=True) 
    price_low = db.Column(db.Float,  nullable=True)  
    price_high = db.Column(db.Float,  nullable=True)
    price_canvas = db.Column(db.Float,  nullable=True)
    traffic = db.Column(db.Integer,  nullable=True)
    way = db.Column(db.String(150),  nullable=True)
    route = db.Column(db.String(150), nullable=True)
    province = db.Column(db.String(100),  nullable= True)
    address = db.Column(db.String(150),  nullable= True)
    lat = db.Column(db.Float, nullable= True)
    lng = db.Column(db.Float, nullable= True)
    shape = db.Column(db.String(150), nullable=True)
    comment = db.Column(db.String (250),  nullable=True) 
    status = db.Column(db.String(20), nullable=True)
    picture_url = db.Column(db.String(400), nullable=True)
    format_id = db.Column(db.Integer, db.ForeignKey('format.id', ondelete='CASCADE'), nullable=True, ) #FK
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id', ondelete='CASCADE'), nullable=True) #FK
    client_id = db.Column(db.Integer, db.ForeignKey('client.id', ondelete='CASCADE'), nullable=True) #FK
    order_id = db.Column(db.Integer, db.ForeignKey('order.id', ondelete='CASCADE'), nullable=True) #FK
    
      
    def __repr__(self):
        return '<Valla %r>' % self.code

    def serialize(self):
        order_data = self.order.serialize() if self.order else None
        
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "light": self.light,
            "price_low": self.price_low,
            "price_high": self.price_high,
            "price_canvas": self.price_canvas,
            "traffic": self.traffic,
            "way": self.way,
            "route": self.route,
            "province": self.province,
            "address": self.address,
            "comment": self.comment,
            "shape": self.shape,
            "status": self.status,
            "picture_url": self.picture_url,
            "lat": self.lat,
            "lng": self.lng,
            "format_size": self.format.size if self.format else None,
            "owner_name" : self.owner.name if self.owner else None,
            "client_name": self.client.name if self.client else None,
            "order": order_data,
            "created_on": self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }
                                     
class Owner(BaseModel):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(200), unique=True, nullable=False)
    number_id= db.Column(db.String(50), unique=True, nullable=True)
    contact = db.Column(db.String(200), nullable=True)
    phone1 = db.Column(db.String(30), unique=True, nullable=True)
    phone2 = db.Column(db.String(30), unique=True, nullable=True)
    email = db.Column(db.String(50), unique=True, nullable=True)
    address = db.Column(db.String(150), unique=True, nullable=True)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    comment = db.Column(db.String (250),  nullable=True) 
    picture_url = db.Column(db.String(400), nullable=True)
    vallas= db.relationship('Valla', backref='owner', lazy=True)    # relationship
    
    def __repr__(self):
        return '%s' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "number_id": self.number_id,
            "contact": self.contact,
            "phone1": self.phone1,
            "phone2": self.phone2,
            "address": self.address,
            "email": self.email, 
            "comment": self.comment,
            "picture_url": self.picture_url,
            "created_on" : self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }
        
class Client(BaseModel):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(200), unique=False, nullable=False)
    number_id = db.Column(db.String(50), unique=True, nullable=False)
    contact = db.Column(db.String(200), unique=True, nullable=True)
    phone1 = db.Column(db.String(30), unique=True, nullable=False)
    phone2 = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    address = db.Column(db.String(50), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    comment = db.Column(db.String (250),  nullable=True) 
    picture_url = db.Column(db.String(400), nullable=True)
    vallas= db.relationship('Valla', backref='client', lazy=True)    # relationship
    orders= db.relationship('Order', backref='client', lazy=True)    # relationship
    
    def __repr__(self):
        return '%s' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "number_id": self.number_id,
            "contact": self.contact,
            "phone1": self.phone1,
            "phone2": self.phone2,
            "address": self.address,
            "email": self.email, 
            "comment": self.comment,
            "picture_url": self.picture_url,
            "created_on" : self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }   

class Order(BaseModel):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(15), unique=True, nullable=False)
    base_price = db.Column(db.Integer, nullable=True)
    discount = db.Column(db.Integer, nullable=True)
    net_price = db.Column(db.Integer, nullable=True)
    commision = db.Column(db.Integer, nullable=True)
    check_in = db.Column(db.DateTime,  nullable=True)
    check_out = db.Column(db.DateTime,  nullable=True)
    comment = db.Column(db.String(250),  nullable=True) 
    picture_url = db.Column(db.String(400), nullable=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)  #FK
    vallas= db.relationship('Valla', backref='order', lazy=True)   # relationship
    payments= db.relationship('Payment', backref='order', lazy=True)    # relationship
    
    def __repr__(self):
        return '<Order %r>' % self.code
   
    def serialize(self):
        return {
            "order_code": self.code,
            "created_on" : self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }
        

class Format(BaseModel):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=True)
    size = db.Column(db.String(200), unique=False, nullable=False)
    area = db.Column(db.String(200), unique=False, nullable=True)
    comment = db.Column(db.String (250),  nullable=True) 
    picture_url = db.Column(db.String(400), nullable=True)
    vallas= db.relationship('Valla', backref='format', lazy=True)    # relationship
    
    
    def __repr__(self):
        return ' %r' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "size": self.size,
            "comment": self.comment,
            "picture_url": self.picture_url,
            "area": self.area,
            "created_on" : self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }



class Payment(BaseModel):
    id=db.Column(db.Integer, primary_key=True)
    due_on = db.Column(db.DateTime, nullable=True)
    payment_on = db.Column(db.DateTime,  nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)  #FK
    
    def __repr__(self):
        return '<Payment %r>' % self.id
    
    def serialize(self):
        return {
            "payment_id": self.id,
            "created_on" : self.created_on,
            "updated_on": self.updated_on,
            "created_by": self.created_by,
        }        


    
