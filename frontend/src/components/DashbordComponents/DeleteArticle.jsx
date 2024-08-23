import React, { useState } from 'react'
import api from '../../api';

const DeleteArticle = ({article, onClose}) => {
     
    const [error,setError]=useState('');
    const [sucess, setSuccess]=useState('');

    const handleSubmite= async ()=>{
        try{
          
            const res= await api.delete(`/api/articles/${article.id}/delete/`);

            setSuccess('the article was deleted successfully 👌👌👌');

        }catch(err){
          setError('Failed to delete this article Tru again');
          console.error('Failed to delete this article',err);
        }
    }
  return (
    <div className='pl-10 pr-5 h-auto py-4 w-auto bg-black bg-opacity-30 backdrop-blur fixed top-[20%] left-[32%] hover:shadow-xl rounded-lg'>
         
         <h2 className='text-white font-semibold mt-5'>
            Are you sure that you want to delete this article <span className='text-2xl'>🤔</span>
         </h2>
         <div className='flex justify-between mt-10'>
             <button className='px-4 py-2 text-white bg-gradient-to-t from-indigo-400 to-purple-400 rounded-lg hover:shadow-2xl'
                     onClick={handleSubmite}
             >
                Confirm
             </button>

             <button 
                className='px-4 py-2 text-white bg-gradient-to-t from-indigo-400 to-purple-400 rounded-lg hover:shadow-2xl'
                onClick={()=>{onClose()}}
            >
                Cancel
             </button>
         </div>
    </div>
  )
}

export default DeleteArticle
