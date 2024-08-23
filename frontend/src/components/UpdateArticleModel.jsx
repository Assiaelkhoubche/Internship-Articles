
import React,{useState} from 'react'
import api from '../api';
import { IoCloseSharp } from "react-icons/io5";

const UpdateArticleModel = ({article, onClose}) => {
    const [title, setTitle]=useState(article.title);
    const [content,setContent]=useState(article.content);
    const [category, setCategory]=useState(article.category?.name || '');
    const [tags, setTags]=useState(article.tags.map(tag=>tag.name).join(', '));
    const [isPro, setIsPro]=useState(article.is_pro);
    const [picture, setPicture]=useState(null);
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');
 
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


        }catch(err){
            console.error('failed to update the article: ', err);
            setError('Failed to update the article please try later');
        }
    }
 
    return (
       <div className='pl-10 pr-5 h-auto py-4 w-auto bg-black bg-opacity-30 backdrop-blur flex fixed top-[5%] left-[29%] hover:shadow-xl rounded-lg '>
             
             <div onClick={()=>onClose()} className='relative order-1 top-0 bg-indigo-400  hover:bg-indigo-600 text-white  h-12 p-3 cursor-pointer rounded-full'>
                <IoCloseSharp size={25} />
             </div>
            
             <form onSubmit={handleSubmit} className='mt-10'>

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
              <label htmlFor="isPro" className=''> Pro Article: </label>
              <input type="checkbox" 
                    id='isPro'
                    checked={isPro}
                    onChange={(e)=>setIsPro(e.target.checked)}
                    className=' '

                />
           </div>
           <button type='submit' 
                  className='bg-indigo-500 text-white p-2 mt-4 hover:bg-indigo-600 transition-colors duration-500 ease-in-out font-mono font-bold rounded-lg'> 
            
                    Update
           </button>
                
             </form>  
       </div>
    )
}

export default UpdateArticleModel
