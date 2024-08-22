import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { FaCrown, FaUser } from "react-icons/fa";

const articleCards = ({articles, currentPage, selectCategory, pageSize}) => {
    
    const filterArticles = articles
                          .filter((articles)=>!selectCategory || articles.category.id === selectCategory.id)
                          .slice((currentPage -1)*pageSize, currentPage*pageSize);
   const location=useLocation();
   const isDashboard= location.pathname.startsWith('/dashboard');

  return (
    <div className=' z-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8  '>
       {filterArticles.map((item,index)=>(

          item.picture &&
             (<Link key={index} to={!isDashboard? `/articles/${item.id}`:`/dashboard/listArticles/${item.id}`} className=' relative group p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in rounded-lg cursor-pointer'>
               <div className='relative'>
                  
                        <img src={item.picture} alt="pic" 
                                    className='w-full h-full '
                                    
                           />
                        
                        {item.is_pro && <div className='absolute flex items-center gap-2 bottom-1 right-0 bg-black bg-opacity-20 backdrop-blur  rounded-lg px-2'>
                                    <FaCrown className='text-yellow-500 inline-flex size-5'/>
                                    <p className='inline-flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white mt-1'>Pro</p>
                                </div>}

               </div>
               <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer transition-colors duration-400 ease-in'>{item.title}</h3>
               <p className='mb-2 text-gray-500'> <FaUser className='inline-flex items-center mr-2 text-black '/>{item.author.first_name}</p>
               <p className='text-sm mb-2 text-gray-500'>Pablished: {new Date(item.created_at).toLocaleDateString('en-GB',{day:'numeric', month:'long', year:'numeric'})}</p>
               <p className=' text-purple-400 flex gap-2 '>{item.tags.map((tag, index)=>(<span key={index}>{tag.name}</span>))} </p>
          
          </Link>)
         
       ))}
    </div>
  )
}

export default articleCards
