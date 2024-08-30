import React, { useState } from 'react'
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import confirmed from '../assets/confirmed.svg';

const ResetPasswordConfirm = () => {
    
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [reload, setReload]=useState(false);
    const navigate=useNavigate();
    const {uid, token}=useParams();

   const handleSubmit=async (e)=>{
         e.preventDefault();
         setReload(true);

        try{

           const res= await api.post('/auth/users/reset_password_confirm/',{uid, token , new_password:password, re_new_password:confirmPassword});

           if(res.status===204){
              setReload(false);
              navigate('/');
           }else{
             alert('error with response: '+ res.data || 'Unknown error')
              setReload(false);
            }

        }catch(err){
           if(err.response){
             alert('error is stand from the response =>', err.response.data.detail);
           }else if(err.request){
             alert('No response from the server', err);
           }else{
              alert('Error: ',err);
           }
        }

   }

  return (
    <div className='py-40 max-w-screen-2xl  mx-auto flex flex-col md:flex-row max-md:items-center md:px-16 max-md:gap-10 gap-10 justify-between  lg:px-20'>
       
       <div className='w-1/2 '>
           <img src={confirmed} alt="confirmed" />
       </div>

       <div className='w-1/2 max-md:w-3/4 lg:px-20 max-md:mt-10'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-4 font-secondly justify-center text-center [&>button]:mx-auto [&>LoadingIndicator]:mx-auto'>
             <h1 className='font-bold text-xl text-indigo-800 mb-2'>Confirm your password</h1>

             <div className='divinput'>
                <input type="password"
                       className='input'
                       value={password}
                       placeholder='new password...'
                       onChange={(e)=>setPassword(e.target.value)}
                       required
                />
             </div>
                 <div className='divinput'>
                    <input type="password"
                       className='input'
                       value={confirmPassword}
                       placeholder='confirm password...'
                       onChange={(e)=>setConfirmPassword(e.target.value)}
                       required
                                 />
                 </div>
             {reload && <LoadingIndicator/>}
             <button className='py-2  bg-gradient-to-tr from-indigo-400  to-purple-400 font-secondly hover:from-indigo-500 hover:to-purple-500 font-bold text-white w-1/3 rounded-md'>
                  Confirm
             </button>
          </form>
       </div>
    </div>
  )
}

export default ResetPasswordConfirm
