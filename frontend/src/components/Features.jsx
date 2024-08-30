import React from 'react'
import feature from '../assets/feature.svg'
import {motion} from 'framer-motion'
import { fadeIn } from '../variants';
const Features = () => {
  return (
    <div className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto '>
        
        <div className=' flex flex-col lg:flex-row justify-between items-start gap-10'>

            <motion.div className='lg:w-1/4'
             variants={fadeIn('right',0.2)}
             initial='hidden'
             whileInView={'show'}
             viewport={{once:false, amount:0.7}}
            >

               
                <h3 className='text-3xl text-indigo-800 font-bold font-primary mb-3 '> 
                    Why We Are Better Than Others ?
                </h3>
                <p className='text-base text-n-4 font-secondly'>
                    We offer exlusive, high-quality content with a user-friendly design
                    and advanced features. Our rigorous editorial stands and innovative 
                    technology ensure a superior experience. Trust us for reliable, engaging, and secure content.
                </p>

            </motion.div>

            {/* Feature Cards */}
            <div className='w-full lg:w-3/4'>

                <motion.div 
                   className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-16 max-sm:mx-2'
                   variants={fadeIn('up',0.2)}
                   initial='hidden'
                   whileInView={'show'}
                   viewport={{once:false, amount:0.2}}
                >
                    
                    <div 
       
                      className='bg-indigo-50/40 rounded-2xl h-96  shadow-4xl md:shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'
                    >
    
                        <div className=' '>
    
                            <img src={feature} alt="feature"
                            />
    
                            <h5 className='text-2xl font-semibold text-indigo-600 mt-5 font-secondly text-center '>
                                Unique Content
                            </h5>
    
                        </div>
                    </div>
    
                    <div className='bg-indigo-50/40 rounded-2xl  h-96 shadow-4xl md:shadow-3xl  p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16'>
    
                            <div className=''>
    
                                <img src={feature} alt="feature"
                                />
    
                                <h5 className='text-2xl font-semibold text-indigo-600 mt-5 font-secondly text-center'>
                                    User Experience
                                </h5>
    
                            </div>
                    </div>
    
                    <div className='bg-indigo-50/40 rounded-2xl h-96 shadow-4xl md:shadow-3xl  p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer '>
    
                            <div className=''>
    
                                <img src={feature} alt="feature"
                                />
    
                                <h5 className='text-2xl font-semibold text-indigo-600 mt-5 font-secondly text-center'>
                                    Unique Content
                                </h5>
    
                            </div>
    
                    </div>

                </motion.div> 
                 

            </div>

        </div>

    </div>
  )
}

export default Features
