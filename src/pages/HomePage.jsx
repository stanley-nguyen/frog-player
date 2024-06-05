import React from 'react'
import "../styles/HomePage.css";
import MusicList from '../components/MusicList';

function HomePage({ searchParam }) {
  return (
    <>
      <div className='container'>
        <MusicList searchParam={searchParam} />
      </div>
    </>
  )
}

export default HomePage;