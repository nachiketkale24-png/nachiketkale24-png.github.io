"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { timeline } from "@/lib/data";

export default function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActive(idx);
          }
        });
      },
      { root: null, threshold: 0.6 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = 340;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <section id="timeline" className="py-28 lg:py-40 overflow-hidden" aria-label="Build log timeline">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-signal mb-4 block">
                Milestones
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ink">
                Build log
              </h2>
            </div>
            <span className="font-mono text-[11px] tracking-wider text-ink-faint" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
            </span>
          </div>
          <p className="text-ink-muted max-w-xl mb-6 text-[15px] leading-relaxed">
            A rolling record of hackathons, certifications, and the internship
            that followed — in the order they happened.
          </p>
        </Reveal>

        {/* progress bar with glow */}
        <div className="h-px bg-line/40 w-full mb-14 relative overflow-hidden" role="progressbar" aria-valuenow={active + 1} aria-valuemin={1} aria-valuemax={timeline.length}>
          <div
            className="h-[2px] -mt-px bg-gradient-to-r from-signal via-signal-bright to-signal transition-all duration-700 ease-signal relative"
            style={{ width: `${((active + 1) / timeline.length) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal shadow-[0_0_12px_rgba(255,107,53,0.6)]" />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Timeline cards — use arrow keys to scroll"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex md:overflow-x-auto flex-col md:flex-row gap-5 md:gap-6 px-6 lg:px-10 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xl"
      >
        {timeline.map((t, i) => (
          <article
            key={t.title}
            data-card
            data-index={i}
            className={`snap-start shrink-0 w-full md:w-[320px] rounded-2xl p-7 transition-all duration-500 ${
              active === i
                ? "border border-signal/30 bg-bg-panel shadow-[0_0_30px_rgba(255,107,53,0.06)]"
                : "border border-line/40 bg-bg-panel/60 hover:border-line-light"
            }`}
          >
            <span className="font-mono text-[11px] tracking-wider text-signal">{t.date}</span>
            <h3 className="font-display text-lg font-semibold text-ink mt-3 mb-2 text-balance">
              {t.title}
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">{t.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
