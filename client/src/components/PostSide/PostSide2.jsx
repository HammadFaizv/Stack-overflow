import React from 'react'
import Posts from './Posts'
import PostShare from './PostShare'
import './PostSide.css'
const PostSide = () => {
  return (
   <div className="PostSide">
       <PostShare/>
       <Posts/>
   </div>
  )
}

export default PostSide