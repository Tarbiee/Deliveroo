import React,{useEffect, useState} from 'react'
import { Button, Table } from 'react-bootstrap';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from "../components/NavBar"
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './OrderDetails';


function Orders({accessToken}) {
  const [parcelOrders, setParcelOrders] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch("https://deliveroo-2.onrender.com/users/parcel_orders",{
      headers:{Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then((data) => setParcelOrders(data))
  },[accessToken])

  const handleDelete =  (id) => {  
  
    fetch(`https://deliveroo-2.onrender.com/users/delete_parcel/${id}`,{
      method:'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      if (response.ok){
        toast.success(`👍 Parcel Order canceled succesfully !`);
        setParcelOrders(parcelOrders.filter(order => order.id !== id));


      }else{
        console.error('Failed to delete order:', response.status);
      }
    })
    .catch(error => {
      console.error('Error deletind order:', error);
    });
    
  };


  const fetchStatus = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5555/users/parcel_status/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setStatus(data.status);
      if (status === 'Delivered'){
        toast.success(`👍 Parcel Order has  already been delivered!`);
      } else if  (status === 'In transit' || status === 'Preparing')  {
        handleDelete(id);
      } 
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  


  return (
    <div>
       <NavBar/>
        <Hero />
        <div style={{paddingTop:'50px'}}>
        <h1 className="text-2xl font-black text-gray-800">Hello there!</h1>
      <p className="mb-6 text-gray-600">Here's are your orders.</p>
      <div style={{marginLft:'50px', marginRight:'50px'}}>
        {parcelOrders.length > 0 ? (
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
                    <Link  to={`/order/${parcelOrder.id}`}>
                    <Button style={{color:"blue"}}>View Parcel</Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/edit_parcel/${parcelOrder.id}`}>
                    <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                    </Link>
                  </td>
                 <td>
                 <FontAwesomeIcon  onClick={() => fetchStatus(parcelOrder.id)} icon={faTrashCan} style={{ color: '#40A2D8' }} />
</td>               
                </tr>
              ))}
            </tbody>
          </Table>
          
        ): (
          <p>No parcel orders found since you are a new user.</p>    
          )}
      </div>
      </div>
    </div>
  )
}

export default Orders