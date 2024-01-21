import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios"

function Register() {
  const [name, setName] = useState('');
  const [password,setPassword] =useState('');
  const [email,setEmail] =useState('');

  async function registerUser(e) {
    e.preventDefault();
    try {
    await axios.post('/register',{
        name,
        email,
        password,
      }); alert('registration succesfull');
    }catch (error) {
      alert('refistration failed')
    }
    
    }
      
    
  

  return (
    <div className='mt-4 grow flex items-center justify-around'>
    <div className='-mt-32'>
    <h1 className='text-4xl text-center mb-4'>Register</h1>
    <form className='max-w-md mx-auto border' onSubmit={registerUser}> 

      <input type="text" placeholder="Name" 
      value={name} 
      onChange={e => setName(e.target.value)}/>
      <input type="email" placeholder="youremail@.com"
      value={email} 
      onChange={e => setEmail(e.target.value)}/>
      <input type="password" placeholder="password"
      value={password} 
      onChange={e => setPassword(e.target.value)}/>
      <button className='primary '>Register</button>
      <div className='text-center py-2 text-gray-500'>Already have an account?<Link className="underline text-black" to={'/login'}>Login</Link>
      </div>
     
    </form>
    </div>
  </div>
  )
}

export default Register