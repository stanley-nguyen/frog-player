import { useRef, useContext, useEffect } from 'react';
import DirectoryContext from '../context/DirectoryContext';
import './MusicPlayer.css';

function MusicPlayer() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(DirectoryContext);

  const audioElement = useRef(null);

  useEffect(() => {
    if (!currentSong) return;

    if (audioElement.current.src !== currentSong)
    {
      audioElement.current.src = currentSong;
      audioElement.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong) return;

    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className='player-controls'>
      <button className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)}>Play</button>
      <audio ref={audioElement}></audio>
    </div>
  )
}

export default MusicPlayer;