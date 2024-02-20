import React from 'react'

function CreateOrder() {
  return (
   <section>
    <div className="m-10 max-w-sm">
  <label htmlFor="credit-card" className="mb-2 block text-sm font-medium">Parcel name</label>
  <div className="relative">
    <input type="text" id="parcel-name" name="parcel-name" className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Documents" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
      {/* <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
      </svg> */}
    </div>
  </div>
</div>

<div className="m-10 max-w-sm">
  <label htmlFor="price" className="mb-2 block text-sm font-medium">Receiver's Phone No.</label>
  <div className="relative">
    <input type="text" id="phone" name="phone" className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" />
    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
      <span className="text-gray-500"></span>
    </div>
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
    </div>
  </div>
</div>

<div className="m-10 max-w-sm">
  <label htmlFor="price" className="mb-2 block text-sm font-medium">Receiver's Phone No.</label>
  <div className="relative">
    <input type="text" id="phone" name="phone" className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" />
    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
      <span className="text-gray-500"></span>
    </div>
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
    </div>
  </div>
</div>

<div className="m-10 max-w-sm">
  <label htmlFor="price" className="mb-2 block text-sm font-medium">Receiver's Phone No.</label>
  <div className="relative">
    <input type="text" id="phone" name="phone" className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" />
    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
      <span className="text-gray-500"></span>
    </div>
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
    </div>
  </div>
</div>

<div className="m-10 max-w-sm">
  <label htmlFor="price" className="mb-2 block text-sm font-medium">Receiver's Phone No.</label>
  <div className="relative">
    <input type="text" id="phone" name="phone" className="block w-full rounded-md border border-gray-200 py-3 px-4 pl-9 pr-16 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" />
    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
      <span className="text-gray-500"></span>
    </div>
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
    </div>
  </div>
</div>

<button className=' bg-blue-500 p-5  text-white rounded-md ml-32'> Place Order Delivery</button>



   </section>
  )}

export default CreateOrder 