"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/hooks/useMusic";
import { MUSIC_TRACKS } from "@/lib/constants";
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
  FiVolumeX,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";

export default function MusicPlayer() {
  const {
    isPlaying,
    isMuted,
    currentTrack,
    musicVolume,
    changeTrack,
    toggleMute,
    setMusicVolume,
  } = useMusic();
  const [expanded, setExpanded] = useState(false);
  const [isShuffled] = useState(false);

  const currentTrackData = MUSIC_TRACKS.find((t) => t.id === currentTrack);
  const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === currentTrack);

  const nextTrack = () => {
    const nextIdx = isShuffled
      ? Math.floor(Math.random() * MUSIC_TRACKS.length)
      : (currentIndex + 1) % MUSIC_TRACKS.length;
    changeTrack(MUSIC_TRACKS[nextIdx].id);
  };

  const prevTrack = () => {
    const prevIdx = isShuffled
      ? Math.floor(Math.random() * MUSIC_TRACKS.length)
      : (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    changeTrack(MUSIC_TRACKS[prevIdx].id);
  };

  return (
    <div className="fixed bottom-20 right-4 z-[55]">
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="glass-strong rounded-xl p-4 mb-2 w-64"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Track list */}
            <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
              {MUSIC_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => changeTrack(track.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-left transition-all cursor-pointer ${
                    currentTrack === track.id
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span>{track.emoji}</span>
                  <span>{track.name}</span>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2 px-1">
              <button
                onClick={toggleMute}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <FiVolumeX size={14} /> : <FiVolume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={musicVolume * 100}
                onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini player */}
      <motion.div
        className="glass-strong rounded-xl p-3 flex items-center gap-3"
        layout
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          {expanded ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-white/60 truncate">
            {currentTrackData?.emoji} {currentTrackData?.name || "No Track"}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevTrack}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            <FiSkipBack size={12} />
          </button>
          <button
            onClick={toggleMute}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            {isPlaying ? <FiPause size={12} /> : <FiPlay size={12} />}
          </button>
          <button
            onClick={nextTrack}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            <FiSkipForward size={12} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
