import React from 'react'
import SidebarManager from '../components/SidebarManager'
import { LuLayoutDashboard, LuBarChart3 } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { IoReceiptOutline, IoSettingsOutline } from "react-icons/io5";
import { GiLifeBuoy } from "react-icons/gi";
import SideItem from '../components/SideItem';
import { Link, useLocation } from 'react-router-dom';


const SidebarDashboard = () => {

    const location=useLocation()
    const active= location.pathname
  
  return (
    <div className='fixed'>
         
         <SidebarManager>
           <Link to='/dashboard'>
             <SideItem icon={<LuLayoutDashboard size={20}/>} text='Dashboard' alert  active={active==='/dashboard'}/>
           </Link>

           <Link to='/dashboard/listArticles'>
               <SideItem icon={<LuBarChart3 size={20}/>} text = 'Articles'  active={active==='/dashboard/listArticles'} />
           </Link>

           <Link to='/dashboard/users'>
               <SideItem icon={< FaRegUserCircle size={20}/>} text='Users' active={active==='/dashboard/users'} />
           </Link>

           <SideItem icon={<BsBoxes size={20}/>} text='Inventory'/>
           <SideItem icon={<GoPackage size={20}/>} text='Orders' alert/>
           <SideItem icon={<IoReceiptOutline size={20}/>} text='Billings'/>
           <hr className='my-3' />
           <SideItem icon={<IoSettingsOutline size={20}/>} text='Settings'/>
           <SideItem icon={<GiLifeBuoy size={20}/>} text='Help'/>
      </SidebarManager>

    </div>
  )
}

export default SidebarDashboard
