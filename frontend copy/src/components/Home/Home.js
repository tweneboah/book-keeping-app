import React from 'react';
import './Home.css';
import bookpg from '../../assets/img/book.jpg';
import videoSource from '../../assets/books.mp4';
const Home = () => {
  // const videoSource = 'https://www.w3schools.com/tags/movie.mp4';
  return (
    <div className='Container'>
      <video autoPlay='autoplay' loop='loop' muted className='Video'>
        <source src={videoSource} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className='Content'>
        <div className='SubContent'>
          <h1>Books Collection App</h1>
          <p>Make your books with ease</p>
          <button type='button' className='btn btn-outline-dark'>
            View books
          </button>
          <img src={bookpg} />
        </div>
      </div>
    </div>
  );
};

export default Home;
