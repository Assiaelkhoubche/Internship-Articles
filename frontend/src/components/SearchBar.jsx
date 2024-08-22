import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
   <div className=' relative w-[75%]'>
        <div className='relative flex items-center w-full'>
             <input type='search' placeholder='Search for articles' className='w-full p-4 rounded-full bg-indigo-200 border-solid border-2 border-transparent focus:border-indigo-500 focus:caret-indigo-500 outline-none'/>
             <button className='absolute right-1 top-1/2 bu p-4  -translate-y-6  bg-indigo-400 rounded-full'>
                <FaSearch className='text-indigo-800'/>
             </button>

        </div>
        
        {/* <div className='abolute top-20 p-4'>
            
        </div> */}

   </div>
  )
}

export default SearchBar
