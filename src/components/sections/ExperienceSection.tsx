"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";

export default function ExperienceSection() {
  const { selectedCharacter } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { experience } = DEFAULT_PORTFOLIO;

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
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2 block">
            Battle Records
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}, ${character?.accentColor || "#a855f7"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 md:p-8 group relative overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 20px ${character?.color || "#00f0ff"}10`,
              }}
            >
              {/* Accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: `linear-gradient(180deg, ${character?.color || "#00f0ff"}, ${character?.accentColor || "#a855f7"})`,
                }}
              />

              <div className="pl-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: character?.color || "#00f0ff" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs text-white/30 tracking-wider bg-white/5 px-3 py-1 rounded-full self-start">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
