import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ContactUs from './components/ContactUs'
import NavBar from './components/NavBar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OrderDetails from './pages/OrderDetails'

function App() {

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={AdminDashboard}   /> 
        <Route path="/order" element={<OrderDetails/>} />    
        </Routes>
      </Router>
    
    </>
  )
}

export default App
