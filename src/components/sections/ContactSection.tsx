"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { CHARACTERS, DEFAULT_PORTFOLIO } from "@/lib/constants";
import { FiSend } from "react-icons/fi";

const LANTERNS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + (i * 7.5) % 90,
  top: 5 + (i * 7.8) % 90,
  duration: 3 + (i % 2),
  delay: (i * 0.5) % 3,
}));

const FIREFLIES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: 10 + (i * 5.3) % 80,
  top: (i * 6.7) % 100,
  duration: 2 + (i % 2),
  delay: (i * 0.3) % 2,
}));

export default function ContactSection() {
  const { selectedCharacter, addXp } = useAppStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;
  const { about } = DEFAULT_PORTFOLIO;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addXp(500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
      {/* Background lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {LANTERNS.map((lantern) => (
          <motion.div
            key={lantern.id}
            className="absolute"
            style={{ left: `${lantern.left}%`, top: `${lantern.top}%` }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: lantern.duration, repeat: Infinity, delay: lantern.delay }}
          >
            <div className="text-2xl opacity-30">&#x1F3EE;</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-2xl mx-auto w-full relative z-10"
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
            The Japanese Shrine
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              background: `linear-gradient(135deg, #ef4444, ${character?.color || "#00f0ff"})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact
          </h2>
          <p className="text-white/40 text-sm mt-3">
            Leave a message at the shrine. The lanterns will carry your words.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="glass rounded-2xl p-8 space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 tracking-wider uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/90 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 tracking-wider uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/90 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/90 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20 resize-none h-36"
                  placeholder="Write your message..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${character?.color || "#00f0ff"}20, ${character?.accentColor || "#a855f7"}20)`,
                  border: `1px solid ${character?.color || "#00f0ff"}40`,
                  color: character?.color || "#00f0ff",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 20px ${character?.color || "#00f0ff"}20`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSend size={16} />
                Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass rounded-2xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Bowing guide */}
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotateX: [0, 30, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {selectedCharacter === "cyber-ninja" && "🥷"}
                {selectedCharacter === "arcane-mage" && "🧙‍♀️"}
                {selectedCharacter === "samurai-guardian" && "⚔️"}
                {selectedCharacter === "spirit-fox" && "🦊"}
                {selectedCharacter === "ai-android" && "🤖"}
                {selectedCharacter === "shadow-assassin" && "🗡️"}
                {selectedCharacter === "time-traveler" && "⏳"}
                {selectedCharacter === "guardian-knight" && "🛡️"}
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Your guide bows respectfully. The lanterns carry your words
                through the digital realm.
              </p>

              {/* Fireflies */}
              <div className="relative h-20">
                {FIREFLIES.map((fly) => (
                  <motion.div
                    key={fly.id}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      left: `${fly.left}%`,
                      top: `${fly.top}%`,
                      background: "#fbbf24",
                      boxShadow: "0 0 6px #fbbf24, 0 0 12px #fbbf2460",
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(fly.id) * 15, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: fly.duration,
                      repeat: Infinity,
                      delay: fly.delay,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { label: "GitHub", url: about.social.github },
            { label: "LinkedIn", url: about.social.linkedin },
            { label: "Email", url: `mailto:${about.social.email}` },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 glass rounded-lg text-xs text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
