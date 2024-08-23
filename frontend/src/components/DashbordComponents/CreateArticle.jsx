import React, { useState } from 'react'
import api from '../../api';

const CreateArticle = () => {
   
   const [title, setTitle]=useState('');
   const [content, setContent]=useState('');
   const [category, setCategory]=useState('');
   const [tags, setTags]=useState('');
   const [picture, setPicture]=useState(null);
   const [isPro, setIsPro]=useState(false);
   const [error, setError]=useState('');
   const [success, setSuccess]=useState('');
   const [reload, setReload]=useState(false);



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


         setSuccess('Article created successfully!');
         setError('');

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
        }


   }



  return (
    <div className='py-10 flex-col  '>
        <h1 className='ml-64'> Create Article </h1>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
        
        <form onSubmit={handleSubmit} className='hover:shadow-xl transition-shadow duration-500 ease-in-out'>

           <div className='font-medium text-gray-600'>
              
              <label htmlFor="title">Title:</label>
              <input type="text" 
                     id='title'
                     value={title}
                     onChange={(e)=> setTitle(e.target.value)}
                     required
              />
                   
           </div>
           <div className='font-medium text-gray-600'>
              
              <label htmlFor="content">Content:</label>
              <textarea type="text" 
                     id='content'
                     value={content}
                     onChange={(e)=> setContent(e.target.value)}
                     required
              />
                   
           </div>

           <div className='font-medium text-gray-600'>
              
              <label htmlFor="category">Category:</label>
              <input type="text" 
                     id='category'
                     value={category}
                     onChange={(e)=> setCategory(e.target.value)}
                     
              />
                   
           </div>

           <div className='font-medium text-gray-600'>
              
              <label htmlFor="tags">tags:</label>
              <input type="text" 
                     id='tags'
                     value={tags}
                     onChange={(e)=> setTags(e.target.value)}
                     
              />
                   
           </div>

           <div className='font-medium text-gray-600'>
              
              <label htmlFor="picture">Picture:</label>
              <input type="file" 
                     id='picture'
                     accept='image/*'
                     onChange={handlePictureChange}
                     
              />
                   
           </div>

           <div className='font-medium text-gray-600 relative '>
              <label htmlFor="isPro" className=' relative  lg:-left-0 left-[15%]'> Pro Article </label>
              <input type="checkbox" 
                    id='isPro'
                    checked={isPro}
                    onChange={(e)=>setIsPro(e.target.checked)}
                    className='absolute -bottom-[10px] lg:-left-[360px] -left-28 cursor-pointer  '

                />
           </div>
           <button type='submit' 
                  className='bg-indigo-500 text-white p-2 mt-4 hover:bg-indigo-600 transition-colors duration-500 ease-in-out font-mono font-bold rounded-lg'> 
            
                    Create Article
           </button>
        </form>

    </div>
  )
}

export default CreateArticle
