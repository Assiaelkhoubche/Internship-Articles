import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import LoadingIndicator from './LoadingIndicator';
import useAuthenticated from '../hooks/useAuthenticated';
import { useAuth } from '../hooks/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const UserForm = ({route, method}) => {

    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [messgae,setMessage]=useState(false);
    const {setIsAuthenticated}=useAuth();
    const [loading, setLoading]= useState(false);




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
            
            if(res.ok){    
               alert(`we sent the verifacation to ${email} please check it before login`)
            }


            if(method==='login'){

                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setIsAuthenticated(true);
                navigate('/');
                
            }else{
                navigate('/login')
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
     <div className='form-container'>
         <form onSubmit={handleSubmit} className=''>
              <h1>{name}</h1>
              { method==='register' && (
                <>
                    <input
                      className='form-input'
                      type="text"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      placeholder='first name...'
         
                      />
                      <input
                      className='form-input'
                      type="text"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      placeholder='last name...'
         
                      />
                </>
              )}
              <input type="email"
                     className='form-input'
                     onChange={(e)=>setEmail(e.target.value)}
                     value={email}
                     placeholder='example@gmail.com'
              />
              <input type="password"
                     className='form-input'
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     placeholder='password...'
              />
              {method==='register' && (
         
                    <input  className='form-input'
                            type='password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            placeholder='confirm password...'
         
         
                    />
              )}
              {loading && <LoadingIndicator/>}
              <button
                 className='form-button'
                 type='submit'
              >
                  {name}
              </button>
         
              {method==='register' ? (
         
         
                      <p>
                          if you have an account
                          <Link to='/login' className='text-n-1 mx-3 hover:underline font-bold '>
                              Login
                          </Link>
         
                      </p>
         
         
              ):(
         
                    <>
                        <p>
                            if you didn't have an account
                            <Link to='/register' className='text-n-1 font-bold mx-3 hover:underline'>
                                Sign up
                            </Link>
                        </p>
                        <p>
                            Forgot password ?
                            <Link to='/reset-password' className='text-n-1 mx-3 hover:underline font-bold '>
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
     </div>
  )
}

export default UserForm
