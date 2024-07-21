import { useRef, useContext, useEffect, useState } from 'react';
import DirectoryContext from '../context/DirectoryContext';
import { FaRegPlayCircle, FaRegPauseCircle, FaBackward, FaForward, FaVolumeUp, FaVolumeMute, FaVolumeOff } from "react-icons/fa";
import './MusicPlayer.css';

const secToTime = (totalSeconds) => {
  const time = totalSeconds ? {
    minutes: Math.floor(totalSeconds / 60),
    seconds: Math.floor(totalSeconds % 60)
  } : {
    minutes: '00',
    seconds: '00'
  }
  return `${time.minutes}:${String(time.seconds).padStart(2, '0')}`;
};

function MusicPlayer() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong, currentDuration, setCurrentDuration, totalDuration, setTotalDuration, isMuted, setIsMuted, currentVolume, setCurrentVolume } = useContext(DirectoryContext);

  const audioElement = useRef(null);

  useEffect(() => {
    if (!currentSong) return;

    if (audioElement.current.src !== currentSong)
    {
      audioElement.current.src = currentSong;
      
      isPlaying ? audioElement.current.play() : audioElement.current.pause();
    }
  }, [currentSong, setCurrentSong]);

  useEffect(() => {
    if (!currentSong) return;

    isPlaying ? audioElement.current.play() : audioElement.current.pause();
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    if (!currentSong) return;

    isMuted ? audioElement.current.muted = true : audioElement.current.muted = false;
  }, [isMuted, setIsMuted]);

  useEffect(() => {
    if (!currentSong) return;
    audioElement.current.volume = currentVolume / 100;
  }, [currentVolume, setCurrentVolume]);

  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const currentTime = audioElement.current.currentTime;

    setCurrentDuration(currentTime);
    setTotalDuration(duration);
  };

  const onSeek = (e) => {
    if (!currentSong) return;
    // console.log(audioElement.current.currentTime)
    // audioElement.current.currentTime = e.target.value;
    // setCurrentDuration(e.target.value);
  };

  return (
    <>
      <div className='player-controls'>
        {isPlaying ? <FaRegPauseCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/> :
                    <FaRegPlayCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/>}
        <div className='player-controls-seek'>
          <FaBackward className='player-controls-backward' onClick={onSeek(-5)}/>
          <FaForward className='player-controls-forward' onClick={onSeek(5)}/>
        </div>
        <div className='player-controls-volume'>
          {isMuted   ? <FaVolumeMute className='player-controls-vbutton' onClick={() => setIsMuted(!isMuted)} size={25}/> :
           isPlaying ? <FaVolumeUp className='player-controls-vbutton' onClick={() => setIsMuted(!isMuted)} size={25}/>   :
                       <FaVolumeOff className='player-controls-vbutton' onClick={() => setIsMuted(!isMuted)} size={25}/>}
          <div className='slider-wrapper'>
            <input className='player-controls-vslider' type='range' min='0' max='100' step='1' onChange={(e) => setCurrentVolume(e.target.value)}/>
            <div className='slider-value'>{currentVolume}</div>
          </div>
        </div>
      </div>
      <div className='progress-wrapper'>
        <div className='player-controls-progress-bar' style={{width: `${currentDuration / totalDuration * 100 +"%"}`}}></div>
      </div>
      <audio ref={audioElement} onTimeUpdate={onPlaying}></audio>
      <div className='player-controls-time'>
        {currentSong ? <span>{secToTime(currentDuration)} / {secToTime(totalDuration)}</span> :
                           <></>}
      </div>
    </>
  )
}

export default MusicPlayer;