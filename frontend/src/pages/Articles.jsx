import React from 'react'
import { Outlet } from 'react-router-dom'
import BannerComponents from '../components/BannerComponents'
import BlogPage from '../components/BlogPage'
import { useState } from 'react'


const Articles = () => {

  const title=' Welcome to Our Blog'


  return (
    <>
        <BannerComponents children={title}/>

        {/* all blogs container */}
          <div className='max-w-7xl mx-auto'>
                <BlogPage/>
          </div> 
          <Outlet/>
    </>
  )
}

export default Articles