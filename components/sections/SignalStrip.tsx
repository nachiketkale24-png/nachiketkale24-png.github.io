"use client";

import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

export default function SignalStrip() {
  return (
    <section className="relative py-12 px-6 lg:px-10 overflow-hidden" aria-label="Key statistics">
      {/* top shimmer line */}
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="group" aria-label={`${s.label}: ${s.value}`}>
              <div className="font-mono text-2xl md:text-4xl font-medium text-gradient-signal inline-block">
                <AnimatedNumber value={s.value} />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-muted font-mono">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* bottom shimmer line */}
      <div className="section-divider absolute bottom-0 left-0 right-0" aria-hidden="true" />
    </section>
  );
}
