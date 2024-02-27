import "./UserDashboard.css";
import React,{useEffect, useState} from 'react'
import { CiBoxList } from "react-icons/ci";
import { IoCreateSharp } from "react-icons/io5";
import { Button, Table } from 'react-bootstrap';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allorders({accessToken}) {
  const [parcelOrders, setParcelOrders] = useState([])

  function handleStatusChange(parcelOrderId, newStatus) {
    fetch(`https://deliveroo-2.onrender.com/admin/parcel_order/${parcelOrderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then(response => {
      if (response.ok) {
        toast.success(`$👍 Status changed to ${newStatus} !`, {
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
        const updatedOrders = parcelOrders.map(order => {
          if (order.id === parcelOrderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setParcelOrders(updatedOrders);
        console.log(parcelOrders)
      } else {
        throw new Error('Failed to update status');
      }
    })
    .catch(error => console.error('Error updating status:', error));
  }

  useEffect(() => {
    fetch("https://deliveroo-2.onrender.com/users/all_parcel_orders",{
      headers:{Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then((data) => setParcelOrders(data))
  },[accessToken])
  return (

    <section>
       <div className="h-full overflow-hidden pl-10">
          <main
            id="dashboard-main"
            className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
          >
            <h1 className="text-2xl font-black text-gray-800">ADMIN DASHBOARD</h1>
            <p className="mb-6 text-gray-600">
              List of all the orders.
            </p>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Parcel Id</th>
          <th>Parcel Order</th>
          <th>View Order</th>
          <th>Update Status</th>
          
        </tr>
      </thead>
      <tbody>
      {parcelOrders.map((parcelOrder) => (
                <tr key={parcelOrder.id}>
                  <td>{parcelOrder.id}</td>
                  <td>{parcelOrder.name_of_parcel}</td>
                  <td>
                    <Button style={{color:"blue"}}>View Parcel</Button>
                  </td>
                  <td >
                  <Dropdown >
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "Preparing")} >Preparing</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "In transit")}>In transit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "Delivered")}>Delivered</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>

                </tr>
              ))}
      </tbody>
    </Table>

            
          </main>
        </div>
    </section>
  );
}

export default Allorders;
