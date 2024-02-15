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
