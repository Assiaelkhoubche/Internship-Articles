import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarDashboard from '../components/SidebarDashboard'
import { createContext, useState } from 'react';
import SearchBar from '../components/SearchBar';

export const SidebarContext= createContext();


const Dashboard = () => {
   
  const [expanded, setExpanded]=useState(true);
  const location=useLocation();
  

  return (
    <div className=' flex gap-3'>


      <SidebarContext.Provider value={{expanded, setExpanded}}>

        {/* Side bar */} 
           <SidebarDashboard/>
          
       

        <div className={expanded?'ml-72 mr-16 flex-1 p-6':'ml-24 mr-16 flex-1 p-6'}>
         
          <Outlet/>
        </div>

      </SidebarContext.Provider>
     


    </div>
  )
}

export default Dashboard
