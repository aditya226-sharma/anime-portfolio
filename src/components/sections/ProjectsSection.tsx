"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";
import { FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";

const DIFF_COLORS: Record<string, string> = {
  S: "#fbbf24", A: "#ef4444", B: "#a855f7", C: "#00f0ff", D: "#10b981",
};

export default function ProjectsSection() {
  const { selectedCharacter, addXp } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { projects } = DEFAULT_PORTFOLIO;
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${character?.color || "#00f0ff"})` }} />
            <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 font-medium">Chapter 3</span>
            <div className="w-8 h-[1px]" style={{ background: `linear-gradient(90deg, ${character?.color || "#00f0ff"}, transparent)` }} />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold">
            <span className="gradient-text-cyan">Mission</span>{" "}
            <span className="text-white/90">Board</span>
          </h2>
          <p className="text-white/30 text-sm mt-3">Each project is a quest completed &mdash; click to explore</p>
        </motion.div>

        {/* Mission cards */}
        <div className="space-y-5">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const diffColor = DIFF_COLORS[project.difficulty] || "#00f0ff";

            return (
              <motion.div
                key={project.id}
                className="quest-card glass rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                onClick={() => {
                  setExpandedProject(isExpanded ? null : project.id);
                  if (!isExpanded) addXp(100);
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Badges */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className="px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider"
                          style={{
                            background: `${diffColor}12`,
                            color: diffColor,
                            border: `1px solid ${diffColor}25`,
                          }}
                        >
                          {project.difficulty}-RANK
                        </span>
                        <span className="text-[11px] text-yellow-400/70 font-medium">
                          &#x26A1; {project.xpReward.toLocaleString()} XP
                        </span>
                      </div>

                      {/* Title & description */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed max-w-2xl">{project.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.03] text-white/50 border border-white/[0.06]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      className="text-white/15 text-lg mt-2 shrink-0"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown size={20} />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/5">
                          {/* Architecture */}
                          <div className="mb-5">
                            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1.5 font-medium">Architecture</h4>
                            <p className="text-sm text-white/50">{project.architecture}</p>
                          </div>

                          {/* Holographic preview */}
                          <div className="w-full h-52 rounded-xl mb-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}05, ${character?.accentColor || "#a855f7"}05)`, border: "1px solid rgba(255,255,255,0.04)" }}>
                            <div className="absolute inset-0 grid-pattern opacity-30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl mb-2">&#x1F7E2;</div>
                                <span className="text-xs text-white/20">3D Holographic Project Room</span>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-3">
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-sm text-white/60 hover:text-white transition-colors"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiGithub size={15} />
                              GitHub
                            </motion.a>
                            <motion.a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all"
                              style={{
                                background: `${character?.color || "#00f0ff"}12`,
                                color: character?.color || "#00f0ff",
                                border: `1px solid ${character?.color || "#00f0ff"}25`,
                              }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiExternalLink size={15} />
                              Live Demo
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
