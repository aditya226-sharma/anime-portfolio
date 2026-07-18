export type CharacterId =
  | "cyber-ninja"
  | "arcane-mage"
  | "samurai-guardian"
  | "spirit-fox"
  | "ai-android"
  | "shadow-assassin"
  | "time-traveler"
  | "guardian-knight";

export type CharacterAnimation =
  | "idle"
  | "walk"
  | "talk"
  | "think"
  | "greet"
  | "celebrate"
  | "power"
  | "blink"
  | "breathe";

export type WeatherType =
  | "sunny"
  | "night"
  | "rain"
  | "snow"
  | "fog"
  | "cherry-blossom"
  | "storm"
  | "golden-sunset";

export type WorldId =
  | "japanese-temple"
  | "cyberpunk-city"
  | "floating-islands"
  | "mystic-forest"
  | "anime-village"
  | "samurai-castle"
  | "space-station"
  | "sky-kingdom"
  | "secret-lab";

export type MusicTrack =
  | "anime-orchestral"
  | "cyberpunk"
  | "relaxing-piano"
  | "japanese-flute"
  | "rain-ambience"
  | "battle"
  | "fantasy"
  | "night-ambience";

export type GraphicsQuality = "low" | "medium" | "high" | "ultra";

export type SectionId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certifications"
  | "timeline"
  | "contact"
  | "terminal";

export interface Character {
  id: CharacterId;
  name: string;
  title: string;
  description: string;
  personality: string;
  color: string;
  accentColor: string;
  abilities: string[];
  greeting: string;
}

export interface SkillNode {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: string;
  icon: string;
  unlocked: boolean;
  children: string[];
  x: number;
  y: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "S" | "A" | "B" | "C" | "D";
  xpReward: number;
  technologies: string[];
  github: string;
  liveDemo: string;
  screenshots: string[];
  architecture: string;
}

export interface TimelineEntry {
  id: string;
  chapter: number;
  title: string;
  date: string;
  description: string;
  icon: string;
  world: WorldId;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId: string;
  skills: string[];
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    bio: string;
    education: string;
    career: string[];
    goals: string[];
    social: {
      github: string;
      linkedin: string;
      email: string;
    };
  };
  skills: SkillNode[];
  projects: Project[];
  timeline: TimelineEntry[];
  certificates: Certificate[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    technologies: string[];
  }[];
}
