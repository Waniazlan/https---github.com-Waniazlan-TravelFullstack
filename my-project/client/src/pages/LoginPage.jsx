import axios from 'axios'
import React from 'react'
import {useContext, useState } from 'react'
import {Link,Navigate} from "react-router-dom"
import {UserContext} from '../UserContext.jsx'

export default function LoginPage() {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const [redirect,setRedirect] = useState (false)

  const {setUser} = useContext(UserContext);


  async function handleSubmit(e){
    e.preventDefault();
    try {
    const {data} = await axios.post('/login',{email,password});
    setUser(data);

      alert('login succesfull')
      setRedirect(true);
    } catch (e) {
      alert('login failed')
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-32'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto border' onSubmit={handleSubmit}> 
        <input type="email" 
        placeholder="youremail@.com" 
        value={email} 
        onChange={e =>setEmail(e.target.value)}/>

        <input type="password" placeholder="password"
        value={password} 
        onChange={e =>setPassword(e.target.value)}/>

        <button className='primary '>Login</button>
        <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link>
        </div>
       
      </form>
      </div>
    </div>
  )
}
