"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
  style?: CSSProperties;
  amount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
  amount = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  const hidden = {
    opacity: 0,
    y: direction === "up" ? 48 : 0,
    x: direction === "left" ? -52 : direction === "right" ? 52 : 0,
    scale: direction === "scale" ? 0.92 : 1,
    rotateX: direction === "up" ? 6 : 0,
  };

  const visible = { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ transformOrigin: "bottom center", ...style }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 40, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
