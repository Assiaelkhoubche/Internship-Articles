import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarDashboard from '../components/SidebarDashboard'

const Dashboard = () => {

  return (
    <div className=' flex gap-3'>


      {/* Side bar */}
      <SidebarDashboard/>

      <div className='ml-72 flex-1 p-6'>

         <Outlet/>

      </div>
     


    </div>
  )
}

export default Dashboard
