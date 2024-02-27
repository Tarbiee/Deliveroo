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
import Orders from './pages/Orders';
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
    <div  className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home accessToken={accessToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute accessToken={accessToken}><UserDashboard  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute accessToken={accessToken}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute accessToken={accessToken}><OrderDetails  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/parcel_orders" element={<ProtectedRoute accessToken={accessToken}><Orders  accessToken={accessToken} /></ProtectedRoute>} />
        <Route path="/edit_parcel/:id" element={<ProtectedRoute accessToken={accessToken}><EditParcel  accessToken={accessToken}/></ProtectedRoute>} />
   
 
      </Routes>
   
    </div>
  );
}

export default App;
