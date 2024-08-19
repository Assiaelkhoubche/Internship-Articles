import React from 'react'
import {Link} from 'react-router-dom'

// icons
import { FaArrowRight } from "react-icons/fa";



const Banner = () => {
  return (
    <div className='px-4 py-32 bg-black  '>
       <div className='text-n-2 text-center'>
           <h1 className='h1'>Welcome to Our Blogs</h1>
           <p className='text-n-4 lg:w-3/5 mx-auto mb-5 font-primary'>
               Start your blog today and join the community of writers and readers who are passionate about sharing their stories and ideas. we offer everything you need to get started from
               helpful tips and tutorials.
           </p>
           <div className='hover:text-n-3 transition-colors duration-500'>
                <Link to='/'
                    className='font-normal inline-flex items-center py-1 '
                >
                    Learn more  <FaArrowRight className='mt-1 ml-2'/>
                </Link>
                

           </div>
       </div>
    </div>
  )
}

export default Banner
