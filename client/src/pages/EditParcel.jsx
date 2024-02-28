import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditParcel({ accessToken }) {
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [distance, setDistance] = useState(0);
  const [geocodesFetched, setGeocodesFetched] = useState(false);
  const [parcelOrder, setParcelOrder] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://deliveroo-2.onrender.com/users/parcel_order/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((data) => setDestination(data.destination));
  }, [id, accessToken]);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`https://deliveroo-2.onrender.com/users/edit_parcel/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ destination: destination }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success(`$👍 Destination changed to ${destination} !`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "blue-toast",
          });
          //set new destination
          navigate("/parcel_orders");
        }
      })
      .catch((err) => console.log(err));
  };

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
  }, [accessToken]);

  // fetching location

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
    <div className=" mb-20">
    <Navbar/>
    <div className=" mt-40 flex justify-center h-[700px] items-stretch w-full pb-20 ">
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Change Parcel Destination</Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="New Destination"
                style={{ width: "500px" }}
              />
            </Form.Group>
          </Form>
          {status === "Delivered" ? (
            <p>You Cannot Edit the Destination</p>
          ) : (
            <Button onClick={handleEdit} style={{ color: "black" }}>
              Edit Destination
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
