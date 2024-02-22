import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
// import NavBar from './components/NavBar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OrderDetails from './pages/OrderDetails'
import './App.css';
import ParcelOrdersPage from './pages/ParcelOrdersPage';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))

  useEffect(() =>{
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken)
  }, []);
  
  
  console.log("This is:", accessToken)
  return (
    <div >
      {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<Login accessToken={accessToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard/>}   /> 
        <Route path="/order" element={<OrderDetails/>} />
        <Route path="/parcelorders" element={<ParcelOrdersPage/>} />
 
      </Routes>
   
    </div>
  );
}

export default App;
