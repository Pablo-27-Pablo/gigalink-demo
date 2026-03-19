"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/../public/images/gigalink_logo3.png";
import satelliteImg from "@/../public/images/girl.jpg";
import Image from "next/image";
import Slider from "react-slick";
import {
  ChevronDown,
  Wifi,
  Zap,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- CRITICAL: IMPORT SLICK CSS ---
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-[#43bbab] text-white transition-all backdrop-blur-md border border-white/20"
      onClick={onClick}
    >
      <ChevronRight size={32} />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-[#43bbab] text-white transition-all backdrop-blur-md border border-white/20"
      onClick={onClick}
    >
      <ChevronLeft size={32} />
    </button>
  );
};

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1750711158632-5273ec9b9b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Fast & Reliable WiFi",
    description: "Experience lightning-fast internet connectivity anywhere",
  },
  {
    url: "https://sm.pcmag.com/t/pcmag_me/news/b/best-buy-s/best-buy-starts-selling-spacexs-newest-starlink-dish_bdm1.1920.jpg",
    title: "Powered by Starlink",
    description: "Satellite technology bringing internet to remote areas",
  },
  {
    url: "https://images.unsplash.com/photo-1749584552481-40bfb1abf401?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Connect Instantly",
    description: "Get online in seconds with any WiFi-enabled device",
  },
  {
    url: "https://images.unsplash.com/photo-1681321570365-df53da7dbaa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Network Excellence",
    description: "Seamless connectivity for all your devices",
  },
  {
    url: "https://images.unsplash.com/photo-1569908420024-c8f709b75700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "QR Code Simplicity",
    description: "Just scan and go - no apps or registration needed",
  },
];

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

const features = [
  {
    icon: Wifi,
    title: "Instant Access",
    description: "Connect immediately with QR vouchers",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Powered by Starlink satellite technology",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Safe connectivity you can trust",
  },
];

export default function GigaLinkLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
        ctx.fillStyle = "rgba(67, 187, 171, 0.8)";
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    arrows: true, // Enabled arrows
    nextArrow: <NextArrow />, // Custom component
    prevArrow: <PrevArrow />, // Custom component
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
  };

  return (
    <main className="bg-white w-full selection:bg-[#43bbab]/20 overflow-x-hidden text-slate-900">
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full flex items-center justify-center overflow-hidden relative p-6">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-[300px] md:w-[600px] aspect-[2/1]">
              <Image
                src={logo}
                alt="GigaLink Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <motion.div className="flex flex-col items-center gap-4 mt-2">
              <p className="text-slate-400 text-xs md:text-sm font-medium tracking-[0.8em] uppercase">
                The Future of Connectivity
              </p>
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-12 bg-[#43bbab]/40" />
                <span className="text-[#0f172a] text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
                  Coming Soon
                </span>
                <div className="h-[1px] w-12 bg-[#43bbab]/40" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose GigaLink?</h2>
            <p className="text-slate-400 text-lg">
              Fast, secure, and incredibly simple
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-slate-50 transition-all group shadow-sm"
              >
                <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-colors">
                  <feature.icon size={32} className="text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">See GigaLink in Action</h2>
            <p className="text-slate-400 text-lg">
              Experience the future of connectivity
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="carousel-container relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-500/20 border border-teal-500/30 bg-slate-900"
          >
            <Slider {...sliderSettings}>
              {carouselImages.map((image, index) => (
                <div key={index} className="outline-none">
                  <div className="relative h-[500px] w-full overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <h3 className="text-3xl font-bold mb-3 text-white">
                        {image.title}
                      </h3>
                      <p className="text-xl text-slate-300">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURE SPLIT
      <section className="h-screen w-full flex items-center relative px-6 md:px-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full h-full max-h-[85vh]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <span className="text-[#43bbab] font-mono tracking-[0.3em] text-xs uppercase font-bold">
              01 // HIGH-SPEED ACCESS
            </span>
            <h2 className="text-[#0f172a] text-5xl md:text-7xl font-black tracking-tighter leading-none">
              High Speed <br />
              <span className="text-[#5cbbab] italic font-light">
                Everywhere.
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg font-light">
              GigaLink delivers fiber-like speeds via Starlink's global
              satellite constellation, managed by ComClark.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "No monthly subscriptions required",
                "QR Voucher activation",
                "Inquiries: inquiry@comclark.com.ph",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-slate-700 group"
                >
                  <div className="w-8 h-[2px] bg-[#43bbab] transition-all group-hover:w-12" />
                  <span className="text-md font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-full w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative z-10 w-full h-full max-h-[75vh] flex items-center">
              <Image
                src={satelliteImg}
                alt="GigaLink High Speed Internet"
                className="w-full h-full object-contain drop-shadow-2xl rounded-2xl "
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[#43bbab]/10 blur-[80px] rounded-full -z-10" />
          </motion.div>
        </div>
      </section> */}

      {/* SECTION 3: FAQ */}
      <section className="py-24 px-6 md:px-24 bg-white min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-[1000px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-[#0f172a] text-4xl md:text-6xl font-bold tracking-tight text-center lg:text-left">
              Frequently Asked{" "}
              <span className="text-[#43bbab] font-serif italic font-light">
                Questions
              </span>
            </h2>
            <div className="h-1 w-20 bg-[#43bbab] mt-6 mx-auto lg:mx-0" />
          </motion.div>

          <div className="space-y-2">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`border-b border-slate-100 transition-colors ${activeFaq === index ? "bg-slate-50/80" : ""}`}
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full py-6 flex items-center justify-between text-left px-4 group"
                >
                  <span
                    className={`text-xl md:text-2xl font-semibold ${activeFaq === index ? "text-[#43bbab]" : "text-[#0f172a]"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${activeFaq === index ? "rotate-180 bg-[#43bbab] border-[#43bbab] text-white" : "group-hover:border-[#43bbab]"}`}
                  >
                    <svg
                      width="12"
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
                    >
                      <p className="pb-8 px-4 text-slate-500 text-lg md:text-xl font-light max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="https://gigalink.comclark.com/FAQ"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#0f172a] text-white rounded-full font-bold tracking-widest uppercase text-sm hover:bg-[#43bbab] transition-colors shadow-xl"
              >
                Show More
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
