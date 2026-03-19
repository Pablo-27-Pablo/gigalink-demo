"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "@/../public/images/gigalink_logo3.png";
import logo2 from "@/../public/images/gigalink_logo_nostarlink.png";
import satelliteImg from "@/../public/images/girl.jpg";
import Image from "next/image";
import { Wifi, Zap, Shield, ChevronDown, ChevronRight } from "lucide-react";

// --- CRITICAL: IMPORT SLICK CSS (Kept for consistency if you use Slick elsewhere) ---
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselImages = [
  {
    url: "https://i.pinimg.com/1200x/5b/60/1f/5b601fe9773f54d729aba9e223fdfc9a.jpg",
    title: "Fast & Reliable WiFi",
    description:
      "Experience wireless internet connectivity anytime and anywhere",
  },
  {
    url: "https://sm.pcmag.com/t/pcmag_me/news/b/best-buy-s/best-buy-starts-selling-spacexs-newest-starlink-dish_bdm1.1920.jpg",
    title: "Powered by Starlink",
    description: "Satellite technology bringing internet to remote areas",
  },
  {
    url: "https://images.unsplash.com/photo-1749584552481-40bfb1abf401?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "High Speed Connectivity",
    description: "Get online in seconds with any WiFi-enabled device",
  },
  {
    url: "https://images.unsplash.com/photo-1681321570365-df53da7dbaa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Secured Connectivity",
    description: "Secured Transactions for all your devices",
  },
  {
    url: "https://images.unsplash.com/photo-1569908420024-c8f709b75700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Hassle-Free",
    description: "Just scan and go - no apps or registration needed",
  },
];

const faqData = [
  {
    q: "What is GigaLink?",
    a: "A prepaid WiFi system for instant internet access. Just scan and connect. Powered by Starlink.",
  },
  {
    q: "How does GigaLink work?",
    a: "Connect to GigaLink WiFi, scan your QR voucher, and get online immediately.",
  },
  {
    q: "Where does GigaLink work?",
    a: "Wherever Starlink satellites provide coverage, including remote areas across the Philippines.",
  },
  {
    q: "How reliable is the connection?",
    a: "Connectivity is delivered by ComClark using satellite broadband powered by Starlink.",
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
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size to adjust 3D Carousel spread
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getRelativePos = (index: number) => {
    const len = carouselImages.length;
    return (index - (activeStep % len) + len) % len;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: any[] = [];
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
      particles = Array.from({ length: 50 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(67, 187, 171, 0.6)";
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(67, 187, 171, ${0.1 - dist / 1500})`;
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
      {/* SECTION 1: HERO */}
      <section className="min-h-screen w-full flex items-center justify-center overflow-hidden relative p-4 md:p-6">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ boxShadow: "inset 0 -50px 150px -50px #5cc3ae66" }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="relative z-20 text-center w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-[280px] sm:w-[400px] md:w-[600px] aspect-[2/1]">
              <Image
                src={logo}
                alt="GigaLink Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-4 mt-4">
              <p className="text-slate-400 text-[10px] md:text-sm font-medium tracking-[0.4em] md:tracking-[0.8em] uppercase">
                The Future of Connectivity
              </p>
              <div className="flex items-center gap-3 md:gap-6">
                <div className="h-[1px] w-8 md:w-12 bg-[#43bbab]/40" />
                <span className="text-[#0f172a] text-lg md:text-2xl font-light tracking-[0.2em] uppercase">
                  Coming Soon
                </span>
                <div className="h-[1px] w-8 md:w-12 bg-[#43bbab]/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: WHY CHOOSE */}
      <section
        id="features"
        className="py-20 px-4 bg-white min-h-screen flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4 mb-6">
              <h2 className="text-2xl md:text-5xl font-normal text-slate-800">
                Why Choose
              </h2>
              <div className="relative top-[-3px] w-[95px] h-[50px] md:w-[172px] md:h-[85px]">
                <Image
                  src={logo2} // Replace with your logo2 variable
                  alt="GigaLink"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-5xl font-normal text-slate-800 left-[-10px]">
                ?
              </h2>
            </div>
            <p className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed">
              Fast, secure, and incredibly simple.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }} // Subtle lift on hover
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                viewport={{ once: true }}
                /* The "Shadow Only" Box:
                 - bg-white: must be white to match the section background
                 - shadow-xl: provides the depth
                 - shadow-slate-200/50: keeps the shadow soft and airy
              */
                className="flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_#5cc3ae33] hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-500 border border-[#00107e]/10"
              >
                <div className="mb-8 p-5 bg-slate-50 rounded-2xl">
                  <feature.icon
                    size={40}
                    strokeWidth={1.5}
                    className="text-[#5cc3ae]"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed max-w-[260px]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CAROUSEL */}
      <section className="py-20 px-4 bg-white overflow-hidden min-h-screen flex flex-col justify-center shadow-[inset_0_30px_60px_-30px_#5cc3ae33]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See GigaLink in Action
            </h2>
            <p className="text-slate-500">
              Experience the future of connectivity
            </p>
          </div>

          <div className="relative h-[400px] md:h-[550px] flex items-center justify-center">
            <div
              className="relative w-full max-w-5xl h-full flex items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              {carouselImages.map((image, index) => {
                const relPos = getRelativePos(index);
                let offset = relPos;
                if (relPos > carouselImages.length / 2)
                  offset = relPos - carouselImages.length;

                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= (isMobile ? 1 : 2);

                return (
                  <motion.div
                    key={index}
                    animate={{
                      x: offset * (isMobile ? 180 : 320), // Responsive spread
                      scale: isCenter ? 1 : 0.7,
                      zIndex: 10 - Math.abs(offset),
                      opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                      rotateY: offset * -20,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    onClick={() => setActiveStep(index)}
                    className="absolute w-[85%] md:w-[650px] h-[300px] md:h-[450px] cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-slate-100"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <AnimatePresence>
                        {isCenter && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                          >
                            <h3 className="text-xl md:text-3xl font-bold text-white">
                              {image.title}
                            </h3>
                            <p className="text-sm md:text-lg text-slate-200 mt-2">
                              {image.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Nav Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-2 transition-all duration-300 rounded-full ${activeStep % carouselImages.length === i ? "w-8 bg-teal-500" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="py-20 px-6 bg-white min-h-screen flex items-center shadow-[inset_0_30px_60px_-30px_#5cc3ae33]">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-light">
              Gigalink <span className="text-[#43bbab] font-bold">FAQs</span>
            </h2>
            <div className="h-1 w-16 bg-[#43bbab] mt-4 mx-auto md:mx-0" />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-slate-100">
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-lg md:text-xl font-semibold transition-colors ${
                      activeFaq === index ? "text-[#43bbab]" : "text-slate-800"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown
                      className={
                        activeFaq === index
                          ? "text-[#43bbab]"
                          : "text-slate-400"
                      }
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-slate-500 text-base md:text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* New Button Section */}
          <div className="mt-12 text-center md:text-left">
            <a
              href="https://gigalink.comclark.com/FAQs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#43bbab] text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-[#43bbab]/20 hover:bg-[#38a394] transition-all duration-300 transform hover:-translate-y-1"
            >
              View All FAQs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
