"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";

export default function CertificationsSection() {
  const { selectedCharacter, addXp } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { certificates } = DEFAULT_PORTFOLIO;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto w-full"
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
            Achievement Hall
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              background: `linear-gradient(135deg, #fbbf24, ${character?.color || "#00f0ff"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Certifications
          </h2>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => addXp(200)}
            >
              <motion.div
                className="glass rounded-xl p-6 h-full relative overflow-hidden cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 0 30px rgba(251, 191, 36, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Gold glow overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Achievement icon */}
                <div className="text-4xl mb-4">🏆</div>

                {/* Certificate title */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-yellow-400/80 mb-2">
                  {cert.issuer}
                </p>
                <p className="text-xs text-white/30 mb-4">
                  Issued: {cert.date} · ID: {cert.credentialId}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/10 text-yellow-400/70 border border-yellow-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Hover particles effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-yellow-400/60"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -20],
                        opacity: [0.6, 0],
                        scale: [1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
