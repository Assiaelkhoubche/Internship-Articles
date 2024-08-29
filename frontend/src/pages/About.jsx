import React from 'react'
import readingTime from '../assets/readingTime.svg'
import world from '../assets/world.svg'
const About = () => {

  return (

   <div className='md:px-8 p-4 max-w-7xl mx-auto flex-col space-y-20 '>
     
      <div className='flex flex-col md:flex-row items-center justify-start md:gap-8 w-full '>

          <div className=' w-1/2 '>
            <img src={readingTime} alt="about"
                className=' w-full'
            />
          </div>

          <div className='md:w-1/2  mx-1 md:mt-20 '>

              <h3 className='text-3xl font-secondly font-bold text-indigo-900'>
                We have been improving our product <span className='text-n-3'>for many years.</span>
              </h3>
              <p className='text-base font-secondly text-n-4 mt-4'>
                 We are dedicated to providing high-quality, engaging articles that 
                 inform and inspire. Our mission is to deliver fresh, reliable content
                 tailored to our audience's interests, while creating a space for thoughtful discussions
                 and insights. Whith a focus on excellence and innovation, we strive to be
                 your go-to source for knowledge and inspiration.

              </p>

              <button className=' rounded-md bg-n-3 py-3 px-4 text-white font-bold font-secondly mt-6'> 
                Get Started                
              </button>

          </div>

      </div>

      <div className=' mt-10 flex flex-col md:flex-row-reverse items-center justify-start md:gap-8 w-full '>

            <div className=' w-1/2 '>
              <img src={world} alt="about"
                  className=' w-full'
              />
            </div>

            <div className='md:w-1/2   mx-1 md:mt-20  '>

                <h3 className='text-3xl font-secondly font-bold text-indigo-900'>
                  You can start reading at any <span className='text-n-3'> time convinent for you.</span>
                </h3>

                <p className='text-base font-secondly text-n-4 mt-4'>

                    We are dedicated to providing high-quality, engaging articles that 
                    inform and inspire. Our mission is to deliver fresh, reliable content
                    tailored to our audience's interests, while creating a space for thoughtful discussions
                    and insights. Whith a focus on excellence and innovation, we strive to be
                    your go-to source for knowledge and inspiration.

                </p>

            </div>

      </div>
      
   </div>
   
  )
}

export default About