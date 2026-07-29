"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";

export default function TimelineSection() {
  const { selectedCharacter } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { timeline } = DEFAULT_PORTFOLIO;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2 block">
            Life Chapters
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}, ${character?.accentColor || "#a855f7"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, ${character?.color || "#00f0ff"}40, ${character?.accentColor || "#a855f7"}40, transparent)`,
            }}
          />

          {timeline.map((entry, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={entry.id}
                className={`relative flex items-center mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? "md:pr-0 md:text-right" : "md:pl-0 md:text-left"
                  }`}
                >
                  <motion.div
                    className="glass rounded-xl p-6 group cursor-pointer"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `0 0 20px ${character?.color || "#00f0ff"}15`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl mb-3">{entry.icon}</div>
                    <span className="text-xs tracking-wider text-white/30">
                      Chapter {entry.chapter} · {entry.date}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-2 leading-relaxed">
                      {entry.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `${character?.color || "#00f0ff"}20`,
                      border: `2px solid ${character?.color || "#00f0ff"}60`,
                      boxShadow: `0 0 10px ${character?.color || "#00f0ff"}30`,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-xs font-bold" style={{ color: character?.color || "#00f0ff" }}>
                      {entry.chapter}
                    </span>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
