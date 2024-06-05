import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TitleBar from './components/TitleBar';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import DirectoryButton from './components/DirectoryButton';

import DirectoryContext from './context/DirectoryContext';

import "./styles/App.css";

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [directory, setDirectory] = useState("");

  if (directory)
    localStorage.setItem("directory", directory);

  if (!directory && localStorage.getItem("directory")) 
    setDirectory(localStorage.getItem("directory"));

  return (
    <>
      <TitleBar/>
      <DirectoryContext.Provider value={{directory, setDirectory}}>
        <Router>
          <div className='App'>
            <SearchBar searchParam={searchParam} onSearchChange={setSearchParam} />
            <NavBar/>
            <DirectoryButton/>
            <div className='current-dir'>Current directory:
              <p className='current-dir-path'>{directory}</p>
            </div>
            <Routes>
              <Route path="/" element={<HomePage searchParam={searchParam}/>} />
              <Route path="/playlists" element={<PlaylistPage/>} />
            </Routes>
          </div>
        </Router>
      </DirectoryContext.Provider>
    </>
  );
}

export default App;
