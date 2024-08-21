import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarDashboard from '../components/SidebarDashboard'
import { createContext, useState } from 'react';

export const SidebarContext= createContext();

const Dashboard = () => {
   
  const [expanded, setExpanded]=useState(true);

  return (
    <div className=' flex gap-3'>


      <SidebarContext.Provider value={{expanded, setExpanded}}>

        {/* Side bar */}
        <SidebarDashboard/>

        <div className={expanded?'ml-72 flex-1 p-6':'ml-24 flex-1 p-6'}>
           <Outlet/>
        </div>

      </SidebarContext.Provider>
     


    </div>
  )
}

export default Dashboard
