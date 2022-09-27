from enum import unique
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=False, nullable=False) 
    email = db.Column(db.String(120), unique=True, nullable=False) 
    password = db.Column(db.String(10), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    role = db.Column(db.String(12), unique=False, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  # automatic function
    
   
    def __repr__(self):
        return 'User %r' % self.name   # This will be printed at the shell

    def serialize(self):
        #role = Role.query.filter_by(id=self.role_id).first() 
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
            "is_active":self.is_active,
            "role": self.role,
            "created_on": self.created_on
            # do not serialize the password, its a security breach
        }

class Valla(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    tipology = db.Column(db.String(20), default='unipolar 2 caras', unique=False, nullable= False)
    layout = db.Column(db.String(20), default='vertical', unique=False, nullable= False)
    light = db.Column(db.Boolean, default='True') 
    price_low = db.Column(db.Float, unique=False, nullable=True)  
    price_high = db.Column(db.Float, unique=False, nullable=True)
    view = db.Column(db.String(150), unique=False, nullable=False)
    route = db.Column(db.String(150), unique=False, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    comment = db.Column(db.String (200), unique=False, nullable=True) 
    status = db.Column(db.String(20), default= 'disponible', nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'), nullable=False) #FK
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=True) #FK
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #FK
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=True) #FK
    
      
    
    def __repr__(self):
        return '<Valla %r>' % self.code

    def serialize(self):
         client = Client.query.filter_by(id=self.client_id).first() 
         owner = Owner.query.filter_by(id=self.owner_id).first() 
         order = Order.query.filter_by(id=self.owner_id).first() 
         user = User.query.filter_by(id=self.user_id).first() 
         
         return  {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "tipology": self.tipology,
            "layout": self.format,
            "light": self.light,
            "price_low": self.price_low,
            "price_high": self.price_high,
            "view": self.view,
            "route":self.route,
            "created_on": self.created_on,
            "comment": self.comment,
            "status": self.status,
            "owner_id": self.owner_id,
            "client_id": self.client_id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "user_id": self.user_id
        }
        
                                            
class Owner(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    company = db.Column(db.String(120), unique=True, nullable=True)
    phone = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #FK
    
    def __repr__(self):
        return '<%r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "company": self.company,
            "phone": self.phone,
            "email": self.email, 
            "created_on": self.created_on,
            "user_id": self.user_id
        }
        
class Client(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(150), unique=False, nullable=False)
    company = db.Column(db.String(80), unique=True, nullable=True)
    phone = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(30), unique=True, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #FK
    
    
    def __repr__(self):
        return '<%r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "company": self.company,
            "phone": self.phone,
            "email": self.email, 
            "created_on": self.created_on,
            "user_id": self.user_id
  
        }   

class Order(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    order_price = db.Column(db.Integer, unique=False)
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  
    rent_start = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)
    rent_end = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  #FK
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)  #FK
    vallas= db.relationship('Valla', backref='order', lazy=True)   # relationship
    payments= db.relationship('Payment', backref='order', lazy=True)    # relationship
    
    def __repr__(self):
        return '<Order %r>' % self.id
    
    def serialize(self):
        return {
            "order_id": self.id,
        }

class Payment(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    due_date = db.Column(db.DateTime, unique=False, nullable=True)
    payment_date = db.Column(db.DateTime, unique=False, nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)  #FK
    
    def __repr__(self):
        return '<Payment %r>' % self.id
    
    def serialize(self):
        return {
            "payment_id": self.id,
        }        
