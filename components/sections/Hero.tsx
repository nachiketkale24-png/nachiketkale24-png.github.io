"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/lib/data";

export default function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % profile.ticker.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 lg:px-10 overflow-hidden"
    >
      {/* atmospheric background layers */}
      <div className="absolute inset-0 grid-line opacity-[0.12] noise-mask pointer-events-none" aria-hidden="true" />

      {/* ambient glow orbs */}
      <div
        className="glow-orb glow-orb-signal w-[600px] h-[600px] -top-40 -right-40 animate-glow-pulse"
        aria-hidden="true"
      />
      <div
        className="glow-orb glow-orb-success w-[400px] h-[400px] bottom-20 -left-32 opacity-40 animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      {/* subtle dot grid layer */}
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-content mx-auto w-full relative z-10"
      >
        {/* availability badge */}
        <motion.div variants={item} className="flex items-center gap-3 mb-10">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
            Available for Summer 2027
          </span>
        </motion.div>

        {/* main heading */}
        <motion.h1
          variants={item}
          className="font-display font-bold text-hero-mobile lg:text-hero-desktop text-ink text-balance leading-none"
        >
          Building systems
          <br />
          that predict failure
          <br />
          <span className="text-gradient-signal">before it happens.</span>
        </motion.h1>

        {/* bottom row: bio + ticker + CTA */}
        <motion.div variants={item} className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <p className="max-w-md text-ink-muted text-[17px] leading-[1.7]">
            {profile.name} — {profile.subrole}. Computer science student at SPIT
            Mumbai, shipping real-time detection and alerting systems under
            hackathon-grade deadlines.
          </p>

          <div className="flex flex-col gap-5">
            {/* tech ticker */}
            <div
              className="font-mono text-sm text-ink-muted h-6 overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tickerIndex}
                  initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-signal" aria-hidden="true">▸</span>{" "}
                  {profile.ticker[tickerIndex]}
                  <span className="animate-blink text-signal ml-0.5" aria-hidden="true">_</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <MagneticButton href="#work">
              View Systems <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-ink-faint"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-ink-faint/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
