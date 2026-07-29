"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";

export default function SkillsSection() {
  const { selectedCharacter, addXp } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { skills } = DEFAULT_PORTFOLIO;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { name: "Security", color: "#ef4444", gradient: "from-red-500/20 to-red-900/10" },
    { name: "Development", color: "#00f0ff", gradient: "from-cyan-500/20 to-cyan-900/10" },
    { name: "Systems", color: "#10b981", gradient: "from-emerald-500/20 to-emerald-900/10" },
  ];

  const hoveredData = hoveredSkill ? skills.find((s) => s.id === hoveredSkill) : null;
  const hoveredCat = hoveredData ? categories.find((c) => c.name === hoveredData.category) : null;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6">
      <motion.div
        className="max-w-6xl mx-auto w-full"
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
            <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 font-medium">Chapter 2</span>
            <div className="w-8 h-[1px]" style={{ background: `linear-gradient(90deg, ${character?.color || "#00f0ff"}, transparent)` }} />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold">
            <span className="gradient-text-cyan">Skill</span>{" "}
            <span className="text-white/90">Tree</span>
          </h2>
          <p className="text-white/30 text-sm mt-3">RPG-style progression &mdash; hover to inspect each node</p>
        </motion.div>

        {/* Category legend */}
        <div className="flex justify-center gap-6 mb-10">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}50` }} />
              <span className="text-white/40">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Skill Tree Container */}
        <div className="relative glass rounded-2xl p-6 md:p-10 overflow-hidden min-h-[550px]">
          {/* Grid background */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Hover info panel */}
          <AnimatePresence>
            {hoveredData && hoveredCat && (
              <motion.div
                className="absolute top-6 right-6 glass-strong rounded-xl p-4 w-56 z-20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{hoveredData.icon}</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: hoveredCat.color }}>{hoveredData.name}</div>
                    <div className="text-[10px] text-white/30">{hoveredData.category}</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${hoveredCat.color}, ${character?.accentColor || "#a855f7"})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredData.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30">Level {hoveredData.level}/{hoveredData.maxLevel}</span>
                  <span className="font-bold" style={{ color: hoveredCat.color }}>{hoveredData.level}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {skills.map((skill) =>
              skill.children.map((childId) => {
                const child = skills.find((s) => s.id === childId);
                if (!child) return null;
                const x1 = (skill.x / 800) * 100;
                const y1 = (skill.y / 800) * 100;
                const x2 = (child.x / 800) * 100;
                const y2 = (child.y / 800) * 100;
                const isActive = hoveredSkill === skill.id || hoveredSkill === childId;
                const lineX1 = `${x1}%`;
                const lineY1 = `${y1}%`;
                const lineX2 = `${x2}%`;
                const lineY2 = `${y2}%`;
                return (
                  <line
                    key={`${skill.id}-${childId}`}
                    x1={lineX1}
                    y1={lineY1}
                    x2={lineX2}
                    y2={lineY2}
                    className={isActive ? "skill-connection-active" : "skill-connection"}
                  />
                );
              })
            )}
          </svg>

          {/* Skill nodes */}
          <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
            {skills.map((skill, index) => {
              const cat = categories.find((c) => c.name === skill.category);
              const isHovered = hoveredSkill === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${(skill.x / 800) * 100}%`,
                    top: `${(skill.y / 800) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => addXp(50)}
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Outer glow */}
                  {isHovered && (
                    <motion.div
                      className="absolute -inset-3 rounded-full"
                      style={{ border: `1.5px solid ${cat?.color || character?.color}30`, boxShadow: `0 0 25px ${cat?.color || character?.color}25` }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}

                  {/* Node */}
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300"
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${cat?.color || "#00f0ff"}20, ${character?.accentColor || "#a855f7"}10)`
                        : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${isHovered ? (cat?.color || character?.color) + "50" : "rgba(255,255,255,0.06)"}`,
                      boxShadow: isHovered ? `0 0 20px ${cat?.color || character?.color}25` : "none",
                    }}
                  >
                    <span className="text-lg md:text-xl">{skill.icon}</span>
                    <span className="text-[8px] text-white/40 mt-0.5 font-medium">{skill.level}%</span>
                  </div>

                  {/* Label */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <span className="text-[10px] md:text-[11px] text-white/50 font-medium">{skill.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
