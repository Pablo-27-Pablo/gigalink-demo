"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import logo from "../../../../../public/images/gigalink_logo.png";
import Image from "next/image";

export default function GigaLinkComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Adjusted particle/line colors for white background
      ctx.strokeStyle = "rgba(13, 148, 136, 0.1)";
      ctx.fillStyle = "rgba(13, 148, 136, 0.3)";

      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.lineWidth = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    // Changed background from #020617 to white
    <main className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-white relative">
      {/* Constellation Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />

      {/* Center Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Subtle drop shadow adjustment for light theme */}
          <div className="relative w-[300px] md:w-[600px] aspect-[2/1] drop-shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <Image
              src={logo}
              alt="GigaLink Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center justify-center gap-4 mt-2"
          >
            {/* Adjusted line and text colors for readability on white */}
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-teal-600" />
            <p className="text-teal-700 text-sm md:text-xl font-light tracking-[0.5em] uppercase whitespace-nowrap">
              coming soon
            </p>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-teal-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Adjusted Vignette for a clean light look */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]" />
    </main>
  );
}
