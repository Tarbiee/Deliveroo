
function Footer() {
  return (
    <footer
 
     >
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <h1 className=" text-blue-500 font-medium">
                <img className="w-auto h-7" src="" alt="logo" />Deliveroo
              </h1>

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
