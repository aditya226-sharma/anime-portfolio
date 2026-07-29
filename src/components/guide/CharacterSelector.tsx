"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS } from "@/lib/constants";
import { CharacterId } from "@/types";

const characterIds = Object.keys(CHARACTERS) as CharacterId[];

const BG_PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: ((i * 1.25 + 3) % 100).toFixed(1),
  top: ((i * 1.37 + 7) % 100).toFixed(1),
  size: (1 + (i % 2)).toFixed(1),
  hue: 180 + ((i * 3) % 120),
  duration: (2 + (i % 3)).toFixed(1),
  delay: ((i * 0.25) % 2).toFixed(1),
}));

export default function CharacterSelector() {
  const { setSelectedCharacter, setIntroComplete } = useAppStore();
  const [selected, setSelected] = useState<CharacterId | null>(null);
  const [hoveredId, setHoveredId] = useState<CharacterId | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleSelect = (id: CharacterId) => {
    setSelected(id);
    setShowInfo(true);
  };

  const handleConfirm = () => {
    if (selected) {
      setSelectedCharacter(selected);
      setIntroComplete(true);
    }
  };

  const activeChar = selected ? CHARACTERS[selected] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#050510] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {BG_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`, top: `${p.top}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              background: `hsl(${p.hue}, 80%, 70%)`,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: Number(p.duration), repeat: Infinity, delay: Number(p.delay) }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      {activeChar && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-[800px] h-[800px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `radial-gradient(circle, ${activeChar.color}40, transparent 60%)`,
              filter: "blur(100px)",
            }}
          />
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        className="text-center mb-10 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="text-xs tracking-[0.5em] uppercase text-cyan-400/60 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Select Your Companion
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold">
          <span className="gradient-text-cyan">Choose Your Guide</span>
        </h2>
        <p className="text-white/30 text-sm mt-3 max-w-md mx-auto">
          Each guide has unique abilities and will narrate your portfolio journey
        </p>
      </motion.div>

      {/* Character grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 px-6 max-w-5xl relative z-10 w-full">
        {characterIds.map((id, index) => {
          const char = CHARACTERS[id];
          const isSelected = selected === id;
          const isHovered = hoveredId === id;

          return (
            <motion.button
              key={id}
              className={`relative group cursor-pointer rounded-xl p-4 md:p-5 text-left transition-all duration-500 border ${
                isSelected
                  ? "border-opacity-50"
                  : "border-transparent hover:border-white/10 hover:bg-white/[0.02]"
              }`}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${char.color}10, ${char.accentColor}10)`
                  : undefined,
                borderColor: isSelected ? `${char.color}50` : undefined,
                boxShadow: isSelected
                  ? `0 0 40px ${char.color}15, inset 0 0 40px ${char.color}05`
                  : undefined,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleSelect(id)}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Character icon */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${char.color}15, ${char.accentColor}15)`,
                    border: `1px solid ${isSelected ? char.color + "40" : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  <span className="text-3xl md:text-4xl" style={{ filter: `drop-shadow(0 0 10px ${char.color}40)` }}>
                    {id === "cyber-ninja" && "\u{1F977}"}
                    {id === "arcane-mage" && "\u{1F9D9}\u200D\u2640\uFE0F"}
                    {id === "samurai-guardian" && "\u{2694}\uFE0F"}
                    {id === "spirit-fox" && "\u{1F98A}"}
                    {id === "ai-android" && "\u{1F916}"}
                    {id === "shadow-assassin" && "\u{1F5E1}\uFE0F"}
                    {id === "time-traveler" && "\u{231B}"}
                    {id === "guardian-knight" && "\u{1F6E1}\uFE0F"}
                  </span>

                  {/* Glow ring */}
                  {(isSelected || isHovered) && (
                    <motion.div
                      className="absolute -inset-1 rounded-2xl"
                      style={{
                        border: `1.5px solid ${char.color}50`,
                        boxShadow: `0 0 20px ${char.color}30`,
                      }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                <h3 className="font-bold text-sm md:text-base" style={{ color: char.color }}>
                  {char.name}
                </h3>
                <p className="text-white/30 text-[11px] mt-0.5">{char.title}</p>
              </div>

              {/* Selected check */}
              {isSelected && (
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: char.color, boxShadow: `0 0 15px ${char.color}` }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected character info panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            className="mt-8 text-center max-w-lg px-6 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-xl px-6 py-5">
              <p className="text-white/50 text-sm italic mb-4 leading-relaxed">
                &ldquo;{CHARACTERS[selected].greeting}&rdquo;
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {CHARACTERS[selected].abilities.map((ability, i) => (
                  <motion.span
                    key={ability}
                    className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: `${CHARACTERS[selected].color}10`,
                      color: CHARACTERS[selected].color,
                      border: `1px solid ${CHARACTERS[selected].color}25`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {ability}
                  </motion.span>
                ))}
              </div>
              <p className="text-white/20 text-xs mt-3">{CHARACTERS[selected].personality}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm button */}
      <motion.div
        className="mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0.2 }}
      >
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="group relative px-12 py-3.5 rounded-lg font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer disabled:cursor-not-allowed overflow-hidden"
          style={{
            background: selected
              ? `linear-gradient(135deg, ${activeChar?.color}20, ${activeChar?.accentColor}20)`
              : "rgba(255,255,255,0.03)",
            border: selected
              ? `1px solid ${activeChar?.color}50`
              : "1px solid rgba(255,255,255,0.08)",
            color: selected ? activeChar?.color : "rgba(255,255,255,0.2)",
            boxShadow: selected ? `0 0 30px ${activeChar?.color}15` : "none",
          }}
        >
          <span className="relative z-10">Begin Journey</span>
          {selected && (
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: `inset 0 0 30px ${activeChar?.color}15` }}
            />
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
