import React, { useEffect, useState, useRef, useContext } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TitleBar from './components/TitleBar';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import DirectoryButton from './components/DirectoryButton';
import PlayAllButton from './components/PlayAllButton';
import MusicPlayer from './components/MusicPlayer';

import DirectoryContext from './context/DirectoryContext';
import "./styles/App.css";
import QuestionLogo from './assets/circle-question-regular.svg';

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [directory, setDirectory] = useState("");

  useEffect(() => {
    if (directory)
      localStorage.setItem("directory", directory);
    else if (!directory && localStorage.getItem("directory"))
      setDirectory(localStorage.getItem("directory"));
  }, []);

  return (
    <>
      <TitleBar/>
      <DirectoryContext.Provider value={{directory, setDirectory}}>
        <Router>
          <div className='App'>
            <SearchBar searchParam={searchParam} onSearchChange={setSearchParam} />
            <NavBar/>
            <DirectoryButton/>
            <PlayAllButton/>
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
