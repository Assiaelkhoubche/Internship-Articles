import React from 'react'

const CategorySection = ({categories, onSelectPage, selectCategory, activeCategory}) => {
      
    console.log('categories', categories);

    const filterCtegories= categories.slice(0,8);
  
    return (
    <div className=' px-4 mb-8 lg:space-x-16 flex flex-wrap font-semibold items-center border-b-2 py-5 text-gray-900'>
        <button onClick={()=>onSelectPage(null)} className={` lg:ml-12 ${!selectCategory?'text-indigo-600':''} mr-1`}>All</button>
        {
            filterCtegories.map((category, index)=>(
            
                <button
                  onClick={()=>onSelectPage(category)} 
                  key={index}
                  className={`mr-2 space-x-16 ${ activeCategory?.id === category.id? 'text-indigo-600':''}`}
                >
                    {category.name}
                </button>

            ))
        }
    </div>
  )
}

export default CategorySection
