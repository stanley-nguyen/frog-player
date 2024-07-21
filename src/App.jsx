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
  const [currentDuration, setCurrentDuration] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [isMuted, setIsMuted] = useState("");
  const [currentVolume, setCurrentVolume] = useState("");

  useEffect(() => {
    if (directory)
      localStorage.setItem("directory", directory);
    else if (!directory && localStorage.getItem("directory"))
      setDirectory(localStorage.getItem("directory"));
  }, [directory]);

  useEffect(() => {
    if (currentSong)
      localStorage.setItem("isPlaying", isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong)
    {
      localStorage.setItem("currentSong", currentSong);
      localStorage.setItem("currentDuration", currentDuration);
    }
    else if (!currentSong && localStorage.getItem("currentSong"))
    {
      setCurrentSong(localStorage.getItem("currentSong"));
      // setIsPlaying(localStorage.getItem("isPlaying"));
      setCurrentDuration(localStorage.getItem("currentDuration"));
    }
  }, [currentSong]);

  return (
    <>
      <TitleBar/>
      <DirectoryContext.Provider value={{directory, setDirectory,
                                         isPlaying, setIsPlaying,
                                         currentSong, setCurrentSong,
                                         currentDuration, setCurrentDuration,
                                         totalDuration, setTotalDuration,
                                         isMuted, setIsMuted,
                                         currentVolume, setCurrentVolume}}>
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
