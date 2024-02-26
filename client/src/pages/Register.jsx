import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import user from "../images/login1.png"
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Usericon from '../Usericon.json';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async (values, { setSubmitting }) => {
        try {
            if (values.password !== values.confirmPassword) {
                alert("Passwords do not match");
                setSubmitting(false);
                return;
            }
            const response = await axios.post('https://deliveroo-2.onrender.com/auth/register', values);
            alert('User registered successfully:', response.data);
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
            setSubmitting(false);
        }
    };

    function handleLogin(){
        navigate('/');
    }

    return (
        <>
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
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        password: Yup.string().required('Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm password is required')
                    })}
                    onSubmit={handleSignup}
                >
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col className='image-container'>
                                    <Lottie animationData={Usericon} style={{height:'150px'}}/>
                                </Col>
                            </Row>
                            <div className='icons'>
                                <FontAwesomeIcon icon={faGoogle} />
                                <FontAwesomeIcon icon={faFacebook} />
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text"
                                    name='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange} 
                                    placeholder="username" />
                                <ErrorMessage name="username" component="div" className="text-red-500" />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="email"
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange} 
                                    placeholder="email" />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="password"
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange} 
                                    placeholder="password" />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                <Form.Control type="password"
                                    name='confirmPassword'
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    placeholder="confirm password" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                            </Form.Group>
                            <Button type="submit" disabled={formik.isSubmitting} style={{backgroundColor:"#49b6ff"}}>
                                {formik.isSubmitting ? 'Submitting...' : 'Register'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        {/* my code */}
        {/* <div className=" mt-40 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${user})`,
            
          
          }}
            ></div>
  
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
  
          <p className="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
          </p>
  
          <p
           
            className="flex items-center justify-center  mt-4 text-gray-600 transition-colors duration-300 transform   hover:bg-gray-50"
          >
            <div className="px-4 py-2">
             
            </div>
  
            <span className="w-5/6 px-4 py-3 font-bold text-center tex text-blue-700 mr-10 text-2xl">
              Deliveroo
            </span>
          </p>
  
        
  
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              User Name
            </label>
            <input
            onChange={(e) =>  setUsername(e.target.value)}
             name='username'
              value={username}
              id="password"
              required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="username"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
            onChange={(e) =>  setEmail(e.target.value)}
             name='email'
              value={email}
              id="email"              
              required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>
  
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="loggingPassword"
              >
                Password
              </label>
             
            </div>
  
            <input
             onChange={(e) =>  setPassword(e.target.value)}
             name='password'
             value={password}
             required
              id="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="loggingPassword"
              >
                Confirm Password
              </label>
            
            </div>
  
            <input
             onChange={(e) =>  setConfirmPassword(e.target.value)}
             name='confirmPassword'
             value={confirmPassword}
             required
              id="confirmPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>
  
          <div className="mt-6">
            <button onClick= {handleSignup} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
  
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
  
            <Link
            onClick={navigate("/")}
              
              className="text-xs text-gray-500 uppercase  hover:underline"
            >
              or login up
            </Link>
  
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div> */}
      </>
    );
}
