import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from 'react-redux';
import { likePost, dislikePost } from '../../actions/posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as liked, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHeart as unliked, faMessage } from '@fortawesome/free-regular-svg-icons'

const Post = ({ post }) => {
  // console.log(post);
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch();
  const url = window.location.href + `/${post._id}`;
  // const navigate = useNavigation();
  const [ isLiked, setIsLiked ] = useState(false);
  useEffect( () => {
    if(post.likes.includes( User?.result._id )){
    setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post.likes, User]);
  

  const handleLike = () => {
    if( User === null ){
      alert("Login or SignUp to continue!!!");
      // navigate('/Auth');
    } else {
      dispatch(likePost(post._id, User?.result._id))
    }
  }

  const handleDislike = () => {
    if( User === null ){
      alert("Login or SignUp to continue!!!");
      // navigate('/Auth');
    } else {
      dispatch(dislikePost(post._id, User?.result._id))
    }
  }

  const handleShare = () => {
    copy(url)
    alert( `${url} - Copied URL to clipboard!`)
  }

  return (
    <div className='post-container'>
      <div className='post-heading'>
      <Avatar backgroundColor="orange" px='8px' py="3px">{ post?.name.charAt(0).toUpperCase()} </Avatar>
      <Link to={`/Users/${post.userId}`}>
         <span>{post?.name} </span>
      </Link>
      </div>
      {
        post?.videoUrl === undefined ?
        <img src={post?.imageUrl} alt="somepicture" /> :
        <video src={post?.videoUrl} controls />
      }
      
      <div className='post-options'>
        
        { isLiked ? 
          <FontAwesomeIcon icon={liked} onClick={handleDislike} size='2xl'/> :
          <FontAwesomeIcon icon={unliked} onClick={handleLike} size='2xl'/>
        }
        <FontAwesomeIcon icon={faMessage} size='2xl'/>
        <FontAwesomeIcon icon={faShareNodes} onClick={handleShare} size='2xl' />
      </div>
      <span className='post-likes'>{post?.likes.length} likes</span>
      <h3 className='post-description'> {post?.desc} </h3>
      <Link to={url}><button className='post-view'>View Post</button></Link>
    </div>
  )
}

export default Post
