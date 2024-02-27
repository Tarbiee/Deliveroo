import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer
 
     >
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
            <div className="flex items-center min-w-max relative">
          <NavLink to="/" className="font-semibold flex items-center gap-x-2">
            <span className="">
              <span className="mr-1 text-white inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">
                D
              </span>
              <span className="text-xl">eliveroo</span>
            </span>
          </NavLink>
        </div>

              <p className="max-w-sm mt-2 text-gray-900 ">
                The most trusted Courier company in your area.
              </p>

             
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
             

              <div>
                <h3 className="text-black text-xl font-bold  ">
                  Services
                </h3>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 hover:underline"
                >
                  Corporate goods
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600 hover:underline"
                >
                  Courier Services
                </a>
                <a
                  href="#"
                  className="block mt-2 text-sm text-gray-600  hover:underline"
                >
                  Documents
                </a>
              </div>

              <div>
                <h3 className="text-black text-xl font-bold  ">
                  Contact
                </h3>
                <span className="block mt-2 text-sm text-gray-600  hover:underline">
                  +254 7654 8965
                </span>
                <span className="block mt-2 text-sm text-gray-600 hover:underline">
                  deliveroo@email.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

        <div>
          <p className="text-center text-gray-500 ">
            © Deliveroo 2024 - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
