import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Features from './components/Features'
import About from './pages/About'
import Pricing from './components/Pricing'
import BottomBanner from './components/BottomBanner'



function App() {
   
   const location=useLocation()

   const isDashboard= location.pathname.startsWith('/dashboard');
    const isHomePage=location.pathname==='/'
  return (
      <>
       {!isDashboard && <Navbar/>}
        <Outlet/>
        <Features/>
        <About />
        <Pricing />
        {isHomePage && <BottomBanner/>}
        <Footer/>

      </>
  )
}

export default App
