from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.Text)

    parcels = db.relationship('ParcelOrder', backref='user')

    # set hash password
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # check if password is correct >> login
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    # check if user exists
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    
    # saving user
    def save_user(self):
        db.session.add(self)
        db.session.commit()
    
    # deleting user
    def delete_user(self):
        db.session.delete(self)
        db.session.commit()

class ParcelOrder(db.Model):
    __tablename__ = 'parcel_orders'
    id = db.Column(db.Integer, primary_key= True)
    name_of_parcel = db.Column(db.String(50), nullable=False)
    pickup_location = db.Column(db.String(50))
    destination = db.Column(db.String(50))
    latitude_pick_up_location= db.Column(db.Float)
    longitude_pick_up_location = db.Column(db.Float)
    latitude_destination= db.Column(db.Float)
    longitude_destination= db.Column(db.Float)
    image_of_parcel = db.Column(db.String)
    receivers_name = db.Column(db.String(50))
    weight_of_parcel = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tracker = db.relationship('Tracker',uselist=False, backref='parcel_order')

class Tracker(db.Model):
    __tablename__ = 'trackers'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), default= 'preparing')
    present_location = db.Column(db.String(50))
    delivery_date = db.Column (db.DateTime, default='preparing')

    parcel_id = db.Column(db.Integer, db.ForeignKey('parcel_orders.id'))