import React, { useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
const ResetPassword = () => {

    const [email,setEmail]=useState('');
    const [reload, setReload]=useState(false);
    const [requestSent, setRequestSent]=useState(false);
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
            alert('error with reset password: ',err);
         }    
         
    }


  return (
    <div className='py-40'>
       resetPassword
       <form onSubmit={handleResetPasswrd} className='form-container'>
            <p className='mb-4'>Type your email here</p>
           <input type="email"
                  value={email}  
                  placeholder='example@gmail.com'
                  onChange={(e)=>setEmail(e.target.value)}      
                  className='form-input' 
                  required
           
           />
           {reload && <LoadingIndicator/>}
           <button 
                className='form-button'
                type='submit'
                
            >
                Reset 
            </button>

            
       </form>
    </div>
  )
}

export default ResetPassword
