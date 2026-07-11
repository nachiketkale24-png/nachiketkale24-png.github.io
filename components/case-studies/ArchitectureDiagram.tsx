"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function ArchitectureDiagram({
  flow,
  accent = "signal",
}: {
  flow: string[];
  accent?: "signal" | "success";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const color = accent === "signal" ? "#FF6B35" : "#3ECF8E";
  const glowColor = accent === "signal" ? "rgba(255, 107, 53, 0.4)" : "rgba(62, 207, 142, 0.4)";

  const nodeCount = flow.length;
  const width = 900;
  const height = 140;
  const stepX = width / (nodeCount - 1);
  const nodes = flow.map((_, i) => ({ x: i * stepX, y: height / 2 }));
  const pathD = nodes
    .map((n, i) => (i === 0 ? `M ${n.x} ${n.y}` : `L ${n.x} ${n.y}`))
    .join(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !pathRef.current || !packetRef.current) return;

    const path = pathRef.current;
    const packet = packetRef.current;
    const length = path.getTotalLength();

    gsap.set(packet, { opacity: 1 });

    const ctx = gsap.context(() => {
      const proxy = { d: 0 };
      gsap.to(proxy, {
        d: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
        },
        onUpdate: () => {
          const point = path.getPointAtLength(proxy.d * length);
          gsap.set(packet, { attr: { cx: point.x, cy: point.y } });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [flow, accent]);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto py-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[640px] h-auto"
        role="img"
        aria-label={`Architecture flow diagram: ${flow.join(" → ")}`}
      >
        <defs>
          <filter id={`glow-${accent}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={glowColor} result="color" />
            <feComposite in="color" in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`line-grad-${accent}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C2430" />
            <stop offset="50%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1C2430" />
          </linearGradient>
        </defs>

        {/* connection line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={`url(#line-grad-${accent})`}
          strokeWidth={2}
          strokeDasharray="6 4"
        />

        {/* active glowing line overlay */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.15}
        />

        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            {/* outer glow ring */}
            <circle cx={n.x} cy={n.y} r={12} fill={color} opacity={0.06} />
            {/* node */}
            <circle
              cx={n.x}
              cy={n.y}
              r={6}
              fill="#0A0E14"
              stroke={color}
              strokeWidth={2}
              filter={`url(#glow-${accent})`}
            />
            {/* inner dot */}
            <circle cx={n.x} cy={n.y} r={2} fill={color} opacity={0.6} />
          </g>
        ))}

        {/* animated packet */}
        <circle ref={packetRef} r={5} fill={color} opacity={0} filter={`url(#glow-${accent})`}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div
        className="grid gap-4 mt-6"
        style={{ gridTemplateColumns: `repeat(${nodeCount}, minmax(120px, 1fr))` }}
      >
        {flow.map((label, i) => (
          <div key={i} className="min-w-[120px]">
            <div className="font-mono text-[10px] text-ink-faint/50 mb-1.5 tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-xs text-ink-muted leading-snug">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
