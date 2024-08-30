import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { FaUser, FaClock } from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import SideBare from '../components/SideBare'

const Article = () => {
     
     const {id}=useParams();
     const [article, setArticle]=useState(null);
     const [articles,setArticles]=useState([]);
     useEffect(()=>{
          getArticle();
          getArticles();
     },[id])
    

     const getArticle= async ()=>{
       try {
          const res = await api.get(`/api/articles/${id}/`);
          setArticle(res.data);
        }catch(err){
          console.error('failed to fetch to fetch article:', err)
        }

     };
     const getArticles= async ()=>{
      try {
         const res = await api.get(`/api/articles/`);
         setArticles(res.data);
       }catch(err){
         console.error('failed to fetch to fetch articles:', err)
       }

    };

     if(!article){
      return <div>Loading...</div>
     }

  return (
    <div className='mt-32 max-w-7xl ml-4'>
        
        {/* blog details */}
        <div className=' mx-auto my-12 flex flex-col md:flex-row gap-16 '>

              <div className='lg:w-3/4   '>
                <div className='shadow-md max-md:mx-auto rounded-lg overflow-hidden w-4/5' >
                    {article.picture && <img src={article.picture} alt='pic' className='w-full mx-auto' />}
                </div>
                <div className='max-md:ml-4 max-md:mr-2'>
                  <h2 className='text-3xl mt-8 font-bold mb-4 text-blue-500 cursor-pointer'>{article.title}</h2>
                
                  <p className='flex items-baseline gap-3'><FaUser className='inline-flex items-center '/> {article.author.first_name } {article.author.last_name}
                                                          <span className='text-sm mb-2 text-gray-500'>Pablished: {new Date(article.created_at).toLocaleDateString('en-GB',{day:'numeric', month:'long', year:'numeric'})}</span>
                  </p>
                  <p className='flex items-center gap-3'>
                          <FaClock className='inline-block  '/>
                
                          <span className='text-sm  text-gray-500 ' >{formatDistanceToNow(new Date(article.created_at), {addSuffix: true})}</span>
                  </p>
                
                    {/* the main content */}
                  <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                      {article.content}
                  </p>
                
                    {/* the example content */}
                    <div>
                            <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                              {article.content}
                            </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                {article.content}
                              </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                {article.content}
                              </p>
                
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                {article.content}
                              </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                  {article.content}
                              </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                  {article.content}
                              </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                  {article.content}
                              </p>
                              <p className='text-base text-gray-700 mb-6 mt-10 font-secondly'>
                                  {article.content}
                              </p>
                   </div>
                 </div>
              </div>
                
              <div className='max-md:ml-6'>
                 <SideBare articles={articles}/>
              </div>

        </div>

    </div>
  )
}

export default Article
