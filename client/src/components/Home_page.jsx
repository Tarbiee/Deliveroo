import React, { useEffect, useState } from 'react';

export default function Home_page({ accessToken }) {
  const [parcelOrder, setParcelOrder] = useState([]);

  useEffect(() => {
    fetch("/users/parcel_orders",{
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then((data) => setParcelOrder(data))
  },[accessToken])


  return (
    <div>
      <h1>Home_page</h1>
     {parcelOrder.map((parcel) => (
      <div key={parcel.id}>
        <p>{parcel.destination}</p>
      </div>

     ))}
    </div>
  )
}