"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `perspective(900px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`;

    const glareElement = element.querySelector<HTMLElement>(".tilt-glare");
    if (glareElement) {
      glareElement.style.opacity = "1";
      glareElement.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgb(255 255 255 / 0.12), transparent 55%)`;
    }
  }

  function handleLeave() {
    const element = ref.current;
    if (!element) return;

    element.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    const glareElement = element.querySelector<HTMLElement>(".tilt-glare");
    if (glareElement) {
      glareElement.style.opacity = "0";
    }
  }

  return (
    <div
      ref={ref}
      className={`tilt-3d relative ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {glare && (
        <div
          className="tilt-glare pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
          aria-hidden
        />
      )}
      <div className="tilt-3d-content relative h-full w-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}
