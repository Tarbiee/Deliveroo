from flask import Flask, jsonify, make_response, request, Blueprint
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt, current_user, get_jwt_identity
from models import db,User, ParcelOrder, Tracker
from flask_cors import CORS
from schemas import UserSchema, ParcelOrderSchema
from datetime import datetime

app= Flask(__name__)
app.secret_key = '059da2a0914a822c5b74b333'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///deliveroo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# Initializing blueprints 
auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('users', __name__)
admin_bp = Blueprint('admin', __name__)

@auth_bp.post('/register')

def register_user():
    data = request.get_json()
    
    user = User.get_user_by_username(username= data.get('username'))

    if user is not None:
        return jsonify({"error": "User already exists"}), 403
    
    new_user = User(
        username = data.get('username'),
        email = data.get('email')
    )
    new_user.set_password(password= data.get('password'))

    new_user.save_user()
    return jsonify({"message":"User created"}), 201

@auth_bp.post('/login')
def login_user():
     
     data = request.get_json()
     user = User.get_user_by_username(username=data.get('username'))

     if user and (user.check_password(password= data.get('password'))):
         access_token = create_access_token(identity= user.username)
         refresh_token = create_refresh_token(identity = user.username)
         return jsonify({
            "message": "Logged In",
            "tokens": {
                "access": access_token,
                "refresh": refresh_token
            }
        }), 200
     return jsonify({"message": "Invalid username or password"}), 401


class Home(Resource):
    def get(self):
        return 'Index for Deliveroo API'
api.add_resource(Home,'/') 



if __name__== '__main__':
    app.run(debug=True,port=5555)