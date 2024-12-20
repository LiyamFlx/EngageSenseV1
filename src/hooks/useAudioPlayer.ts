import { useState, useCallback, useRef, useEffect } from 'react';
import { useAudioCache } from './useAudioCache';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const { cache } = useAudioCache();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 2048;
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const play = useCallback(async (url: string, trackId: string) => {
    if (!audioContextRef.current || !analyzerRef.current) return;

    if (currentTrackId === trackId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    try {
      const buffer = await cache(url);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContextRef.current.destination);
      
      source.start(0);
      setCurrentTrackId(trackId);
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        setCurrentTrackId(null);
        setProgress(0);
      };

      audioRef.current = new Audio();
      audioRef.current.src = url;
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }, [currentTrackId, isPlaying, cache]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrackId(null);
      setProgress(0);
    }
  }, []);

  return {
    play,
    stop,
    isPlaying,
    currentTrackId,
    progress,
    analyzerNode: analyzerRef.current
  };
};