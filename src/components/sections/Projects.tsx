"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";

const INITIAL_VISIBLE = 6;
const MAX_TECH_TAGS = 3;

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleTech = project.tech.slice(0, MAX_TECH_TAGS);
  const extraTechCount = project.tech.length - MAX_TECH_TAGS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      style={{ transformOrigin: "bottom center" }}
    >
      <Tilt3D maxTilt={9} scale={1.015}>
        <article className="project-card group flex h-full flex-col">
          <div className="project-card-inner card-depth flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-elevated">
            <div className="relative h-40 shrink-0 overflow-hidden sm:h-44">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
              <div className="project-shine pointer-events-none absolute inset-0" aria-hidden />

              {(project.liveUrl || project.githubUrl) && (
                <div className="absolute right-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-bg/90 text-xs text-accent no-underline backdrop-blur-sm transition-transform hover:scale-110 hover:border-accent hover:bg-accent/20"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FaArrowUpRightFromSquare />
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-bg/90 text-xs text-foreground no-underline backdrop-blur-sm transition-transform hover:scale-110 hover:border-primary hover:bg-primary/20"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <FaGithub />
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-light">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="mt-1 line-clamp-1 text-xs text-accent">{project.subtitle}</p>
              )}

              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {visibleTech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary-light transition-colors duration-300 group-hover:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {extraTechCount > 0 && (
                  <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-subtle">
                    +{extraTechCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Tilt3D>
    </motion.div>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="work" className="section-block scene-3d">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title text-3d mt-3">Featured Work</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Professional and personal projects — from enterprise systems to interactive web
            applications.
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {projects.length > INITIAL_VISIBLE && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              className="btn-outline btn-3d cursor-pointer"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? "Show less" : "See more projects"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
