import Link from "next/link";
import { FaArrowDown, FaCircle } from "react-icons/fa6";
import { projects, siteConfig } from "@/data/portfolio";
import { Hero3DShapes } from "./Hero3DShapes";
import { HeroCodeAnimation } from "./HeroCodeAnimation";
import { HeroTechOrbit } from "./HeroTechOrbit";
import { Tilt3D } from "@/components/ui/Tilt3D";

const heroTech = ["React.js", "Next.js", "Node.js", "MongoDB", "TypeScript"];

const stats = [
  { value: `${projects.length}+`, label: "Projects" },
  { value: `${siteConfig.experienceYears}`, label: "Years Experience" },
  { value: siteConfig.location, label: "Based In" },
];

export function Hero() {
  return (
    <section id="home" className="hero-section scene-3d relative isolate min-h-screen overflow-hidden pt-24">
      <Hero3DShapes />
      <HeroTechOrbit />
      <div className="hero-orb hero-orb-1 pointer-events-none" aria-hidden />
      <div className="hero-orb hero-orb-2 pointer-events-none" aria-hidden />
      <div className="hero-orb hero-orb-3 pointer-events-none" aria-hidden />
      <div className="hero-orb hero-orb-4 pointer-events-none" aria-hidden />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-main relative z-10 flex min-h-[calc(100vh-6rem)] flex-col justify-center pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="hero-content-3d order-2 min-w-0 lg:order-1">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="hero-badge">{siteConfig.role}</span>
              <span className="flex items-center gap-2 text-sm text-muted">
                <FaCircle className="text-[8px] text-success animate-pulse" aria-hidden />
                Open to opportunities
              </span>
            </div>

            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Building digital
              <br />
              experiences as{" "}
              <span className="text-gradient text-3d">{siteConfig.name.split(" ")[0]}</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {siteConfig.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {heroTech.map((tech) => (
                <span key={tech} className="hero-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#work" className="btn-primary btn-3d">
                View My Work
              </Link>
              <Link href={siteConfig.cvPath} download className="btn-outline btn-3d">
                Download CV
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-3d">
                  <p className="text-2xl font-semibold text-foreground md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-subtle uppercase tracking-wider md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 w-full min-w-0 lg:order-2">
            <Tilt3D className="h-full w-full" maxTilt={14} scale={1.03}>
              <div className="hero-code-wrap relative w-full">
                <div className="hero-image-ring pointer-events-none" aria-hidden />
                <div className="hero-image-glow pointer-events-none" aria-hidden />
                <HeroCodeAnimation />

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="hero-info-card card-depth">
                    <p className="text-xs text-subtle">Specialization</p>
                    <p className="mt-1 text-sm font-medium text-foreground">Full Stack Development</p>
                  </div>
                  <div className="hero-info-card card-depth">
                    <p className="text-xs text-subtle">Core Stack</p>
                    <p className="mt-1 text-sm font-medium text-accent">{siteConfig.coreStack}</p>
                  </div>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>

        <Link
          href="#about"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-subtle no-underline transition-colors hover:text-accent"
          aria-label="Scroll to about section"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FaArrowDown className="hero-scroll-icon text-sm" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
