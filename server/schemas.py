from marshmallow import fields, Schema,validate

class UserSchema(Schema):
    id = fields.Integer()
    username = fields.String()
    email = fields.String()

class ParcelOrderSchema(Schema):
    id = fields.Integer(dump_only=True)
    name_of_parcel = fields.String(required=True, validate=validate.Length(max=50))
    pickup_location = fields.String(required=True, validate=validate.Length(max=50))
    destination = fields.String(required=True, validate=validate.Length(max=50))
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    image_of_parcel = fields.String(required=True)
    receivers_name = fields.String(required=True, validate=validate.Length(max=50))
    weight_of_parcel = fields.Integer(required=True)

    user_id = fields.Integer(dump_only=True)

class TrackerSchema(Schema):
    id = fields.Int(dump_only=True)
    status = fields.Str()
    present_location = fields.Str()
    delivery_date = fields.DateTime()
    parcel_id = fields.Int()