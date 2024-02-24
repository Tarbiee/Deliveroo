import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { IoCallOutline } from "react-icons/io5";
import Footer from "../components/Footer";

function OrderDetails() {

  const {id} = useParams()




  const orderDetail = async ({accessToken}) => {
    try {
      const response = await fetch(`http://localhost:5555/users/parcel_order/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json()
      console.log(data)
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    orderDetail()
  }, [])


  return (
    <section className=" w-full">
       
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
<div className="justify-center flex-1 max-w-6xl py-20 mx-auto bg-white   rounded-2xl">
            <div
                className="flex flex-wrap justify-center px-20 pb-12 mb-16 text-left border-b border-gray-200 lg:justify-between ">
                <div className="px-4 mb-6 mx-auto lg:mb-0">
                    <h2 className="mb-1 text-lg font-semibold tracking-wide ">
                        Your parcel status
                    </h2>
                    <p className="text-sm text-center text-gray-500 ">
                        placed on 10th feb, 2024
                    </p>
                </div>
               
            </div>
            <div className="flex flex-wrap items-center  justify-center">
                <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                    <div className="absolute hidden top-5 lg:block left-1/2 ">
                        <span
                            className="mb-3 border-b-2 border-r border-blue-600 w-72 md:block left-1/2  inset-px">
                        </span>
                    </div>
                    <div className="relative text-center">
                        <span
                            className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="w-6 h-6 bi bi-check-lg" viewBox="0 0 16 16">
                                <path
                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </span>
                        <h2 className="text-lg font-medium ">Preparing</h2>
                    </div>
                </div>
                <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                    <div className="absolute hidden top-5 lg:block left-1/2 ">
                        <span
                            className="mb-3 border-b-2 border-r border-gray-300 w-72 md:block left-1/2  inset-px">
                        </span>
                    </div>
                    <div className="relative text-center">
                        <span
                            className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md ">
                            2
                        </span>
                        <h2 className="text-lg font-medium ">Shipping</h2>
                    </div>
                </div>
                <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 md:mb-0">
                    <div className="absolute hidden top-5 lg:block left-1/2 ">
                       
                    </div>
                    <div className="relative text-center">
                        <span
                            className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-700 bg-gray-200 rounded-full shadow-md ">
                            3
                        </span>
                        <h2 className="text-lg font-medium ">Delivered</h2>
                    </div>
                </div>
               
            </div>
        </div>

  <div className="flex jnpm install react-leafletustify-start item-start space-y-2 flex-col">
    <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Parcel ID #1</h1>
    <p className="text-base font-medium leading-6 text-gray-600">21st Mart 2024 at 10:34 PM</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Parcel Order Details</p>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src="https://t4.ftcdn.net/jpg/00/36/40/83/360_F_36408316_nBGJalLivh6LE3MfRkON8KCwoYGCtZLX.jpg" alt="dress" />
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800"> Mac Book PC </h3>
             
            </div>
            <div className="flex justify-between space-x-8 items-start w-full ">
              <p className="text-base  xl:text-lg leading-6">Weight: <span className="text-blue-500"> 900g</span></p>
              <p className="text-base  xl:text-lg leading-6 text-gray-800">Pick Up Location:<span className="text-blue-500"> Thika</span></p>
            </div>
          </div>
        </div>
      
      </div>
      <div className="flex justify-center h-[700px] items-stretch w-full pb-20 ">
      <MapContainer  style={{  width: "100%" }} center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  
      </div>
    </div>
    <div className="bg-gray-50 xl:h-[400px]  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl  font-semibold leading-5 text-gray-800">Parcel to:</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base  font-semibold leading-4 text-left text-gray-800"> Kimani John</p>
            </div>
          </div>

          <div className="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <IoCallOutline className="  text-xl"/>
            <p className="cursor-pointer text-sm leading-5 ">0712345678</p>
          </div>
        </div>
        <div className="flex justify-between xl:h-[180px] items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Nanyuki </p>
            </div>
        
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start">
            <button className=" md:mt-0  rounded-md  py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border-2 border-blue-600/50   w-96 2xl:w-full text-base font-medium leading-4 text-blue-500">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div>  
</div>
<Footer/>
</section>
  )
}

export default OrderDetails