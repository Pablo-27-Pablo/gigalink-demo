"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is GigaLink?",
    answer:
      "A prepaid WiFi system for instant internet access. Just scan and connect. Powered by Starlink.",
  },
  {
    id: 2,
    question: "How does GigaLink work?",
    answer:
      "Connect to the GigaLink WiFi network, scan/type your QR voucher, and get online immediately.",
  },
  {
    id: 3,
    question: "What do I need to use GigaLink?",
    answer: "Any WiFi-enabled device. No app or registration is required.",
  },
  {
    id: 4,
    question: "Who provides GigaLink's internet?",
    answer:
      "Connectivity is delivered by ComClark using satellite broadband powered by Starlink.",
  },
  {
    id: 5,
    question: "Where does GigaLink work?",
    answer:
      "GigaLink works wherever Starlink satellites provide coverage, including remote and underserved areas.",
  },
  {
    id: 6,
    question: "How reliable is GigaLink's connection?",
    answer:
      "Starlink-powered connectivity ensures fast and stable internet suitable for public WiFi, events, and community access.",
  },
  {
    id: 7,
    question: "How long does GigaLink access last?",
    answer:
      "Access depends on your voucher plan and may be based on time, data usage, or both.",
  },
  {
    id: 8,
    question: "What if I can't connect to GigaLink?",
    answer:
      "Make sure you're connected to the correct WiFi network and try scanning again. If you still need help, our team is ready to assist.",
  },
];

export default function FAQs() {
  const [openId, setOpenId] = useState<number | null>(null);
  const router = useRouter();

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back to Homepage */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#5cc3ae] transition-colors mb-16"
        >
          <ArrowLeft size={16} />
          Back to homepage
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Gigalink <span className="text-[#5cc3ae]">FAQs</span>
          </h1>
          <div className="w-12 h-1 bg-[#5cc3ae] mb-6" />
          <p className="text-slate-500">
            Everything you need to know about GigaLink.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="divide-y divide-slate-100">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-2">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full py-7 flex items-center justify-between gap-4 text-left group"
              >
                <h3
                  style={{ color: openId === faq.id ? "#5cc3ae" : "" }}
                  className={`text-lg transition-colors duration-300 ${
                    openId === faq.id
                      ? "font-medium"
                      : "text-slate-700 group-hover:text-slate-950"
                  }`}
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  style={{ color: openId === faq.id ? "#5cc3ae" : "" }}
                  className={`transform transition-all duration-300 ${
                    openId === faq.id ? "rotate-180" : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="pb-10">
                      <p className="text-slate-600 leading-relaxed max-w-2xl text-[1.05rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
