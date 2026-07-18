"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS } from "@/lib/constants";

const COMMANDS: Record<string, { response: string; action?: () => void }> = {
  help: {
    response: `Available commands:
  about       - Learn about Aditya
  skills      - View skill tree
  projects    - Browse quest board
  experience  - View work history
  certs       - View certifications
  timeline    - Explore life chapters
  contact     - Open the shrine
  github      - Open GitHub profile
  linkedin    - Open LinkedIn
  resume      - Download resume
  guide       - Talk to your guide
  music       - Toggle music
  weather     - Change weather
  theme       - Change theme
  clear       - Clear terminal
  help        - Show this message`,
  },
  about: {
    response: `Aditya Sharma — Full Stack Engineer & Cybersecurity Specialist

A passionate developer bridging cybersecurity and modern web development.
Building secure, performant, and beautiful applications with a focus on
defending the digital frontier.

Education: Computer Science & Cybersecurity

Type "skills" to explore his abilities.`,
  },
  skills: {
    response: `Loading skill tree...

  [Cyber Security  ████████░░ 85/100]
  [Networking      ████████░░ 80/100]
  [Malware Analysis ███████░░░ 70/100]
  [SOC Operations  ████████░░ 75/100]
  [Web Development █████████░ 90/100]
  [Cloud           ████████░░ 75/100]
  [AI / ML         ███████░░░ 65/100]
  [Linux           ████████░░ 85/100]
  [Programming     █████████░ 88/100]

Scroll down to see the full RPG Skill Tree.`,
  },
  projects: {
    response: `=== MISSION BOARD ===

  [S-Rank] CyberShield Pro
    XP: 5000 | Python, TensorFlow, React
    AI-powered threat detection system

  [A-Rank] NetScope
    XP: 3500 | Go, Vue.js, D3.js
    Network analysis & visualization

  [S-Rank] AnimeVerse Portfolio
    XP: 10000 | Next.js, Three.js, GSAP
    The most immersive 3D portfolio

Type "projects" to view the full quest board.`,
  },
  experience: {
    response: `=== WORK HISTORY ===

  CyberLab Solutions | Security Research Intern | 2024
  - Vulnerability assessments & penetration testing
  - Tools: Nmap, Metasploit, Wireshark, Python

  TechNova | Full Stack Developer | 2023
  - Responsive web applications with security focus
  - React, Node.js, TypeScript, PostgreSQL`,
  },
  certs: {
    response: `=== CERTIFICATIONS ===

  🏆 CompTIA Security+ (2023)
  🏆 AWS Cloud Practitioner (2024)
  🏆 Google Cybersecurity Certificate (2023)`,
  },
  timeline: {
    response: `=== LIFE CHAPTERS ===

  Ch.1 | 2020 | Started Programming 💻
  Ch.2 | 2021 | Cybersecurity Awakening 🛡️
  Ch.3 | 2022 | University 🎓
  Ch.4 | 2023 | Hackathons ⚡
  Ch.5 | 2024 | Open Source 🌐
  Ch.6 | 2025+| The Future 🚀`,
  },
  contact: {
    response: `Opening the Japanese Shrine...
  🏮 The lanterns glow warmly.
  🌸 Cherry blossoms drift gently.
  
  Send your message through the shrine.
  Email: contact@adityasharma.dev`,
  },
  github: {
    response: "Opening GitHub profile...",
    action: () => window.open("https://github.com/adityasharma", "_blank"),
  },
  linkedin: {
    response: "Opening LinkedIn profile...",
    action: () =>
      window.open("https://linkedin.com/in/adityasharma", "_blank"),
  },
  resume: {
    response: "Preparing resume for download...",
  },
  music: {
    response: "Toggling music system...",
  },
  weather: {
    response: "Available weather: sunny, night, rain, snow, fog, cherry-blossom, storm, golden-sunset",
  },
  theme: {
    response: "Available themes: cyberpunk, fantasy, sakura, midnight, neon",
  },
  guide: {
    response: "Your guide approaches and bows respectfully.\n\n\"How may I assist you on this journey? Ask me anything about Aditya's skills, projects, or experience.\"",
  },
};

export default function Terminal() {
  const { terminalOpen, toggleTerminal, selectedCharacter, addXp } =
    useAppStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "AnimeVerse Terminal v1.0 — Type 'help' for commands",
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newHistory = [...history, `> ${cmd}`];

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "exit") {
        toggleTerminal();
        return;
      }

      const cmdData = COMMANDS[trimmed];
      if (cmdData) {
        newHistory.push(cmdData.response, "");
        cmdData.action?.();
        addXp(50);
      } else if (trimmed) {
        newHistory.push(
          `Unknown command: "${trimmed}". Type 'help' for available commands.`,
          ""
        );
      }

      setHistory(newHistory);
    },
    [history, toggleTerminal, addXp]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
    if (e.key === "Escape") {
      toggleTerminal();
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={toggleTerminal}
          />

          {/* Terminal */}
          <motion.div
            className="relative w-full max-w-2xl glass-strong rounded-xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: character?.color || "#00f0ff" }}
              >
                {character?.name || "AnimeVerse"}@portfolio ~ %
              </span>
              <button
                onClick={toggleTerminal}
                className="text-white/40 hover:text-white text-xs cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto p-4 font-mono text-sm"
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith(">")
                      ? "text-cyan-400"
                      : "text-white/70"
                  }
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
              <span
                className="text-sm font-mono"
                style={{ color: character?.color || "#00f0ff" }}
              >
                ❯
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white/90 font-mono text-sm outline-none placeholder:text-white/20"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
