import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();

  const {isLoggedIn,setIsLoggedIn,userData,setUserData,backURL} = useContext(AppContext)

  const sendVerificationOtp = async ()=>{
    try {
      axios.defaults.withCredentials = true
      
      const {data} = await axios.post(`${backURL}/api/auth/send-verifyotp`)

      if (data.success){
        toast.success(data.message)
        navigate("/verify-email")
      } else {
        toast.error(data.message)
      }

      
    } catch(error){
      toast.error(error.message)
    }
    
  }
  
  

  const logout = async()=>{
    try {
      
      const {data} = await axios.post(`${backURL}/api/auth/logout`)
       if(data.success){
        setIsLoggedIn(false)
        setUserData(false)
        navigate("/")
        
       } else {
        toast.error(data.message)
       }
    } catch(error){
      toast.error(error.message)
    } 
  }

  return (
    <div className="absolute top-0 left-0 right-0 w-full">
      <div className="mx-8 md:mx-14 flex justify-between items-center p-5 bg-transparent">
        <img
          onClick={() => navigate('/')}
          className="cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        {userData ? 
            <div className="bg-gray-600  text-white rounded-[50%] px-4 py-2 text-lg font-semibold cursor-pointer group relative"> 
              {userData.name[0].toUpperCase()}
              <div className='absolute hidden z-10 group-hover:block top-10 right-6 w-[130px] '>
                <ul className='flex flex-col gap-2 items-start bg-gray-50 rounded-sm text-sm text-gray-700 p-2 w-full'>
                  {userData.isAccountVerified?"":<li onClick={sendVerificationOtp} className='hover:bg-gray-200 p-2 rounded-md w-full '>Verify email</li>}
                  <li onClick={logout} className='hover:bg-gray-200 p-2 rounded-md w-full'>Logout</li>
                </ul>
              </div>
            </div>
        :
        <div onClick={()=>navigate("/login")} className="flex items-center border gap-2 border-gray-400 rounded-full py-2 px-5 md:px-6 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer mt-2">
          <p  className="text-lg font-semibold text-indigo-900">Login</p>
          <img className="font-bold" src={assets.arrow_icon} alt="Arrow Icon" />
        </div> }
        
      </div>
    </div>
  );
};

export default Navbar;