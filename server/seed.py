# seed.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from app import app, db
from models import User, ParcelOrder, Tracker
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Create app context
with app.app_context():
    # Generate sample users

    users_data = [
        {"id": 11, "username": "John Doe", "email": "cbraghini0@elpais.com", "password": generate_password_hash("john123")}, 
        {"id": 2, "username": "Stephanie Mechan", "email": "smechan1@cocolog-nifty.com", "password": generate_password_hash("steph123")}, 
        {"id": 3, "username": "Stanleigh Amsberger", "email": "samsberger2@deviantart.com", "password": generate_password_hash("stanleigh123")}, 
        {"id": 4, "username": "Benito Moors", "email": "bmoors3@npr.org", "password": generate_password_hash("benito123")}, 
        {"id": 5, "username": "Hedi Sainte Paul", "email": "hsainte4@phoca.cz", "password": generate_password_hash("hedi123")}, 
        {"id": 6, "username": "Austen Oxer", "email": "aoxer5@tripod.com", "password": generate_password_hash("austen123")}, 
        {"id": 7, "username": "Donovan Klouz", "email": "dklouz6@booking.com", "password": generate_password_hash("donovan123")}, 
        {"id": 8, "username": "Egan Girt", "email": "egirt7@bloomberg.com", "password": generate_password_hash("egan123")}, 
        {"id": 9, "username": "Monique Waith", "email": "mwaith8@hexun.com", "password": generate_password_hash("monique123")}, 
        {"id": 10, "username": "Sherry Stanbury", "email": "sstanbury9@shareasale.com", "password": generate_password_hash("sherry123")}, 
        
               
    ]
    print("Seeding users data")

    for user in users_data:
        data = User(**user)
        db.session.add(data)
    db.session.commit()

    # Generate parcel orders and trackers
    users = User.query.all()
    for user in users:
        for _ in range(random.randint(1, 5)):
            parcel_order = ParcelOrder(
                name_of_parcel=fake.word(),
                pickup_location=fake.address(),
                destination=fake.address(),
                latitude_pick_up_location=fake.latitude(),
                longitude_pick_up_location=fake.longitude(),
                latitude_destination=fake.latitude(),
                longitude_destination=fake.longitude(),
                receivers_phone=fake.phone_number(),
                image_of_parcel=fake.image_url(),
                receivers_name=fake.name(),
                weight_of_parcel=random.randint(1, 10),
            
                user=user
            )
            db.session.add(parcel_order)
            db.session.commit()

            tracker = Tracker(
                status='preparing',
                present_location=fake.address(),
                delivery_date=fake.date_time_between(start_date='-1y', end_date='now'),
                parcel_id=parcel_order.id
            )
            db.session.add(tracker)
            db.session.commit()

print("📦 Data seeding completed!")
