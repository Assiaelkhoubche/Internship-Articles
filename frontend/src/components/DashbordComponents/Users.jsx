import React, { useEffect, useState } from 'react'
import api from '../../api'
import TableUsers from './TableUsers';
const Users = () => {
   
  const [users, setUsers]=useState([]);

  useEffect(()=>{
    
     getUsers();

  },[]);

   const getUsers=async () =>{
      try{

          const res= await api.get('/api/users/');
          setUsers(res.data);
          console.log('Users Dashboard', res.data);


      }catch(err){
        console.error('No response for get Users', err);
      }
   }


  return (
    <div className='py-3 w-full'>
        <TableUsers users={users}/>
    </div>
  )
}

export default Users
