import React, { useState, useRef } from 'react'
import SOimage from '../../assets/SO_Teams.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faCircleXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import "./PostSide.css"
import { addPost } from '../../actions/posts';


const PostShare = () => {

  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch();
  const [ desc, setDesc ] = useState('');
  const [ file, setFile ] = useState(null);

  const [ image, setImage ] = useState(null);
  const imageRef = useRef();

  const [ video, setVideo ] = useState(null);
  const videoRef = useRef();

  // console.log(video);
  const handleImageClick = () => {
    setVideo(null);
    imageRef.current.click();
  }

  const handleVideoClick = () => {
    setImage(null);
    videoRef.current.click();
  }

  const handleImgFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage( URL.createObjectURL(selectedFile) );
    setFile(selectedFile);
  }
  
  const handleVidFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setVideo( URL.createObjectURL(selectedFile) );
    setFile(selectedFile);
  }

  const handleUpload = () => {
    setVideo(null)
    setImage(null)
    if (file) {
      const remoteFilePath = `uploads/${file.name}`;
      const storageRef = ref(storage, remoteFilePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            if( image !== null) {
              const data = {
                userId: User?.result._id,
                name: User?.result.name,
                desc: desc,
                imageUrl: downloadURL
              }
              dispatch(addPost(data));
            } else {
              const data = {
                userId: User?.result._id,
                name: User?.result.name,
                desc: desc,
                videoUrl: downloadURL
              }
              dispatch(addPost(data));
            }
          });
        }
      );
    } else {
      const data = {
        userId: User?.result._id,
        name: User?.result.name,
        desc: desc,
      }
      dispatch(addPost(data));
    };
  }

  return (
    <div className='PostShare'>
      <img src={SOimage} alt=''/>
      <div>
        <input type='text' placeholder="Share your experience... " onChange={(e) => { setDesc(e.target.value) }} />
        <div className='postOptions'>
          <div className='option'
            onClick={handleImageClick}
          >
            <FontAwesomeIcon icon={faImage} />
            Image
          </div>
          <div className='option'
            onClick={handleVideoClick}
          >
            <FontAwesomeIcon icon={faVideo} />
            Video
          </div>
          <button className="share-button ps-button" onClick={handleUpload}><FontAwesomeIcon icon={faPaperPlane}/>Share</button>
          <div style={{ display:'none' }}>
            <input type='file' name="myImage" ref={imageRef} onChange={handleImgFileChange} />
            <input type='file' name="myVideo" ref= {videoRef} onChange={handleVidFileChange} />
          </div>
        </div>
        { image && 
          <div className='previewImage'>
            <FontAwesomeIcon icon={faCircleXmark} onClick={()=> setImage(null)}/>
            <img src={image} alt="" />
          </div>
        }
        {
          video && 
          <div className='previewImage'>
            <FontAwesomeIcon icon={faCircleXmark} onClick={()=> setVideo(null)}/>
            <video controls>
              <source src={video} type='video/mp4' /> 
            </video>
          </div>
        }
      </div>
    </div>
  )
}

export default PostShare
