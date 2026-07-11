"use client";

import Reveal from "@/components/ui/Reveal";
import { techDepth } from "@/lib/data";

export default function TechnicalDepth() {
  return (
    <section className="relative px-6 lg:px-10 py-28 lg:py-40 bg-bg-elevated overflow-hidden" aria-label="Technical depth">
      {/* subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <div className="max-w-content mx-auto relative z-10">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-signal mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
            Technical depth
          </h2>
          <p className="text-ink-muted max-w-xl mb-16 text-[15px] leading-relaxed">
            Organized by system layer, not tool count — this is how the pieces
            actually fit together in production.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {techDepth.map((cat, i) => (
            <Reveal key={cat.layer} delay={i * 0.08}>
              <div className="group relative rounded-2xl border border-line/50 bg-bg-panel/40 p-8 md:p-10 h-full hover:border-signal/20 transition-all duration-500 overflow-hidden">
                {/* hover glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-signal/[0.04] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

                <div className="relative z-10">
                  <span className="font-mono text-[11px] text-signal/60 tracking-wider" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink mt-3 mb-2">
                    {cat.layer}
                  </h3>
                  <p className="text-sm text-ink-muted mb-6 leading-relaxed">{cat.description}</p>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${cat.layer} technologies`}>
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        role="listitem"
                        className="font-mono text-[11px] text-ink-faint border border-line/50 rounded-full px-3 py-1.5 group-hover:border-line-light group-hover:text-ink-muted transition-all duration-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
