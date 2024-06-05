import { useEffect, useState, useContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import DirectoryContext from '../context/DirectoryContext';
import "./MusicList.css";

function MusicList({ searchParam }) {
  const [musicFiles, setMusicFiles] = useState([]);
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

  const searchFiles = searchParam ? musicFiles.filter((file) => file.toLowerCase().includes(searchParam.toLowerCase())) : musicFiles;

  return (
    <>
      {directory && (
        <ul className='music-list'>
          {searchFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default MusicList;