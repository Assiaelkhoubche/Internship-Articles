import React, { createContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useState } from 'react';
import { ACCESS_TOKEN } from '../constants/constant';
import { jwtDecode } from 'jwt-decode';
import { FiMoreVertical } from "react-icons/fi";
import { useContext } from 'react';
import { SidebarContext } from '../pages/Dashboard';




const SidebarManager = ({children}) => {
    
    const [user, setUser]=useState({});
    const {expanded, setExpanded}= useContext(SidebarContext);


    useEffect(()=>{
        getInformationUser();
    },[])
    


    ///////////////////////////////////
    useEffect(()=>{
        console.log('user=>>>>>>>',user)
    },[user])
    ///////////////////////////////////////



    const getInformationUser=async ()=>{
        
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(token){

            const decodedToken=jwtDecode(token);
            console.log('ecodddddddddd', decodedToken);
            setUser({
                firstName: decodedToken.first_name,
                lastName: decodedToken.last_name,
                email: decodedToken.email,
                groups: decodedToken.groups,
              });
           

        }
        
        

    }

    return (
    
        <aside className={`h-screen overflow-hidden transition-all  ${expanded?'w-72':'w-20'}`}>
            <nav className='h-full flex flex-col bg-white border-r shadow-xl '>
               
                <div className='p-4 pb-2 flex justify-between items-center'>
                   
                    <Link to='/'>

                        <img src="https://img.logoipsum.com/243.svg" alt="logo" 
                             className={`overflow-hidden transition-all ${expanded ?'w-32':'w-0'}`}
                        />
                        
                    </Link>
                     
                    <button onClick={()=>setExpanded(curr=>!curr)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 text-xl'>

                       {expanded ?<LuChevronFirst/>: <LuChevronLast/>}

                    </button>

                
                </div>

                
                    <ul className='flex-1 px-3 relative'>
                        {children}
                    </ul>
                

                 <div className='border-t flex p-3'>

                       {/* <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" 
                            alt="avatar" 
                            className='w-10 h-10 rounded-md'
                       /> */}

                       <div className='w-10 h-10 rounded-md bg-n-5 flex justify-center items-center'>
                            <h1 className='text-n-6 font-bold '>{user.firstName ?user.firstName.slice(0,1).toUpperCase() : ''}{user.lastName ?user.lastName.slice(0,1).toUpperCase() : ''} </h1>
                       </div>

                       <div className={`flex justify-between  items-center overflow-hidden transition-all ${expanded ?'w-52 ml-3':'w-0'}`}>
                              
                              <div className='leading-4'>
                                  <h4 className='font-bold'>
                                      {user.firstName} {user.lastName}
                                  </h4>
                                  <span className='text-xs text-gray-600'>
                                     {user.email} 
                                  </span>
                              </div>

                              <FiMoreVertical size={20} />

                       </div>

                 </div>
            </nav>
        </aside>
   
  )
}

export default SidebarManager
