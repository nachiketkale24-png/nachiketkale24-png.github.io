"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // extract leading numeric portion, keep prefix/suffix (e.g. "<50ms", "99.9%", "15+")
  const match = value.match(/(-?\d+\.?\d*)/);
  const numeric = match ? parseFloat(match[0]) : null;
  const prefix = numeric !== null ? value.slice(0, match!.index) : "";
  const suffix = numeric !== null ? value.slice((match!.index ?? 0) + match![0].length) : "";
  const decimals = numeric !== null && match![0].includes(".") ? 1 : 0;

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 45,
    damping: 15,
    mass: 1,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView && numeric !== null) {
      motionVal.set(numeric);
    }
  }, [isInView, numeric, motionVal]);

  useEffect(() => {
    if (!ref.current) return;
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  if (numeric === null) {
    return <span ref={ref} className="font-mono">{value}</span>;
  }

  return <span ref={ref} className="font-mono tabular-nums">{prefix}0{suffix}</span>;
}
