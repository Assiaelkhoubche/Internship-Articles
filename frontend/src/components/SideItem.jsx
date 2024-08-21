import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from './SidebarManager';
import Tooltip from './Tooltip';

const SideItem = ({icon, text, active, alert}) => {

    const {expanded}=useContext(SidebarContext);
    const [tooltipPos, setTooltipPos]=useState(null);



    const handleMouseEnter = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();

        setTooltipPos({
            top: rect.top,
            left:rect.right+20
        })
    }

    const handleMouseLeave = ()=>{
        setTooltipPos(null);
    }


    useEffect(()=>{
            console.log('expanded', expanded)
    },[expanded]);

  return (
   <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
      ${active ?'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
               :'hover:bg-indigo-50 text-gray-600 group'} `}
       onMouseEnter={handleMouseEnter}   
       onMouseLeave={handleMouseLeave}         
    
   >

      {icon}

      <span className={`overflow-hidden transition-all ${expanded ?'w-52 ml-3':'w-0'}`}>
        {text}
      </span>

      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ?'':'top-2'}`} />
      )}

     {/* Tooltip */}

     {!expanded && tooltipPos && (
        <Tooltip text={text} positionStyle={tooltipPos} />
     )}

   </li>
  )
}

export default SideItem
