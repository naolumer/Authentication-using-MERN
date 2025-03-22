import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full h-fit flex items-center justify-center ' >
        <div className='flex flex-col gap-2 items-center justify-center mt-32  '>
            <img className='aspect-square w-28 md:w-36 rounded-full mt-12 bg- ' src={assets.header_img} alt="" />
        <div className='flex items-center gap-4'>
            <p className='text-2xl md:text-3xl'>Hey Developer </p>
            <img className='w-10' src={assets.hand_wave} alt="" />
        </div>
        <div className="flex flex-col items-center gap-4 mx-8">
           <h1 className="text-black text-4xl md:text-5xl mt-3 font-semibold">Welcome to our app</h1>
           <p className='text-center text-gray-600 text-md'>Let's start with a quick product tour and we will have you <br /> up and running in no time!</p>
        </div>
        <button onClick={()=>navigate("/login")} className='py-2 px-8 md:px-10 md:py-3  border-2 font-md border-gray-400 mt-6 rounded-full hover:border-indigo-600'>Get started</button>
        </div> 
    </div>
    
  )
}

export default Header