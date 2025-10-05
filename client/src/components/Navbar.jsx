import React from 'react'
import { assets } from "../assets/assets";
// Removed unused imports (useNavigate, axios)
import { useAppContext } from '../context/AppContext';

function Navbar() {

  const {navigate, token} = useAppContext();

  return (
    // Thinner, cleaner floating container that is full-width (edge to edge)
    <div className='sticky top-0 z-30 flex items-center justify-between py-1 
                    backdrop-blur-xl bg-white/80 border-b border-gray-200 
                    shadow-lg transition-all duration-300 px-5 md:px-16 xl:px-32'>
      
      {/* Logo - Made smaller and added rounded-full */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt='logo'
        // Adjusted size approximation for w-18 and w-24, added rounded-full
        className='w-20 sm:w-24 cursor-pointer transition-transform duration-300 hover:scale-[1.03] drop-shadow-sm rounded-full'
      />

      {/* Button - Made larger by increasing padding */}
      <button
        onClick={() => navigate('/admin')}
        className='flex items-center gap-2 rounded-full text-m font-medium px-6 sm:px-8 py-2 transition-all duration-300 
          bg-blue-600 text-white shadow-md 
          hover:scale-[1.03] hover:shadow-lg hover:bg-blue-700'
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt='arrow' className='w-3 invert' />
      </button>
    </div>
  );
}

export default Navbar
