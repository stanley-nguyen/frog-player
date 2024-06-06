import { useEffect, useState, useContext, useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import DirectoryContext from '../context/DirectoryContext';
import "./MusicList.css";
import { convertFileSrc } from '@tauri-apps/api/tauri';

function MusicList({ searchParam }) {
  const [musicFiles, setMusicFiles] = useState([]);
  const { setIsPlaying, setCurrentSong } = useContext(DirectoryContext);
  const { directory } = useContext(DirectoryContext);

  useEffect(() => {
    async function fetchMusicFiles() {
        try {
          if (!directory) return;

          const files = await invoke('get_music_files', { directory });

          setMusicFiles(files);
        } catch (error) {
          console.error("Error fetching music files:", error);
        }
    }

  fetchMusicFiles();
  }, [directory]);

  async function handleClick(e) {
    try {
      if (e.target.tagName === 'LI') {
        if (e.target.classList.contains('selected')) {
          e.target.classList.remove('selected');
          return;
        }

        const liList = document.querySelectorAll('.music-list li');

        liList.forEach((li) => li.classList.remove('selected'));

        e.target.classList.add('selected');

        const fileName = musicFiles[e.target.innerText];
        const fileUrl = convertFileSrc(fileName);

        setCurrentSong(fileUrl);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing music file:", error);
    }
  };

  const displayedFiles = Object.keys(musicFiles).sort();
  const searchFiles = searchParam ? displayedFiles.filter((file) => file.toLowerCase().includes(searchParam.toLowerCase())) : displayedFiles;

  return (
    <>
      {directory && (
        <ul className='music-list' onClick={handleClick}>
          {searchFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default MusicList;