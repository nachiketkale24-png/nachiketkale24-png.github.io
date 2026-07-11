"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Timeline", href: "#timeline" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-signal focus:text-bg focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-signal ${
          scrolled
            ? "bg-bg/90 backdrop-blur-2xl border-b border-line/40 shadow-[0_1px_40px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-content mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <a
            href="#top"
            className="font-display font-bold text-lg text-ink tracking-tighter hover:text-signal transition-colors duration-300"
            aria-label="Nachiket Kale — go to top"
          >
            NK<span className="text-signal">.</span>
          </a>

          <nav
            className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
            aria-label="Main navigation"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative py-1 hover:text-ink transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-signal transition-all duration-300 ease-signal group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-end justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className={`h-[1.5px] bg-ink rounded-full transition-all duration-400 origin-center ${
                open ? "w-6 rotate-45 translate-y-[3.25px]" : "w-6"
              }`}
            />
            <span
              className={`h-[1.5px] bg-ink rounded-full transition-all duration-400 origin-center ${
                open ? "w-6 -rotate-45 -translate-y-[3.25px]" : "w-4"
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-bg-elevated/95 backdrop-blur-2xl border-t border-line overflow-hidden"
            >
              <nav
                className="flex flex-col px-6 py-8 gap-6 font-mono text-sm uppercase tracking-[0.15em] text-ink-muted"
                aria-label="Mobile navigation"
              >
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="hover:text-signal transition-colors duration-300"
                  >
                    <span className="text-signal mr-3 text-xs">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
