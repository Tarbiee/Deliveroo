import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import user from "../images/login1.png";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Usericon from "../Usericon.json";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5555/auth/login", {
        username,
        password,
      });

      const { access, refresh } = response.data.tokens;
      localStorage.setItem("accessToken", access);
      setPassword("");
      setUsername("");
      toast.success(" 👤 User logged in successfuly!", {
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
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "⛔ Error logging in. Please check your credentials and try again.!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };
  function handleRegister() {
    navigate("/register");
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

    // my code
//     <div className=" mt-40 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
//     <div
//       className="hidden bg-cover lg:block lg:w-1/2"
//       style={{
//         backgroundImage: `url(${user})`,
        
      
//       }}
//         ></div>

//     <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
//       <div className="flex justify-center mx-auto">
//         <img
//           className="w-auto h-7 sm:h-8"
//           src="https://merakiui.com/images/logo.svg"
//           alt=""
//         />
//       </div>

//       <p className="mt-3 text-xl text-center text-gray-600 ">
//         Welcome back!
//       </p>

//       <div
       
//         className="flex items-center justify-center  mt-4 text-gray-600 transition-colors duration-300 transform   hover:bg-gray-50"
//       >
//         <div className="px-4 py-2">
         
//         </div>

//         <span className="w-5/6 px-4 py-3 font-bold text-center tex text-blue-700 mr-10 text-2xl">
//           Deliveroo
//         </span>
//       </div>
// <form onSubmit={handleSubmit}>
    

//       <div className="mt-4">
//         <label
//           className="block mb-2 text-sm font-medium text-gray-600"
//           htmlFor="LoggingEmailAddress"
//         >
//           User Name
//         </label>
//         <input
//         onChange={(e) =>  setUsername(e.target.value)}
//          name='username'
//           value={username}
//           id="password"
//           required
//           className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//           type="username"
//         />
//       </div>

//       <div className="mt-4">
//         <div className="flex justify-between">
//           <label
//             className="block mb-2 text-sm font-medium text-gray-600 "
//             htmlFor="loggingPassword"
//           >
//             Password
//           </label>
//           <a
//             href="#"
//             className="text-xs text-gray-500  hover:underline"
//           >
//             Forget Password?
//           </a>
//         </div>

//         <input
//          onChange={(e) =>  setPassword(e.target.value)}
//          name='password'
//          value={password}
//          required
//           id="password"
//           className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
//           type="password"
//         />
//       </div>

//       <div className="mt-6">
//         <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
//           Sign In
//         </button>
//       </div>
//       </form>

//       <div className="flex items-center justify-between mt-4">
//         <span className="w-1/5 border-b md:w-1/4"></span>

//         <Link
//         onClick={() => navigate("/register")}
          
//           className="text-xs text-gray-500 uppercase  hover:underline"
//         >
//           or sign up
//         </Link>

//         <span className="w-1/5 border-b md:w-1/4"></span>
//       </div>
//     </div>
//   </div>
  );
}
