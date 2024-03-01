import "./UserDashboard.css";
import React,{useEffect, useState} from 'react'
import { CiBoxList } from "react-icons/ci";
import { IoCreateSharp } from "react-icons/io5";
import { Button, Table } from 'react-bootstrap';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  useAuth } from '../utils/Auth'

function Allorders({accessToken}) {
  const [parcelOrders, setParcelOrders] = useState([])
  const [adminDetails, setAdminDetails] = useState([])

  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://deliveroo-2.onrender.com/auth/whoami",{
      headers:{Authorization: `Bearer ${accessToken}`}
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => setAdminDetails(data))
    
    

    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  },[accessToken])

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
        toast.success(`$👍 Status changed to ${newStatus} !`);
        const updatedOrders = parcelOrders.map(order => {
          if (order.id === parcelOrderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setParcelOrders(updatedOrders);
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
.then(res => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
})
.then((data) => setParcelOrders(data))
.catch((error) => {
  console.error('There has been a problem with your fetch operation:', error);
});
  },[accessToken])

  const handleLogout = async () => {
    const response = await fetch('https://deliveroo-2.onrender.com/auth/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      logout()      
      navigate('/login');
      toast.success('👋 Logged out successfully!');

    } else {
      
      console.error('Logout failed');
    }
  }
  return (

    <div className="bg-slate-200 flex h-screen">
      <aside className="fixed z-50 md:relative">
        {/* Sidebar */}
        <input type="checkbox" className="peer hidden" id="sidebar-open" />
        <label
          className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
          htmlFor="sidebar-open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Sidebar Navigation"
          className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-blue-700 text-white transition-all md:h-screen md:w-64 lg:w-72"
        >
          <div className="bg-blue-800 mt-5 py-4 pl-10 md:mt-10">
            <span className="">
              <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">
                D
              </span>
              <span className="text-xl">eliveroo</span>
            </span>
          </div>
          <ul className="mt-8 space-y-3 md:mt-20">
            <li className="relative">
              <Link to="/all_orders" className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                <span>
                <CiBoxList className=" text-3xl" />
                </span>
                <span className="">Orders</span>
              </Link>
            </li>
            <li className="relative">
              <button className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                <span>
                <IoCreateSharp className=" text-3xl" />
                </span>
                <span className="">Users</span>
              </button>
            </li>
          </ul>

          <div className="my-6 mt-auto ml-10 flex cursor-pointer">
            <div>
            
            </div>
            <div className="ml-3">
              <p className="font-medium">{adminDetails.username}</p>
              <p className="text-sm text-gray-300">{adminDetails.email}</p>
            </div>
          </div>
        </nav>
      </aside>
      {/* /Sidebar */}

      <div className="flex h-full w-full flex-col">
        {/* Navbar */}
        <header className="relative flex flex-col items-center bg-white px-4 py-4 shadow sm:flex-row md:h-20">
          <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
            <div className="relative ml-10 flex items-center justify-between rounded-md sm:ml-auto">
             
             
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 duration-300 ease-linear flex justify-center w-full sm:w-auto border bg-blue-400/20 border-blue-600 text-white bg-blue-700 rounded-xl"
            >
              Log Out
            </button>

          
          </div>
        </header>
        {/* /Navbar */}

        {/* Main */}
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
                  <td className=" text-gray-400">{parcelOrder.name_of_parcel}</td>
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
        {/* /Main */}
      </div>
    </div>
  );
}

export default Allorders;