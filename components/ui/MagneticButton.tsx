"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline";
};

function isExternalLink(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "solid",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }

  function handleMouseEnter() {
    setHovering(true);
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
    setHovering(false);
  }

  const styles = cn(
    "group/btn relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-sm tracking-tight transition-all duration-300 overflow-hidden",
    variant === "solid"
      ? "bg-signal text-bg hover:bg-signal-bright hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]"
      : "border border-line text-ink-muted hover:text-ink hover:border-signal/50 hover:shadow-[0_0_20px_rgba(255,107,53,0.08)]",
    className
  );

  const content = (
    <>
      {/* glow backdrop on solid buttons */}
      {variant === "solid" && (
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-signal-bright via-signal to-signal-bright opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
          style={{ filter: "blur(8px)" }}
          aria-hidden="true"
        />
      )}
      <motion.span
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.08 }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    const external = isExternalLink(href);
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...(external && !href.startsWith("mailto:")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles}
    >
      {content}
    </button>
  );
}
