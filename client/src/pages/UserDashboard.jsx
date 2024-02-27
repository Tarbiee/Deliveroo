import "./UserDashboard.css";
import { Routes, Route, Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { IoCreateSharp } from "react-icons/io5";
import Orders from "./Orders";
import CreateOrder from "./CreateOrder";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
function UserDashboard({accessToken}) {

  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-200 flex h-screen">
        <aside className="fixed z-50 md:relative">
          {/* Sidebar */}
          <input type="checkbox" className="peer hidden" id="sidebar-open" />
          <label
            className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
            htmlFor="sidebar-open"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Sidebar Navigation"
            className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-blue-700 text-white transition-all md:h-screen md:w-64 lg:w-72"
          >
            <div onClick={ () => navigate('/')} className="bg-blue-800 mt-5 py-4 pl-10 md:mt-10 cursor-pointer">
              <span className="">
                <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">
                  D
                </span>
                <span className="text-xl">eliveroo</span>
              </span>
            </div>
            <ul className="mt-8 space-y-3 md:mt-20">
              <li className="relative">
                <Link
                  to="/parcel_orders"
                  className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-100 focus:outline-none"
                >
                  <button className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-100 focus:outline-none">
                    <span>
                      <CiBoxList className=" text-3xl" />
                    </span>
                    <span className="">Orders</span>
                  </button>
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/create-order"
                  className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-100 focus:outline-none"
                >
                  <button className="focus:bg-blue-600 hover:bg-blue-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-100 focus:outline-none">
                    <span>
                      <IoCreateSharp className=" text-3xl" />
                    </span>
                    <span className="">Create Order</span>
                  </button>
                </Link>
              </li>
            </ul>

            <div className="my-6 mt-auto ml-10 flex cursor-pointer">
              <div></div>
              <div className="ml-3">
                <p className="font-medium">Rick Flair</p>
                <p className="text-sm text-gray-300">rick@gmai.com</p>
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex h-full w-full flex-col">
          {/* Navbar */}
          <header className="relative flex flex-col items-center bg-white px-4 py-4 shadow sm:flex-row md:h-20">
            <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
              <div className="relative ml-10 flex items-center justify-between rounded-md sm:ml-auto">
               
                <span className={`lg:text-2xl font-ubuntu border-b-2 border-blue-600/40` }>
              User Dashboard
            </span>
              </div>

              <ul className="mx-auto mt-4 flex space-x-6 sm:mx-5 sm:mt-0">
              
              </ul>
            </div>
          </header>
          {/* /Navbar */}

          {/* Main */}
          <div className="h-full overflow-hidden pl-10">
            <main
              id="dashboard-main"
              className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
            >
              {/* <Routes>
              <Route path="/parcel_orders" element={<ProtectedRoute accessToken={accessToken}><Orders  accessToken={accessToken} /></ProtectedRoute>} />
              </Routes> */}

             
              <CreateOrder accessToken={accessToken} />
            </main>
          </div>
          {/* /Main */}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
