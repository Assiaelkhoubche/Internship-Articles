import React from 'react'
import Banner from '../components/Banner'
import banner from '../assets/banner.svg'

const Home = () => {

  const heading='Welcome to Our Blogs Hub Where knowledge Meets Creativity!';
  const subheading= ' Start your blog today and become part of a thriving community of writers and readers. Share your passion, ideas, and stories, and explore helpful resources to guide your journey!';
  const btn1='Get started';
  const btn2='Discount';


  return (
    <div id='home' className='md:px-6 p-4 max-w-screen-2xl mx-auto mt-24'>
       <Banner banner={banner} heading={heading} subheading={subheading} btn1={btn1} btn2={btn2}/>
    </div>
  )
}

export default Home
