import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative px-6 lg:px-10 py-28 lg:py-40 bg-bg-elevated overflow-hidden" aria-label="About me">
      {/* atmospheric glow */}
      <div
        className="glow-orb w-[500px] h-[500px] top-1/2 -translate-y-1/2 -right-40 opacity-20 animate-glow-pulse"
        style={{ background: "radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 relative z-10">
        <Reveal>
          <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
            About
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-2xl md:text-[2.5rem] font-semibold text-ink leading-[1.2] text-balance">
            I&apos;m a computer science student at SPIT Mumbai, CGPA 8.22, graduating
            2028 — currently building a real-time weapon detection system as a
            Software Engineering Intern.
          </p>
          <p className="mt-8 text-ink-muted text-[17px] leading-[1.8] max-w-xl">
            Most of what I know, I learned inside a 36-hour hackathon deadline.
            I care about systems that stay correct under load, and about
            shipping the version that actually works over the version that
            looks good in a slide deck.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
