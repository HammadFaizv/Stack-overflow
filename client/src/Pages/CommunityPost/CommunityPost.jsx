import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Post from '../../components/PostSide/Post';

const CommunityPost = () => {

    const { id } = useParams();
    const posts = useSelector((state) => state.postsReducer)

    const post = posts.data.filter( (p) => p._id === id )[0]


  return (
    <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-3">
                <Post post={post} />
            </div>
    </div>
  )
}

export default CommunityPost
