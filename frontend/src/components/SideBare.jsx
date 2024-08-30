import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link, useParams } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const SideBare = ({articles}) => {
      
    const popularArticles=articles.slice(0,5)
    const {id}=useParams()

  return (
    <div className=''>
       <div>
           <h3 className='text-2xl font-semibold px-1 inline-block mb-4 font-secondly text-indigo-800'>Leatest Blogs</h3>
           <div>
                 
                 {popularArticles.map((article , index)=>(

                        <div key={index} className=' mb-5 border-b-2 border-spacing-2'> 
                            <h4 className='text-gray-500'>{article.title.slice(0,200)}...</h4>
                            <div className='hover:text-n-3 transition-colors duration-500'>
                                    <Link to={`/articles/${article.id}`}
                                        className='font-semibold inline-flex items-center py-1 '
                                    >
                                        Read more  <FaArrowRight className='mt-1 ml-2'/>
                                    </Link>
                            
                             </div>
                        </div>
                 ))}

           </div>
       </div>
    </div>
  )
}

export default SideBare
