import React, { useState } from 'react'
import api from '../../api';
import { FaFileUpload } from "react-icons/fa";
import form from '../../assets/form.svg'
import {motion} from 'framer-motion'
import { fadeIn } from '../../variants';
import {  useNavigate } from 'react-router-dom';

const CreateArticle = () => {
   
   const [title, setTitle]=useState('');
   const [content, setContent]=useState('');
   const [category, setCategory]=useState('');
   const [tags, setTags]=useState('');
   const [picture, setPicture]=useState(null);
   const [isPro, setIsPro]=useState(false);
   const [error, setError]=useState('');
   const [success, setSuccess]=useState(false);
   const [reload, setReload]=useState(false);
   const navigate=useNavigate();



   const handlePictureChange=(e)=>{
     setPicture(e.target.files[0]);
   }  

   const handleSubmit=async (e)=>{
       e.preventDefault();
       setReload(true)

       const articleData={
          title,
          content,
          category,
          picture,
          tags :tags.split(',').map(tag=>tag.trim()),
          is_pro:isPro,
     
       };
       
       try{
           
         const res = await api.post('/api/articles/create/',articleData,
            { 
                headers:{
                  'Content-Type':'multipart/form-data',
                },
            }
         );


        if(res.status===201){
          setSuccess(true);

          setTimeout(()=>{
              setSuccess(false);
              navigate('/dashboard/listArticles');
          },2000)
        }

         setReload(false);

         // clear form fields
         setTitle('');
         setContent('');
         setCategory('');
         setTags(' ');
         setIsPro(false);
         setPicture(null);

       }catch (err) {
          console.error('Error creating article:', err.response?.data || err.message);
          setError('Failed to create article');
        }


   }



  return (
    <div className='relative max-w-screen-2xl mt-20 mx-auto flex flex-col-reverse md:flex-row max-md:items-center md:px-4 max-md:gap-10 gap-4 justify-between  lg:px-20  '>
         
       

        <motion.div
              variants={fadeIn('right',0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once:false, amount:0.7}}
            className='w-3/4 max-md:w-3/4 lg:px-20'
         >
           <h1 className=' text-center font-bold mb-6 font-secondly text-indigo-800'> Create Article </h1>
           
           {error && <p className='text-red-700 my-3 font-secondly font-semibold'>Error: {error}</p>}
           
           <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-4 font-secondly justify-center text-center [&>button]:mx-auto [&>LoadingIndicator]:mx-auto '>
              
              <div className='font-medium  divinput '>
                  
                    <input type="text"
                           id='title'
                           value={title}
                           onChange={(e)=> setTitle(e.target.value)}
                           required
                           className='input'
                           placeholder='Title...'
                    />
                
           
              </div>
              <div className='font-medium divinput items-center'>
           
                 <textarea type="text"
                        id='content'
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                        required
                        placeholder='Content...'
                        className='w-full px-2 pt-1 outline-none'

                 />
           
              </div>
              <div className='font-medium divinput'>
           
                 
                 <input type="text"
                        id='category'
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        placeholder='Category...'
                        className='input'
           
                 />
           
              </div>
              <div className='font-medium divinput'>
           
                 
                 <input type="text"
                        id='tags'
                        value={tags}
                        onChange={(e)=> setTags(e.target.value)}
                        placeholder='Tags...'
                        className='input'
           
                 />
           
              </div>
              <div className='font-medium text-gray-600'>
           
               
                 <div className='flex items-center justify-center relative '>
                    <input type="file"
                           id='picture'
                           accept='image/*'
                           onChange={handlePictureChange}
                           className='opacity-0 absolute z-[-1] w-full h-full cursor-pointer  '
                    />

                    <label htmlFor="picture" className='cursor-pointer  flex gap-2 items-center justify-center'>
                       <FaFileUpload size={20}/>
                       <p className='hover:underline hover:text-indigo-800'>Upload your image here</p>
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
                     className='bg-gradient-to-tr from-indigo-400 to-purple-400 text-white p-2 mt-4 hover:from-indigo-500 hover:to-purple-500 transition-colors duration-500 ease-in-out font-secondly font-bold rounded-lg'>
           
                       Create Article
              </button>
           </form>
        </motion.div>


        <motion.div 
            variants={fadeIn('left',0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount:0.7}}
            className='lg:w-1/2 max-md:w-1/2 md:px-10'
         >
            <img src={form} alt="form" />  
         </motion.div>  


         {success && (
            <motion.div className=' absolute left-0 right-0 top-0 buttom-0 m-auto flex justify-center items-center w-[50%] h-[40%] bg-gradient-to-br from-indigo-400 to-purple-400 bg-opacity-10 rounded-3xl '
                        variants={fadeIn('down',0)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once:false, amount:0.3}}
            >
                 <h1 className='text-white font-secondly font-bold text-3xl mx-2 text-center'> Article created successfuly! </h1>
            </motion.div>
         )}

    </div>
  )
}

export default CreateArticle
