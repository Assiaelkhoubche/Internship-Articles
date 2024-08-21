import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



function App() {
   
   const location=useLocation()

   const isDashboard= location.pathname.startsWith('/dashboard');

  return (
      <>
       {!isDashboard && <Navbar/>}
        <Outlet/>
        <Footer/>
      </>
  )
}

export default App
