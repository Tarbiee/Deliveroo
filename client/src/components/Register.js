import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import user from "../images/login1.png"
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';



export default function Register() {

    const navigate = useNavigate()

    function handleRegister(){
        navigate('/')
    }
  return (
    <div className='login-container'> 
        
        <div className='login-content'>
            
            <h3>Welcome Back!</h3>
            <Button style={{backgroundColor:"#49b6ff"}}>Log In</Button>

        </div>

        <div className='register-form'>
        <h2>Register form</h2>
        <Row>
        <Col xs={6} md={4} className='image-container'>
          <Image src={user} roundedCircle className='user-image' />
        </Col>
        </Row>
        <Form>
        <div className='icons'>
            <FontAwesomeIcon icon={faGoogle} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="text" placeholder="username" />
         </Form.Group>
         <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="email" placeholder="email" />
         </Form.Group>
         <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
         <Form.Control type="text" placeholder="password" />
         </Form.Group>

        </Form>
        <Button onClick={handleRegister} style={{backgroundColor:"#49b6ff"}}>Register</Button>
        
        </div>
      
    </div>
  )
}
