import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 lg:px-10 py-28 lg:py-48 overflow-hidden" aria-label="Contact">
      {/* ambient glow */}
      <div
        className="glow-orb glow-orb-signal w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse"
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto text-center relative z-10">
        <Reveal>
          <span className="font-mono text-[11px] text-signal uppercase tracking-[0.25em]">
            Get in touch
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl text-ink mt-8 mb-14 text-balance leading-[0.95]">
            Let&apos;s build something
            <br />
            <span className="text-gradient-signal">that doesn&apos;t break.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton href={`mailto:${profile.email}`}>
              Email me <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href={profile.linkedin} variant="outline">
              LinkedIn
            </MagneticButton>
            <MagneticButton href={profile.github} variant="outline">
              GitHub
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <footer className="max-w-content mx-auto mt-32 relative z-10">
        <div className="section-divider mb-8" aria-hidden="true" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] tracking-wider text-ink-faint">
          <span>{profile.name} — {profile.location}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </section>
  );
}
