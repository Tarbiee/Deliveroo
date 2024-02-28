import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoCallOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import axios from "axios";
import Navbar from "../components/NavBar";

function OrderDetails({ accessToken }) {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const steps = ["Preparing", "In transit", "Delivered"];
  // const position = [51.505, -0.09];
  const [parcelOrder, setParcelOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(0);
  const [geocodesFetched, setGeocodesFetched] = useState(false);
  const fetchStatus = async () => {
    try {
      const response = await fetch(
        `https://deliveroo-2.onrender.com/users/parcel_status/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setStatus(data.status);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStatus();

    const index = steps.indexOf(status);
    if (index !== -1) {
      setCurrentStep(index + 1);
    } else if (index === "delivered") {
      setComplete(true);
    }
  }, []);

  const orderDetail = async () => {
    try {
      const response = await fetch(
        `https://deliveroo-2.onrender.com/users/parcel_order/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setParcelOrder(data);
      console.log(data);
      setGeocodesFetched(true);
      await getDistance();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const lat1 = parcelOrder.latitude_pick_up_location;
  const lon1 = parcelOrder.longitude_pick_up_location;
  const lat2 = parcelOrder.latitude_destination;
  const lon2 = parcelOrder.longitude_destination;

  const getDistance = async () => {
    const options = {
      method: "GET",
      url: "https://geocodeapi.p.rapidapi.com/GetDistance",
      params: {
        lat1: `${lat1}`,
        lon1: `${lon1}`,
        lat2: `${lat2}`,
        lon2: `${lon2}`,
      },
      headers: {
        "X-RapidAPI-Key": "8535e6324bmsh9b09f29b4c1e1efp1de9efjsn3dab3bfce019",
        "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setDistance(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    orderDetail();
  }, [geocodesFetched]);

  const distBtwPandD = Math.round(distance.DistanceInKm);

  if (
    !parcelOrder.latitude_pick_up_location ||
    !parcelOrder.longitude_pick_up_location ||
    !parcelOrder.latitude_destination ||
    !parcelOrder.longitude_destination
  ) {
    return null;
  }

  return (
    <section className=" w-full">
      <Navbar/>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="justify-center flex-1 max-w-6xl py-20 mx-auto bg-white   rounded-2xl">
          <div className="flex flex-wrap justify-center px-20 pb-12 mb-16 text-left border-b border-gray-200 lg:justify-between ">
            <div className="px-4 mb-6 mx-auto lg:mb-0">
              <h2 className="mb-1 text-lg font-semibold tracking-wide ">
                Your parcel status
              </h2>
              <p className="text-sm text-center text-gray-500 ">
                placed on {parcelOrder.created_at}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center  justify-center">
            {steps?.map((step, i) => (
              <div
                key={i}
                className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0"
              >
                <div className="absolute hidden top-5 lg:block left-1/2 ">
                  <span
                    className={`mb-3 border-b-2 border-r   w-72 md:block left-1/2  inset-px ${
                      currentStep === i + 1 && "border-blue-600"
                    } ${i + 1 < currentStep || complete}`}
                  ></span>
                </div>
                <div className="relative text-center ">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-gray-300   ${
                      currentStep === i + 1 && "bg-blue-600"
                    } ${
                      i + 1 < currentStep || complete
                    } rounded-full shadow-md bg-blue-600 `}
                  >
                    {i + 1 < currentStep || complete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 bi bi-check-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <h2 className="text-lg font-medium ">{step}</h2>
                </div>
              </div>
            ))}

            {/* {steps?.map((step, i) => (
  <div key={i} className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
    <div className="absolute hidden top-5 lg:block left-1/2">
      <span
        className={`mb-3 border-b-2 border-r w-72 md:block left-1/2 inset-px ${
          currentStep === i + 1 && "border-blue-600"
        }`}
      ></span>
    </div>
    <div className="relative text-center">
      <span
        className={`inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 ${
          currentStep === i + 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        {i + 1 < currentStep || complete ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-6 h-6 bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        ) : (
          i + 1
        )}
      </span>
      <h2 className="text-lg font-medium">{step}</h2>
    </div>
  </div>
))} */}
          </div>
        </div>

        <div className="flex jnpm install react-leafletustify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl mt-5  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Parcel ID #{parcelOrder.id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {parcelOrder.created_at}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
                Parcel Order Details
              </p>
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src="https://t4.ftcdn.net/jpg/00/36/40/83/360_F_36408316_nBGJalLivh6LE3MfRkON8KCwoYGCtZLX.jpg"
                    alt="dress"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                      {" "}
                      {parcelOrder.name_of_parcel}{" "}
                    </h3>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full ">
                    <p className="text-base  xl:text-lg leading-6">
                      Weight:{" "}
                      <span className="text-blue-500">
                        {" "}
                        {parcelOrder.weight_of_parcel}{" "}
                      </span>
                    </p>
                    <p className="text-base  xl:text-lg leading-6 text-gray-800">
                      Pick Up Location:
                      <span className="text-blue-500">
                        {" "}
                        {parcelOrder.pickup_location}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center h-[700px] items-stretch w-full pb-20 ">
              <MapContainer
                style={{ width: "100%" }}
                center={[
                  parcelOrder.latitude_pick_up_location,
                  parcelOrder.longitude_pick_up_location,
                ]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    parcelOrder.latitude_pick_up_location,
                    parcelOrder.longitude_pick_up_location,
                  ]}
                >
                  <Popup>Pick Up Location: {parcelOrder.pickup_location}</Popup>
                </Marker>

                <Marker
                  position={[
                    parcelOrder.latitude_destination,
                    parcelOrder.longitude_destination,
                  ]}
                >
                  <Popup>Destination: {parcelOrder.destination}</Popup>
                </Marker>
                <Polyline
                  positions={[
                    [
                      parcelOrder.latitude_pick_up_location,
                      parcelOrder.longitude_pick_up_location,
                    ],
                    [
                      parcelOrder.latitude_destination,
                      parcelOrder.longitude_destination,
                    ],
                  ]}
                  color="blue"
                />
              </MapContainer>
            </div>
          </div>
          <div className="bg-gray-50 xl:h-[400px]  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl  font-semibold leading-5 text-gray-800">
              Parcel to:
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base  font-semibold leading-4 text-left text-gray-800">
                      {parcelOrder.receivers_name}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <IoCallOutline className="  text-xl" />
                  <p className="cursor-pointer text-sm leading-5 ">
                    {parcelOrder.receivers_phone}
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-[180px] items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                      Destination Address
                    </p>
                    <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {parcelOrder.destination}
                    </p>
                  </div>
                </div>
                <div className=" w-full justify-center items-center md:justify-start md:items-start">
                  {geocodesFetched && distance.DistanceInKm ? (
                    <div className=" flex  space-x-3">
                      <h1 className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                        {" "}
                        Delivery Distance:
                      </h1>
                      <p className="text-base font-semibold flex   text-center md:text-left text-gray-800">
                        <p className=" text-blue-500">{distBtwPandD}</p>Km
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Distance: Loading...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </section>
  );
}

export default OrderDetails;
