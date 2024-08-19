import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({handlePageChange,currentPage, articles, pageSize}) => {
     
     const togglePage=Math.ceil(articles.length/pageSize);
    
    // List Links pagination
     const renderPaginationList=()=>{
         return Array.from({length: togglePage},(_, i)=>i+1)
                     .map((pageNumber)=>(
                        <li className={`${pageNumber === currentPage? 'bg-n-1 rounded-lg ':'' } liPagination`} key={pageNumber}>
                           <Link className='flex py-[5px] px-[10px] border border-solid border-gray-300 rounded-lg text-black hover:bg-gray-100 transition-colors duration-500' onClick={()=>handlePageChange(pageNumber)} to="#">{pageNumber}</Link> 
                        </li>
                     ));  
     }
     


     const isPreviousDisabled= currentPage===1;
     const isNextDisabled= currentPage === togglePage;


    return (
    <div className='m-8'>
           <ul className='pagination flex-wrap gap-4'>
              <li>
                 <button className={ isPreviousDisabled? 'text-gray-500':'text-gray-800'} onClick={()=>handlePageChange(currentPage -1)} disabled={isPreviousDisabled}>Previous</button>
              </li>
              <div className='flex text-white'>
                 {renderPaginationList()}
              </div>
              <li>
                <button className={ isNextDisabled? 'text-gray-500':'text-gray-800'} onClick={()=>handlePageChange(currentPage +1) }  disabled={isNextDisabled}>
                    Next
                </button>
              </li>
           </ul>
    </div>
  )
}

export default Pagination
