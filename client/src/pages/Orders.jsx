import React,{useEffect, useState} from 'react'
import { Button, Table } from 'react-bootstrap';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Orders({accessToken}) {
  const [parcelOrders, setParcelOrders] = useState([])

  useEffect(() => {
    fetch("http://localhost:5555/users/parcel_orders",{
      headers:{Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then((data) => setParcelOrders(data))
  },[accessToken])


  return (
    <div>
        <h1 className="text-2xl font-black text-gray-800">Hello there!</h1>
      <p className="mb-6 text-gray-600">Here's are your orders.</p>
      <Table responsive style={{ width: '1400px', height: '400px', marginLeft:"200px"}}>
            <thead>
              <tr>
                <th>ParcelOrder Name</th>
                <th>View Parcel Details</th>
                <th>Edit Destination</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {parcelOrders.map((parcelOrder) => (
                <tr key={parcelOrder.id}>
                  <td>{parcelOrder.name_of_parcel}</td>
                  <td>
                    <Button style={{color:"blue"}}>View Parcel</Button>
                  </td>
                  <td>
                      <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: '#40A2D8' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    </div>
  )
}

export default Orders