import { useState, useEffect } from "react";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  API_SECRETKEY,
} from "../../data";
import axios from "axios";
import { toast } from "react-toastify";

function CreateOrder({accessToken}) {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_of_parcel: "",
    receivers_name: "",
    receivers_phone: "",
    pickup_location: "",
    destination: "",
    weight_of_parcel: "",
    image_of_parcel: "",
    longitude_pick_up_location: 0,
    latitude_pick_up_location: 0,
    longitude_destination: 0,
    latitude_destination: 0,
  });

  const {
    name_of_parcel,
    receivers_phone,
    receivers_name,
    pickup_location,
    destination,
    weight_of_parcel,
    image_of_parcel,
    longitude_pick_up_location,
    latitude_pick_up_location,
    latitude_destination,
    longitude_destination,
  } = formData;

  const postOrder = async (newOrder) => {
    try {
      const imageUrl = await uploadImage(newOrder.image_of_parcel);
      newOrder.image_of_parcel = imageUrl;
      const response = await fetch("http://localhost:5555/users/add_parcel_order", {
        method: "POST",
        
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      console.log(response);
      toast.success("Order placed successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  const uploadImage = async (image) => {
    try {
      if (!image) {
        throw new Error("No image provided");
      }

      const orderImg = new FormData();
      orderImg.append("file", image);
      orderImg.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        orderImg
      );

      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const onSubmit = async (e) => {
    console.log("button clicked");
    e.preventDefault();

    let destinationGeolocation = {};
    let destinationAddress;
    let pickupGeolocation = {};
    let pickupAddress;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=${destination}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": `${API_SECRETKEY}`,
          },
        }
      );

      const data = await response.json();
      destinationGeolocation.lat = data[0]?.lat ?? 0;
      destinationGeolocation.lon = data[0]?.lon ?? 0;
      destinationAddress = data === null ? undefined : data[0]?.display_name;

      if (destinationAddress === undefined || destinationAddress === null) {
        toast.error("Invalid destination address");
        setLoading(false);
        return;
      }

      const response2 = await fetch(
        `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=${pickup_location}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": `${API_SECRETKEY}`,
          },
        }
      );

      const data2 = await response2.json();
      pickupGeolocation.lat = data2[0]?.lat ?? 0;
      pickupGeolocation.lon = data2[0]?.lon ?? 0;
      pickupAddress = data2 === null ? undefined : data2[0]?.display_name;

      if (pickupAddress === undefined || pickupAddress === null) {
        toast.error("Invalid pickup address");
        setLoading(false);
        return;
      }
    } else {
      destinationGeolocation.lat = latitude_destination;
      destinationGeolocation.lon = longitude_destination;
      pickupGeolocation.lat = latitude_pick_up_location;
      pickupGeolocation.lon = longitude_pick_up_location;
      destinationAddress = destination;
      pickupAddress = pickup_location;
    }

    const newOrder = {
      ...formData,
      latitude_destination: destinationGeolocation.lat,
      longitude_destination: destinationGeolocation.lon,
      latitude_pick_up_location: pickupGeolocation.lat,
      longitude_pick_up_location: pickupGeolocation.lon,
    };

    try {
      setLoading(true);
      await postOrder(newOrder);
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
      setLoading(false);
    }
  };

  const onMutate = (e) => {
    if (e.target.name === "image_of_parcel") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="m-10 max-w-sm">
          <label className="mb-2 block text-sm font-medium">Parcel name</label>
          <div className="relative">
            <input
              onChange={onMutate}
              required
              value={name_of_parcel}
              type="text"
              id="name_of_parcel"
              name="name_of_parcel"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Documents"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label className="mb-2 block text-sm font-medium">
            Receiver's Name.
          </label>
          <div className="relative">
            <input
              value={receivers_name}
              required
              onChange={onMutate}
              type="text"
              id="receivers_name"
              name="receivers_name"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="John Doe"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <span className="text-gray-500"></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Receiver's Phone
          </label>
          <div className="relative">
            <input
              required
              value={receivers_phone}
              onChange={onMutate}
              type="text"
              id="receivers_phone"
              name="receivers_phone"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0712345678"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <span className="text-gray-500"></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label className="mb-2 block text-sm font-medium">
            {" "}
            Pick Up Location
          </label>
          <div className="relative">
            <input
              required
              value={pickup_location}
              onChange={onMutate}
              type="text"
              id="pickup_location"
              name="pickup_location"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Thika"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <span className="text-gray-500"></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label className="mb-2 block text-sm font-medium">
            Parcel Destination
          </label>
          <div className="relative">
            <input
              required
              value={destination}
              onChange={onMutate}
              type="text"
              id="destination"
              name="destination"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nanyuki"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <span className="text-gray-500"></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label className="mb-2 block text-sm font-medium">
            Weight of the Parcel
          </label>
          <div className="relative">
            <input
              required
              value={weight_of_parcel}
              onChange={onMutate}
              type="text"
              id="weight_of_parcel"
              name="weight_of_parcel"
              className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="900g"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
              <span className="text-gray-500"></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4"></div>
          </div>
        </div>

        <div className="m-10 max-w-sm">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            Upload Image
          </label>
          <input
            required
            max="1"
            name="image_of_parcel"
            onChange={onMutate}
            className="block w-[400px] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="image_of_parcel"
            accept=".jpg,.png,.jpeg"
            type="file"
          />
          <p className="mt-1 mb-2 text-sm text-gray-500 " id="file_input_help">
          jpeg, PNG or JPG (MAX. 800x400px).
          </p>
        </div>

        {loading ? ( <button
          type="submit"
          className=" bg-blue-500 p-3   text-white rounded-md ml-32"
        >
          Placing Order...
        </button>) : (<button
          type="submit"
          className=" bg-blue-500 p-3   text-white rounded-md ml-32"
        >
          Place Order Delivery
        </button>)}
      </form>
    </section>
  );
}

export default CreateOrder;
