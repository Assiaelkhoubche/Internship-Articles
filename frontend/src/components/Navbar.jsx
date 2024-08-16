import React, { useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { navItem } from '../constants/constant'
import Register from '../pages/Register'
// icons
import {FaBars,FaXmark} from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import AuthButton from './AuthButton';
const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const [isLogin, setIsLogin]=useState(false)

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
    <header className='bg-black fixed w-full top-0 left-0 right-0'>
        <nav className='p-3 lg:p-4 flex items-center  lg:gap-20 justify-between  w-full max-w-7xl mx-auto'>
            <Link to='/'
                  className='font-bold text-xl text-white mr-10'
            >
                 Design <span className='text-orange-500  font-bold'>DK</span>
                 
           </Link>

           {/* NavItems for larg devices */}

           <ul className=' hidden md:flex md:items-center gap-12 text-lg font-semibold ' >
             {navItem.map((item,index)=>(
                <li key={index} className='text-white hover:text-orange-400 transition-colors duration-500 '>
                   <NavLink to={item.path}
                            className={({isActive, isPending})=>
                                isActive?'active':''
                            }
                   >
                      {item.link}
                   </NavLink> 
                </li>
             ))}
           </ul>

           {/* menu icons */}
           <div className=' hidden lg:flex lg:items-center gap-4 text-white '>
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
           

           <div className='text-n-2 md:hidden flex justify-center ml-auto'>

               <button onClick={toggleMenu}
                      className='hover:text-n-1 transition-colors duration-500'
                >  
                 {isMenuOpen ?<FaXmark className='w-6 h-6'/> :  <FaBars className='w-5 h-5'/> }

                 
               </button>

           </div>
        </nav>

        {/* menu items only for mobiles */}
        <div className='lg:hidden'>
        { isMenuOpen? 
                    (
                        <ul className= {`md:flex  gap-12 text-lg font-semibold block space-y-4 px-4 py-6 mt-14 bg-n-2 ${isMenuOpen?'fixed top-0 left-0 w-full transition-all ease-out duration-150':'hidden'}`} >
                        {navItem.map((item,index)=>(
                           <li key={index} className='text-black hover:text-orange-400 transition-colors duration-500 '>
                              <NavLink to={item.path}
                                       onClick={toggleMenu}
                                       className={({isActive, isPending})=>
                                           isActive?'active':''
                                       }
                              >
                                 {item.link}
                              </NavLink> 
                           </li>
                        ))}
                      </ul>
                    ):('')
                
          }
        </div>

    </header>
  )
}

export default Navbar
