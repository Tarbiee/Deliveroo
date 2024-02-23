import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [svg, setSvg] = useState("backdrop-blur-md bg-white/10");
  const [textColor, setTextColor] = useState("text-black");
  const [mobileBg, setMobileBg] = useState("bg-white/80");


  

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setSvg("bg-white");
        setTextColor(" text-blue-700");
        setMobileBg("backdrop-blur-md bg-white/10");
      } else {
        setSvg("backdrop-blur-md bg-white/10");
        setTextColor("text-black");
        setMobileBg("bg-white/80");
      }
    };
    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const toggleNavbar = () => {
    setOpenNavbar((openNavbar) => !openNavbar);
  };
  return (
    <header className={` fixed z-50  left-0 top-0 w-full ${svg} flex items-center h-14 lg:h-[70px] shadow-md  `}>
      <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
        <div className="flex items-center min-w-max relative">
          <NavLink to="/" className="font-semibold flex items-center gap-x-2">
            <div className="flex items-center -space-x-3">
              <img
                src="/logo.png"
                alt="logo"
                className=" lg:w-[75px] lg:h-[75px] w-[30px] h-[30px] transform scale-x-[-1] "
              />
            </div>
            <span className={`lg:text-2xl font-ubuntu border-b-2 border-blue-600/40 ${textColor}` }>
              Deliveroo
            </span>
          </NavLink>
        </div>
        <div
          className={`
                fixed inset-x-0 h-[100dvh] lg:h-max top-0  lg:translate-y-0 lg:opacity-100 lg:visible left-0 ${mobileBg}  lg:!bg-transparent py-32 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 w-full lg:top-0 lg:relative  lg:flex lg:justify-between duration-300 ease-linear
                ${
                  openNavbar
                    ? ""
                    : " -translate-y-10 opacity-0 invisible md:visible lg:opacity-100 lg:visible"
                }
            `}
        >
          <ul onClick={() => {
              toggleNavbar();
            }} className={`flex flex-col lg:flex-row gap-6 lg:items-center    text-gray-950  lg:w-full lg:justify-center lg:text-lg`}>
              <li >
                <NavLink to="/"className="relative py-2.5 duration-300 ease-linear hover:text-blue-600  ">
                    Home
                </NavLink>
                
              </li>
             
              <li className=" relative"    >
                <NavLink to="/dashboard" className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 ">
                    Parcel
                </NavLink>
              
              </li>          
             
              
           
          </ul>
          <div onClick={() => {
              toggleNavbar();
            }} className="flex flex-col sm:flex-row sm:items-center gap-4  lg:min-w-max mt-10 lg:mt-0">
            <NavLink
              to="/contact"
              className="px-6 py-3 duration-300 ease-linear flex justify-center w-full sm:w-auto border bg-blue-400/20 border-blue-600 text-white bg-blue-700 rounded-xl"
            >
              Log Out
            </NavLink>
            
          </div>
        </div>
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => {
              toggleNavbar();
            }}
            className="outline-none border-l border-l-purple-100  pl-3 relative py-3"
          >
            <span className="sr-only">Toggle navbar</span>
            <span
              aria-hidden="true"
              className={`
                            flex h-0.5 w-6 rounded bg-gray-800 transition duration-300
                            ${
                              openNavbar
                                ? "rotate-45 translate-y-[0.33rem]"
                                : ""
                            }
                        `}
            />
            <span
              aria-hidden="true"
              className={`
                            flex mt-2 h-0.5 w-6 rounded bg-gray-800  transition duration-300
                            ${
                              openNavbar
                                ? "-rotate-45 -translate-y-[0.33rem]"
                                : ""
                            }
                        `}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;