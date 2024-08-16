import React, { useEffect, useState } from 'react'
import api from '../api'

import ArticleCards from './ArticleCards';

const BlogPage = () => {
     
     const [articles, setArticles] = useState([]);
     const [category, setCategory] = useState([]);


     useEffect(()=>{
        getArticles();
        getCategory();

     },[]);

   // get articles
     const getArticles= async ()=>{
        
        try{
            const res= await api.get('/api/articles/');
            console.log('response', res);
            setArticles(res.data);

        }catch(err){
          console.log('errororo',err);
        }

     }
   
   // get category

     const getCategory=async ()=>{
        
         try{
            const res = await api.get('/api/category/');
            console.log('category',res.data);
            setCategory(res.data)
         }catch(err){
            console.log(err);
         }

     }


  return (
    <div>

      {/* category section */}
      <div>

         page Category    
   
      </div>

      {/* articleCards section */}
      <div>

         <ArticleCards articles={articles}/>

      </div>

      {/* pagination section */}
      <div>

         pagination section
      </div>
    </div>
  )

}

export default BlogPage
