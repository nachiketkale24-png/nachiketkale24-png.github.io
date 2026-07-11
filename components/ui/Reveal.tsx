"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
  blur?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  blur = true,
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      initial={{
        opacity: 0,
        y,
        ...(blur ? { filter: "blur(8px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
