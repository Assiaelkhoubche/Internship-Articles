import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BlogPage from '../components/BlogPage'


const Articles = () => {


  const location=useLocation()
  const isArticleList= location.pathname==='/articles'|| location.pathname==='/dashboard/listArticles'
  
  return (
    <>
      

        {/* all blogs container */}
          <div className='max-w-7xl mx-auto'>
               {isArticleList? <BlogPage/>: <Outlet/>}
          </div> 
        
    </>
  )
}

export default Articles