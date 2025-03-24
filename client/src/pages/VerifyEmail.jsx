import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import {toast} from "react-toastify"
import { useContext } from 'react'


const VerifyEmail = () => {

  const {backURL,isLoggedIn, userData,getUserData} = useContext(AppContext)
  const navigate = useNavigate()
  const inputRefs = useRef([])

  axios.defaults.withCredentials = true
  
  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    const otpArray = inputRefs.current.map(e=>e.value)
    const otpString = otpArray.join("")

    
    try {
      
      const {data} = await axios.post(`${backURL}/api/auth/verify-email-otp`,{otp:otpString}) 

      if(data.success){

        toast.success(data.message)
        getUserData()
        
        navigate("/")
      
      } else {
        toast.error(data.message)
      }

    } catch(error){
      toast.error(error.message)
    }
  }

  

  const handleInput = (e,index)=>{
    if(e.target.value.length>0 && index < inputRefs.current.length-1){
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index)=>{
    if (e.key==="Backspace" && e.target.value ==="" && index>0){
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e,index)=>{
    const paste = e.clipboardData.getData("text")
    const pasteArray = paste.split("") 
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char
      }
    })
  }

  useEffect(()=>{

      isLoggedIn && userData && userData.isAccountVerified && navigate("/")

    },[isLoggedIn,userData])

  return (
    <div className='relative bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen w-full flex items-center justify-center'>
      <div onClick={()=>navigate("/")} className='absolute top-5 left-5 width-full ml-10 cursor-pointer'>
        <img  src={assets.logo} alt="" />
      </div>

      
        <div className='w-[400px] sm:w-[430px] md:w-[470px] '>

        <form onSubmit={onSubmitHandler} className='bg-slate-900 w-full rounded-lg h-fit flex flex-col items-center gap-6 py-8 px-6  ' >
          <h1 className='text-2xl sm:text-3xl font-bold mt-4 text-white'>Email Verification OTP</h1>
          <p className='text-indigo-400'>Enter the 6-digit code sent to your email.</p>

          <div className='flex justify-between mb-8 w-[85%]' onPaste={handlePaste}>
            {
              Array(6).fill(0).map((_,index)=>(
                <input className='text-white text-center rounded-md text-xl bg-[#333A5C] w-12 h-12'
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => { inputRefs.current[index] = el }}
                  onInput={(e)=>handleInput(e,index)}
                  onKeyDown={(e)=>handleKeyDown(e,index)}
                  required/>
              ))
            }
          </div>
          <button type='submit' className='w-[85%] text-lg py-2 md:py-3 bg-gradient-to-r  from-indigo-500 to-indigo-800 
          hover:bg-gradient-to-tl hover:from-indigo-800 hover:to-indigo-500 rounded-full text-white mb-4 '>Verify Email</button>
          </form>
        </div>   
    </div>
  )
}

export default VerifyEmail