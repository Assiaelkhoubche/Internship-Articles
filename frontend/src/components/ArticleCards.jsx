import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { FaCrown, FaUser } from "react-icons/fa";
import { MdOutlineCreate } from "react-icons/md";
import { CiBookmarkRemove } from "react-icons/ci";
import UpdateArticleModel from './UpdateArticleModel';
import DeleteArticle from './DashbordComponents/DeleteArticle';



const articleCards = ({articles, currentPage, selectCategory, pageSize}) => {
    
    const filterArticles = articles
                          .filter((articles)=>!selectCategory || articles.category && articles.category.id === selectCategory.id)
                          .slice((currentPage -1)*pageSize, currentPage*pageSize);

   const location=useLocation();
   const isDashboard= location.pathname.startsWith('/dashboard');
   const isUpdatePage=location.pathname==='/dashboard/update-article';
   
   const [selectedArticle, setSelecytedArticle]=useState(null);
   const [isModalOpen, setIsModalOpen]=useState(false);
   const [isDeleteModelOpen, setIsDeleteModelOpen]=useState(false);

   const handleUpdateClick = (article)=>{
      setSelecytedArticle(article);
      setIsModalOpen(true);
   }
   
   const handleDeleteClick=(article)=>{
      setSelecytedArticle(article);
      setIsDeleteModelOpen(true);
   }

   const handleModelClose= ()=>{
      setIsDeleteModelOpen(false);
      setIsModalOpen(false);
      setSelecytedArticle(null);

   }
  return (
    <div className='  grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8  relative w-full mx-auto '>
       {!isUpdatePage
        ?  (filterArticles.map((item,index)=>(

               item.picture && 
                  (<Link key={index} to={!isDashboard? `/articles/${item.id}`:`/dashboard/listArticles/${item.id}`} className='  relative group p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in rounded-lg cursor-pointer'>
                     <div className='relative'>
                        
                              <img src={item.picture} alt="pic" 
                                          className='w-full h-full '
                                          
                                 />
                              
                              {item.is_pro && <div className='absolute flex items-center gap-2 bottom-1 right-0 bg-black bg-opacity-20 backdrop-blur rounded-lg px-2'>
                                          <FaCrown className='text-yellow-500 inline-flex size-5'/>
                                          <p className='inline-flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white mt-1'>Pro</p>
                                    </div>}

                     </div>
                     
                                       <div>
                                          <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer transition-colors duration-400 ease-in'>{item.title}</h3>
                                         
                                             <p className='mb-2 text-gray-500'> <FaUser className='inline-flex items-center mr-2 text-black '/>{item.author.first_name}</p>
                                          
                                          <p className='text-sm mb-2 text-gray-500'>Pablished: {new Date(item.created_at).toLocaleDateString('en-GB',{day:'numeric', month:'long', year:'numeric'})}</p>
                                          <p className=' text-purple-400 flex gap-2 '>{item.tags.map((tag, index)=>(<span key={index}>{tag.name}</span>))} </p>
                                       </div>
                                 
                  

               
               </Link>))) 
          )
       
      :
      (
         filterArticles.map((item,index)=>(
               item.picture && 
                  (<div key={index}  className=' relative group p-5 shadow-lg hover:shadow-2xl  transition-shadow duration-300 ease-in rounded-lg cursor-pointer'>
                           <Link  to={!isDashboard? `/articles/${item.id}`:`/dashboard/listArticles/${item.id}`}>
                              <div className='relative'>
                              
                                       <img src={item.picture} alt="pic"
                                                   className='w-full h-full '
                              
                                          />
                              
                                       {item.is_pro && <div className='absolute flex items-center gap-2 bottom-1 right-0 bg-black bg-opacity-20 backdrop-blur rounded-lg px-2'>
                                                   <FaCrown className='text-yellow-500 inline-flex size-5'/>
                                                   <p className='inline-flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white mt-1'>Pro</p>
                                             </div>}
                              </div>
                              
                                                <div>
                                                   <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer transition-colors duration-400 ease-in'>{item.title}</h3>
                                                   <p className='text-sm mb-2 text-gray-500'>Pablished: {new Date(item.created_at).toLocaleDateString('en-GB',{day:'numeric', month:'long', year:'numeric'})}</p>
                                                   <p className=' text-purple-400 flex gap-2 '>{item.tags.map((tag, index)=>(<span key={index}>{tag.name}</span>))} </p>
                                                </div>
                           </Link>
                                 
                  

                   
                                       <div className='flex justify-between'>
                                          <button className='py-1 px-2 bg-gradient-to-tr from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold  hover:shadow-md
                                                            flext justify-center rounded-xl m-5'
                                          onClick={()=>handleUpdateClick(item)}
                                          >
                                             <MdOutlineCreate size={20} className='inline-block '/>
                                          </button>

                                          <button className='py-1 px-2 bg-gradient-to-tr from-indigo-400 to-purple-400 text-white font-semibold hover:to-purple-500 hover:shadow-md
                                                            flext justify-center rounded-xl m-5'
                                                  onClick={()=>handleDeleteClick(item)}
                                          >
                                              <CiBookmarkRemove size={20} className='inline-block '/>
                                          </button>
                                       </div>
                           
                   
               
                  </div>)))

                 
      )

      
   }
      {isModalOpen && <UpdateArticleModel article={selectedArticle} onClose={handleModelClose}/>}
      {isDeleteModelOpen && <DeleteArticle article={selectedArticle} onClose={handleModelClose}/>}
    </div>
  )
}




export default articleCards
