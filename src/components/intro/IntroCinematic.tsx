"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";

// Pre-computed deterministic values
const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  left: ((i * 1.25 + 3) % 100).toFixed(1),
  top: ((i * 1.37 + 7) % 100).toFixed(1),
  size: (1 + (i % 3)).toFixed(1),
  duration: (2 + (i % 4)).toFixed(1),
  delay: (i % 3).toFixed(1),
}));

const CHERRY_BLOSSOMS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: (i * 1.67 + 5) % 100,
  delay: (i * 0.25) % 6,
  duration: 5 + (i % 7),
  size: 10 + (i % 14),
  opacity: 0.3 + (i % 5) * 0.12,
  drift: ((i % 2 === 0 ? 1 : -1) * (10 + (i % 30))).toFixed(0),
}));

const CLOUDS = [
  { x: -10, y: 3, w: 500, h: 120, opacity: 0.12, dur: 8 },
  { x: 8, y: 5, w: 600, h: 150, opacity: 0.09, dur: 10 },
  { x: -5, y: 7, w: 700, h: 180, opacity: 0.07, dur: 12 },
  { x: 12, y: 2, w: 400, h: 100, opacity: 0.1, dur: 9 },
];

const PORTAL_RINGS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  radius: 2.2 - i * 0.4,
  thickness: 0.12 - i * 0.03,
  speed: 6 + i * 3,
  color1: ["#a855f7", "#00f0ff", "#ff006e"][i],
  color2: ["#00f0ff", "#ff006e", "#fbbf24"][i],
}));

const PORTAL_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  angle: (i * Math.PI * 2) / 20,
  distance: 60 + (i % 5) * 10,
  size: 2 + (i % 3),
}));

const SUBTITLES = [
  { text: "In a world where code meets imagination...", delay: 500 },
  { text: "A journey awaits beyond the portal...", delay: 3500 },
  { text: "Enter the AnimeVerse.", delay: 7000 },
];

export default function IntroCinematic() {
  const { setIntroComplete } = useAppStore();
  const [phase, setPhase] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
  const [showStartButton, setShowStartButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Start wind sound on mount
  useEffect(() => {
    const startAmbient = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        // Create wind sound
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 400;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
        gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 6);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        audioRef.current = { stop: () => whiteNoise.stop() } as any;
      } catch (e) {
        // Audio not available
      }
    };

    startAmbient();
    return () => {
      try { audioRef.current?.stop(); } catch {}
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 6500),
      setTimeout(() => setPhase(4), 9000),
      setTimeout(() => setTextVisible(true), 10000),
      setTimeout(() => setShowStartButton(true), 11500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase >= 1 && phase <= 3) {
      const sub = SUBTITLES[phase - 1];
      if (sub) {
        setSubtitleText("");
        let charIdx = 0;
        const typeTimer = setInterval(() => {
          if (charIdx <= sub.text.length) {
            setSubtitleText(sub.text.slice(0, charIdx));
            charIdx++;
          } else {
            clearInterval(typeTimer);
          }
        }, 35);
        return () => clearInterval(typeTimer);
      }
    }
  }, [phase]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showStartButton) handleStart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showStartButton]);

  const handleStart = () => {
    try { audioRef.current?.stop(); } catch {}
    setPhase(5);
    setTimeout(() => setIntroComplete(true), 1800);
  };

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: phase === 0
                ? "radial-gradient(ellipse at center, #0a0010 0%, #000000 100%)"
                : phase === 1
                ? "radial-gradient(ellipse at center, #1a0030 0%, #050010 100%)"
                : phase === 2
                ? "radial-gradient(ellipse at 50% 80%, #1a0a3a 0%, #0a0015 60%, #000 100%)"
                : "radial-gradient(ellipse at 50% 50%, #0a1a3a 0%, #050a20 50%, #000 100%)",
            }}
            transition={{ duration: 3 }}
          />

          {/* Stars */}
          <div className="absolute inset-0">
            {STARS.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{
                  duration: Number(star.duration),
                  repeat: Infinity,
                  delay: Number(star.delay),
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Nebula effect */}
          {phase >= 1 && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 3 }}
            >
              <div className="absolute w-[600px] h-[600px] rounded-full opacity-20"
                style={{
                  left: "20%", top: "30%",
                  background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
                  filter: "blur(80px)",
                }}
              />
              <div className="absolute w-[500px] h-[500px] rounded-full opacity-15"
                style={{
                  right: "15%", top: "20%",
                  background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
                  filter: "blur(80px)",
                }}
              />
            </motion.div>
          )}

          {/* Clouds */}
          {phase >= 2 && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3 }}
            >
              {CLOUDS.map((cloud, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: `radial-gradient(ellipse, rgba(120, 140, 200, ${cloud.opacity}), transparent 70%)`,
                    width: cloud.w, height: cloud.h,
                    left: `${50 + cloud.x * 2}%`, top: `${50 + cloud.y * 4}%`,
                  }}
                  animate={{ x: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: cloud.dur, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}

          {/* Floating island */}
          {phase >= 2 && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: "35%", width: "700px", height: "250px" }}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 700 250" className="w-full h-full">
                <defs>
                  <linearGradient id="isleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2a1a4a" />
                    <stop offset="50%" stopColor="#1a0a30" />
                    <stop offset="100%" stopColor="#0a0520" />
                  </linearGradient>
                  <filter id="isleGlow">
                    <feGaussianBlur stdDeviation="4" result="glow" />
                    <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="templeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3a2060" />
                    <stop offset="100%" stopColor="#1a0a30" />
                  </linearGradient>
                </defs>
                {/* Island body */}
                <path d="M80,220 Q130,210 180,200 Q230,140 300,110 Q350,90 400,100 Q450,110 500,150 Q550,190 560,210 Q580,220 600,230 L100,230 Z" fill="url(#isleGrad)" filter="url(#isleGlow)" />
                {/* Grass top */}
                <path d="M120,215 Q200,195 350,185 Q500,195 580,215" fill="#1a3a1a" opacity="0.6" />
                {/* Temple */}
                <path d="M330,115 L350,70 L370,115" fill="url(#templeGrad)" stroke="rgba(168,85,247,0.4)" strokeWidth="0.8" />
                <path d="M315,115 L350,50 L385,115" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
                {/* Trees */}
                {[[200, 190], [250, 180], [400, 185], [480, 195]].map(([tx, ty], i) => (
                  <g key={i}>
                    <rect x={tx - 2} y={ty - 20} width={4} height={20} fill="#3d2b1f" rx={1} />
                    <polygon points={`${tx},${ty - 40} ${tx - 12},${ty - 20} ${tx + 12},${ty - 20}`} fill="#2d5a27" opacity="0.8" />
                  </g>
                ))}
                {/* Waterfall */}
                <rect x="530" y="150" width="3" height="70" fill="rgba(100,180,255,0.3)" rx="1">
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                </rect>
              </svg>
            </motion.div>
          )}

          {/* Portal */}
          {phase >= 3 && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-56 h-56">
                {/* Rotating rings */}
                {PORTAL_RINGS.map((ring) => (
                  <motion.div
                    key={ring.id}
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `${ring.thickness}rem solid`,
                      borderImage: `linear-gradient(135deg, ${ring.color1}, ${ring.color2}) 1`,
                      margin: `${(2.2 - ring.radius) * 4}rem`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
                  />
                ))}

                {/* Inner glow */}
                <motion.div
                  className="absolute inset-8 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(0,240,255,0.4), rgba(168,85,247,0.3), transparent 70%)",
                    boxShadow: "0 0 80px rgba(0, 240, 255, 0.4), 0 0 160px rgba(168, 85, 247, 0.3)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 80px rgba(0, 240, 255, 0.4), 0 0 160px rgba(168, 85, 247, 0.3)",
                      "0 0 120px rgba(0, 240, 255, 0.6), 0 0 200px rgba(168, 85, 247, 0.5)",
                      "0 0 80px rgba(0, 240, 255, 0.4), 0 0 160px rgba(168, 85, 247, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Particles */}
                {PORTAL_PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      left: "50%", top: "50%",
                      width: p.size, height: p.size,
                      background: `hsl(${(p.id * 36) % 360}, 80%, 70%)`,
                    }}
                    animate={{
                      x: [0, Math.cos(p.angle) * p.distance],
                      y: [0, Math.sin(p.angle) * p.distance],
                      opacity: [0.8, 0],
                      scale: [1, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: p.id * 0.12,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Cherry blossoms */}
          {phase >= 1 && (
            <div className="absolute inset-0 pointer-events-none">
              {CHERRY_BLOSSOMS.map((b) => (
                <motion.div
                  key={b.id}
                  className="absolute"
                  style={{ left: `${b.left}%`, top: "-5%", width: b.size, height: b.size }}
                  animate={{
                    y: ["0vh", "110vh"],
                    x: [0, Number(b.drift), -Number(b.drift) * 0.5],
                    rotate: [0, 360, 720],
                  }}
                  transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ opacity: b.opacity }}>
                    <path d="M12 2C12 2 14 6 18 8C14 10 12 14 12 14C12 14 10 10 6 8C10 6 12 2 12 2Z" fill="#ffb7d5" />
                    <path d="M12 6C12 6 14 8 16 9C14 10 12 12 12 12C12 12 10 10 8 9C10 8 12 6 12 6Z" fill="#ff8fbf" />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
          />

          {/* Subtitles */}
          <AnimatePresence mode="wait">
            {!textVisible && phase >= 1 && phase <= 3 && (
              <motion.div
                key={phase}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center max-w-2xl px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass rounded-lg px-8 py-4">
                  <p className="text-lg md:text-xl text-white/90 font-light tracking-wide" style={{ fontFamily: "var(--font-geist-mono)" }}>
                    {subtitleText}
                    <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse" />
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main title */}
          {textVisible && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.p
                  className="text-sm md:text-base tracking-[0.6em] uppercase text-purple-400/80 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Welcome To
                </motion.p>

                <motion.h1
                  className="text-5xl md:text-8xl lg:text-9xl font-bold text-center leading-none"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, #00f0ff, #a855f7, #ff006e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 30px rgba(0, 240, 255, 0.3))",
                    }}
                    animate={{ filter: ["drop-shadow(0 0 30px rgba(0, 240, 255, 0.3))", "drop-shadow(0 0 50px rgba(168, 85, 247, 0.5))", "drop-shadow(0 0 30px rgba(0, 240, 255, 0.3))"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ADITYA
                  </motion.span>
                  <motion.span
                    className="block mt-2"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #ff006e, #fbbf24)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    SHARMA&apos;S
                  </motion.span>
                  <motion.span
                    className="block mt-2"
                    style={{
                      background: "linear-gradient(135deg, #ff006e, #fbbf24, #00f0ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    WORLD
                  </motion.span>
                </motion.h1>

                <motion.div
                  className="mt-4 text-xs tracking-[0.3em] text-white/20 uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  AnimeVerse AI Portfolio
                </motion.div>
              </motion.div>

              {/* Start button */}
              {showStartButton && (
                <motion.div
                  className="mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={handleStart}
                    className="group relative px-14 py-5 text-lg font-semibold tracking-[0.3em] uppercase overflow-hidden rounded cursor-pointer"
                    style={{
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      background: "rgba(0, 240, 255, 0.03)",
                    }}
                  >
                    <span className="relative z-10 text-cyan-400 group-hover:text-white transition-colors duration-500">
                      Press Start
                    </span>
                    {/* Scanning line */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: "0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 40px rgba(0, 240, 255, 0.1)" }}
                    />
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/50" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400/50" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400/50" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/50" />
                  </button>
                </motion.div>
              )}

              <motion.p
                className="mt-6 text-xs text-white/20 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: showStartButton ? 1 : 0 }}
                transition={{ delay: 0.5 }}
              >
                PRESS ENTER OR CLICK TO BEGIN
              </motion.p>
            </motion.div>
          )}

          {/* Phase 5 flash */}
          {phase === 5 && (
            <>
              <motion.div className="absolute inset-0 bg-cyan-400/10" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 1.8 }} />
              <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
