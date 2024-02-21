from flask import Flask, jsonify, make_response, request, Blueprint
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt, current_user, get_jwt_identity
from models import db,User, ParcelOrder, Tracker, TokenBlocklist
from flask_cors import CORS
from schemas import UserSchema, ParcelOrderSchema, TrackerSchema
from datetime import datetime, timedelta

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
            "message": "Logged In Successfully",
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

@jwt.token_in_blocklist_loader
def token_in_blockist_callback(jwt_header,jwt_data):
    jti = jwt_data['jti']

    token = db.session.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).scalar()
    
    return token is not None


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

@auth_bp.get('/logout')
@jwt_required(verify_type=False)
def logout_user():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type = jwt['type']

    token_b = TokenBlocklist(jti=jti)
    token_b.save_token()
    return jsonify({"message": f"{token_type} token revoked successfullt"}), 200



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
      return jsonify(
        result
      ), 200
    
    return jsonify ({"message": "You are not authorized to acces this"}), 401

@user_bp.get('/all_parcel_orders')
@jwt_required()
def get_all_parcels():
    claims = get_jwt()
    if claims.get('is_admin') == True:
        parcels = ParcelOrder.query.all()
        result = ParcelOrderSchema().dump(parcels, many= True)
        return jsonify(
            result
        ), 200
    return jsonify({"message": "You are not authorized to access this"}), 401

@user_bp.get('/parcel_orders')
@jwt_required()
def get_parcel_orders():
    current_username = get_jwt_identity()

    user = User.get_user_by_username(username=current_username)

    if user:
        parcel_orders = ParcelOrder.query.filter_by(user_id=user.id).all()

        result = ParcelOrderSchema().dump(parcel_orders, many=True)

        return jsonify(result), 200
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
            latitude_pick_up_location=data.get('latitude_pick_up_location'),
            longitude_pick_up_location=data.get('longitude_pick_up_location'),
            latitude_destination=data.get('latitude_destination'),
            longitude_destination=data.get('llongitude_destination'),
            image_of_parcel=data.get('image_of_parcel'),
            receivers_name=data.get('receivers_name'),
            weight_of_parcel=data.get('weight_of_parcel'),
            user_id=user.id  
        )

        db.session.add(new_parcel_order)
        db.session.commit()

        parcel_order_schema = ParcelOrderSchema()
        result = parcel_order_schema.dump(new_parcel_order)

        return jsonify(result), 201
    else:
        return jsonify({"message": "User not found"}), 404
    
@user_bp.patch('/edit_parcel/<int:parcel_order_id>')
@jwt_required()
def edit_parcel(parcel_order_id):
    current_username = get_jwt_identity()
    user = User.get_user_by_username(username=current_username)
    if user:
        parcel_order = ParcelOrder.query.filter_by(id=parcel_order_id, user_id=user.id).first()
        if parcel_order:
            data = request.get_json()
            new_destination = data.get('destination')
            if new_destination:
                parcel_order.destination = new_destination
            db.session.commit()

            parcel_order_schema = ParcelOrderSchema()
            result = parcel_order_schema.dump(parcel_order)
            return jsonify(result), 200
        else:
            return jsonify({"message": "Parcel order not found"}), 404

    else:
        return jsonify({"message":"User not found"}),404
    
@user_bp.delete('/delete_parcel/<int:parcel_order_id>')
@jwt_required()
def cancel_parcel_order(parcel_order_id):
    current_username = get_jwt_identity()
    user = User.get_user_by_username(username=current_username)

    if user:
        parcel_order = ParcelOrder.query.filter_by(id= parcel_order_id, user_id= user.id).first()
        if parcel_order:
            db.session.delete(parcel_order)
            db.session.commit()
            return jsonify({"message": "Parcel order cancelled successfully"}), 200
        else:
            return jsonify({"message": "Parcel order not found"})
    else:
        return jsonify({"message": "User not found"}), 404

@user_bp.get('/parcel_order/<int:parcel_order_id>')
@jwt_required()
def get_parcel_order_details(parcel_order_id):
    current_username = get_jwt_identity()
    user = User.get_user_by_username(username= current_username)

    if user:
        parcel_order = ParcelOrder.query.filter_by(id= parcel_order_id, user_id= user.id).first()

        if parcel_order:
            parcel_order_schema = ParcelOrderSchema()
            serialized_parcel_order = parcel_order_schema.dump(parcel_order)
            return jsonify(serialized_parcel_order),200

        else:
          return jsonify({"message": "Parcel order not found"})
    else:
        return jsonify({"message":"User not found"}), 404

#endpoint
app.register_blueprint(user_bp, url_prefix='/users')

@admin_bp.patch('/parcel_order/<int:parcel_order_id>')
@jwt_required()
def update_parcel_order(parcel_order_id):
    current_user = get_jwt_identity()
    user = User.get_user_by_username(current_user)
    claims = get_jwt()
    
    if claims.get('is_admin'):
        data = request.get_json()
        new_status = data.get('status')

        parcel_order = ParcelOrder.query.get(parcel_order_id)

        if parcel_order:
            tracker = Tracker.query.filter_by(parcel_id=parcel_order.id).first()
            if tracker:
                if new_status:
                    tracker.status = new_status
                    db.session.commit()

                    tracker_schema = TrackerSchema()
                    serialized_tracker = tracker_schema.dump(tracker)
                    return jsonify(serialized_tracker), 200
            else:
                return jsonify({"message": "Tracker not found for the parcel order"}), 404
        else:
            return jsonify({"message": "Parcel order not found"}), 404
    else:
        return jsonify({"message": "Unauthorized"}), 401

app.register_blueprint(admin_bp, url_prefix="/admin")


@app.route("/")
def index():
    return 'Index for Deliveroo API'
    




if __name__== '__main__':
    app.run(debug=True,port=5555)