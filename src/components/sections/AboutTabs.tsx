"use client";

import { useState } from "react";
import type { AboutTab, EducationItem, ExperienceItem, SkillCategory } from "@/types";

interface AboutTabsProps {
  education: EducationItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
}

const tabs: { id: AboutTab; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

export function AboutTabs({ education, experience, skillCategories }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>("education");

  return (
    <>
      <div className="mt-8 mb-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-pill ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "education" && (
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {education.map((item) => (
            <li
              key={`${item.degree}-${item.period}`}
              className="list-none rounded-xl border border-border bg-surface-elevated p-5"
            >
              <span className="text-sm font-medium text-accent">{item.period}</span>
              <p className="mt-2 font-medium text-foreground">{item.degree}</p>
              <p className="mt-1 text-sm">{item.institution}</p>
              <p className="mt-1 text-sm text-subtle">{item.location}</p>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "experience" && (
        <div className="experience-timeline">
          <p className="mb-6 text-sm text-muted">
            Career journey — <span className="text-accent">newest to oldest</span>
          </p>
          <ol className="space-y-0">
            {experience.map((item, index) => (
              <li
                key={`${item.company}-${item.period}`}
                className="timeline-item relative flex gap-5 pb-10 last:pb-0"
              >
                <div className="relative flex w-10 shrink-0 justify-center">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-xs font-semibold text-primary-light">
                    {index + 1}
                  </span>
                  {index < experience.length - 1 && (
                    <span
                      className="absolute top-8 left-1/2 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-primary/30 to-border"
                      aria-hidden
                    />
                  )}
                </div>

                <article className="timeline-card card-depth flex-1 rounded-xl border border-border bg-surface-elevated p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {item.period}
                    </span>
                    {index === 0 && (
                      <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                        Latest
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{item.role}</h4>
                  <p className="mt-1 font-medium text-primary-light">{item.company}</p>
                  <p className="mt-1 text-sm text-subtle">{item.location}</p>
                  <ul className="mt-4 space-y-2 border-t border-border pt-4">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="list-none text-sm leading-relaxed text-muted">
                        <span className="text-accent">▸</span> {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      )}

      {activeTab === "skills" && (
        <div className="space-y-6">
          {skillCategories.map((group) => (
            <div key={group.category}>
              <h4 className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
