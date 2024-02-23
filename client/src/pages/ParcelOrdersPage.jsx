import React from 'react';

// Parcel component
const Parcel = ({ parcel, onView, onEdit, onDelete, }) => {
   
console.log ( "message", " these are your parcels", parcel)
    return (
        <div className="parcel">
            {/* <p>Parcel Name: {parcel.name_of_parcel}</p>
            <p>Receiver's Name: {parcel.receivers_name}</p>
            <p>Pickup Location: {parcel.pickup_location}</p>
            <p>Destination: {parcel.destination}</p>
            <p>Weight: {parcel.weight_of_parcel} kg</p>
            <img src={parcel.image_of_parcel} alt="Parcel" /> */}

            <Form.Group className="mb-3" controlId={`parcelName-${parcel.id}`}>
                <Form.Control 
                    type="text"
                    value={parcel.name_of_parcel}
                    onChange={(e) => handleNameChange(e, parcel.id)}
                    placeholder="Parcel Name" 
                />
            </Form.Group>

            <div className="parcel-section">
                <Button variant="primary" onClick={() => onView(parcel)}>
                    <FontAwesomeIcon icon={faEye} /> View Parcel
                </Button>
            </div>
            <div className="parcel-section">
                <Button variant="primary" onClick={() => onEdit(parcel)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit Parcel
                </Button>
            </div>
            <div className="parcel-section">
                <Button variant="primary" onClick={() => onDelete(parcel)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Parcel
                </Button>
            </div>
        </div>
    );
};

export default Parcel;