import React, { useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../api';
import LoadingIndicator from '../components/LoadingIndicator';

const Activate = () => {
     
  const {uid, token}=useParams();
  const navigate=useNavigate();
  const [verified, setVerified]=useState(false);
  const [error,setError]=useState('');

  const [reload, setReload]=useState(false)
  
  const verifyAccount=async()=>{
      try{
 
        const res= await api.post('/auth/users/activation/',{uid, token});
        setReload(true);
        if(res.status===204){

          setVerified(true);

        }else{

          setError('Verification faild, please try again');

        }

      }catch(error){

        setError('Something went wrong, please try again');

      }
  }


  if(verified){
    navigate('/login')
  }


  return (
    <div className='py-40'>
       <div className='form-container'>

          <h1> Verify your account now </h1>

          {error && <p className='text-n-3 my-3'>Error: {error}</p>}

            {reload && <LoadingIndicator/>}
         
          <button onClick={verifyAccount} className='form-button'>
             Verify
          </button>

       </div>

    </div>
  )
}

export default Activate
