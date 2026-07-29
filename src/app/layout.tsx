import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnimeVerse AI Portfolio — Aditya Sharma",
  description:
    "The world's most immersive Anime-inspired 3D Portfolio. Enter a cinematic anime journey where original guide characters introduce you to skills, projects, and achievements.",
  keywords: [
    "portfolio",
    "anime",
    "3d",
    "interactive",
    "cybersecurity",
    "full stack developer",
    "next.js",
    "three.js",
    "aditya sharma",
  ],
  authors: [{ name: "Aditya Sharma" }],
  openGraph: {
    title: "AnimeVerse AI Portfolio — Aditya Sharma",
    description:
      "Enter a cinematic anime journey. The world's most immersive 3D Portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0f] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
