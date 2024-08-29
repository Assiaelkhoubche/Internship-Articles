import React from 'react'
import Banner from './Banner'
import ballon from '../assets/ballon.svg'
import {useLocation } from 'react-router-dom'

const BottomBanner = () => {
   
    const heading='Each one  share their discount code for friends'
    const subheading="Each plan you share a unique discount code with friends When they sign up using your code, they'll enjoy a discount on their first purchase, and you'll earn rewards or discounts on your next renewal. it's a win-win for everyone!"
    const btn1='Get Started';
    const btn2='Discount';


  return (
    <div className='md:px-14 p-4 mt-20 '>

     <Banner banner={ballon} heading={heading}  subheading={subheading} btn1={btn1} btn2={btn2}/>

    </div>
  )
}

export default BottomBanner
