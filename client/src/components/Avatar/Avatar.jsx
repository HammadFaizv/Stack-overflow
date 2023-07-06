import React from 'react'
import "./Avatar.css"

const Avatar = ({ children, classname }) => {
  return <div className={`${classname}`}>{children}</div>;
};

export default Avatar
