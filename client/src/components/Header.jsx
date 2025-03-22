import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='w-full h-fit flex items-center justify-center ' >
        <div className='flex flex-col gap-2 items-center justify-center mt-32 '>
            <img className='aspect-square w-32 md:w-40 rounded-full mt-12 bg- ' src={assets.header_img} alt="" />
        <div className='flex items-center gap-4'>
            <p className='text-3xl font-semibold'>Hey Developer </p>
            <img className='w-12' src={assets.hand_wave} alt="" />
        </div>
        <div className="flex items-center justify-center h-screen">
           <h1 className="text-black text-6xl font-bold">Welcome to My Website</h1>
        </div>
        </div> 
    </div>
    
  )
}

export default Header