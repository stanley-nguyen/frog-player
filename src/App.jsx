import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import "./styles/App.css";

import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';

function App() {
  const [searchParam, setSearchParam] = useState("");

  return (
    <>
      <TitleBar/>
      <Router>
        <div className='App'>
          <SearchBar searchParam={searchParam} onSearchChange={setSearchParam} />
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage searchParam={searchParam}/>} />
            <Route path="/playlists" element={<PlaylistPage/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
