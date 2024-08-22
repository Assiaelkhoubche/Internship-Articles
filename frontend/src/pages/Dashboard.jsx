import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarDashboard from '../components/SidebarDashboard'
import { createContext, useState } from 'react';
import SearchBar from '../components/SearchBar';

export const SidebarContext= createContext();


const Dashboard = () => {
   
  const [expanded, setExpanded]=useState(true);
  const location=useLocation();
  const isDashboard=location.pathname==='/dashboard/listArticles'

  return (
    <div className=' flex gap-3'>


      <SidebarContext.Provider value={{expanded, setExpanded}}>

        {/* Side bar */} 
           <SidebarDashboard/>
          
       

        <div className={expanded?'ml-72 mr-16 flex-1 p-6':'ml-24 mr-16 flex-1 p-6'}>
          {isDashboard &&( <div className='m-8 mr-5 flex flex-col justify-center items-center p-6 w-full border-b shadow-lg  hover:shadow-2xl transition-shadow duration-300 rounded-2xl'>
               <SearchBar />
          </div>)}
           <Outlet/>
        </div>

      </SidebarContext.Provider>
     


    </div>
  )
}

export default Dashboard
