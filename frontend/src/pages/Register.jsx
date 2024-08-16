import React from 'react'
import UserForm from '../components/UserForm'
const Register = () => {
  return (
    <div className='py-40'>
          <UserForm route='/auth/users/' method='register'/>
    </div>
  )
}

export default Register
