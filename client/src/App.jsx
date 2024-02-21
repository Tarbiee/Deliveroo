import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home_page';
import Admin from './pages/Admin_page';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))

  useEffect(() =>{
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken)
  }, []);
  
  
  console.log("This is:", accessToken)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login accessToken={accessToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home_page' element={<Home accessToken={accessToken}/>}/>
        <Route path='/admin_page' element={<Admin accessToken={accessToken}/> }/>
      </Routes>
   
    </div>
  );
}

export default App;
