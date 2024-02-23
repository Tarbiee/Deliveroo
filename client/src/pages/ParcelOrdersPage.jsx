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
const ParcelOrdersPage = ({accessToken}) => {
    const [parcels, setParcels] = useState([]);

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
            const data = await response.json();
            console.log('Fetched parcels:', data);
            setParcels(data);
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
                handleNameChange={handleNameChange}
            />
        </div>
    );
};

export default ParcelOrdersPage;
