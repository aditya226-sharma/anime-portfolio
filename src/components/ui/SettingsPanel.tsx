"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import {
  FiX,
  FiMonitor,
  FiVolume2,
  FiZap,
} from "react-icons/fi";
import { WeatherType, GraphicsQuality } from "@/types";

const weatherOptions: { id: WeatherType; label: string; icon: string }[] = [
  { id: "sunny", label: "Sunny", icon: "☀️" },
  { id: "night", label: "Night", icon: "🌙" },
  { id: "rain", label: "Rain", icon: "🌧️" },
  { id: "snow", label: "Snow", icon: "❄️" },
  { id: "fog", label: "Fog", icon: "🌫️" },
  { id: "cherry-blossom", label: "Sakura", icon: "🌸" },
  { id: "storm", label: "Storm", icon: "⛈️" },
  { id: "golden-sunset", label: "Sunset", icon: "🌅" },
];

const qualityOptions: { id: GraphicsQuality; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
  { id: "ultra", label: "Ultra" },
];

export default function SettingsPanel() {
  const {
    settingsOpen,
    toggleSettings,
    weather,
    setWeather,
    graphicsQuality,
    setGraphicsQuality,
    showFps,
    toggleFps,
    voiceEnabled,
    toggleVoice,
  } = useAppStore();

  return (
    <AnimatePresence>
      {settingsOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleSettings}
          />

          <motion.div
            className="relative glass-strong rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiMonitor size={18} className="text-cyan-400" />
                Settings
              </h3>
              <button
                onClick={toggleSettings}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Weather */}
            <div className="mb-6">
              <label className="text-xs tracking-wider uppercase text-white/30 mb-3 block">
                Weather System
              </label>
              <div className="grid grid-cols-4 gap-2">
                {weatherOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWeather(w.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${
                      weather === w.id
                        ? "bg-cyan-500/20 border border-cyan-500/40"
                        : "bg-white/5 border border-transparent hover:bg-white/10"
                    }`}
                  >
                    <span className="text-lg">{w.icon}</span>
                    <span className="text-[10px] text-white/50">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Graphics Quality */}
            <div className="mb-6">
              <label className="text-xs tracking-wider uppercase text-white/30 mb-3 block">
                Graphics Quality
              </label>
              <div className="flex gap-2">
                {qualityOptions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setGraphicsQuality(q.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      graphicsQuality === q.id
                        ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                        : "bg-white/5 border border-transparent text-white/40 hover:text-white/70"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <button
                onClick={toggleFps}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FiZap size={14} className="text-yellow-400" />
                  <span className="text-sm text-white/70">FPS Counter</span>
                </div>
                <div
                  className={`w-10 h-5 rounded-full transition-all ${
                    showFps ? "bg-cyan-500/40" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all mt-0.5 ${
                      showFps
                        ? "ml-5.5 bg-cyan-400"
                        : "ml-0.5 bg-white/40"
                    }`}
                  />
                </div>
              </button>

              <button
                onClick={toggleVoice}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FiVolume2 size={14} className="text-green-400" />
                  <span className="text-sm text-white/70">Voice Guide</span>
                </div>
                <div
                  className={`w-10 h-5 rounded-full transition-all ${
                    voiceEnabled ? "bg-cyan-500/40" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all mt-0.5 ${
                      voiceEnabled
                        ? "ml-5.5 bg-cyan-400"
                        : "ml-0.5 bg-white/40"
                    }`}
                  />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
