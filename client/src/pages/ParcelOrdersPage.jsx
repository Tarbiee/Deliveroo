import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Parcel component
const Parcel = ({ parcel, onView, onEdit, onDelete, handleNewDestination }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [newDestination, setNewDestination] = useState(parcel.destination);

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleEditModalSave = () => {
        onEdit(newDestination);
        setShowEditModal(false);
    };

    return (
        <div className="parcel">
            <Form.Group className="mb-3" controlId={`parcelName-${parcel.id}`}>
                <Form.Control 
                    type="text"
                    value={parcel.name_of_parcel}
                    onChange={(e) => handleNewDestination(e, parcel.id)}
                    placeholder="Parcel Name" 
                />
            </Form.Group>

            <div className="parcel-section">
                <Button variant="primary" onClick={() => onView(parcel)}>
                    <FontAwesomeIcon icon={faEye} /> View Parcel
                </Button>
            </div>
            <div className="parcel-section">
                <Button variant="primary" onClick={() => setShowEditModal(true)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit Parcel Destination
                </Button>
            </div>
            <div className="parcel-section">
                <Button variant="primary" onClick={() => onDelete(parcel.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Parcel
                </Button>
            </div>


            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Parcel Destination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control 
                        type="text"
                        value={newDestination}
                        onChange={(e) => setNewDestination(e.target.value)}
                        placeholder="New Destination" 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditModalSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// ParcelList component
const ParcelList = ({ parcels, onView, onEdit, onDelete, handleNewDestination }) => (
    <div className="parcel-list">
        {parcels && parcels.length > 0 ? (
            parcels.map(parcel => (
                <Parcel
                    key={parcel.id}
                    parcel={parcel}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    handleNewDestination={handleNewDestination}
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

    const handleEditParcel = (destination) => {
        console.log('Editing parcel destination:', destination);
    };

    const handleDeleteParcel = async (parcelId) => {
        const confirmDelete = window.confirm('Are you sure you want to cancel this order?');
        if (!confirmDelete) {
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/delete_parcel/${parcelId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                setParcels(parcels.filter(parcel => parcel.id !== parcelId));

                if (selectedParcel && selectedParcel.id === parcelId) {
                    setSelectedParcel(null);
                }

                console.log('Parcel order cancelled successfully!');
            } else {
                console.error('Failed!');
            }
        } catch (error) {
            console.error('Error deleting parcel:', error);
        }
    };
    

    const handleNewDestination = (e, parcelId) => {
        const newDestination = e.target.value;
        console.log('New destination for parcel', parcelId, ':', newDestination);
    };

    return (
        <div className="page-container">
            <h1>Parcel List</h1>
            <ParcelList
                parcels={parcels}
                onView={handleViewParcel}
                onEdit={handleEditParcel}
                onDelete={handleDeleteParcel}
                handleNewDestination={handleNewDestination}
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
