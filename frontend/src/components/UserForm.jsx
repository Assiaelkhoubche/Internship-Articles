import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import LoadingIndicator from './LoadingIndicator';
import { useAuth } from '../hooks/AuthProvider';
import register from '../assets/register.svg'
import { FaUser, FaUserLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {motion} from 'framer-motion'
import { fadeIn } from '../variants';

const UserForm = ({route, method}) => {

    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const {setIsAuthenticated}=useAuth();
    const [loading, setLoading]= useState(false);
    const [success, setSuccess]=useState(false);
    const [message, setMessage]=useState('');








    const navigate=useNavigate();

    useEffect(()=>{
        // global google
        // initialize google client
        google.accounts.id.initialize({
           client_id:import.meta.env.VITE_CLIENT_ID,
           callback: handleGoogleSignIn
        });
        
        // initialize google button
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme:"outline", size:"large", text:"continue_with", shape:"circle", width:"280"}
        );
            
    },[])
     
    // we gonna get a response from google site

    const handleGoogleSignIn = async (token) => {
         console.log(token)
         console.log(token.credential)
         

         try{
              const res= await api.post('/api/google/',{access_token: token.credential})
              console.log('res= ',res)
              
              const {access, refresh}=res.data.tokens
              if(res.status===200){
                    
                  localStorage.setItem(ACCESS_TOKEN, access);
                  localStorage.setItem(REFRESH_TOKEN, refresh);
                  setIsAuthenticated(true);
                  navigate('/');
                  
              }else{
                  console.log('the status of google sin in is not 200');
                  setIsAuthenticated(false);
              }

         }catch(err){
             console.log('Error for sending post request',err)
         }
    }
      
   
  

    

    const name=method==='login'?'Login':'Sign up'
    
    const handleSubmit=async (e)=>{

        e.preventDefault();
        setLoading(true);

        try{

           
            let dataRequest 

             if(method==='login'){
               dataRequest={email,password}
             }else{
               dataRequest={first_name: firstName, last_name: lastName, email, password, re_password:confirmPassword}
             }

            const res= await api.post(route, dataRequest);
            
            if(res.status===201){    
               setSuccess(true);
            }

            // if(res.status===200){
            //       console.log('hhhhhhhhhhhhhhhhhhhhhhhhloggggg');
            //       setSuccess(true);
            // }


            if(method==='login' && res.status===200){

                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setIsAuthenticated(true);
                setSuccess(true);
                setMessage('You have suuccessfylly logged in !');

                setTimeout(()=>{
                    navigate('/');
                    setSuccess(false);
                    
                },3000);
                
            }
            if(method==='register' && res.status===201){
                setSuccess(true);
                setMessage('Check your email to verify your account!');

                setTimeout(()=>{

                    setSuccess(false);
                    navigate('/login');

                },3000);
            }

        }catch(err){

            if(err.response){
                alert('error resonse in=>'+err.response);
            }else if(err.request){
                alert('No response from the server');
            }else{
                alert('error: '+err.message);
            }
        }finally{
            setLoading(false);
        }
    }
  return (
     <div className='relative max-w-screen-2xl  mx-auto flex flex-col md:flex-row max-md:items-center md:px-4 max-md:gap-10 gap-4 justify-between  lg:px-20'>
         
         <motion.div 
            variants={fadeIn('down',0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount:0.7}}
            className='lg:w-1/2 max-md:w-1/2 md:px-10'
         >
            <img src={register} alt="register" />  
         </motion.div>

         <motion.div className='w-1/2 max-md:w-3/4 lg:px-20  '
                      variants={fadeIn('up',0.2)}
                      initial='hidden'
                      whileInView={'show'}
                      viewport={{once:false, amount:0.7}}
         >
             <form onSubmit={handleSubmit} className='flex flex-col gap-6 mb-4 font-secondly justify-center text-center [&>button]:mx-auto [&>LoadingIndicator]:mx-auto  '>
                  <h1 className='font-bold text-xl text-indigo-800'>{name}</h1>
                  { method==='register' && (
                    <div className='flex  gap-4 w-full'>

                        <div className='divinput '>
                            <input
                              className='input'
                              type="text"
                              value={firstName}
                              onChange={(e)=>setFirstName(e.target.value)}
                              placeholder='first name...'
                              />
                              <FaUser className='inline-block text-neutral-700'/>
                        </div>

                          <div className='divinput'>
                              <input
                              className='input'
                              type="text"
                              value={lastName}
                              onChange={(e)=>setLastName(e.target.value)}
                              placeholder='last name...'
                              />
                              <FaUser className='inline-block text-neutral-700'/>
                          </div>
                    </div>
                  )}
                  <div className='divinput '>
                      <input type="email"
                             className='input'
                             onChange={(e)=>setEmail(e.target.value)}
                             value={email}
                             placeholder='example@gmail.com'
                      />
                      <MdMarkEmailUnread size={20} className='inline-block text-neutral-700 '/>
                  </div>
                 <div className='divinput'>
                     
                     <input type="password"
                            className='input'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder='password...'
                     />
                     <FaUserLock size={20} className='inline-block text-neutral-700 '/>
                 </div>
                  {method==='register' && (
             
                        <div className='divinput'>
                            <input  className='input'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    placeholder='confirm password...'
                            />
                            <RiLockPasswordFill size={20} className='inline-block text-neutral-700'/>
                        </div>
                  )}
                  {loading && <LoadingIndicator/>}
                  <button
                     className='py-2  bg-gradient-to-tr from-indigo-400  to-purple-400 font-secondly hover:from-indigo-500 hover:to-purple-500 font-bold text-white w-1/3 rounded-md '
                     type='submit'
                  >
                      {name}
                  </button>
             
                  {method==='register' ? (
             
             
                          <p className='text-center'>
                              if you have an account
                              <Link to='/login' className='text-n-3 mx-3 hover:underline font-bold '>
                                  Login
                              </Link>
             
                          </p>
             
             
                  ):(
             
                        <>
                            <p>
                                if you didn't have an account
                                <Link to='/register' className='text-n-3 font-bold mx-3 hover:underline'>
                                    Sign up
                                </Link>
                            </p>
                            <p>
                                Forgot password ?
                                <Link to='/reset-password' className='text-n-3 mx-3 hover:underline font-bold '>
                                    Reset password
                                </Link>
             
                            </p>
                        </>
                  )
             
                  }
             </form>
             
             <div className='googleContainer'>
                    <div id="signInDiv" ></div>
                     </div>
         </motion.div>
         {success && (
            <motion.div className=' absolute left-0 right-0 top-0 buttom-0 m-auto flex justify-center items-center w-[50%] h-[40%] bg-gradient-to-br from-indigo-400 to-purple-400 bg-opacity-10 rounded-3xl '
                        variants={fadeIn('down',0)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{once:false, amount:0.3}}
            >
                 <h1 className='text-white font-secondly font-bold text-3xl mx-2 text-center'> {message} </h1>
            </motion.div>
         )}
     </div>
  )
}

export default UserForm
