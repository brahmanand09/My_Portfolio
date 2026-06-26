"use client";

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiDocker,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface OrbiterConfig {
  Icon: IconType;
  color: string;
  label: string;
  posClass: string;
  delay: number;
  duration: number;
}

const ORBITERS: OrbiterConfig[] = [
  { Icon: SiReact,      color: "#61dafb", label: "React",      posClass: "tech-pos-tl", delay: 0,   duration: 6  },
  { Icon: SiTypescript, color: "#3178c6", label: "TypeScript",  posClass: "tech-pos-tr", delay: 1.8, duration: 7  },
  { Icon: SiNodedotjs,  color: "#68a063", label: "Node.js",     posClass: "tech-pos-ml", delay: 3.2, duration: 8  },
  { Icon: SiNextdotjs,  color: "#ffffff", label: "Next.js",     posClass: "tech-pos-mr", delay: 0.9, duration: 6.5},
  { Icon: SiMongodb,    color: "#00ed64", label: "MongoDB",     posClass: "tech-pos-bl", delay: 2.5, duration: 7.5},
  { Icon: SiDocker,     color: "#2496ed", label: "Docker",      posClass: "tech-pos-br", delay: 4,   duration: 9  },
  { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL",  posClass: "tech-pos-tc", delay: 1.2, duration: 8  },
  { Icon: SiGit,        color: "#f05032", label: "Git",         posClass: "tech-pos-bc", delay: 3.6, duration: 7  },
];

export function HeroTechOrbit() {
  return (
    <div
      className="tech-orbit-field pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {ORBITERS.map(({ Icon, color, label, posClass, delay, duration }) => (
        <div
          key={label}
          className={`tech-icon-orb ${posClass}`}
          style={
            {
              animationDelay: `-${delay}s`,
              animationDuration: `${duration}s`,
              "--glow-color": `${color}55`,
            } as React.CSSProperties
          }
        >
          <div
            className="tech-icon-inner"
            style={{ "--icon-color": color } as React.CSSProperties}
          >
            <Icon style={{ color }} />
          </div>
          <span className="tech-icon-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
