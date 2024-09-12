import { useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { useQueue } from '../context/QueueContext';
import { FaRegPlayCircle, FaRegPauseCircle, FaBackward, FaForward, FaVolumeUp, FaVolumeMute, FaVolumeOff } from "react-icons/fa";
import { Forward5Rounded, Replay5Rounded } from '@mui/icons-material';
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
  const { audioSource, audioRef,
          isPlaying, setIsPlaying,
          currentSong, setCurrentSong,
          currentDuration, setCurrentDuration,
          totalDuration, setTotalDuration,
          isMuted, setIsMuted,
          currentVolume, setCurrentVolume } = useAudio();

  const { queue, setQueue } = useQueue();

  useEffect(() => {
    if (audioSource)
    {
      setCurrentSong(audioSource)
    }
  }, [audioSource]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (audioRef.current.src !== currentSong)
    {
      audioRef.current.src = currentSong;
    }

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
    if (audioRef.current.currentTime === 0)
    {
      setCurrentDuration(0);
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = currentVolume / 100;
  }, [currentVolume]);

  const onPlaying = () => {
    if (!audioRef.current) return;
    setCurrentDuration(audioRef.current.currentTime);
    setTotalDuration(audioRef.current.duration);

    if (currentDuration > .995 * totalDuration) {
      playNextSong();
    }
  };

  const onSeek = (e) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += e;
  };

  const playNextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setCurrentSong(nextSong);
      setQueue(queue.slice(1));
    }
  }

  return (
    <>
      <div className='player-controls'>
        {isPlaying ? <FaRegPauseCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/> :
                    <FaRegPlayCircle className='player-controls-toggle' onClick={() => setIsPlaying(!isPlaying)} size={40}/>}
        <div className='player-controls-seek'>
          <Replay5Rounded className='player-controls-backward' onClick={() => onSeek(-5)} sx={{ fontSize: 30 }}/>
          <Forward5Rounded className='player-controls-forward' onClick={() => onSeek(5)} sx={{ fontSize: 30 }}/>
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
      <audio ref={audioRef} onTimeUpdate={onPlaying}></audio>
      <div className='player-controls-time'>
        {currentSong ? <span>{secToTime(currentDuration)} / {secToTime(totalDuration)}</span> :
                           <></>}
      </div>
    </>
  )
}

export default MusicPlayer;