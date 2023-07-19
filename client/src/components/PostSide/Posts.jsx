import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {

  const posts = useSelector((state) => state.postsReducer)
  console.log(posts.data);
  const postsList = posts.data;
  return (
    <div className='Posts'>
      { postsList === null ?
        <h1>Loading...</h1> :
        <>
          {postsList.map((post) => (
            <Post post={post} key={post._id} />
            ))
          }
        </>
      }
    </div>
  )
}

export default Posts
