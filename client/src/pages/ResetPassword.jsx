import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'
import axios from "axios"
import {toast} from "react-toastify"
import { useContext } from 'react'

const ResetPassword = () => {
  const navigate = useNavigate()
  const {backURL} = useContext(AppContext)
  const inputRefs = useRef([])

  const [email,setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [otp, setOtp] = useState(0)
  const [isOtpSet,setIsOtpSet] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  axios.defaults.withCredentials = true

  const onSubmitEmail = async (e)=>{
    e.preventDefault()

    try {
      const {data} = await axios.post(`${backURL}/api/auth/send-resetotp`,{email})
      toast.success(data.message)
      data.success && setEmailSent(true)
    } catch(error){
      toast.error(error.message)
    }
  }

  const onSubmitOtp = (e)=>{
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    const otpString = otpArray.join("")
    setOtp(otpString)
    setIsOtpSet(true)
  }

  const onSubmitNewPassword = async (e)=>{
    e.preventDefault()

    try {
      const {data} = await axios.post(`${backURL}/api/auth/reset-password`,{
      email,
      otp,
      newPassword
    })

    data.success && toast.success(data.message)
    data.success && navigate("/login")

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

  return (
    <div className='relative bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen w-full flex items-center justify-center'>
      <div onClick={()=>navigate("/")} className='absolute top-5 left-5 width-full ml-10 cursor-pointer'>
        <img  src={assets.logo} alt="" />
      </div>

      {/* Email input section */}

      {!emailSent && 
      <div className='w-[320px] sm:w-[350px] md:w-[370px]'>
        <form onSubmit={onSubmitEmail}  className='bg-slate-900 w-full rounded-lg h-fit flex flex-col items-center gap-3 py-6 px-4  ' >
          <h1 className='text-2xl sm:text-3xl font-bold mt-4 text-white'>Reset Password</h1>
          <p className=' text-indigo-200 mb-2 sm:mb-3'>Enter your registerd email address.</p>
    
          <div className='mb-2 flex items-start gap-2 bg-[#464c6c] w-[85%] rounded-full '>
            <img className='ml-5 mt-4' src={assets.mail_icon} alt="" />
            
            <input className='outline-none py-[8px] sm:py-[9px] text-sm md:py-[12px] px-3  
            rounded-full bg-transparent font-light text-white placeholder:text-gray-400 placeholder:text-sm placeholder:font-light w-full' 
              type="email" 
              placeholder='Email id'
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <button type='submit' className='w-[85%] text-lg py-2 md:py-2 bg-gradient-to-r  from-indigo-500 to-indigo-800 
          hover:bg-gradient-to-tl hover:from-indigo-800 hover:to-indigo-500 rounded-full text-white mb-6'>Submit</button>
          </form>
        </div> 
      }
        
        

        {/* Password reset otp section */}

        {emailSent && !isOtpSet && 
        
        <div className='w-[370px] sm:w-[400px] md:w-[440px] '>
        <form onSubmit={onSubmitOtp} className='bg-slate-900 w-full rounded-lg h-fit flex flex-col items-center gap-6 py-6 px-6  ' >
          <h1 className='text-2xl sm:text-3xl font-bold mt-4 text-white'>Password Reset OTP</h1>
          <p className='text-indigo-400'>Enter the 6-digit code sent to your email.</p>

          <div className='flex justify-between mb-6 w-[85%]' onPaste={handlePaste}>
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
          <button type='submit' className='w-[85%] text-lg py-2 md:py-2 bg-gradient-to-r  from-indigo-500 to-indigo-800 
          hover:bg-gradient-to-tl hover:from-indigo-800 hover:to-indigo-500 rounded-full text-white mb-4 '>Submit</button>
          </form>
        </div>  }

        

            {/* New Password Input */}
        
        {emailSent && isOtpSet && 
        
        <div className='w-[320px] sm:w-[350px] md:w-[370px]'>
          <form onSubmit={onSubmitNewPassword}  className='bg-slate-900 w-full rounded-lg h-fit flex flex-col items-center gap-3 py-6 px-3  ' >
            <h1 className='text-2xl sm:text-3xl font-bold mt-4 text-white'>Enter Password</h1>
            <p className=' text-indigo-200 mb-2 sm:mb-3'>Enter your new password</p>
              
    
            <div className='mb-2 flex items-start gap-2 bg-[#464c6c] w-[85%]  rounded-full relative '>
              <img className='ml-6 mt-4' src={assets.lock_icon} alt="" />
              <input className='outline-none text-sm text-white font-light py-[8px] sm:py-[9px] md:py-[12px] px-3  
              rounded-full bg-transparent placeholder:text-gray-400 placeholder:text-sm placeholder:font-light w-full' 
                type="password" 
                placeholder='Password'
                required
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>
            <button type='submit' className='w-[85%] text-lg py-1 md:py-2 bg-gradient-to-r  
            from-indigo-500 to-indigo-800 hover:bg-gradient-to-tl 
            hover:from-indigo-800 hover:to-indigo-500 rounded-full text-white mb-6'>Reset password</button>
          </form>
        </div>   
        }

        
    </div>
  )
}

export default ResetPassword