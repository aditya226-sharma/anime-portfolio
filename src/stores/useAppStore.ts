"use client";

import { create } from "zustand";
import {
  CharacterId,
  GraphicsQuality,
  MusicTrack,
  SectionId,
  WeatherType,
  WorldId,
} from "@/types";

interface AppState {
  // Intro
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;

  // Character
  selectedCharacter: CharacterId | null;
  setSelectedCharacter: (c: CharacterId) => void;

  // Navigation
  currentSection: SectionId;
  setCurrentSection: (s: SectionId) => void;

  // World
  currentWorld: WorldId;
  setCurrentWorld: (w: WorldId) => void;

  // Weather
  weather: WeatherType;
  setWeather: (w: WeatherType) => void;

  // Music
  currentTrack: MusicTrack;
  setCurrentTrack: (t: MusicTrack) => void;
  musicVolume: number;
  setMusicVolume: (v: number) => void;
  isMuted: boolean;
  toggleMute: () => void;

  // UI
  hudVisible: boolean;
  toggleHud: () => void;
  settingsOpen: boolean;
  toggleSettings: () => void;
  terminalOpen: boolean;
  toggleTerminal: () => void;
  photoMode: boolean;
  togglePhotoMode: () => void;

  // Graphics
  graphicsQuality: GraphicsQuality;
  setGraphicsQuality: (q: GraphicsQuality) => void;
  showFps: boolean;
  toggleFps: () => void;

  // Guide
  guideSpeaking: boolean;
  setGuideSpeaking: (v: boolean) => void;
  guideDialogue: string;
  setGuideDialogue: (d: string) => void;

  // XP System
  visitorLevel: number;
  visitorXp: number;
  addXp: (amount: number) => void;

  // Scroll
  scrollProgress: number;
  setScrollProgress: (p: number) => void;

  // Voice
  voiceEnabled: boolean;
  toggleVoice: () => void;

  // Collectibles
  scrollsCollected: number;
  addScroll: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  introComplete: false,
  setIntroComplete: (v) => set({ introComplete: v }),

  selectedCharacter: null,
  setSelectedCharacter: (c) => set({ selectedCharacter: c }),

  currentSection: "about",
  setCurrentSection: (s) => set({ currentSection: s }),

  currentWorld: "japanese-temple",
  setCurrentWorld: (w) => set({ currentWorld: w }),

  weather: "cherry-blossom",
  setWeather: (w) => set({ weather: w }),

  currentTrack: "anime-orchestral",
  setCurrentTrack: (t) => set({ currentTrack: t }),
  musicVolume: 0.5,
  setMusicVolume: (v) => set({ musicVolume: v }),
  isMuted: false,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

  hudVisible: true,
  toggleHud: () => set((s) => ({ hudVisible: !s.hudVisible })),
  settingsOpen: false,
  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  terminalOpen: false,
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  photoMode: false,
  togglePhotoMode: () => set((s) => ({ photoMode: !s.photoMode })),

  graphicsQuality: "high",
  setGraphicsQuality: (q) => set({ graphicsQuality: q }),
  showFps: false,
  toggleFps: () => set((s) => ({ showFps: !s.showFps })),

  guideSpeaking: false,
  setGuideSpeaking: (v) => set({ guideSpeaking: v }),
  guideDialogue: "",
  setGuideDialogue: (d) => set({ guideDialogue: d }),

  visitorLevel: 1,
  visitorXp: 0,
  addXp: (amount) =>
    set((s) => {
      let xp = s.visitorXp + amount;
      let level = s.visitorLevel;
      while (xp >= level * 1000) {
        xp -= level * 1000;
        level++;
      }
      return { visitorXp: xp, visitorLevel: level };
    }),

  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),

  voiceEnabled: true,
  toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),

  scrollsCollected: 0,
  addScroll: () => set((s) => ({ scrollsCollected: s.scrollsCollected + 1 })),
}));
