"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import dynamic from "next/dynamic";

// Dynamic imports for SSR safety
const IntroCinematic = dynamic(
  () => import("@/components/intro/IntroCinematic"),
  { ssr: false }
);
const CharacterSelector = dynamic(
  () => import("@/components/guide/CharacterSelector"),
  { ssr: false }
);
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[#050510] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  ),
});
const HUD = dynamic(() => import("@/components/hud/HUD"), { ssr: false });
const GuideDialogue = dynamic(
  () => import("@/components/guide/GuideDialogue"),
  { ssr: false }
);
const Terminal = dynamic(() => import("@/components/terminal/Terminal"), {
  ssr: false,
});
const WeatherEffects = dynamic(
  () => import("@/components/effects/WeatherEffects"),
  { ssr: false }
);
const MusicPlayer = dynamic(() => import("@/components/ui/MusicPlayer"), {
  ssr: false,
});
const SettingsPanel = dynamic(
  () => import("@/components/ui/SettingsPanel"),
  { ssr: false }
);

// Sections
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  { ssr: false }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection"),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection"),
  { ssr: false }
);
const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { ssr: false }
);
const TimelineSection = dynamic(
  () => import("@/components/sections/TimelineSection"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false }
);

export default function Home() {
  const {
    introComplete,
    selectedCharacter,
    setCurrentSection,
    toggleTerminal,
  } = useAppStore();
  const mainRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !introComplete) return;
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introComplete, toggleTerminal]);

  // Track current section via scroll
  useEffect(() => {
    if (!introComplete || !selectedCharacter) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setCurrentSection(el.dataset.section as any);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introComplete, selectedCharacter, setCurrentSection]);

  // Show intro
  if (!introComplete) {
    return (
      <>
        <IntroCinematic />
        {!introComplete && <CharacterSelector />}
      </>
    );
  }

  return (
    <div ref={mainRef} className="relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Weather Effects */}
      <WeatherEffects />

      {/* HUD */}
      <HUD />

      {/* Guide Dialogue */}
      <GuideDialogue />

      {/* Terminal */}
      <Terminal />

      {/* Music Player */}
      <MusicPlayer />

      {/* Settings */}
      <SettingsPanel />

      {/* Main content */}
      <main className="relative z-10">
        <div data-section="about">
          <AboutSection />
        </div>

        <div data-section="skills">
          <SkillsSection />
        </div>

        <div data-section="projects">
          <ProjectsSection />
        </div>

        <div data-section="experience">
          <ExperienceSection />
        </div>

        <div data-section="certifications">
          <CertificationsSection />
        </div>

        <div data-section="timeline">
          <TimelineSection />
        </div>

        <div data-section="contact">
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-12 text-center border-t border-white/5">
          <motion.p
            className="text-sm text-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built with passion by Aditya Sharma &middot; AnimeVerse AI
            Portfolio
          </motion.p>
          <motion.p
            className="text-xs text-white/10 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Next.js &middot; Three.js &middot; GSAP &middot; Framer Motion
          </motion.p>
        </footer>
      </main>
    </div>
  );
}
