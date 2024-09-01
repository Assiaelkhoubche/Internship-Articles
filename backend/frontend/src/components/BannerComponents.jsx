import React from 'react'

const BannerComponents = ({children}) => {

  return (

    <div className='py-40 bg-black text-center text-white '>
        <div>
           <h1 className='h1'>{children}</h1>
        </div>
    </div>

  )
}

export default BannerComponents
