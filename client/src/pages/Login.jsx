import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import {toast} from "react-toastify"
import { useContext } from 'react'

const Login = () => {
  
  const navigate = useNavigate()
  const [state,setState] = useState("Sign up")
  const {isLoggedIn,backURL,userData,setIsLoggedIn} = useContext(AppContext)
  const [name,setName]  = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


  axios.defaults.withCredentials = true

  const login = async ()=>{
    try{
            const {data} = await axios.post(`${backURL}/api/auth/login`,{
            email,
            password
          })

          if (data.success){
            setIsLoggedIn(true)
            toast.success(data.message)
            
            setEmail("")
            setPassword("")

            navigate("/")
          
          } else {
            toast.error(data.message)
          }

    } catch(error){
          toast.error(error.message)
    }
  }

  const signup = async ()=>{
    try{
      const {data} = await axios.post(`${backURL}/api/auth/register`,{
        name,  
        email,
        password
    })

    if (data.success){
      setIsLoggedIn(true)
      toast.success(data.message)
      
      setName("")
      setEmail("")
      setPassword("")
      
      navigate("/")
    
    } else {
      toast.error(data.message)
    }

} catch(error){
    toast.error(error.message)
}
  }

  const onsubmitHandler =(e)=>{
    e.preventDefault()
    state==="Sign up"? signup() : login()
  }
  

  
  
  return (
    <div className='relative bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen w-full flex items-center justify-center'>
      <div onClick={()=>navigate("/")} className='absolute top-5 left-5 width-full ml-10 cursor-pointer'>
        <img  src={assets.logo} alt="" />
      </div>

      
        <div className='w-[320px] sm:w-[350px] md:w-[370px]'>
        <form onSubmit={onsubmitHandler} className='bg-slate-900 w-full rounded-lg h-fit flex flex-col items-center gap-3 py-4 px-3  ' >
          <h1 className='text-2xl sm:text-3xl font-bold mt-4 text-white'>{state==="Sign up"?"Create Account":"Login"}</h1>
          <p className=' text-indigo-200 mb-2 sm:mb-3'>{state==="Sign up"?"Create your account":"Login in to your account"}</p>
          {state==="Sign up" && (<div className='flex items-start gap-2 bg-[#464c6c] w-[85%] rounded-full mb-2 '>
            <img className='ml-4 mt-3' src={assets.person_icon} alt="" />
            
            <input className='outline-none text-white px-3 py-[4px] sm:py-[6px] md:py-[7px] rounded-full bg-transparent placeholder:text-gray-400 placeholder:text-sm placeholder:font-light w-full' type="text"
              placeholder='Full Name' 
              value={name}
              onChange={(e)=>setName(e.target.value)}/>
          </div>) }
          

          <div className='mb-2 flex items-start gap-2 bg-[#464c6c] w-[85%] rounded-full '>
            <img className='ml-4 mt-3' src={assets.mail_icon} alt="" />
            
            <input className='outline-none py-[4px] sm:py-[6px] md:py-[8px] px-3  rounded-full bg-transparent text-white placeholder:text-gray-400 placeholder:text-sm placeholder:font-light w-full' type="text" 
              placeholder='Email id'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className='mb-2 flex items-start gap-2 bg-[#464c6c] w-[85%]  rounded-full '>
            <img className='ml-4 mt-3' src={assets.lock_icon} alt="" />
            
            <input className='outline-none text-white py-[4px] sm:py-[6px] md:py-[7px] px-3  rounded-full bg-transparent placeholder:text-gray-400 placeholder:text-sm placeholder:font-light w-full' type="text" 
              placeholder='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <p className='text-indigo-500 font-light text-sm mr-28 sm:mr-36 md:mr-40 cursor-pointer'>Forgot password ?</p>
          <button  className='w-[85%] text-lg py-1 md:py-2 bg-gradient-to-r  from-indigo-500 to-indigo-800 hover:bg-gradient-to-tl hover:from-indigo-800 hover:to-indigo-500 rounded-full text-white'>{state==="Sign up"?"Sign up":"Login"}</button>
          <p className='text-indigo-300 text-[15px] mb-5 mr-6 md:mb-7 sm:mr-12 md:mr-16'>{state==="Sign up"?"Already have an account?":"Don't have an account?"} <span onClick={()=>setState(state==="Sign up"?"Login":"Sign up")} className='text-indigo-500 underline cursor-pointer'>{state==="Sign up"?"Login":"Sign up"}</span></p>
          </form>
        </div>   
    </div>
  )
}

export default Login