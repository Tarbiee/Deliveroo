import { useState } from "react";
import user from "../images/login1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");
    try {
      const response = await axios.post(
        "https://deliveroo-2.onrender.com/auth/login",
        {
          username,
          password,
        }
      );

      const { access, refresh } = response.data.tokens;
      login(access);
      setPassword("");
      setUsername("");
      toast.success(" 👤 User logged in successfuly!");
      if (username === "Stephanie Mechan") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "⛔ Error logging in. Please check your credentials and try again.!"       
      );
    }
  };


  return (
 
    <div className=" mt-40 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: `url(${user})`,
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <div className="flex items-center min-w-max relative">
            <div className="font-semibold flex items-center gap-x-2">
              <span className="">
                <span className="mr-1 text-white inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">
                  D
                </span>
                <span className="text-xl">eliveroo</span>
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 ">Welcome back!</p>

        <div className="flex items-center justify-center  mt-4 text-gray-600 transition-colors duration-300 transform   hover:bg-gray-50">
          <div className="px-4 py-2"></div>

          <span className="w-5/6 px-4 py-3 font-bold text-center  text-blue-700 mr-10 text-sm">
            You order we deliver
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              User Name
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              id="password"
              required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="username"
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
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              required
              id="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <button
            onClick={() => navigate("/register")}
            className="text-xs text-gray-500 uppercase  hover:underline"
          >
            or sign up
          </button>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
}
