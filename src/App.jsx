import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import "./styles/App.css";

import { open } from '@tauri-apps/api/dialog';

import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [directory, setDirectory] = useState("");

  async function openDirectory() {
    try {
      const path = await open({
        title: 'Select Music Directory',
        buttonLabel: 'Select',
        directory: true,
      });
      setDirectory(path);
    } catch (error) {
      console.error("Error opening directory:", error);
    }
  }

  return (
    <>
      <TitleBar/>
      <Router>
        <div className='App'>
          <SearchBar searchParam={searchParam} onSearchChange={setSearchParam} />
          <NavBar/>
          <button className='dir-button' onClick={openDirectory}>Select Music Directory</button>
          <Routes>
            <Route path="/" element={<HomePage searchParam={searchParam} directory={directory}/>} />
            <Route path="/playlists" element={<PlaylistPage/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
