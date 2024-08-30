import React, { useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import forgot from '../assets/forgot.svg';
import { MdMarkEmailRead, MdError } from "react-icons/md";


const ResetPassword = () => {

    const [email,setEmail]=useState('');
    const [reload, setReload]=useState(false);
    const [error, setError]=useState('')
    const navigate=useNavigate();


    const handleResetPasswrd= async (e)=>{

        e.preventDefault();
        setReload(true);

         try{
            const res= await api.post('/auth/users/reset_password/',{email});

            if(res.status===204){
                setReload(false);
                navigate('/');
     
            } 

         }catch(err){
            setError('An Error occurred during this operation, please try again later');
            setTimeout(() => {
              setReload(false);
            }, 1000);
         }    
         
    }


  return (
    <div className='py-40 max-w-screen-2xl  mx-auto flex flex-col md:flex-row max-md:items-center md:px-16 max-md:gap-10 gap-10 justify-between  lg:px-20'>
       
       <div className='w-1/2 '>
           <img src={forgot} alt="verify" />
       </div>

       <div className='w-1/2 max-md:w-3/4 lg:px-20 max-md:mt-10'>
         
         <form onSubmit={handleResetPasswrd} className='flex flex-col gap-6 mb-4 font-secondly justify-center text-center [&>button]:mx-auto [&>LoadingIndicator]:mx-auto'>
              {error && <p className='font-secondly text-red-600 text-center flex items-center'>{error} <span> <MdError size={20}/> </span></p>}
              <h1 className='font-bold text-xl text-indigo-800'>Type your email here</h1>
               <p className='font-secondly text-n-4 mt-2 text-center'>Please enter your email address to receive your confirmed password</p>
             <div className='divinput mx-4 '>

               <input type="email"
                      value={email}
                      placeholder='example@gmail.com'
                      onChange={(e)=>setEmail(e.target.value)}
                      className='input'
                      required
               />
                <MdMarkEmailRead size={25} className='inline-block text-neutral-700'/>
             </div>

             {reload && <LoadingIndicator/>}
             <button
                  className='py-2  bg-gradient-to-tr from-indigo-400  to-purple-400 font-secondly hover:from-indigo-500 hover:to-purple-500 font-bold text-white w-1/3 rounded-md '
                  type='submit'
         
              >
                  Reset
              </button>
         
         </form>
       </div>
    </div>
  )
}

export default ResetPassword
