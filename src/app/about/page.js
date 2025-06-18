import React from 'react'
import styles from '../styles/common.module.css'; 
import herostyle from '../styles/header.module.css'// Adjust the path as necessary
import VideoFetcher from '../components/MovieRecommender';





const AboutPage = () => {
  return (
    <div className={` ${styles.textColor} bg-yellow-800`}>
      <h1 >About Page</h1>
      <p className={` ${herostyle.customHeader}`}>This is the about page of my website.</p>
      <VideoFetcher />
      
    </div>
  )
}

export default AboutPage