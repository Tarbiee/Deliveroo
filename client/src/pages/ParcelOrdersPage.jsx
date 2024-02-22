import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Parcel component
const Parcel = ({ parcel, onView, onEdit, onDelete }) => {
    const [parcelName, setParcelName] = useState(parcel.name_of_parcel || "");

    const handleNameChange = (e) => {
        setParcelName(e.target.value); 
    };

    return (
        <div className="parcel">
            <Form.Group className="mb-3" controlId={`parcelName-${parcel.id}`}>
                <Form.Control 
                    type="text"
                    value={parcelName}
                    onChange={handleNameChange}
                    placeholder="Parcel Name" 
                />
            </Form.Group>
          
            <div className="parcel-section">
                <Button variant="primary" onClick={() => onView(parcel)}>
                    <FontAwesomeIcon icon={faEye} /> View Parcel
                </Button>
            </div>
            <div className="parcel-section">
                <Button variant="primary" onClick={() => onEdit(parcel, parcelName)}>
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

// ParcelList component
const ParcelList = ({ parcels, onView, onEdit, onDelete, parcelname, setParcelname }) => (
    <div className="parcel-list">
        {parcels && parcels.length > 0 ? (
            parcels.map(parcel => (
                <Parcel
                    key={parcel.id}
                    parcel={parcel}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    name_of_parcel={parcelname}
                    setParcelname={setParcelname}
                />
            ))
        ) : (
            <p>No parcels available</p>
        )}
    </div>
);


// ParcelOrdersPage component
const ParcelOrdersPage = () => {
    const [parcels, setParcels] = useState([]);


    useEffect(() => {
        fetchParcels();
    }, []);

    const fetchParcels = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users/parcel_orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const data = await response.json();
            console.log('Fetched parcels:', data);
            setParcels(data.parcel_orders);
        } catch (error) {
            console.error('Error fetching parcels:', error);
        }
    };
    

    const handleViewParcel = (parcel) => {
        console.log('View details for', parcel.name_of_parcel);
    
    };

    const handleEditParcel = (parcel, newName) => {
        console.log('Edit details for', parcel.name_of_parcel, 'New name:', newName);
    
    };

    const handleDeleteParcel = async (parcel) => {
        console.log('Delete', parcel.name_of_parcel);
    
        try {
            const response = await fetch(`/users/delete_parcel/${parcel.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (response.ok) {
            
                setParcels(prevParcels => prevParcels.filter(p => p.id !== parcel.id));
            } else {
                console.error('Error deleting parcel');
            }
        } catch (error) {
            console.error('Error deleting parcel:', error);
        }
    };

    return (
        <div className="page-container">
            <h1>Parcel List</h1>
            <ParcelList
                parcels={parcels}
                onView={handleViewParcel}
                onEdit={handleEditParcel}
                onDelete={handleDeleteParcel}
            />
        </div>
    );
};

export default ParcelOrdersPage;
