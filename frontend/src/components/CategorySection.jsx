import React from 'react'

const CategorySection = ({categories, onSelectPage, selectCategory, activeCategory}) => {
      
    console.log('categories', categories);
  
    return (
    <div className=' px-4 mb-8 lg:space-x-16 flex flex-wrap font-semibold items-center border-b-2 py-5 text-gray-900'>
        <button onClick={()=>onSelectPage(null)} className={` lg:ml-12 ${!selectCategory?'text-n-1':''}`}>All</button>
        {
            categories.map((category, index)=>(
            
                <button
                  onClick={()=>onSelectPage(category)} 
                  key={index}
                  className={`mr-2 space-x-16 ${ activeCategory?.id === category.id? 'text-n-1':''}`}
                >
                    {category.name}
                </button>

            ))
        }
    </div>
  )
}

export default CategorySection
