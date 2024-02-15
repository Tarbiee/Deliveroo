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



class Home(Resource):
    def get(self):
        return 'Index for Deliveroo API'
api.add_resource(Home,'/') 



if __name__== '__main__':
    app.run(debug=True,port=5555)