import React, { useState } from 'react'
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

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
             alert('error with response: '+ res.data.detail || 'Unknown error')
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
    <div className='py-40'>
       ResetPassword Confirm

       <form onSubmit={handleSubmit} className='form-container'>

          <h1 className='mb-4'>Confirm your password</h1>
          <input type="password"
                 className='form-input'
                 value={password}
                 placeholder='new password...'
                 onChange={(e)=>setPassword(e.target.value)}
                 required
          />
              <input type="password"
                 className='form-input'
                 value={confirmPassword}
                 placeholder='confirm password...'
                 onChange={(e)=>setConfirmPassword(e.target.value)}
                 required
          />
          {reload && <LoadingIndicator/>}
          <button className='form-button'>
               Confirm 
          </button>


       </form>
    </div>
  )
}

export default ResetPasswordConfirm
