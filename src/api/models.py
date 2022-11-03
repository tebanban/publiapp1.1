from enum import unique
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=False, nullable=False) 
    email = db.Column(db.String(120), unique=True, nullable=False) 
    password = db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    role = db.Column(db.String(12), unique=False, nullable=False)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  
    vallas= db.relationship('Valla', backref='user', lazy=True)    # relationship
    owners= db.relationship('Owner', backref='user', lazy=True)    # relationship
    clients= db.relationship('Client', backref='user', lazy=True)    # relationship
    orders= db.relationship('Order', backref='user', lazy=True)    # relationship

    def __repr__(self):
        return '%s' % self.name   # This will be printed at the shell

    def serialize(self):
        #role = Role.query.filter_by(id=self.role_id).first() 
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            "is_active":self.is_active,
            "role": self.role,
            "modified_on": self.modified_on
            # do not serialize the password, its a security breach
        }
   

class Valla(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    typology = db.Column(db.String(20), unique=False, nullable= True)
    layout = db.Column(db.String(20), unique=False, nullable= True)
    size = db.Column(db.String(20), default='7.20 x 9.00 m', unique=False, nullable= True)
    light = db.Column(db.String(10), default= 'Sí', nullable=True) 
    price_low = db.Column(db.Float, unique=False, nullable=True)  
    price_high = db.Column(db.Float, unique=False, nullable=True)
    view = db.Column(db.String(150), unique=False, nullable=True)
    route = db.Column(db.String(150), unique=False, nullable=True)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    comment = db.Column(db.String (200), unique=False, nullable=True) 
    status = db.Column(db.String(20), nullable=False)
    picture_url = db.Column(db.String(250), nullable=True)
    lat = db.Column(db.Float, nullable= True)
    lgn = db.Column(db.Float, nullable= True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'), nullable=True) #FK
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=True) #FK
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True) #FK
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=True) #FK
    
      
    
    def __repr__(self):
        return '<Valla %r>' % self.code

    def serialize(self):
        #  client = Client.query.filter_by(id=self.client_id).first() 
        #  owner = Owner.query.filter_by(id=self.owner_id).first() 
        #  order = Order.query.filter_by(id=self.owner_id).first() 
        #  user = User.query.filter_by(id=self.user_id).first() 
        #  owner_name = Owner.query.filter_by(id=self.id).first()
         
         return  {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "typology": self.typology,
            "layout": self.layout,
            "size": self.size,
            "light": self.light,
            "price_low": self.price_low,
            "price_high": self.price_high,
            "view": self.view,
            "route":self.route,
            "modified_on": self.modified_on,
            "comment": self.comment,
            "status": self.status,
            "picture_url":self.picture_url,
            "lat":self.lat,
            "lgn" : self.lgn,
            "owner_id": self.owner_id,
            "client_id": self.client_id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "user_id": self.user_id,
            
        }
        
                                            
class Owner(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    company = db.Column(db.String(120), unique=True, nullable=True)
    phone = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #FK
    vallas= db.relationship('Valla', backref='owner', lazy=True)    # relationship
    
    def __repr__(self):
        return '%s' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "company": self.company,
            "phone": self.phone,
            "email": self.email, 
            "modified_on": self.modified_on,
            "user_id": self.user_id
        }
        
class Client(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    company = db.Column(db.String(80), unique=True, nullable=True)
    phone = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #FK
    vallas= db.relationship('Valla', backref='client', lazy=True)    # relationship
    orders= db.relationship('Order', backref='client', lazy=True)    # relationship
    
    def __repr__(self):
        return '%s' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "company": self.company,
            "phone": self.phone,
            "email": self.email, 
            "modified_on": self.modified_on,
            "user_id": self.user_id
  
        }   

class Order(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    order_price = db.Column(db.Integer, unique=False)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  
    check_in = db.Column(db.DateTime,  nullable=True)
    check_out = db.Column(db.DateTime,  nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  #FK
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)  #FK
    vallas= db.relationship('Valla', backref='order', lazy=True)   # relationship
    payments= db.relationship('Payment', backref='order', lazy=True)    # relationship
    
    def __repr__(self):
        return ' %r' % self.id
    
    def serialize(self):
        return {
            "order_id": self.id,
        }
class Typology(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=False)
    modified_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  #FK
    
    
    def __repr__(self):
        return ' %r' % self.id
    
    def serialize(self):
        return {
            "typology_id": self.id,
        }

class Payment(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    due_on = db.Column(db.DateTime, unique=False, nullable=True)
    payment_on = db.Column(db.DateTime, unique=False, nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)  #FK
    
    def __repr__(self):
        return '<Payment %r>' % self.id
    
    def serialize(self):
        return {
            "payment_id": self.id,
        }        
