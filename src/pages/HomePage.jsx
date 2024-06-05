import { useContext } from 'react'
import "../styles/HomePage.css";
import MusicList from '../components/MusicList';
import DirectoryContext from '../context/DirectoryContext';

function HomePage({ searchParam }) {
  const { directory } = useContext(DirectoryContext);

  return (
    <>
      <div className='container'>
        <MusicList searchParam={searchParam} />
      </div>
    </>
  )
}

export default HomePage;