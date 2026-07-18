"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function AboutSection() {
  const { selectedCharacter, addXp } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { about } = DEFAULT_PORTFOLIO;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px]" style={{ background: `linear-gradient(90deg, ${character?.color || "#00f0ff"}, transparent)` }} />
            <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 font-medium">Chapter 1</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold leading-none">
            <span className="gradient-text-cyan">About</span>{" "}
            <span className="text-white/90">Me</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Main info - 3 cols */}
          <motion.div
            className="md:col-span-3 glass rounded-2xl p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ background: `radial-gradient(circle at top right, ${character?.color || "#00f0ff"}, transparent 70%)` }} />

            <div className="relative z-10">
              {/* Avatar & name */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}15, ${character?.accentColor || "#a855f7"}15)`,
                    border: `1px solid ${character?.color || "#00f0ff"}25`,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span role="img" aria-label="developer">&#x1F468;&#x200D;&#x1F4BB;</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0a15]" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{about.name}</h3>
                  <p className="text-sm font-medium" style={{ color: character?.color || "#00f0ff" }}>
                    {about.title}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {about.bio}
              </p>

              {/* Info rows */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-lg">&#x1F393;</span>
                  <span className="text-white/30 w-20">Education</span>
                  <span className="text-white/70 font-medium">{about.education}</span>
                </div>
                {about.career.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm p-2.5 rounded-lg bg-white/[0.02]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: character?.color || "#00f0ff" }} />
                    <span className="text-white/60">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: FiGithub, url: about.social.github, label: "GitHub" },
                  { icon: FiLinkedin, url: about.social.linkedin, label: "LinkedIn" },
                  { icon: FiMail, url: `mailto:${about.social.email}`, label: "Email" },
                ].map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-lg text-white/40 hover:text-white transition-all duration-300 text-xs"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addXp(10)}
                  >
                    <Icon size={14} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Goals - 2 cols */}
          <motion.div
            className="md:col-span-2 glass rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg">&#x2B50;</span>
              <h3 className="text-lg font-bold text-white">Future Goals</h3>
            </div>

            <div className="space-y-5">
              {about.goals.map((goal, i) => (
                <motion.div
                  key={i}
                  className="relative pl-5"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${character?.color || "#00f0ff"}40, transparent)` }} />
                  <motion.div
                    className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3.5px]"
                    style={{ background: character?.color || "#00f0ff", boxShadow: `0 0 8px ${character?.color || "#00f0ff"}60` }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <p className="text-white/60 text-sm leading-relaxed">{goal}</p>
                </motion.div>
              ))}
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${character?.color || "#00f0ff"}, transparent 70%)` }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
