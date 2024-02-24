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
            const response = await axios.post('http://localhost:5555/auth/register', values);
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
    );
}
