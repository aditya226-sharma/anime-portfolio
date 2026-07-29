"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Howl } from "howler";
import { useAppStore } from "@/stores/useAppStore";

const TRACK_FILES: Record<string, string> = {
  "anime-orchestral": "/music/anime-orchestral.wav",
  cyberpunk: "/music/cyberpunk.wav",
  "relaxing-piano": "/music/relaxing-piano.wav",
  "japanese-flute": "/music/japanese-flute.wav",
  "rain-ambience": "/music/rain-ambience.wav",
  battle: "/music/battle.wav",
  fantasy: "/music/fantasy.wav",
  "night-ambience": "/music/night-ambience.wav",
};

export function useMusic() {
  const soundRef = useRef<Howl | null>(null);
  const {
    currentTrack,
    musicVolume,
    isMuted,
    setCurrentTrack,
    setMusicVolume,
    toggleMute,
  } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fadeTo = useCallback(
    (trackId: string, duration: number = 1000) => {
      if (soundRef.current) {
        soundRef.current.fade(musicVolume * 0.3, 0, duration);
        setTimeout(() => {
          soundRef.current?.unload();
          const sound = new Howl({
            src: [TRACK_FILES[trackId] || TRACK_FILES["anime-orchestral"]],
            html5: true,
            volume: 0,
            loop: true,
            onload: () => {
              setIsLoaded(true);
              if (!isMuted) {
                sound.fade(0, musicVolume * 0.3, duration);
                setIsPlaying(true);
              }
            },
            onplay: () => setIsPlaying(true),
            onpause: () => setIsPlaying(false),
            onend: () => setIsPlaying(false),
          });
          soundRef.current = sound;
          sound.play();
        }, duration);
      } else {
        const sound = new Howl({
          src: [TRACK_FILES[trackId] || TRACK_FILES["anime-orchestral"]],
          html5: true,
          volume: 0,
          loop: true,
          onload: () => {
            setIsLoaded(true);
            if (!isMuted) {
              sound.fade(0, musicVolume * 0.3, duration);
              setIsPlaying(true);
            }
          },
          onplay: () => setIsPlaying(true),
          onpause: () => setIsPlaying(false),
        });
        soundRef.current = sound;
        sound.play();
      }
    },
    [musicVolume, isMuted]
  );

  useEffect(() => {
    fadeTo(currentTrack);
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (soundRef.current && isLoaded) {
      if (isMuted) {
        soundRef.current.fade(soundRef.current.volume(), 0, 500);
        setIsPlaying(false);
      } else {
        soundRef.current.fade(0, musicVolume * 0.3, 500);
        setIsPlaying(true);
      }
    }
  }, [isMuted, musicVolume, isLoaded]);

  const changeTrack = useCallback(
    (trackId: string) => {
      setCurrentTrack(trackId as any);
      fadeTo(trackId);
    },
    [setCurrentTrack, fadeTo]
  );

  const play = useCallback(() => {
    if (soundRef.current && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (soundRef.current && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return {
    currentTrack,
    isPlaying,
    isMuted,
    musicVolume,
    changeTrack,
    play,
    pause,
    toggleMute,
    setMusicVolume,
  };
}
