import React, { useEffect, useState } from 'react'
import api from '../api'

import ArticleCards from './ArticleCards';
import Pagination from './Pagination';
import CategorySection from './CategorySection';
import SideBare from './SideBare';
import { Outlet, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
const BlogPage = () => {
     
     const [articles, setArticles] = useState([]);
     const [categories, setCategory] = useState([]);
    

     const [currentPage, setCurrentPage]=useState(1);
     const [selectCategory, setSelectCategory]=useState(null)
     const [activeCategory, setActiveCategory]=useState(null);
     const location=useLocation();
     const isDashboard=location.pathname==='/dashboard/listArticles' || location.pathname==='/articles' || location.pathname==='/dashboard/update-article'
     const isUpdatePage=location.pathname==='/dashboard/update-article'

     const pageSize=13  // here we gonna define the numbers of blocks per page 


     useEffect(()=>{
        getArticles();
        getCategory();

     },[currentPage, pageSize, selectCategory]);



   // get articles
     const getArticles= async (tagName=null)=>{
        
        try{
            let url='/api/articles/'
            
            if(selectCategory){
               console.log('selectCategory iddddddddddddddddddddd',selectCategory.id);
               url += `?category=${selectCategory.id}`
            }

            if(tagName){
                url += selectCategory ?`&tag=${tagName}`:`?&tag=${tagName}`;
            }

            
            const res= await api.get(url);
            console.log('fetching articccccccccccles', res.data)
            setArticles(res.data);

        }catch(err){
          console.log('Error get Articles',err);
          
        }

     }
   
   // get category
     const getCategory=async ()=>{
        
         try{
            const res = await api.get('/api/categories/');
            setCategory(res.data);
            console.log('sssssssssssssssssssssss');
         }catch(err){
            console.log('error get categories',err);
            console.log('ffffffffffffffffffffffffffffff')
         }

     }


   // pagination
   const handlePageChange=(pageNumber)=>{
      setCurrentPage(pageNumber);
   }

   // category change
   const handleCategoryChange=(category)=>{
         setSelectCategory(category);
         setCurrentPage(1);
         setActiveCategory(category);
   }

   const handleSearchByTag=(tagName)=>{
      setCurrentPage(1);
      getArticles(tagName);
   }



  return (
    <div className={` ${isUpdatePage?'mt-6':'mt-32'} max-w-screen-2xl`}>

      {/* search bar */}
        {isDashboard &&( <div className='m-8 mr-5 flex flex-col justify-center items-center p-6 w-full border-b shadow-lg  hover:shadow-2xl transition-shadow duration-300 rounded-2xl'>
               <SearchBar onSearchByTag={handleSearchByTag} />
          </div>)}

      {/* category section */}
      <div>

                <CategorySection categories={categories} onSelectPage={handleCategoryChange} selectCategory={selectCategory} activeCategory={activeCategory} />   
   
      </div>



      {/* articleCards section */}
      <div className={`flex flex-col lg:flex-row gap-12  `}>
               {/* blogs components */}
               <ArticleCards articles={articles} currentPage={currentPage} selectCategory={selectCategory} pageSize={pageSize}/>
               
               {/* side bar componenets */}
              {!isUpdatePage &&
               <div className=''>
                  <SideBare articles={articles}/>
               </div>}

      </div>
   


      {/* pagination section */}
      <div>

                <Pagination handlePageChange={handlePageChange} articles={articles} currentPage={currentPage} pageSize={pageSize}/>

      </div>
      
    </div>
  )

}

export default BlogPage
