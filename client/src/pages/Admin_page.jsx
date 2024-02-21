import React,{useEffect, useState} from 'react'

export default function Admin_page({accessToken}) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/users/all",{
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then((data) => setUsers(data))
  },[accessToken])


  return (
    <div>
      <h1>Admin </h1>
     {users && users.map((user) => (
      <div key={user.id}>
        <p>{user.username}</p>
      </div>

     ))}
    </div>
  )
}
