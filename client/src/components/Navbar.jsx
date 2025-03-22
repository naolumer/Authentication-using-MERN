import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 right-0 w-full">
      <div className="mx-8 md:mx-14 flex justify-between items-center p-5 bg-transparent">
        <img
          onClick={() => navigate('/')}
          className="cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        <div className="flex items-center gap-2 border border-gray-400 rounded-full py-2 px-6 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
          <p className="text-lg font-semibold text-indigo-900">Login</p>
          <img className="font-bold" src={assets.arrow_icon} alt="Arrow Icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;