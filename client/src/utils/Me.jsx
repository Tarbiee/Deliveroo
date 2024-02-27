<section>
      
       <div className="h-full overflow-hidden pl-10">
          <main
            id="dashboard-main"
            className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
          >
            <h1 className="text-2xl font-black text-blue-800">ADMIN DASHBOARD</h1>
            <p className="mb-6 text-blue-600">
              List of all the orders.
            </p>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Parcel Id</th>
          <th>Parcel Order</th>
          <th>View Order</th>
          <th>Update Status</th>
          
        </tr>
      </thead>
      <tbody>
      {parcelOrders.map((parcelOrder) => (
                <tr key={parcelOrder.id}>
                  <td>{parcelOrder.id}</td>
                  <td>{parcelOrder.name_of_parcel}</td>
                  <td>
                    <Button style={{color:"blue"}}>View Parcel</Button>
                  </td>
                  <td >
                  <Dropdown >
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "Preparing")} >Preparing</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "In transit")}>In transit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(parcelOrder.id, "Delivered")}>Delivered</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>

                </tr>
              ))}
      </tbody>
    </Table>

            
          </main>
        </div>
    </section>