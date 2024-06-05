import React from 'react'
import "../styles/HomePage.css";
import MusicList from '../components/MusicList';

function HomePage({ searchParam, directory }) {
  return (
    <>
      <div className='container'>
        <MusicList searchParam={searchParam} directory={directory} />
      </div>
    </>
  )
}

export default HomePage;