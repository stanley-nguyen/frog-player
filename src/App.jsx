import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TitleBar from './components/TitleBar';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import DirectoryButton from './components/DirectoryButton';
import MusicPlayer from './components/MusicPlayer';

import DirectoryContext from './context/DirectoryContext';

import "./styles/App.css";
import QuestionLogo from './assets/circle-question-regular.svg';

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [directory, setDirectory] = useState("");
  const [isPlaying, setIsPlaying] = useState("");
  const [currentSong, setCurrentSong] = useState("");

  if (directory)
    useEffect(() => {
      localStorage.setItem("directory", directory);
    }, [directory]);

  if (!directory && localStorage.getItem("directory"))
    useEffect(() => {
      setDirectory(localStorage.getItem("directory"));
    }, [directory]); 

  return (
    <>
      <TitleBar/>
      <DirectoryContext.Provider value={{directory, setDirectory,
                                         isPlaying, setIsPlaying,
                                         currentSong, setCurrentSong}}>
        <Router>
          <div className='App'>
            <SearchBar searchParam={searchParam} onSearchChange={setSearchParam} />
            <NavBar/>
            <DirectoryButton/>
            <div className='current-dir'>Current directory:
              <div className='dir-tooltip'>
                <img className='dir-tooltip-img' src={QuestionLogo}/>
                <span className='dir-tooltip-text'>{directory}</span>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<HomePage searchParam={searchParam}/>} />
              <Route path="/playlists" element={<PlaylistPage/>} />
            </Routes>
            <MusicPlayer/>
          </div>
        </Router>
      </DirectoryContext.Provider>
    </>
  );
}

export default App;
