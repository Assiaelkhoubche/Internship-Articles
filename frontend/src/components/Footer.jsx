import React from 'react'
import { Link, useLocation, } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaRegCopyright } from 'react-icons/fa6'

const Footer = () => {

  const location =useLocation();
  const isDashboard=location.pathname.startsWith('/dashboard');

  return (
   
       
       <div id='contact' className={`bg-gradient-to-t from-indigo-200 to-white md:px-14 px-6  mx-auto mt-10 py-10 ${isDashboard?'ml-10':''}`}>

          <div className='my-12 flex flex-col md:flex-row gap-1 max-sm:items-center '>

              <div className='md:w-1/2 space-y-8 max-md:space-y-2 max-md:text-center '>

                  <Link to='/' className=''>

                      <img src="https://img.logoipsum.com/243.svg" alt="logo" 
                            className={`overflow-hidden transition-all  inline-block `}
                      />

                  </Link>

                  <p className='md:w-1/2 text-n-4 font-secondly text-base'>
                    We are committed to delivering a high-quality content and exceptional user experience.
                  </p>

                  <div>
                    <input type="email" name='email' id='email' placeholder='Your email...' 
                            className='bg-indigo-300 rounded-lg py-2 px-2 placeholder:text-slate-300 focus:outline-none placeholder:font-secondly font-secondly'
                    />

                    <Link to='/register'>
                      <input type="submit" value='Subscribe'
                              className='px-4 py-2 font-semibold font-secondly text-white bg-gradient-to-br from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 rounded-r-md -ml-2 cursor-pointer'
                      />
                    </Link>
                  </div>

              </div>

             {/* Footer navigation */}
              <div className='md:w-1/2 max-md:space-y-10 max-md:mt-10 flex flex-col md:flex-row flex-wrap justify-between '>
                <div className='space-y-4 mt-5 max-md:text-center'>
                   <h4 className='text-xl font-secondly text-indigo-800 font-semibold'>Plateform</h4>
                   <ul className='space-y-3'>
                    <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>Overview</Link>
                    <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>Features</Link>
                    <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>About</Link>
                    <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>Pricing</Link>
                   </ul>
                </div>
                <div className='space-y-4 mt-5 max-md:text-center'>
                        <h4 className='text-xl font-secondly text-indigo-800 font-semibold'>
                           Help
                        </h4>
                        <ul className='space-y-3'>
                          <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>How does it works</Link>
                          <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>Where to ask questions ?</Link>
                          <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>How to play</Link>
                          <Link to='/' className='block hover:text-gray-500 font-secondly transition-all duration-300'>What is nee deeded for this</Link>
                        </ul>
                </div>
                 

                <div className='space-y-4 mt-5 max-md:text-center'>
                    <h4 className='text-xl font-secondly text-indigo-800 font-semibold '>
                      Contacts
                    </h4>
                    <ul className='space-y-3'>
                    <p className='block hover:text-gray-500 font-secondly transition-all duration-300'>(+212) 6405-5346-89</p>
                    <p className='block hover:text-gray-500 font-secondly transition-all duration-300'>123 xyz xyz</p>
                    <p className='block hover:text-gray-500 font-secondly transition-all duration-300'>(email) xyzhelpsupport@gmail.com</p>
                    </ul>
                </div>
              </div>


          </div>

          <hr className='border-indigo-100' />

          <div className='flex flex-col md:flex-row my-4 justify-between max-md:space-y-8 max-md:items-center'>
                  <div className=''>
                    <FaRegCopyright size={15} className='inline-block mr-1 mb-1'/>
                    <p className='inline-block text-base text-indigo-950 font-secondly'>
                      The Press Community 2024. All rights reserved
                    </p>
                  </div>

                  <div className='flex gap-4 '>
                    <FaFacebook size={25} className='inline-block text-indigo-950 hover:text-indigo-600 cursor-pointer transition-all duration-500'/>
                    <FaInstagram size={25} className='inline-block text-indigo-950 hover:text-indigo-600 cursor-pointer transition-all duration-500'/>
                    <FaTwitter size={25} className='inline-block text-indigo-950 hover:text-indigo-600 cursor-pointer transition-all duration-500'/>

                  </div>
          </div>
            
       </div>

  )
}

export default Footer
