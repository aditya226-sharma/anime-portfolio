"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/stores/useAppStore";

function generateParticles(weather: string) {
  switch (weather) {
    case "rain":
      return Array.from({ length: 150 }, (_, i) => ({
        x: ((i * 137.5) % 2000),
        y: ((i * 97.3) % 1000) * -1,
        speed: 8 + (i % 6),
        length: 15 + (i % 20),
        opacity: 0.2 + (i % 5) * 0.08,
      }));
    case "snow":
      return Array.from({ length: 100 }, (_, i) => ({
        x: ((i * 137.5) % 2000),
        y: ((i * 97.3) % 500) * -1,
        speed: 1 + (i % 2),
        size: 2 + (i % 4),
        opacity: 0.3 + (i % 5) * 0.1,
        wobble: (i % 628) / 100,
      }));
    case "cherry-blossom":
      return Array.from({ length: 50 }, (_, i) => ({
        x: ((i * 137.5) % 2000),
        y: ((i * 97.3) % 500) * -1,
        speed: 1.5 + (i % 2),
        size: 6 + (i % 10),
        opacity: 0.4 + (i % 5) * 0.1,
        rotation: (i * 7.2) % 360,
        rotSpeed: 1 + (i % 3),
      }));
    case "storm":
      return Array.from({ length: 200 }, (_, i) => ({
        x: ((i * 137.5) % 2000),
        y: ((i * 97.3) % 1000) * -1,
        speed: 12 + (i % 8),
        length: 20 + (i % 25),
        opacity: 0.15 + (i % 3) * 0.1,
      }));
    default:
      return [];
  }
}

export default function WeatherEffects() {
  const { weather } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<ReturnType<typeof generateParticles>>([]);

  useEffect(() => {
    particlesRef.current = generateParticles(weather);
  }, [weather]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lightningTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (weather === "rain" || weather === "storm") {
        for (const p of particlesRef.current) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 1, p.y + (p as any).length);
          ctx.strokeStyle = `rgba(150, 180, 255, ${p.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          p.y += p.speed;
          if (p.y > canvas.height) {
            p.y = -200;
            p.x = Math.random() * canvas.width;
          }
        }

        if (weather === "storm") {
          lightningTimer++;
          if (lightningTimer > 300 + Math.random() * 500) {
            lightningTimer = 0;
            ctx.fillStyle = `rgba(200, 220, 255, ${0.1 + Math.random() * 0.15})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
      }

      if (weather === "snow") {
        for (const p of particlesRef.current) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, (p as any).size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();

          p.y += p.speed;
          p.x += Math.sin((p as any).wobble) * 0.5;
          (p as any).wobble += 0.02;

          if (p.y > canvas.height) {
            p.y = -100;
            p.x = Math.random() * canvas.width;
          }
        }
      }

      if (weather === "cherry-blossom") {
        for (const p of particlesRef.current) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(((p as any).rotation * Math.PI) / 180);
          ctx.beginPath();
          ctx.ellipse(0, 0, (p as any).size, (p as any).size * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 183, 213, ${p.opacity})`;
          ctx.fill();
          ctx.restore();

          p.y += p.speed;
          p.x += Math.sin((p as any).rotation * 0.01) * 0.8;
          (p as any).rotation += (p as any).rotSpeed;

          if (p.y > canvas.height) {
            p.y = -100;
            p.x = Math.random() * canvas.width;
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [weather]);

  if (weather === "sunny" || weather === "golden-sunset" || weather === "night" || weather === "fog") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
