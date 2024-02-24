import React,{useEffect, useState} from 'react'
import { Button, Table } from 'react-bootstrap';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from "../components/NavBar"
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Orders({accessToken}) {
  const [parcelOrders, setParcelOrders] = useState([])

  useEffect(() => {
    fetch("http://localhost:5555/users/parcel_orders",{
      headers:{Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then((data) => setParcelOrders(data))
  },[accessToken])

  const handleDelete = (id) => {
    fetch(`http://localhost:5555/users/delete_parcel/${id}`,{
      method:'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      if (response.ok){
        toast.success(`$👍 Parcel Order canceled succesfully !`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: 'blue-toast',
        });
        setParcelOrders(parcelOrders.filter(order => order.id !== id));

      }else{
        console.error('Failed to delete order:', response.status);
      }
    })
    .catch(error => {
      console.error('Error deletind order:', error);
    });
    
  };


  return (
    <div>
       <NavBar/>
        <Hero />
        <div style={{paddingTop:'50px'}}>
        <h1 className="text-2xl font-black text-gray-800">Hello there!</h1>
      <p className="mb-6 text-gray-600">Here's are your orders.</p>
      <div style={{marginLeft:'50px', marginRight:'50px'}}>
        {parcelOrders.length === 0? (
          <p>No parcel orders found since you are a new user.</p>
        ): (
      <Table responsive>
            <thead>
              <tr>
                <th>ParcelOrder Name</th>
                <th>View Parcel Details</th>
                <th>Edit Destination</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {parcelOrders.map((parcelOrder) => (
                <tr key={parcelOrder.id}>
                  <td>{parcelOrder.name_of_parcel}</td>
                  <td>
                    <Link to={`/order/${parcelOrder.id}`}>
                    <Button style={{color:"blue"}}>View Parcel</Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/edit_parcel/${parcelOrder.id}`}>
                    <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                    </Link>
                  </td>
                  <td>
                    <FontAwesomeIcon onClick={() => handleDelete(parcelOrder.id)} icon={faTrashCan} style={{ color: '#40A2D8' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          )}
      </div>
      </div>
    </div>
  )
}

export default Orders