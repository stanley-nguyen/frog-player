import { useRef, useContext, useEffect } from 'react';
import DirectoryContext from '../context/DirectoryContext';

function MusicPlayer() {
  const { isPlaying, currentSong, setCurrentSong } = useContext(DirectoryContext);

  const audioElement = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      if (audioElement.current) {
        audioElement.current.src = currentSong;
        audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <>
      <audio ref={audioElement}></audio>
    </>
  )
}

export default MusicPlayer;