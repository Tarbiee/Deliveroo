import React from "react";

function ContactUs() {
  return (
    <section style={{backgroundImage: "url('/Background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }} >
    <div className="min-h-screen bg-blue-300/10  lg:flex mt-10">
      <div className="flex flex-col justify-center w-full p-8 lg:bg-blue-300/10  lg:px-12 xl:px-32 lg:w-1/2">
      <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img className="lg:w-[400px] lg:h-[400px] lg:max-w-3xl" src="contact.png" alt="" />
        </div>
        <h1 className="text-xl font-semibold text-blue-500 capitalize lg:text-3xl">
          REQUEST A CALLBACK
        </h1>

        <p className="mt-4 text:xl text-black lg:text-3xl  font-bold">
          We will contact in the <br/> shortest time.
        </p>

        <div className="mt-1 md:mt-8">
          <h3 className="font-medium text-lg lg:text-2xl text-slate-600/80  ">
          Monday to Friday, 9am-5pm.          </h3>

        
        </div>
      </div>

      <div className="flex flex-col justify-center w-full p-8 pt-0 lg:w-1/2 lg:px-12 xl:px-24 bg-gray-100 ">
        <form>
          <div className="-mx-2 md:items-center md:flex">
            <div className="flex-1 px-2">
              <label className="block mb-2 text-sm text-gray-600 ">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="flex-1 px-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email address
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-gray-600 ">Message</label>
            <textarea
              className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Message"
            ></textarea>
          </div>

          <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            get in touch
          </button>
        </form>
      </div>
      </div>
    </section>
  );
}

export default ContactUs;
