import React from 'react'
import {Link} from 'react-router-dom'
// icons
import { FaArrowRight } from "react-icons/fa";



const Banner = ({banner, heading, subheading, btn1, btn2}) => {
  return (
    
          <div className='bg-gradient-to-tl from-indigo-500 to-purple-300 rounded-xl rounded-br-[80px] md:p-9 px-4 py-9'>

              <div className=' flex flex-col md:flex-row-reverse justify-between items-center gap-10'>

                    {/* banner image */}
                      <div className=''>
                          <img src={banner} alt="banner" 
                              className='lg:h-[360px]'
                          />
                      </div>

                    
                      {/* banner content */}
                    <div className='md:w-3/5 '>

                        <h2 className='md:text-6xl tracking-normal leading-tight text-4xl font-bold  text-white mb-6'>
                            {heading}
                        </h2>
                          
                          <p className='text-n-2 text-xl mb-8 font-secondly tracking-[0.001px]'>
                             {subheading}
                          </p>

                          <div className='flex gap-5'>

                            <button className='py-2 px-8 font-secondly font-semibold text-white bg-n-3 hover:bg-purple-600 rounded-md transition-all duration-500 ease-in-out'> 
                              {btn1}
                            </button>

                            <button className='py-2 px-8 font-secondly font-semibold text-white bg-n-3 hover:bg-purple-600 rounded-md transition-all duration-500 ease-in-out'>
                              {btn2}
                            </button>

                          </div>

                    </div>

              </div>

          </div>

     




  )
}

export default Banner
