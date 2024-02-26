import React from "react";

function Hero() {
  return (
    <div

  className="bg-blue-400/20"
  
 
    >
      
    <div 
    style={{backgroundImage: "url('/floats.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
    
     className="container px-6 py-16 mx-auto h-[600px]">
      <div className="items-center lg:flex  lg:mt-30 ">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-medium text-gray-800 ">
              A trusted provider of
              <br /> your
              <span className="text-gray-800 font-bold">courier services</span>
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              We deliver your products with care and speed. We are a trusted
            </p>

            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img className="w-[500px] h-[500px] lg:max-w-3xl" src="Illustration.svg" alt="" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hero;
