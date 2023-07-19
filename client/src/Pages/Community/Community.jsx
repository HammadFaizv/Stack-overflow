import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import PostSide from '../../components/PostSide/PostSide'
import './Community.css'

const Community = () => {
  return (
    <div className='home-container-4'>
      <LeftSidebar />
      <div className='home-container-3'>
        <PostSide />
      </div>
    </div>
  )
}

export default Community
