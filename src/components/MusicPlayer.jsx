import { useRef, useContext, useEffect, useState } from 'react';
import DirectoryContext from '../context/DirectoryContext';
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import './MusicPlayer.css';

const secToTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

function MusicPlayer() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(DirectoryContext);
  const [currentDuration, setCurrentDuration] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);

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

  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const currentTime = audioElement.current.currentTime;

    setCurrentDuration(currentTime);
    setTotalDuration(duration);
  }

  return (
    <>
      <div className='player-controls'>
        {isPlaying ? <FaRegPauseCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/> :
                    <FaRegPlayCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/>}
      </div>
      <div className='progress-wrapper'>
        <div className='player-controls-progress-bar' style={{width: `${currentDuration / totalDuration * 100 +"%"}`}}></div>
      </div>
      <audio ref={audioElement} onTimeUpdate={onPlaying}></audio>
      <div className='player-controls-time'>
        {currentDuration ? <span>{secToTime(currentDuration)} / {secToTime(totalDuration)}</span> :
                           <></>}
      </div>
    </>
  )
}

export default MusicPlayer;