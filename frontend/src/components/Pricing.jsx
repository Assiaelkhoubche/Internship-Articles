import React, { useState } from 'react'
import { packages } from '../constants/constant';
import { FaCircleCheck } from "react-icons/fa6";

const Pricing = () => {

   const [isYear, setIsYear]=useState(false);
   
  

  return (
    <div className='md:px-14 py-4 max-w-7xl mx-auto mt-10 '>

       {/* toggle options */}
       <div className='text-center mb-10'>
              <h2 className='md:text-5xl text-3xl font-extrabold font-secondly text-indigo-900 mb-2'>
                Here are <span className='text-n-3'>all</span> our plans
              </h2>
              <p className='text-n-4 font-secondly text-base md:w-1/3 mx-auto px-4'>
                  We believe in offering flexible pricing plans tailored to your needs.Whether you're looking for free access
                  to hight-quality content or premium features with exclusive
                  articles and insights
              </p>
          

          {/* toggle pricing */}
            
          <div className='mt-16'>

            <label htmlFor="toggle" className='inline-flex items-center cursor-pointer'>

              <span className='mr-8 text-2xl font-semibold font-secondly'> Monthly </span>

              <div className={`w-14 h-6 rounded-full relative  ${isYear?'bg-indigo-100':' bg-gray-300'}`}>

                  <div className={`w-6 h-6  rounded-full transition duration-200 ease-in-out ${isYear?'bg-n-3 absolute right-0':'bg-gray-500'}`}>

                  </div>

              </div>

              <span className='ml-8 text-2xl font-semibold font-secondly'> Yearly </span>

            </label>
            
            <input type="checkbox" id='toggle' className='hidden' checked={isYear} onChange={()=>setIsYear(!isYear)} />
        </div>
      </div>


      {/* pricing cards */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3  gap-10 mt-20 md:w-11/12 mx-auto'>
           {
            packages.map((pkg, index)=>(
               <div key={index} className='border py-10 md:px-6 px-4 max-sm:mx-4 rounded-lg md:shadow-3xl shadow-4xl'>
                  
                     <h3 className='text-3xl  font-semibold font-secondly text-center text-indigo-900'>{pkg.name}</h3>
                     <p className='text-base  text-center text-n-4 font-secondly my-5'>
                       {pkg.description}
                     </p>
                  

                    <p className='mt-5 text-center text-n-3 text-4xl font-bold'>
                       {isYear ?`$${pkg.yearlyPrice}`:`$${pkg.monthlyPrice}`} <span className='text-base text-neutral-500 font-medium font-secondly'>
                                                                                     /{ isYear?'Year':'Month'}
                                                                              </span>

                    </p>

                    <ul className='flex flex-col gap-6 mt-10 '>

                         {pkg.Features.map((feature, index)=>(

                            <li key={index}>
                              <FaCircleCheck size={20} className={`inline-block  text-n-3`}/> 
                              <p className='inline-block ml-4 font-secondly text-neutral-700'>{feature}</p>
                            </li> 

                         ))} 

                    </ul>

                    <div className=' mt-10 mx-auto flex w-full justify-center items-center'>
                      <button className='bg-gradient-to-tl from-indigo-500 to-purple-400 py-3
                                         px-6  font-secondly font-semibold text-white rounded-sm  hover:from-indigo-600 hover:to-purple-500 transition-colors duration-500 ease-in-out'>
                         Get Started
                      </button>
                    </div>
               </div>
            ))
           }
      </div>

    </div>
  )
}

export default Pricing
