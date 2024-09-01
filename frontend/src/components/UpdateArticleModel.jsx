
import React,{useState} from 'react'
import api from '../api';
import { IoCloseSharp } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import {motion} from 'framer-motion'
import { fadeIn } from '../variants';
import { useNavigate } from 'react-router-dom';


const UpdateArticleModel = ({article, onClose}) => {
    const [title, setTitle]=useState(article.title);
    const [content,setContent]=useState(article.content);
    const [category, setCategory]=useState(article.category?.name || '');
    const [tags, setTags]=useState(article.tags.map(tag=>tag.name).join(', '));
    const [isPro, setIsPro]=useState(article.is_pro);
    const [picture, setPicture]=useState(null);
    const [error, setError]=useState('');
    const [success, setSuccess]=useState(false);
    const navigate=useNavigate();
 
    const handlePictureChange=(e)=>{
       setPicture(e.target.files[0]);
    }
 
    const handleSubmit=async (e)=>{
       e.preventDefault();

       const formData ={
          title,
          content,
          category,
          tags:tags.split(',').map(tag=>tag.trim()),
          picture,
          is_pro:isPro
       }
      
        try{
        
           const res =await api.put(`/api/articles/${article.id}/update/`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
           });
            
           if(res.status===200){
             setSuccess(true);

             setTimeout(()=>{

                setSuccess(false);
                navigate('/dashboard/update-article');
                window.location.reload();

             }, 2000);
           }

        }catch(err){
            console.error('failed to update the article: ', err);
            setError('Failed to update the article please try later');
        }
    }
 
    return (
       <div className='px-10 z-50 bg-black/50 transition-opacity duration-700  backdrop-blur  flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 hover:shadow-xl rounded-lg '>
             
             <div className='relative inline-block w-full max-w-[30rem] transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all'>
                <button onClick={()=>onClose()} className='absolute top-4 right-4  '>
                   <IoCloseSharp size={25} />
                </button>
                <form onSubmit={handleSubmit} className='flex flex-col mt-6 mx-4 gap-6 mb-4 font-secondly justify-center text-center [&>button]:mx-auto [&>LoadingIndicator]:mx-auto'>
                   <h1 className='font-bold text-xl text-indigo-800'>Update Article</h1>
                       <div className='divinput'>
                           <input type="text"
                                   id='title'
                                   value={title}
                                   onChange={(e)=> setTitle(e.target.value)}
                                   required
                                   className='input'
                                   placeholder='title...'
                           />
                
                       </div>
                       <div className='divinput '>
                           <textarea type="text"
                                   id='content'
                                   value={content}
                                   onChange={(e)=> setContent(e.target.value)}
                                   required
                                   className='w-full h-full'
                                   placeholder='Content...'
                           />
                
                       </div>
                       <div className='divinput'>
                              
                              <input type="text"
                                       id='category'
                                       value={category}
                                       onChange={(e)=> setCategory(e.target.value)}
                                       className='input'
                                       placeholder='Categoty...'
                              
                              />
                      
                           </div>
                
                           <div className='divinput'>
                
                                 <input type="text"
                                          id='tags'
                                          value={tags}
                                          onChange={(e)=> setTags(e.target.value)}
                                          placeholder='Tags...'
                                          className='input'
                                 
                                 />
                      
                           </div>
                
                           <div className=''>
           
               
                                 <div className='flex items-center justify-center relative '>
                                    <input type="file"
                                             id='picture'
                                             accept='image/*'
                                             onChange={handlePictureChange}
                                             className='opacity-0 absolute z-[-1] w-full h-full cursor-pointer  '
                                    />

                                    <label htmlFor="picture" className='cursor-pointer  flex gap-2 items-center justify-center'>
                                       <FaFileUpload size={20}/>
                                       <p className='hover:underline text-indigo-800'>Upload your image here</p>
                                    </label>
                                       
                                 </div> 
                           
                           </div>
                
                           <div className='font-medium text-gray-600  flex justify-center items-center gap-3'>
                                 <label htmlFor="isPro" className=' relative  '> Pro Article </label>
                                 <input type="checkbox"
                                       id='isPro'
                                       checked={isPro}
                                       onChange={(e)=>setIsPro(e.target.checked)}
                                       className='accent-indigo-600 w-4 h-4 cursor-pointer'
                                       size={15}
                                    />
                         </div>
                           <button type='submit'
                                   className='bg-gradient-to-tr from-indigo-400 to-purple-400 text-white p-2 mt-4 hover:from-indigo-500 hover:to-purple-500 transition-colors duration-500 ease-in-out font-secondly font-bold rounded-lg'
                           >
                                Update
                           </button>
                
                </form>
             </div>

             {success && (
            <motion.div className=' absolute left-0 right-0 top-0 buttom-0 m-auto flex justify-center items-center w-[50%] h-[40%] bg-gradient-to-br from-indigo-400 to-purple-400 bg-opacity-10 rounded-3xl '
                        variants={fadeIn('down',0)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once:false, amount:0.3}}
            >
                 <h1 className='text-white font-secondly font-bold text-3xl mx-2 text-center'> Your article has been updated with Success! </h1>
            </motion.div>
         )}
       </div>
    )
}

export default UpdateArticleModel
