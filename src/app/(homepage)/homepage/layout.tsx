// /app/homepage/layout.tsx

import React from "react";
import logo from "@/../public/images/comclarklogo.png";
import Image from "next/image";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* --- RESPONSIVE FOOTER --- */}
      <footer className="bg-slate-900 text-[#888] py-10 md:py-14 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          {/* Brand Logo & Divider Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <Image
              src={logo}
              alt="Comclark Logo"
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
            {/* Divider: Horizontal on mobile, Vertical on Desktop */}
            <div className="h-[1px] w-20 md:h-16 md:w-[1px] bg-white/10" />

            {/* Copyright - Centered on mobile, Left-aligned on desktop */}
            <div className="text-center md:text-left">
              <p className="text-[13px] opacity-60">
                © 2025 ComClark. All rights reserved.
              </p>
            </div>
          </div>

          {/* Contact / Support Section */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs uppercase tracking-widest opacity-40 mb-1">
              Get in touch
            </p>
            <p className="text-sm font-medium transition-colors hover:text-white">
              Support:{" "}
              <a
                href="mailto:inquiry@comclark.com.ph"
                className="text-white/80"
              >
                inquiry@comclark.com.ph
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
