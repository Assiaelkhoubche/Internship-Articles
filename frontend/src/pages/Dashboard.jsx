import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarDashboard from '../components/SidebarDashboard'
import { createContext, useState } from 'react';
import SearchBar from '../components/SearchBar';

export const SidebarContext= createContext();


const Dashboard = () => {
   
  const [expanded, setExpanded]=useState(false);
  const location=useLocation();
  

  return (
    <div className=' flex gap-3'>


      <SidebarContext.Provider value={{expanded, setExpanded}}>

        {/* Side bar */} 
           <SidebarDashboard/>
          
       

        <div className={`${expanded?'md:ml-72  ':'md:ml-24 ml-20 '} flex-1 p-6`}>
         
          <Outlet/>
        </div>

      </SidebarContext.Provider>
     


    </div>
  )
}

export default Dashboard
