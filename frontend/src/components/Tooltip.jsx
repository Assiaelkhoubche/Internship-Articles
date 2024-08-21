import React from 'react'
import { createPortal } from 'react-dom'

const Tooltip = ({text, positionStyle}) => {

  return createPortal (

    <div className={`absolute z-50 rounded-md px-2 py-1 bg-indigo-100 text-indigo-800 text-sm opacity-100 
            `}
        
            style={positionStyle}
    >

       {text}

    </div>,

    document.body
  );
};

export default Tooltip
