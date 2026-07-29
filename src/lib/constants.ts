import {
  Character,
  CharacterId,
  MusicTrack,
  PortfolioData,
} from "@/types";

export const CHARACTERS: Record<CharacterId, Character> = {
  "cyber-ninja": {
    id: "cyber-ninja",
    name: "Kaze",
    title: "Cyber Ninja",
    description:
      "A master of digital warfare who moves between the virtual and physical realms. Quick-witted and sharp-tongued.",
    personality:
      "Sarcastic but loyal. Speaks in clipped, efficient sentences. Fascinated by modern technology.",
    color: "#00f0ff",
    accentColor: "#ff006e",
    abilities: ["Data Surge", "Neon Slash", "Ghost Protocol"],
    greeting: "Yo. I'm Kaze. Let me show you around this digital world.",
  },
  "arcane-mage": {
    id: "arcane-mage",
    name: "Lyra",
    title: "Arcane Mage",
    description:
      "A scholar of ancient and digital arts. She bridges the gap between mysticism and modern engineering.",
    personality:
      "Wise and curious. Speaks with elegant vocabulary. Loves explaining complex topics.",
    color: "#a855f7",
    accentColor: "#06b6d4",
    abilities: ["Arcane Insight", "Spell Weave", "Mystic Vision"],
    greeting:
      "Greetings, traveler. I am Lyra. Let the arcane guide your journey.",
  },
  "samurai-guardian": {
    id: "samurai-guardian",
    name: "Takeshi",
    title: "Samurai Guardian",
    description:
      "An unwavering protector of the digital realm. Disciplined, honorable, and fiercely dedicated.",
    personality:
      "Honor-bound and serious. Speaks formally. Values integrity above all.",
    color: "#ef4444",
    accentColor: "#f59e0b",
    abilities: ["Iron Guard", "Bushido Code", "Spirit Blade"],
    greeting: "I am Takeshi. Your honor is my shield. Follow me.",
  },
  "spirit-fox": {
    id: "spirit-fox",
    name: "Akari",
    title: "Spirit Fox",
    description:
      "A mystical guide who weaves through dimensions. Playful yet profoundly wise.",
    personality:
      "Playful and mysterious. Speaks in riddles sometimes. Loves surprises.",
    color: "#f97316",
    accentColor: "#ec4899",
    abilities: ["Fox Fire", "Dimension Shift", "Charm"],
    greeting:
      "Ara ara~ I'm Akari! Ready for a magical adventure? Follow my tails~",
  },
  "ai-android": {
    id: "ai-android",
    name: "Nova",
    title: "AI Android",
    description:
      "A sentient AI companion with unprecedented emotional intelligence. Precise and deeply analytical.",
    personality:
      "Logical but developing emotions. Speaks with data-driven confidence. Growing curiosity.",
    color: "#22d3ee",
    accentColor: "#a78bfa",
    abilities: ["Neural Scan", "Predict", "Optimize"],
    greeting:
      "System online. I am Nova, your AI companion. Analyzing... you seem interesting.",
  },
  "shadow-assassin": {
    id: "shadow-assassin",
    name: "Shade",
    title: "Shadow Assassin",
    description:
      "A phantom who operates in the spaces between code. Silent, efficient, and enigmatic.",
    personality:
      "Minimal words. Actions speak louder. Surprisingly protective.",
    color: "#6366f1",
    accentColor: "#dc2626",
    abilities: ["Shadow Step", "Void Strike", "Vanish"],
    greeting: "...Shade. That's all you need to know. Stay close.",
  },
  "time-traveler": {
    id: "time-traveler",
    name: "Chronos",
    title: "Time Traveler",
    description:
      "A wanderer of timelines who has seen the past and future of technology. Philosophical and visionary.",
    personality:
      "Philosophical and contemplative. Often references future possibilities. Nostalgic.",
    color: "#fbbf24",
    accentColor: "#8b5cf6",
    abilities: ["Time Warp", "Future Sight", "Chrono Shield"],
    greeting:
      "I've traveled through time to find you. Interesting... the future looks bright.",
  },
  "guardian-knight": {
    id: "guardian-knight",
    name: "Aegis",
    title: "Guardian Knight",
    description:
      "An steadfast protector of knowledge and dreams. Brave, loyal, and inspiring.",
    personality:
      "Inspiring and motivational. Encouraging. Never gives up.",
    color: "#10b981",
    accentColor: "#f43f5e",
    abilities: ["Holy Shield", "Inspire", "Guardian Light"],
    greeting:
      "Fear not! I am Aegis, your guardian. Together we shall explore!",
  },
};

export const MUSIC_TRACKS: {
  id: MusicTrack;
  name: string;
  emoji: string;
  section: string;
}[] = [
  { id: "anime-orchestral", name: "Anime Orchestral", emoji: "🎵", section: "intro" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🌃", section: "skills" },
  { id: "relaxing-piano", name: "Relaxing Piano", emoji: "🎹", section: "about" },
  { id: "japanese-flute", name: "Japanese Flute", emoji: "🎐", section: "temple" },
  { id: "rain-ambience", name: "Rain Ambience", emoji: "🌧️", section: "contact" },
  { id: "battle", name: "Battle", emoji: "⚔️", section: "projects" },
  { id: "fantasy", name: "Fantasy", emoji: "✨", section: "certifications" },
  { id: "night-ambience", name: "Night Ambience", emoji: "🌙", section: "timeline" },
];

export const DEFAULT_PORTFOLIO: PortfolioData = {
  about: {
    name: "Aditya Sharma",
    title: "Full Stack Engineer & Cybersecurity Specialist",
    bio: "A passionate developer who bridges the worlds of cybersecurity and modern web development. Building secure, performant, and beautiful applications.",
    education: "Computer Science & Cybersecurity",
    career: [
      "Full Stack Development",
      "Cybersecurity Research",
      "Cloud Architecture",
      "AI/ML Integration",
    ],
    goals: [
      "Master zero-trust architecture",
      "Contribute to major open source projects",
      "Build AI-powered security tools",
      "Launch a cybersecurity startup",
    ],
    social: {
      github: "https://github.com/adityasharma",
      linkedin: "https://linkedin.com/in/adityasharma",
      email: "contact@adityasharma.dev",
    },
  },
  skills: [
    {
      id: "cybersecurity",
      name: "Cyber Security",
      level: 85,
      maxLevel: 100,
      category: "Security",
      icon: "🛡️",
      unlocked: true,
      children: ["networking", "malware-analysis"],
      x: 400,
      y: 100,
    },
    {
      id: "networking",
      name: "Networking",
      level: 80,
      maxLevel: 100,
      category: "Security",
      icon: "🌐",
      unlocked: true,
      children: ["soc"],
      x: 250,
      y: 250,
    },
    {
      id: "malware-analysis",
      name: "Malware Analysis",
      level: 70,
      maxLevel: 100,
      category: "Security",
      icon: "🔬",
      unlocked: true,
      children: [],
      x: 550,
      y: 250,
    },
    {
      id: "soc",
      name: "SOC Operations",
      level: 75,
      maxLevel: 100,
      category: "Security",
      icon: "📡",
      unlocked: true,
      children: [],
      x: 250,
      y: 400,
    },
    {
      id: "webdev",
      name: "Web Development",
      level: 90,
      maxLevel: 100,
      category: "Development",
      icon: "💻",
      unlocked: true,
      children: ["cloud", "ai"],
      x: 400,
      y: 550,
    },
    {
      id: "cloud",
      name: "Cloud",
      level: 75,
      maxLevel: 100,
      category: "Development",
      icon: "☁️",
      unlocked: true,
      children: [],
      x: 250,
      y: 700,
    },
    {
      id: "ai",
      name: "AI / ML",
      level: 65,
      maxLevel: 100,
      category: "Development",
      icon: "🤖",
      unlocked: true,
      children: [],
      x: 550,
      y: 700,
    },
    {
      id: "linux",
      name: "Linux",
      level: 85,
      maxLevel: 100,
      category: "Systems",
      icon: "🐧",
      unlocked: true,
      children: [],
      x: 700,
      y: 100,
    },
    {
      id: "programming",
      name: "Programming",
      level: 88,
      maxLevel: 100,
      category: "Development",
      icon: "⚡",
      unlocked: true,
      children: ["webdev"],
      x: 400,
      y: 400,
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "CyberShield Pro",
      description:
        "AI-powered threat detection system with real-time monitoring and automated response capabilities.",
      difficulty: "S",
      xpReward: 5000,
      technologies: ["Python", "TensorFlow", "React", "Docker", "AWS"],
      github: "https://github.com/adityasharma/cybershield",
      liveDemo: "https://cybershield.adityasharma.dev",
      screenshots: [],
      architecture: "Microservices with event-driven architecture",
    },
    {
      id: "project-2",
      title: "NetScope",
      description:
        "Advanced network analysis and visualization tool for security operations teams.",
      difficulty: "A",
      xpReward: 3500,
      technologies: ["Go", "Vue.js", "D3.js", "PostgreSQL"],
      github: "https://github.com/adityasharma/netscope",
      liveDemo: "https://netscope.adityasharma.dev",
      screenshots: [],
      architecture: "CQRS with real-time WebSocket streaming",
    },
    {
      id: "project-3",
      title: "AnimeVerse Portfolio",
      description:
        "The most immersive anime-inspired 3D portfolio website ever created.",
      difficulty: "S",
      xpReward: 10000,
      technologies: ["Next.js", "Three.js", "GSAP", "TypeScript"],
      github: "https://github.com/adityasharma/animeverse",
      liveDemo: "https://adityasharma.dev",
      screenshots: [],
      architecture: "R3F with custom shaders and procedural generation",
    },
  ],
  timeline: [
    {
      id: "ch-1",
      chapter: 1,
      title: "Started Programming",
      date: "2020",
      description: "Wrote first line of code. The journey of a thousand programs begins.",
      icon: "💻",
      world: "anime-village",
    },
    {
      id: "ch-2",
      chapter: 2,
      title: "Cybersecurity Awakening",
      date: "2021",
      description: "Discovered the art of ethical hacking and digital defense.",
      icon: "🛡️",
      world: "cyberpunk-city",
    },
    {
      id: "ch-3",
      chapter: 3,
      title: "University",
      date: "2022",
      description: "Pursuing Computer Science with focus on Security.",
      icon: "🎓",
      world: "sky-kingdom",
    },
    {
      id: "ch-4",
      chapter: 4,
      title: "Hackathons",
      date: "2023",
      description: "Competed in national hackathons. Built rapid prototypes.",
      icon: "⚡",
      world: "floating-islands",
    },
    {
      id: "ch-5",
      chapter: 5,
      title: "Open Source",
      date: "2024",
      description: "Contributing to the open source community.",
      icon: "🌐",
      world: "space-station",
    },
    {
      id: "ch-6",
      chapter: 6,
      title: "The Future",
      date: "2025+",
      description: "Building the next generation of secure, intelligent systems.",
      icon: "🚀",
      world: "secret-lab",
    },
  ],
  certificates: [
    {
      id: "cert-1",
      title: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2023",
      image: "",
      credentialId: "SEC-2023-XXXX",
      skills: ["Security", "Network Security", "Cryptography"],
    },
    {
      id: "cert-2",
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "",
      credentialId: "AWS-2024-XXXX",
      skills: ["Cloud", "AWS", "Infrastructure"],
    },
    {
      id: "cert-3",
      title: "Google Cybersecurity Certificate",
      issuer: "Google",
      date: "2023",
      image: "",
      credentialId: "GOOG-2023-XXXX",
      skills: ["Security", "Linux", "Python"],
    },
  ],
  experience: [
    {
      company: "CyberLab Solutions",
      role: "Security Research Intern",
      period: "2024",
      description:
        "Conducted vulnerability assessments and penetration testing for enterprise clients.",
      technologies: ["Nmap", "Metasploit", "Wireshark", "Python"],
    },
    {
      company: "TechNova",
      role: "Full Stack Developer",
      period: "2023",
      description:
        "Built responsive web applications with focus on security best practices.",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    },
  ],
};
