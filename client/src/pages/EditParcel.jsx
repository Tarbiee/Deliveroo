import React,{useState, useEffect} from 'react'
import Navbar from '../components/NavBar'
import Hero from '../components/Hero';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditParcel({accessToken}) {
    const [destination, setDestination] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:5555/users/parcel_order/${id}`,{
            headers:{Authorization: `Bearer ${accessToken}`}
        })
        .then((r) => r.json())
        .then((data) => setDestination(data.destination))
    },[id, accessToken])
    
    const handleEdit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5555/users/edit_parcel/${id}`,{
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ destination: destination})
        })
        .then(response => {
            if (response.ok){
                toast.success(`$👍 Destination changed to ${destination} !`, {
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
                //set new destination
                navigate("/parcel_orders")
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <Navbar/>
        <Hero/>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
        <div style={{paddingLeft:'100px', paddingRight:'100px'}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Change Parcel Destination</Form.Label>
        <Form.Control 
        type="text"
        name = "destination"
        value={destination}
        onChange = {(e) => setDestination(e.target.value)} 
        placeholder="New Destination" 
        style={{width:'500px'}} />
        </Form.Group>
        </Form> 
        <Button onClick ={handleEdit} style={{color:'black'}}>Edit Destination</Button>
        </div>  
        </div>
    </div>
  )
}
