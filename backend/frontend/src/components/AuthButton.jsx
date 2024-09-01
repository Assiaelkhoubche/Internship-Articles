import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Register from '../pages/Register';
import { useAuth } from '../hooks/AuthProvider';

const AuthButton = () => {
   
 const {isAuthenticated,setIsAuthenticated}=useAuth(); 
 const navigate=useNavigate(); 
 
 const handleLogout = ()=>{
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');

 }

  const handleRegistartion=()=>{
       localStorage.clear();
       setIsAuthenticated(false);
       navigate('/register');
  }
  return (
    <div className='text-white font-medium'>
         {isAuthenticated ? (
             
             <button 
                onClick={handleLogout}
                className='bg-n-1 px-3 pb-1  rounded-[5px] hover:bg-n-2 hover:text-n-1 duration-500 ease-in '
              >
                  Logout
             </button>

         ):(
                <button 
                    onClick={handleRegistartion}
                    className='bg-n-1 px-3 pb-1  rounded-[5px] hover:bg-n-2 hover:text-n-1 duration-500 ease-in '
                 >
                   Sign up
                </button>
         )}
    </div>
  )
}

export default AuthButton
