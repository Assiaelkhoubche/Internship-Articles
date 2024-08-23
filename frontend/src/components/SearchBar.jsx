

import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import api from '../api';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({onSearchByTag}) => {

    const [activeSearch, setActiveSearch]=useState([]);
    const [searchTerm, setSearchTerm]=useState('');
    const [hideSearch,setHideSearch]=useState(true);
    const [tags, setTags]=useState([]);
    const [searchParams, setSearchParams]=useSearchParams();

    const searchTermFromPrams=searchParams.get('q')|| '';

    useEffect(()=>{

       getTags();
       
    },[]);

   // get tags for search     
    const getTags = async ()=>{
        
         try{

            const res= await api.get('/api/tags/');
            setTags(res.data);

         }catch(err){
            console.log('error  for get Tags', err);
         }

     }

    useEffect(()=>{
       
       if(searchTerm.trim()!==''){

         const filteredTags = tags.filter(tag=>tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
         setActiveSearch(filteredTags);
         setHideSearch(true);
         

       }else{
          setActiveSearch([]);
          
       }


    },[searchTerm, tags]);


    const handleChange=(e)=>{
      const value=e.target.value;
      setSearchTerm(value);
      setSearchParams({q:value});
      
    }

    const handleTagClick=(tagName)=>{
      setSearchTerm(tagName);
      onSearchByTag(tagName);
      setSearchParams({q:tagName});
      setActiveSearch([]);
      setHideSearch(false);
    }

    
  return (
   <div className=' relative w-[75%]'>
        <div className='relative flex items-center w-full'>
             <input type='search' value={searchTerm} onChange={handleChange} placeholder='Search for articles...' className='w-full p-4 rounded-full placeholder-indigo-500 bg-indigo-200 border-solid border-2 border-transparent focus:border-indigo-500 focus:caret-indigo-500 outline-none'/>
             <button onClick={()=>onSearchByTag(searchTerm)} className='absolute right-1 top-1/2 bu p-4  -translate-y-6  bg-indigo-400 rounded-full'>
                <FaSearch className='text-indigo-800'/>
             </button>

        </div>
        
        {
           activeSearch.length>0 && hideSearch && (
               <div className={`z-50 absolute top-20 p-4 bg-indigo-800 bg-opacity-20  hover:font-bold backdrop-blur text-indigo-600 w-full rounded-xl left-0  flex flex-col gap-2`}>
                       
                       <span 
                               
                                 onClick={()=>handleTagClick(searchTerm)}
                                 className='cursor-pointer hover:bg-indigo-400 hover:bg-opacity-10 hover:backdrop-blur transition-colors duration-300 ease-in-out p-2 rounded'
                              >
                                {searchTerm}
                       </span>
                       {
                         activeSearch.map((tag,index)=>(
                              <span 
                                 key={index}
                                 onClick={()=>handleTagClick(tag.name)}
                                 className='cursor-pointer hover:bg-indigo-400 hover:bg-opacity-10 hover:backdrop-blur transition-colors duration-300 ease-in-out p-2 rounded'
                              >
                                {tag.name}
                              </span>
                              
                         ))
                       }    
               </div>
           )
        }

       

   </div>
  )
}

export default SearchBar
