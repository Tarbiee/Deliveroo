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
import Usericon from '../Usericon.json'
import axios from 'axios';



export default function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async () => {
        try{
            if (password !== confirmPassword){
                alert("Passwords do not match");
                return;
            }
            const response = await axios.post('http://localhost:5555/auth/register',{
                username,
                email,
                password,
            });
            alert('User registered successfully:', response.data);
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            navigate('/')
        }
        catch (error){
            console.error('Error signing up:', error);
        }
    };
    function handleLogin(){
        navigate('/')

    }

   
  return (
    <div className='login-container'> 
        
        <div className='login-content'>
            <div className='lll'>
            <Image src={user} className='login-image'/>
            </div>
            <h3 className="text-2xl font-black text-gray-800"> Welcome Back!</h3>
            <p>Please sign in here to seamlessly continue tracking your parcel order!</p>
            <br></br>
        
            <Button onClick={handleLogin} style={{backgroundColor:"#49b6ff"}}>Log In</Button>

        </div>

        <div className='register-form'>
        <h2 className="text-2xl font-black text-gray-800">Register form</h2>
        <Row>
        <Col  className='image-container'>
          <Lottie animationData={Usericon} style={{height:'150px'}}/>
        </Col>
        </Row>
        <Form>
        <div className='icons'>
            <FontAwesomeIcon icon={faGoogle} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Control type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username" />
         </Form.Group>
         <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="email" />
         </Form.Group>
         <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="password" />
         </Form.Group>
         <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password" />
         </Form.Group>
        </Form>
        <Button onClick={handleSignup} style={{backgroundColor:"#49b6ff"}}>Register</Button>
        
        </div>
      
    </div>
  )
}
