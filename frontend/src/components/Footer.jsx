import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaRegCopyright } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='bg-black text-white'>
        <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
             <div className='grig mb-8 lg:grid-cols-6'>
                <div className='grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4'>
                    
                     {/* Category */}
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Category</p>
                        <ul className='mt-2 space-y-2'>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>News</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>World</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Games</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>References</Link>
                            </li>
                        </ul>
                    
                    </div>

                    {/*Category 1 */}
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Apples</p>
                        <ul className='mt-2 space-y-2'>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Web</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>eCommerce</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Business</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Entertaiment</Link>
                            </li>

                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Portfolio</Link>
                            </li>
                        </ul>
                    
                    </div>


                    {/* Category 2 */}
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Cherry</p>
                        <ul className='mt-2 space-y-2'>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Media</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Brochure</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Nonprofit</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Education</Link>
                            </li>

                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Projects</Link>
                            </li>
                        </ul>
                    
                    </div>


                    {/* category 4 */}
                    <div>
                        <p className='font-medium tracking-wide text-gray-300'>Business</p>
                        <ul className='mt-2 space-y-2'>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Infoproner</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Personal</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Wiki</Link>
                            </li>
                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Forum</Link>
                            </li>

                            <li>
                                <Link to='/' className='text-gray-500 transition-colors duration-300 hover:text-n-1 '>Projects</Link>
                            </li>
                        </ul>
                    
                    </div>

                

                </div>  
             </div>


             <div className='flex flex-col  items-center justify-between  pt-5 pb-10 border-t border-gray-800 sm:flex-row'>
                <p className='text-sm text-gray-500 flex items-center gap-2' ><FaRegCopyright className='inline-block'/> Copyright 2024 | all right reserved  </p>

                    <div  className='flex mt-4 space-x-4 sm:mt-0 text-2xl'>
                            <Link to='/' className='text-gray-500 transition-all duration-300 hover:text-teal-400'>
                                
                            <FaTwitter/>

                            </Link>

                            <Link to='/' className='text-gray-500 transition-all duration-300 hover:text-teal-400'>
                                
                                <FaInstagram/>
        
                            </Link>

                            <Link to='/' className='text-gray-500 transition-all duration-300 hover:text-teal-400'>
                                
                                <FaFacebook/>
        
                            </Link>
                    </div>

             </div>
        </div>
    </div>
  )
}

export default Footer
