import "./UserDashboard.css";
import { Routes, Route, Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { IoCreateSharp } from "react-icons/io5";
import Orders from "./Orders";
import CreateOrder from "./CreateOrder";
function UserDashboard() {
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
            className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72"
          >
            <div className="bg-slate-800 mt-5 py-4 pl-10 md:mt-10">
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
                  to="/orders"
                  className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none"
                >
                  <button className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                    <span>
                      <CiBoxList className=" text-3xl" />
                    </span>
                    <span className="">Orders</span>
                  </button>
                </Link>
              </li>
              <li className="relative">
                <Link to="/create-order" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                <button className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
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
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="name"
                  name="search"
                  className="h-12 w-full rounded-md border border-gray-100 bg-gray-100 py-4 pr-4 pl-12 shadow-sm outline-none focus:border-blue-500"
                  placeholder="Search for anything"
                />
              </div>

              <ul className="mx-auto mt-4 flex space-x-6 sm:mx-5 sm:mt-0">
                <li className="">
                  <button className="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </li>
                <li className="">
                  <button className="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </button>
                </li>
                <li className="">
                  <button className="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </li>
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
               <Route path="/orders" component={Orders} />
              <Route path="/create-order" component={CreateOrder} />
              </Routes> */}
              <CreateOrder/>
            
            </main>
          </div>
          {/* /Main */}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
