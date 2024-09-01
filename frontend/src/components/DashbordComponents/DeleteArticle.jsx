import React, { useState } from 'react'
import api from '../../api';

const DeleteArticle = ({article, onClose}) => {
     
    const [error,setError]=useState('');

    const [sucess, setSuccess]=useState(false);

    const handleSubmite= async ()=>{
        try{
          
           const res= await api.delete(`/api/articles/${article.id}/delete/`);
           if(res.status===204){
                setSuccess(true);
                setTimeout(()=>{
                   setSuccess(false);
                   window.location.reload();
                },2000);
           }

        }catch(err){
          setError('Failed to delete this article Tru again');
          console.error('Failed to delete this article',err);
        }
    }
  return (
    <div className='px-10 z-50 bg-black/50 transition-opacity duration-700  backdrop-blur  flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 hover:shadow-xl rounded-lg '>
         
         <div className='relative px-6 py-6   inline-block w-full max-w-[30rem] transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all'>
          {!sucess? (<h2 className='text-indigo-900 font-secondly text-center font-semibold mt-5'>
                         Are you sure that you want to delete this article ? <span className='text-2xl block'>🤔 </span>
                    </h2>)
                  :(
                    <h2 className='text-indigo-900 font-secondly text-center font-semibold mt-5'>
                             Are you sure that you want to delete this article ? <span className='text-2xl block'>🤔 </span>
                   </h2>
                  )
           }
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
         
    </div>
  )
}

export default DeleteArticle
