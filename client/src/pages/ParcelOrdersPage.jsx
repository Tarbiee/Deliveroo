import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Parcel component
const Parcel = ({ parcel, onView, onEdit, onDelete, handleNameChange }) => {
    return (
        <div className="parcel">
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

// ParcelList component
const ParcelList = ({ parcels, onView, onEdit, onDelete, handleNameChange }) => (
    <div className="parcel-list">
        {parcels && parcels.length > 0 ? (
            parcels.map(parcel => (
                <Parcel
                    key={parcel.id}
                    parcel={parcel}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    handleNameChange={handleNameChange}
                />
            ))
        ) : (
            <p>No parcels available</p>
        )}
    </div>
);


// ParcelOrdersPage component
const ParcelOrdersPage = ({ accessToken }) => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);

    const handleNameChange = (e, parcelId) => {
        const newName = e.target.value;
        console.log('New name for parcel', parcelId, ':', newName);
    };

    useEffect(() => {
        fetchParcels();
    }, [accessToken]);

    const fetchParcels = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users/parcel_orders', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched parcels:', data);
                setParcels(data);
            } else {
                console.error('Failed to fetch parcels');
            }
        } catch (error) {
            console.error('Error fetching parcels:', error);
        }
    };

    const handleViewParcel = (parcel) => {
        setSelectedParcel(parcel);
    };

    const handleCloseModal = () => {
        setSelectedParcel(null);
    };

    return (
        <div className="page-container">
            <h1>Parcel List</h1>
            <ParcelList
                parcels={parcels}
                onView={handleViewParcel}
                onEdit={() => {}}
                onDelete={() => {}}
                handleNameChange={() => {}}
            />

            <Modal show={selectedParcel !== null} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Parcel Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>{JSON.stringify(selectedParcel, null, 2)}</pre>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ParcelOrdersPage;
