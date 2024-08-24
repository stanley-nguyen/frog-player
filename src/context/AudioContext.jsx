import React, { createContext, useContext, useRef, useState } from 'react';

const AudioContext = createContext({});

export default function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(50);
  const [audioSource, setAudioSource] = useState('');

  const audioRef = useRef(null);

  return (
    <AudioContext.Provider
      value={{
        isPlaying, setIsPlaying,
        currentSong, setCurrentSong,
        currentDuration, setCurrentDuration,
        totalDuration, setTotalDuration,
        isMuted, setIsMuted,
        currentVolume, setCurrentVolume,
        audioSource, setAudioSource,
        audioRef
      }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  return useContext(AudioContext);
}