import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OrderDetails from './pages/OrderDetails'
import Orders from './pages/Orders';
import Allorders from './pages/Allorders';
import EditParcel from './pages/EditParcel';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState()

  useEffect(() =>{
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken)
  }, []);
  
  
  console.log("This is:", accessToken)
  return (
    <div  className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<UserDashboard accessToken={accessToken} />} />
        <Route path="/admin" element={<AdminDashboard/>}   /> 
        <Route path="/order/:id" element={<OrderDetails accessToken={accessToken}/>} />
        <Route path="/parcel_orders" element={<Orders accessToken={accessToken}/>} />
        <Route path="/all_orders" element={<Allorders accessToken={accessToken}/>} />
        <Route path="/edit_parcel/:id" element={<EditParcel accessToken={accessToken}/>} />
 
      </Routes>
   
    </div>
  );
}

export default App;
