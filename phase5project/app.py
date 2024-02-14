from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from datetime import datetime


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)



if __name__ == '__main__':
    with app.app_context():
        from models import User, Parcel, Admin, Notification
        db.create_all()
    app.run(debug=True)
