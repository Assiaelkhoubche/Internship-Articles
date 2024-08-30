import React, { useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'

import Register from '../pages/Register'
// icons
import {FaBars,FaXmark} from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import AuthButton from './AuthButton';
import { useAuth } from "../hooks/AuthProvider"

import {Link as ScrollTo} from 'react-scroll'
const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const [isLogin, setIsLogin]=useState(false);
  const {isManager}=useAuth();


  // elements for 
  const navItem=[
    {
        path:'/',
        link:'Home',
        scroll:false
    },
    {
        path:'pricing',
        link:'Pricing',
        scroll:true

    },
    {
        path:'contact',
        link:'Contact',
        scroll:true
    },
    {
        path:'about',
        link:'About',
        scroll:true
    },
    {
        path:'/articles',
        link:'Articles',
        scroll:false
    },

    isManager && {
        path:'/dashboard',
        link:'Dashboard',
        scroll:false
    }

].filter(Boolean) // filters out 'false'
 

  // const logoutAndLogin=()=>{
  //      localStorage.clear();
  //      return <Navigate to='/login'/>
  // }
  
  const registerAndLogout=()=>{
     localStorage.clear();
     setIsLogin(true);
     return <Register />
  } 
  
  const toggleMenu=()=>{   
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  }

  return (
    <header className=' bg-white fixed w-full top-0 left-0 right-0 z-50 border-b-slate-400 shadow-xl rounded-b-2xl px-0'>
        <nav className='p-3 lg:p-4 flex items-center  lg:gap-20 justify-between  w-full max-w-7xl mx-auto'>
        <Link to='/'>

            <img src="https://img.logoipsum.com/243.svg" alt="logo" 
                className={`overflow-hidden transition-all `}
            />

            </Link>

          
               {/* NavItems for larg devices */}
               <ul className=' hidden md:flex md:items-center gap-12 text-lg font-mono font-semibold ' >
                 {navItem.map((item,index)=>(
                    <li key={index} className='hover:bg-indigo-50 text-gray-600 hover:text-indigo-500 cursor-pointer transition-colors duration-500 '>
                            {item.scroll ? (<ScrollTo to={item.path} spy={true} smooth={true} offset={-100}  activeClass='active'>
                                                {item.link}
                                            </ScrollTo>
                                            
                                            ): (<NavLink to={item.path}
                                                            className={({isActive, isPending})=>
                                                                isActive?'active':''
                                                            }
                                                >
                                                    {item.link}
                                                </NavLink>
                                    
                                    )
                                            }
                    </li>
                 ))}
               </ul>
               {/* menu icons */}
               <div className=' hidden lg:flex lg:items-center gap-4 text-black '>
                  <Link to='/'
                         className='text-[1.7rem] hover:text-orange-500 transition-colors duration-500  '
                  >
                      <IoLogoFacebook />
                  </Link>
                  <Link to='/'
                         className='text-[1.7rem] hover:text-orange-500 transition-colors duration-500 '
                  >
                      <FaInstagram />
                  </Link>
                  <Link to='/'
                         className='text-[1.7rem] hover:text-orange-500 transition-colors duration-500  '
                  >
                      <AiFillTwitterCircle />
                  </Link>
               
                {/* <div className='text-white font-medium'>
                        <Link to='/register'>
                            <button
                                onClick={registerAndLogout}
                                className='bg-n-1 px-3 pb-1  rounded-[5px] hover:bg-n-2 hover:text-n-1 duration-500 ease-in '
                            >
                                    {!isLogin?'sign up':'logout'}
                            </button>
                        </Link>
                </div> */}
                <AuthButton />
               </div>
           


           {/* mobile menu, display mobile screen */}
           

           <div className='text-gray-500 md:hidden flex justify-center ml-auto'>

               <button onClick={toggleMenu}
                      className='hover:text-indigo-500 transition-all duration-500'
                >  
                 {isMenuOpen ?<FaXmark  className='w-6 h-6'/> :  <FaBars  className='w-5 h-5'/> }

                 
               </button>

           </div>
        </nav>

        {/* menu items only for mobiles */}
            { isMenuOpen &&
                <div className='md:hidden fixed w-full rounded-lg '>
                        
                            <ul className= {` bg-gradient-to-t from-indigo-600 to-white bg-opacity-20 font-mono  h-screen backdrop-blur rounded text-lg font-bold block space-y-4 px-4 py-20   ${isMenuOpen?' flex-col space-y-10 pl-[40%]  transition-all ease-out duration-150':'hidden'}`} >
                                {navItem.map((item,index)=>(
                                <li key={index} className='text-black hover:text-indigo-500 transition-colors duration-500 '>
                                 { item.scroll?  (<ScrollTo to={item.path} spy={true} smooth={true} offset={-80} activeClass='active'
                                                        onClick={toggleMenu}
                                                    >
                                                    {item.link}
                                                </ScrollTo>)
                                                :
                                                (<NavLink to={item.path}
                                                        onClick={toggleMenu}
                                                        className={({isActive, isPending})=>
                                                            isActive?'active':''
                                                        }
                                                >
                                                    {item.link}
                                                </NavLink>)
                                    
                                    }
                                </li>
                                ))}
                            </ul>
                        
                    
                </div>
            }

    </header>
  )
}

export default Navbar
