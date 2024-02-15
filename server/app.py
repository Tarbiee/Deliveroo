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

jwt = JWTManager(app)


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

#load user
@jwt.user_lookup_loader
def user_lookup_callback(__jwt_headers,jwt_data):
    identity = jwt_data['sub']

    return User.query.filter_by(username = identity).one_or_none()

#additional claims
@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "Stephanie Mechan":
        return{"is_admin": True}
    return {"is_admin": False}

#jwt error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header,jwt_data):
    return jsonify({"message": "Token has expired", "error":"token_expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Signature verification failed", "error":"invalid_token"})

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message": "Request doesnt contain a valid token", "error":"authorization_header"})

@auth_bp.get('/whoami')
@jwt_required()
def whoami():
    claims = get_jwt()
    return jsonify({"user_details":current_user.username, "email":current_user.email})

@auth_bp.get('/refresh')
@jwt_required(refresh= True)
def refresh_access():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})

#endpoint
app.register_blueprint(auth_bp, url_prefix='/auth')

@user_bp.get('/all')
@jwt_required()
def get_all_users():

    claims = get_jwt()
    page = request.args.get('page', default =1, type=int)

    if claims.get('is_admin') == True:
      per_page = request.args.get('per_page', type=int)

      users = User.query.paginate(
        page = page,
        per_page = per_page
      )
      result = UserSchema().dump(users, many = True)
      return jsonify({
        "users": result,
      }), 200
    
    return jsonify ({"message": "You are not authorized to acces this"}), 401

@user_bp.get('/parcel_orders')
@jwt_required()
def get_parcel_orders():
    current_username = get_jwt_identity()

    user = User.get_user_by_username(username=current_username)

    if user:
        parcel_orders = ParcelOrder.query.filter_by(user_id=user.id).all()

        serialized_parcel_orders = [
            {
                'name_of_parcel': parcel.name_of_parcel,
                'pickup_location': parcel.pickup_location,
                'destination': parcel.destination,
            }
            for parcel in parcel_orders
        ]

        return jsonify({"parcel_orders": serialized_parcel_orders}), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
@user_bp.post('/add_parcel_order')
@jwt_required()
def create_parcel_order():
    
    current_username = get_jwt_identity()

    
    user = User.get_user_by_username(username=current_username)

    if user:
        data = request.get_json()

        new_parcel_order = ParcelOrder(
            name_of_parcel=data.get('name_of_parcel'),
            pickup_location=data.get('pickup_location'),
            destination=data.get('destination'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            image_of_parcel=data.get('image_of_parcel'),
            receivers_name=data.get('receivers_name'),
            weight_of_parcel=data.get('weight_of_parcel'),
            user_id=user.id  
        )

        db.session.add(new_parcel_order)
        db.session.commit()

        parcel_order_schema = ParcelOrderSchema()
        serialized_parcel_order = parcel_order_schema.dump(new_parcel_order)

        return jsonify(serialized_parcel_order), 201
    else:
        return jsonify({"message": "User not found"}), 404


class Home(Resource):
    def get(self):
        return 'Index for Deliveroo API'
api.add_resource(Home,'/') 



if __name__== '__main__':
    app.run(debug=True,port=5555)