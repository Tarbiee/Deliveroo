import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import user from "../images/login1.png"
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Usericon from '../Usericon.json';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5555/auth/login', {
                username,
                password,
            })
            
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('accessToken', access);
            setPassword("");
            setUsername("");
            toast.success(' 👤 User logged in successfuly!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            if (username === "Stephanie Mechan") {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }
        catch (error) {
            console.error('Error logging in:', error);
            toast.error('⛔ Error logging in. Please check your credentials and try again.!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
        
    }
    function handleRegister(){
        navigate('/register')
    }

  return (
    <div className='login-container'> 
        <div className='login-form'>
        <h2 className="text-2xl font-black text-gray-800">Sign In</h2>
        <Row>
        <Col  className='image-container'>
        <Lottie animationData={Usericon} style={{height:'150px'}}/>
        </Col>
        </Row>
        <Form >
        <div className='icons'>
            <FontAwesomeIcon icon={faGoogle} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text"
         name='username'
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         placeholder="username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="password"
         name='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="password" />
      </Form.Group>
        </Form>
        <Button onClick={handleSubmit} style={{backgroundColor:"#49b6ff"}}>Login</Button>
        
        </div>
        <div className='login-content'>
          <div className='lll'>
          <Image src={user} className='login-image'/>
          </div>
            <h3 className="text-2xl font-black text-gray-800">Are you new here?</h3>
            <p>Register with us today to gain access to tracking your parcel orders effortlessly</p>
            <br></br>
            
            <Button onClick= {handleRegister} style={{backgroundColor:"#49b6ff"}}>Register</Button>
        </div>
      
    </div>
  )
}
