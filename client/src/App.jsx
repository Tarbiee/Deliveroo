import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OrderDetails from './pages/OrderDetails'
import UserOrders from './pages/UserOrders';
import Allorders from './pages/Allorders';
import EditParcel from './pages/EditParcel';
import './App.css';
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [accessToken, setAccessToken] = useState("")

  const location = useLocation()
  useEffect(() =>{
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken)
  }, [location.key, accessToken]);

  

  
  console.log("This is:", accessToken)
  return (
    <div >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home accessToken={accessToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute accessToken={accessToken}><UserDashboard  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute accessToken={accessToken}><AdminDashboard accessToken={accessToken}/></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute accessToken={accessToken}><OrderDetails  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/parcel_orders" element={<ProtectedRoute accessToken={accessToken}><UserOrders  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/edit_parcel/:id" element={<ProtectedRoute accessToken={accessToken}><EditParcel  accessToken={accessToken}/></ProtectedRoute>} />
        <Route path="/all_orders" element={<ProtectedRoute accessToken={accessToken}><Allorders  accessToken={accessToken}/></ProtectedRoute>} /> 
 
      </Routes>
   
    </div>
  );
}

export default App;
