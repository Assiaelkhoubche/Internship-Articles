import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant';
import LoadingIndicator from './LoadingIndicator';
import useAuthenticated from '../hooks/useAuthenticated';
import { useAuth } from '../hooks/AuthProvider';



const UserForm = ({route, method}) => {

    const [username, setUserName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const [loading, setLoading]= useState(false);




    const navigate=useNavigate();

    const {setIsAuthenticated}=useAuth();

    const name=method==='login'?'Login':'Sign up'
    
    const handleSubmit=async (e)=>{

        e.preventDefault();
        setLoading(true);

        try{

           
            let dataRequest 

             if(method==='login'){
               dataRequest={email,password}
             }else{
               dataRequest={username, email, password, re_password:confirmPassword}
             }

            const res= await api.post(route, dataRequest);

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
                alert('error resonse in=>',err.response.data);
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
     <form onSubmit={handleSubmit} className='form-container'>
          <h1>{name}</h1>
          { method==='register' && (
            <input 
              className='form-input'
              type="text"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
              placeholder='username...'
              
              />
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
  )
}

export default UserForm
