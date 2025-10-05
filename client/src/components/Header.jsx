import React, { useRef } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext.jsx';

function Header() {

  const {input, setInput} = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e)=> {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = ()=> {
    setInput('')
    inputRef.current.value = ''
  }


  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      
      {/* Top Section */}
      <div className='text-center mt-24 mb-12 relative z-10'>
        
        {/* Badge - Elevated to match the blue theme and 3D aesthetic */}
        <div className='inline-flex items-center justify-center gap-3 px-6 py-1.5 mb-6 border border-blue-400/40 bg-blue-500/10 backdrop-blur-sm rounded-full text-sm text-blue-600 font-medium shadow-md transition-all duration-300 hover:shadow-lg'>
          <p className='tracking-wide'>✨ New: AI Feature integrated</p>
          <img src={assets.star_icon} alt="" className='w-3 animate-pulse' />
        </div>

        {/* Heading - 3D Text Effect using layered drop-shadow */}
        <h1 className='text-4xl sm:text-6xl font-extrabold leading-snug text-gray-900 
                       drop-shadow-[0_4px_8px_rgba(0,0,0,0.1),_0_8px_25px_rgba(0,0,0,0.15)]'> 
          Your own <span className='text-blue-600 drop-shadow-[0_5px_10px_rgba(37,99,235,0.4)]'>blogging</span> <br /> platform.
        </h1>

        {/* Subtext */}
        <p className='my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-sm text-gray-700 leading-relaxed'>
          This is your space to think out loud, to share what matters, and to 
          write without filters. Whether it's one word or a thousand, your story starts right here.
        </p>

        {/* Search Bar - Strong 3D Lucid Glass Card Effect */}
        <form 
          onSubmit={onSubmitHandler} 
          className='flex justify-between max-w-lg mx-auto border border-white/40 bg-white/50 backdrop-blur-xl rounded-xl overflow-hidden 
                     shadow-2xl shadow-gray-400/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500'
        >
          <input ref={inputRef}
            type="text" 
            placeholder='Search for blogs' 
            required 
            className='w-full pl-6 py-3 text-gray-800 placeholder-gray-500 outline-none bg-transparent'
          />
          <button 
            type='submit' 
            className='bg-blue-600 text-white px-8 py-2 m-2 rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg'
          >
            Search
          </button>
        </form>
      </div>

      {/* Clear Search Button - Styled to match the minimalist aesthetic */}
      <div className='text-center mt-3' >
        { input && <button 
          onClick={onClear} 
          className='border border-gray-300 font-medium text-xs py-1 px-4 rounded-full shadow-sm cursor-pointer text-gray-600 bg-white hover:bg-gray-50 transition-all duration-300' 
        >
          Clear Search
        </button> }
      </div>

      {/* Background Glow (to enhance the floating 3D effect) */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute w-96 h-96 rounded-full bg-blue-500/20 -top-40 left-1/4 -translate-x-1/2 blur-3xl opacity-50 animate-pulse-slow' ></div>
        <div className='absolute w-96 h-96 rounded-full bg-cyan-500/20 -bottom-20 right-1/4 translate-x-1/2 blur-3xl opacity-50 animate-pulse-slow-reverse'></div>
      </div>
    </div>
  )
}

export default Header
