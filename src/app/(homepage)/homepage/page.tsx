"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/../public/images/gigalink_logo4.png";
import satelliteImg from "@/../public/images/girl.jpg";
import Image from "next/image";

const faqData = [
  {
    q: "What is GigaLink?",
    a: "A prepaid, QR-based WiFi system for instant internet. No apps or subscriptions required. Just scan and connect.",
  },
  {
    q: "How does GigaLink work?",
    a: "Connect to GigaLink WiFi, scan your QR voucher, and get online immediately. For technical help, contact inquiry@comclark.com.ph.",
  },
  {
    q: "Where does GigaLink work?",
    a: "Wherever Starlink satellites provide coverage, including remote and underserved areas across the Philippines.",
  },
  {
    q: "How reliable is the connection?",
    a: "Connectivity is delivered by ComClark using satellite broadband powered by Starlink, providing fast and stable internet suitable for public WiFi and events.",
  },
];

export default function GigaLinkLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // --- PARTICLE NETWORK LOGIC ---
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
      size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 1;
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
      particles = Array.from({ length: 70 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(67, 187, 171, 0.8)"; // Updated to #43bbab
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(67, 187, 171, ${0.15 - dist / 1200})`;
            ctx.lineWidth = 0.6;
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
    <main className="bg-white w-full selection:bg-[#43bbab]/20 overflow-x-hidden text-slate-900">
      {/* SECTION 1: HERO (RE-TRIGGERABLE) */}
      <section className="h-screen w-full flex items-center justify-center overflow-hidden relative p-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative w-[350px] md:w-[900px] aspect-[2/1]">
              <Image
                src={logo}
                alt="GigaLink Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col items-center gap-4 mt-2"
            >
              <p className="text-slate-400 text-xs md:text-sm font-medium tracking-[0.8em] uppercase">
                The Future of Connectivity
              </p>
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-16 bg-[#43bbab]/40" />
                <span className="text-slate-900 text-xl md:text-3xl font-light tracking-[0.2em] uppercase">
                  Coming Soon
                </span>
                <div className="h-[1px] w-16 bg-[#43bbab]/40" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: MAXIMIZED FEATURE SPLIT */}
      <section className="min-h-screen w-full flex items-center relative py-32 px-6 md:px-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <span className="text-[#43bbab] font-mono tracking-[0.3em] text-sm uppercase font-bold">
              01 // High-Speed Access
            </span>
            <h2 className="text-slate-900 text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
              High Speed <br />
              <span className="text-slate-300 italic font-light">
                Everywhere.
              </span>
            </h2>
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed max-w-xl font-light">
              GigaLink delivers fiber-like speeds via Starlink's global
              satellite constellation, managed by ComClark.
            </p>
            <div className="flex flex-col gap-6">
              {[
                "No monthly subscriptions required",
                "QR Voucher activation",
                "Inquiries: inquiry@comclark.com.ph",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 text-slate-800 group"
                >
                  <div className="w-12 h-[2px] bg-[#43bbab] transition-all group-hover:w-20" />
                  <span className="text-lg font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[12px] border-white bg-white">
              <Image
                src={satelliteImg}
                alt="GigaLink High Speed Internet"
                className="w-full h-auto rounded-[2rem]"
              />
            </div>
            <div className="absolute -inset-10 bg-[#43bbab]/5 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: MAXIMIZED FAQ (TEAL THEME) */}
      <section className="py-32 px-6 md:px-24 bg-white min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-20"
          >
            <h2 className="text-slate-900 text-5xl md:text-7xl font-bold tracking-tight">
              Frequently Asked{" "}
              <span className="text-[#43bbab] font-serif italic font-light">
                Questions
              </span>
            </h2>
            <div className="h-1 w-24 bg-[#43bbab] mt-8" />
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className={`border-b border-slate-100 overflow-hidden transition-colors ${activeFaq === index ? "bg-slate-50/50" : ""}`}
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full py-10 flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-2xl md:text-3xl font-medium transition-colors ${activeFaq === index ? "text-[#43bbab]" : "text-slate-900"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${activeFaq === index ? "rotate-180 bg-[#43bbab] border-[#43bbab] text-white shadow-lg shadow-[#43bbab]/20" : "group-hover:border-[#43bbab]"}`}
                  >
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="pb-10 pr-20">
                        <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: TEAL & INQUIRY EMAIL */}
      <section className="py-32 bg-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center z-10"
        >
          <h3 className="text-white text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Ready to Link Up?
          </h3>
          <p className="text-slate-400 text-xl mb-6 font-light">
            Join the future of global connectivity.
          </p>

          {/* Inquiry Email Display */}
          <a
            href="mailto:inquiry@comclark.com.ph"
            className="text-[#43bbab] text-lg md:text-xl font-mono mb-12 block hover:underline transition-all"
          >
            inquiry@comclark.com.ph
          </a>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 bg-white/5 border border-white/10 px-10 py-5 rounded-full text-white outline-none focus:ring-2 focus:ring-[#43bbab]/50 transition-all text-lg"
            />
            <button className="bg-[#43bbab] text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-[#39a394] transition-all text-lg hover:scale-105 active:scale-95">
              Get Early Access
            </button>
          </div>
        </motion.div>

        {/* Decorative Teal Glow in Footer */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#43bbab]/10 blur-[120px] rounded-full" />
      </section>
    </main>
  );
}
