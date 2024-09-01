import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import {jwtDecode} from 'jwt-decode';
import api from '../api';


export const AuthContext=createContext();

const useAuthenticated = () => {

  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const navigate=useNavigate();

 useEffect(()=>{

    auth().catch(()=>setIsAuthenticated(false));

 },[]);
  const auth=async ()=>{
    
    const token= localStorage.getItem(ACCESS_TOKEN);

    if(!token){
        setIsAuthenticated(false);
        return;
    }
    
    try{

        const decoded=jwtDecode(token);
        const tokenExpiration=decoded.exp;
        const now=Date.now();

        if(tokenExpiration<now){

            await refreshToken();
        }else{
            setIsAuthenticated(false);
        }
        

    }catch(err){
        setIsAuthenticated(false);
        console.log('error',err);
    }

  };

  const refreshToken=async ()=>{
      
    const refreshToken=localStorage.getItem(REFRESH_TOKEN);
     
    try{
     
        const res = await api.post('/api/token/refresh/',{refresh:refreshToken});

        if(res.status===200){
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }

    }catch(err){
        console.log(err);
        setIsAuthenticated(false);
    }



  }


  const handleLogout=()=>{
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  }

  const handleRegistartion=()=>{
     localStorage.clear();
     navigate('/register')
  }

  const handleLogin=()=>{
         navigate('/login')
  }

  return {isAuthenticated,setIsAuthenticated,handleLogout,handleRegistartion}
}

export default useAuthenticated
