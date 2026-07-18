"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS } from "@/lib/constants";

const SECTION_DIALOGUES: Record<string, string> = {
  about: "Welcome! I am {name}, your guide through this digital realm. Aditya is a Full Stack Engineer and Cybersecurity Specialist — passionate about building secure, performant applications. Let me show you more!",
  skills: "Behold — the RPG Skill Tree! Each node represents a skill earned through dedication. Cyber Security at 85%, Web Development at 90%... hover over each to see the details.",
  projects: "The Mission Board awaits! Each project is a quest Aditya has completed. Look at those difficulty ratings — there are S-Rank missions here. Click to explore the holographic project rooms!",
  experience: "These are the Battle Records — real-world experience from security research to full-stack development. Each battle fought with honor and skill.",
  certifications: "The Achievement Hall! Golden glowing badges of honor. Each certificate represents a milestone conquered. Hover to see them glow!",
  timeline: "Let me walk you through the chapters of this journey. From writing the first line of code to building AI-powered security systems — every great story has humble beginnings.",
  contact: "The Japanese Shrine awaits your message. The lanterns are lit, cherry blossoms drift through the air... write your words and they shall be carried through the digital realm.",
};

export default function GuideDialogue() {
  const { selectedCharacter, currentSection, addXp } = useAppStore();
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charRef = useRef(0);

  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;

  useEffect(() => {
    const template = SECTION_DIALOGUES[currentSection] || "Let me show you around!";
    const dialogue = template.replace("{name}", character?.name || "Guide");

    setDisplayedText("");
    setIsTyping(true);
    setIsVisible(true);
    charRef.current = 0;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const type = () => {
      if (charRef.current <= dialogue.length) {
        setDisplayedText(dialogue.slice(0, charRef.current));
        charRef.current++;
        timeoutRef.current = setTimeout(type, 22);
      } else {
        setIsTyping(false);
        addXp(25);
      }
    };

    const startDelay = setTimeout(type, 600);
    return () => {
      clearTimeout(startDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSection, character?.name]);

  if (!character) return null;

  const characterEmoji: Record<string, string> = {
    "cyber-ninja": "\u{1F977}",
    "arcane-mage": "\u{1F9D9}\u200D\u2640\uFE0F",
    "samurai-guardian": "\u{2694}\uFE0F",
    "spirit-fox": "\u{1F98A}",
    "ai-android": "\u{1F916}",
    "shadow-assassin": "\u{1F5E1}\uFE0F",
    "time-traveler": "\u{231B}",
    "guardian-knight": "\u{1F6E1}\uFE0F",
  };

  return (
    <motion.div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] max-w-xl w-full px-4"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="dialogue-box glass-strong rounded-2xl p-5 relative">
        {/* Character portrait */}
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{
              background: `linear-gradient(135deg, ${character.color}25, ${character.accentColor}25)`,
              border: `1px solid ${character.color}30`,
              boxShadow: `0 0 15px ${character.color}20`,
            }}
            animate={isTyping ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {characterEmoji[selectedCharacter || ""] || "?"}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-sm" style={{ color: character.color }}>
                {character.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                {character.title}
              </span>
              {isTyping && (
                <span className="text-[10px] text-white/20 ml-auto flex items-center gap-1">
                  <motion.span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: character.color }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  Speaking
                </span>
              )}
            </div>
            <p className="text-white/70 text-sm leading-relaxed min-h-[2.5rem]">
              {displayedText}
              <span
                className="inline-block w-[2px] h-4 ml-0.5 align-middle"
                style={{
                  background: character.color,
                  opacity: isTyping ? 1 : 0,
                }}
              />
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: character.color }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
          <span className="text-[9px] text-white/15 tracking-wider">
            {isTyping ? "..." : "Click any section to continue"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
