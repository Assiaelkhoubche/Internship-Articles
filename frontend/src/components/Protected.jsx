import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({children}) => {
    const [user, setUser]=useState(true);


  return user?children:<Navigate to='/register'/>
}

export default Protected
