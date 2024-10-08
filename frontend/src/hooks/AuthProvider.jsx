import React, { createContext, useContext, useEffect, useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';

import {jwtDecode} from 'jwt-decode'
import api from '../api';


const AuthContext=createContext();

export const AuthProvider = ({children}) => {
   
   const [isAuthenticated, setIsAuthenticated]=useState(false);
   const [isManager, setIsManager]=useState(false);

   

   useEffect(()=>{
        
        auth().catch(()=>setIsAuthenticated(false));

   },[])


   const auth= async ()=>{

        const token=localStorage.getItem(ACCESS_TOKEN);

        if(!token){
            setIsAuthenticated(false);
            return;
        }

        try{
          
            const decodedToken=jwtDecode(token);
            const tokenExpiration=decodedToken.exp;
            const now=Date.now()/1000;

            if(tokenExpiration<now){
             
                await refreshToken();   

            }else{

                setIsAuthenticated(true);
               
                // console.log('token exp:',tokenExpiration<now)
                /////////////////////////////////////
                console.log('tokennn information', decodedToken );
                

                if(decodedToken.groups && decodedToken.groups.includes('userManager')){
                     setIsManager(true);
                }else{
                    setIsManager(false);
                }
            }

        }catch(err){
            console.log('error catch access token', err);
            setIsAuthenticated(false);
        }

   }
   
   const refreshToken= async ()=>{
     
     const refreshToken=localStorage.getItem(REFRESH_TOKEN);

     try{
        
        const res= await api.post('/api/token/refresh/',{refresh:refreshToken});

        if(res.status===200){

            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            setIsAuthenticated(true);

            const newAccessToken=res.data.access;
            const decodedToken=jwtDecode(newAccessToken);
            
            if(decodedToken.groups && decodedToken.groups.includes('userManager')){
                setIsManager(true);
            }else{
                setIsManager(false);
            }
                

        }else{
            setIsAuthenticated(false);
        }


     }catch(err){
        
         console.log('error refresh token',err);
         setIsAuthenticated(false);

     }
       

   }


  return (
    <AuthContext.Provider value={{isAuthenticated,isManager,setIsAuthenticated}}>
         {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);
