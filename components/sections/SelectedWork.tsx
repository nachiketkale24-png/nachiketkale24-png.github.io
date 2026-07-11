"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

export default function SelectedWork() {
  return (
    <section id="work" className="px-6 lg:px-10 py-28 lg:py-40" aria-label="Selected work">
      <div className="max-w-content mx-auto">
        <Reveal>
          <div className="flex items-baseline justify-between mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">
              Selected work
            </h2>
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-faint hidden md:block uppercase">
              {projects.length} systems
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col" role="list">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/work/${p.slug}`}
                className="group relative block border-t border-line/60 py-10 md:py-14 last:border-b transition-all duration-500 -mx-6 px-6 lg:-mx-10 lg:px-10"
                role="listitem"
                aria-label={`${p.name} — ${p.tagline}`}
              >
                {/* hover glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-signal/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" aria-hidden="true" />

                <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                  <span className="font-mono text-[11px] text-ink-faint/50 w-10 shrink-0 tracking-wider" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-[2.5rem] font-semibold text-ink group-hover:text-signal transition-colors duration-400 leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-ink-muted text-[15px] max-w-lg leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-wider text-ink-faint border border-line/60 rounded-full px-3 py-1 group-hover:border-signal/20 group-hover:text-ink-muted transition-all duration-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    aria-hidden
                    className="hidden md:inline-block text-2xl text-ink-faint/30 group-hover:text-signal transition-all duration-400"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
