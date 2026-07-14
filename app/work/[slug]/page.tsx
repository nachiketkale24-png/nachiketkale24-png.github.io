import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/sections/Contact";
import Reveal from "@/components/ui/Reveal";
import ArchitectureDiagram from "@/components/case-studies/ArchitectureDiagram";
import { projects } from "@/lib/data";
import ScreenshotsShowcase from "@/components/case-studies/ScreenshotsShowcase";
import UsageSimulator from "@/components/case-studies/UsageSimulator";

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

            {project.screenshots && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <Reveal delay={0.05}>
                  <div className="py-16">
                    <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em] block mb-8">
                      Visual Interface Tour
                    </span>
                    <ScreenshotsShowcase screenshots={project.screenshots} accent={project.accent} />
                  </div>
                </Reveal>
              </>
            )}

            {project.videoUrl && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <Reveal delay={0.05}>
                  <div className="py-16">
                    <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em] block mb-8">
                      Working Prototype Demo
                    </span>
                    <div className="relative rounded-2xl overflow-hidden border border-line/60 bg-elevation-panel/30 backdrop-blur-md p-2 max-w-4xl mx-auto shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-tr from-signal/5 to-transparent pointer-events-none" />
                      <video
                        src={project.videoUrl}
                        controls
                        className="w-full rounded-xl object-cover aspect-video"
                        poster={project.screenshots?.[1]?.file}
                      />
                    </div>
                  </div>
                </Reveal>
              </>
            )}

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

            {project.features && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <Reveal delay={0.05}>
                  <div className="py-16 grid md:grid-cols-[1fr_2.5fr] gap-6 md:gap-16">
                    <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em]">
                      Key Features
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.features.map((feat) => (
                        <div
                          key={feat.title}
                          className="p-6 rounded-2xl border border-line/60 bg-[#10151D]/20 hover:border-signal/25 transition-all duration-300 group"
                        >
                          <h4 className="font-display font-semibold text-[15px] text-ink group-hover:text-signal transition-colors">
                            {feat.title}
                          </h4>
                          <p className="mt-2 text-ink-muted text-xs leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </>
            )}

            {project.systemDetails && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <div className="py-16 flex flex-col gap-16">
                  {project.systemDetails.map((detail) => (
                    <Reveal key={detail.title} delay={0.05}>
                      <div className="grid md:grid-cols-[1fr_2.5fr] gap-8 md:gap-16">
                        <div>
                          <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em] block mb-3">
                            Deep Dive
                          </span>
                          <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-tight">
                            {detail.title}
                          </h3>
                          <p className="mt-4 text-ink-muted text-xs leading-relaxed">
                            {detail.description}
                          </p>
                          
                          {detail.flowDiagram && (
                            <div className="mt-6 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                              <span className="text-[9px] text-signal/70 mb-1">Workflow steps:</span>
                              {detail.flowDiagram.map((step, stepIdx) => (
                                <div key={stepIdx} className="flex gap-2 items-center">
                                  <span className="text-signal">{stepIdx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-6 overflow-hidden">
                          {detail.table && (
                            <div className="overflow-x-auto rounded-xl border border-line/50 bg-[#10151D]/20">
                              <table className="w-full text-left border-collapse text-xs font-mono">
                                <thead>
                                  <tr className="border-b border-line/60 bg-elevation-panel/40">
                                    {detail.table.headers.map((th) => (
                                      <th key={th} className="px-4 py-3 text-ink font-semibold tracking-wider uppercase">
                                        {th}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {detail.table.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-line/30 last:border-0 hover:bg-elevation-panel/10">
                                      {row.map((cell, cellIdx) => (
                                        <td key={cellIdx} className="px-4 py-3 text-ink-muted">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {detail.codeBlock && (
                            <div className="rounded-xl overflow-hidden border border-line/60 bg-[#0E121B] p-4 font-mono text-[11px] leading-relaxed">
                              <div className="flex justify-between items-center pb-2 mb-3 border-b border-line/45 text-[10px] uppercase tracking-wider text-ink-faint">
                                <span>{detail.codeBlock.language}</span>
                                <span className="opacity-60">Source Snippet</span>
                              </div>
                              <pre className="overflow-x-auto text-ink-muted max-w-full">
                                <code>{detail.codeBlock.code}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}

            {project.usageExamples && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <Reveal delay={0.05}>
                  <div className="py-16 grid md:grid-cols-[1fr_2.5fr] gap-6 md:gap-16">
                    <div>
                      <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em] block mb-3">
                        Interaction
                      </span>
                      <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-tight">
                        Voice Assistant Simulator
                      </h3>
                      <p className="mt-4 text-ink-muted text-xs leading-relaxed">
                        Toggle between dynamic voice command scenarios to see how the system maps spoken Hindi/Hinglish instructions to precise actions.
                      </p>
                    </div>
                    <div>
                      <UsageSimulator examples={project.usageExamples} accent={project.accent} />
                    </div>
                  </div>
                </Reveal>
              </>
            )}

            {project.roadmap && (
              <>
                <div className="section-divider" aria-hidden="true" />
                <Reveal delay={0.05}>
                  <div className="py-16">
                    <span className="font-mono text-[11px] text-signal uppercase tracking-[0.2em] block mb-8">
                      Project Roadmap
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.roadmap.map((phase) => (
                        <div
                          key={phase.phase}
                          className="p-6 rounded-2xl border border-line/60 bg-[#10151D]/20 flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="font-display font-semibold text-sm text-ink mb-4">
                              {phase.phase}
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {phase.items.map((item, idx) => (
                                <li key={idx} className="flex gap-2.5 items-start text-xs text-ink-muted">
                                  <span className="mt-1 text-signal shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <span className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                              phase.status === "completed"
                                ? "bg-success/5 border-success/20 text-success"
                                : phase.status === "in-progress"
                                ? "bg-signal/5 border-signal/20 text-signal"
                                : "bg-elevation-panel/50 border-line/50 text-ink-faint"
                            }`}>
                              {phase.status === "completed" ? "Completed" : phase.status === "in-progress" ? "In Progress" : "Upcoming"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </>
            )}

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
