import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/sections/Contact";
import Reveal from "@/components/ui/Reveal";
import ArchitectureDiagram from "@/components/case-studies/ArchitectureDiagram";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Nachiket Kale`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  const accentColor = project.accent === "signal" ? "rgba(255, 107, 53, 0.06)" : "rgba(62, 207, 142, 0.06)";

  return (
    <>
      <Nav />
      <main id="main-content" className="relative">
        {/* top ambient glow */}
        <div
          className="glow-orb w-[800px] h-[600px] -top-40 right-0 animate-glow-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />

        <article className="relative z-10 px-6 lg:px-10 pt-36 pb-20">
          <div className="max-w-content mx-auto">
            {/* back link */}
            <Reveal>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted hover:text-signal transition-colors duration-300"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                All work
              </Link>
            </Reveal>

            {/* header */}
            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
                <div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-ink text-balance leading-[0.95]">
                    {project.name}
                  </h1>
                  <p className="mt-5 text-ink-muted text-lg max-w-xl leading-relaxed">{project.tagline}</p>
                </div>
                <span className="font-mono text-[11px] tracking-wider text-ink-faint/60 shrink-0">{project.period}</span>
              </div>
            </Reveal>

            {/* shimmer divider */}
            <div className="section-divider" aria-hidden="true" />

            {/* stats row */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-mono text-3xl md:text-4xl font-medium text-gradient-signal inline-block">{s.value}</div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-muted font-mono">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="section-divider" aria-hidden="true" />

            {/* problem */}
            <Reveal delay={0.05}>
              <div className="py-16 grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16">
                <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
                  Problem
                </span>
                <p className="text-ink text-xl leading-[1.7] text-balance">
                  {project.problem}
                </p>
              </div>
            </Reveal>

            <div className="section-divider" aria-hidden="true" />

            {/* architecture diagram */}
            <Reveal delay={0.05}>
              <div className="py-16">
                <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
                  Architecture
                </span>
                <div className="mt-10">
                  <ArchitectureDiagram flow={project.flow} accent={project.accent} />
                </div>
              </div>
            </Reveal>

            <div className="section-divider" aria-hidden="true" />

            {/* hard part */}
            <Reveal delay={0.05}>
              <div className="py-16 grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16">
                <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
                  The hard part
                </span>
                <p className="text-ink-muted text-lg leading-[1.75]">
                  {project.hardPart}
                </p>
              </div>
            </Reveal>

            <div className="section-divider" aria-hidden="true" />

            {/* stack */}
            <Reveal delay={0.05}>
              <div className="py-16 grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16">
                <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2.5" role="list" aria-label="Technology stack">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      role="listitem"
                      className="font-mono text-[11px] text-ink-faint border border-line/50 rounded-full px-4 py-2 hover:border-signal/30 hover:text-ink-muted transition-all duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {project.links.github && (
              <Reveal delay={0.05}>
                <div className="mt-2 mb-8">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-sm text-signal hover:text-signal-bright transition-colors duration-300"
                  >
                    View source
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            )}

            <div className="section-divider" aria-hidden="true" />

            {/* next project */}
            <Reveal delay={0.05}>
              <Link
                href={`/work/${next.slug}`}
                className="group mt-8 py-12 flex items-center justify-between"
                aria-label={`Next project: ${next.name}`}
              >
                <div>
                  <span className="font-mono text-[11px] text-ink-faint uppercase tracking-[0.2em] block mb-3">
                    Next system
                  </span>
                  <h3 className="font-display text-2xl md:text-5xl font-bold text-ink group-hover:text-signal transition-colors duration-400 leading-tight">
                    {next.name}
                  </h3>
                </div>
                <span
                  className="text-3xl text-ink-faint/30 group-hover:text-signal group-hover:translate-x-2 transition-all duration-400"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </article>
      </main>
      <Contact />
    </>
  );
}
