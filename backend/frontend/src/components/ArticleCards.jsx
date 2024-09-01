import React from 'react'
import {Link} from 'react-router-dom'

const articleCards = ({articles}) => {
  return (
    <div>
       {articles.map((item,index)=>(
          <Link key={index} to='/'>
             <div>
                { item.picture?
                       (<img src={item.picture} alt="pic" 
                                 className=''
                                 width={100}
                                 height={100}
                        />
                       ):
                       (<p>No image availabe</p>)}
             </div>
          </Link>
       ))}
    </div>
  )
}

export default articleCards
