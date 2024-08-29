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
                className='bg-gradient-to-t from-indigo-400 to-purple-400  rounded-[5px] py-2 px-3 font-semibold hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl transition-colors duration-500 ease-in-out '
              >
                  Logout
             </button>

         ):(
                <button 
                    onClick={handleRegistartion}
                    className='bg-gradient-to-t from-indigo-400 to-purple-400  rounded-[5px] py-2 px-3 font-semibold hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl  '
                    >
                   Sign up
                </button>
         )}
    </div>
  )
}

export default AuthButton
