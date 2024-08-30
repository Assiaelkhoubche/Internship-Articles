import React, { useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../api';
import LoadingIndicator from '../components/LoadingIndicator';
import verify from '../assets/verify.svg'
import {motion} from 'framer-motion'
import { fadeIn } from '../variants';



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
    <div className='py-40 max-w-screen-2xl  mx-auto flex flex-col md:flex-row max-md:items-center md:px-4 max-md:gap-10 gap-4 justify-between  lg:px-20'>
        
        <div className='w-1/2 '>
           <img src={verify} alt="verify" />
        </div>
         
       <div className=' w-1/2 text-center space-y-8 md:pt-10'>

          <h1 className='text-center font-secondly font-bold text-2xl text-indigo-800' > Verify your account now </h1>

           {error && <p className='text-red-700 my-3'>Error: {error}</p>}

            {reload && <LoadingIndicator/>}

          <p className='font-secondly text-n-4'>if you don't verify your account now, you won't be able to access  articles</p>  
         
          <button onClick={verifyAccount} className='bg-gradient-to-tr from-indigo-400 to-purple-400 font-bold font-secondly text-white px-10 py-3 rounded-md hover:from-indigo-500 hover:to-purple-500'>
             Verify
          </button>

       </div>

    </div>
  )
}

export default Activate
