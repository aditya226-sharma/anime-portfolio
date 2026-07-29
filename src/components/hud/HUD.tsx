"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS } from "@/lib/constants";
import { FiVolume2, FiVolumeX, FiCloud, FiSettings, FiTerminal, FiCamera, FiEye, FiEyeOff } from "react-icons/fi";

export default function HUD() {
  const {
    hudVisible, toggleHud,
    selectedCharacter, visitorLevel, visitorXp, currentSection,
    isMuted, toggleMute,
    weather,
    toggleSettings, toggleTerminal, togglePhotoMode,
  } = useAppStore();

  const [showMiniMap, setShowMiniMap] = useState(true);
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;

  const sections = ["about", "skills", "projects", "experience", "certifications", "timeline", "contact"] as const;
  const sectionLabels: Record<string, string> = {
    about: "About", skills: "Skills", projects: "Missions",
    experience: "Records", certifications: "Achievements",
    timeline: "Journey", contact: "Shrine",
  };

  if (!hudVisible) {
    return (
      <motion.button
        className="fixed top-4 right-4 z-[55] glass rounded-lg p-2.5 text-white/40 hover:text-white transition-colors cursor-pointer"
        onClick={toggleHud}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <FiEye size={16} />
      </motion.button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none scan-line opacity-20" />

      {/* Top Left - Visitor Info */}
      <motion.div
        className="absolute top-4 left-4 glass rounded-xl p-3.5 pointer-events-auto min-w-[200px]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs relative"
            style={{
              background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}20, ${character?.accentColor || "#a855f7"}20)`,
              border: `1px solid ${character?.color || "#00f0ff"}30`,
              color: character?.color || "#00f0ff",
            }}
          >
            {visitorLevel}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-[#0a0a15]" />
          </div>
          <div className="text-xs flex-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-white/40">{character?.name || "Guest"}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${character?.color || "#00f0ff"}15`, color: character?.color || "#00f0ff" }}>
                {character?.title || "Visitor"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${character?.color || "#00f0ff"}, ${character?.accentColor || "#a855f7"})` }}
                initial={{ width: 0 }}
                animate={{ width: `${(visitorXp / (visitorLevel * 1000)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] text-white/25 mt-1">
              {visitorXp} / {visitorLevel * 1000} XP
            </div>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px]">
          <span style={{ color: character?.color || "#00f0ff" }}>&#9654;</span>
          <span className="text-white/30">Quest:</span>
          <span className="text-white/60 font-medium">{sectionLabels[currentSection] || currentSection}</span>
        </div>
      </motion.div>

      {/* Top Right - Controls */}
      <motion.div
        className="absolute top-4 right-4 flex items-center gap-1.5 pointer-events-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { icon: isMuted ? FiVolumeX : FiVolume2, action: toggleMute, title: isMuted ? "Unmute" : "Mute" },
          { icon: FiCloud, action: () => {}, title: `Weather: ${weather}` },
          { icon: FiCamera, action: togglePhotoMode, title: "Photo Mode" },
          { icon: FiSettings, action: toggleSettings, title: "Settings" },
          { icon: FiTerminal, action: toggleTerminal, title: "Terminal (Ctrl+`)" },
          { icon: hudVisible ? FiEyeOff : FiEye, action: toggleHud, title: "Hide HUD" },
        ].map(({ icon: Icon, action, title }, i) => (
          <motion.button
            key={title}
            onClick={action}
            className="glass rounded-lg p-2.5 text-white/40 hover:text-white transition-all duration-300 cursor-pointer"
            title={title}
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          >
            <Icon size={14} />
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom Left - Mini Map */}
      <AnimatePresence>
        {showMiniMap && (
          <motion.div
            className="absolute bottom-4 left-4 glass rounded-xl p-3 pointer-events-auto"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-[9px] text-white/30 mb-2 tracking-[0.2em] uppercase font-medium">
              Mini Map
            </div>
            <div className="w-28 h-28 relative rounded-lg overflow-hidden bg-white/[0.02] border border-white/5">
              {/* Grid */}
              <div className="absolute inset-0 grid-pattern opacity-40" />
              {/* Sections */}
              {sections.map((section, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const isActive = currentSection === section;
                const sectionOrder = [...sections];
                const isComplete = sectionOrder.indexOf(currentSection as typeof sections[number]) > i;
                return (
                  <motion.div
                    key={section}
                    className="absolute w-2 h-2 rounded-full cursor-pointer"
                    style={{
                      left: `${12 + col * 38}%`,
                      top: `${12 + row * 40}%`,
                      background: isActive
                        ? character?.color || "#00f0ff"
                        : isComplete
                        ? `${character?.color || "#00f0ff"}60`
                        : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? `0 0 10px ${character?.color || "#00f0ff"}` : "none",
                    }}
                    animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                );
              })}
              {/* Player dot */}
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${12 + (sections.indexOf(currentSection as typeof sections[number]) % 3) * 38 - 3}%`,
                  top: `${12 + Math.floor(sections.indexOf(currentSection as typeof sections[number]) / 3) * 40 - 3}%`,
                  background: character?.color || "#00f0ff",
                  boxShadow: `0 0 8px ${character?.color || "#00f0ff"}`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Right - Quest Progress */}
      <motion.div
        className="absolute bottom-4 right-4 glass rounded-xl p-3 pointer-events-auto"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-[9px] text-white/30 mb-2.5 tracking-[0.2em] uppercase font-medium">
          Quest Progress
        </div>
        <div className="flex gap-1.5 items-center">
          {sections.map((section, i) => {
            const currentIdx = sections.indexOf(currentSection as typeof sections[number]);
            const isComplete = i < currentIdx;
            const isActive = currentSection === section;
            return (
              <div key={section} className="flex flex-col items-center gap-1">
                <div
                  className="w-7 h-1 rounded-full transition-all duration-700"
                  style={{
                    background: isComplete
                      ? character?.color || "#00f0ff"
                      : isActive
                      ? `${character?.color || "#00f0ff"}50`
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isComplete ? `0 0 6px ${character?.color || "#00f0ff"}40` : "none",
                  }}
                />
                <span className="text-[8px] text-white/20 hidden md:block">{sectionLabels[section]?.slice(0, 4)}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
