import { aboutBio, education, experience, skillCategories } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AboutTabs } from "./AboutTabs";

export function About() {
  return (
    <section id="about" className="section-block scene-3d">
      <div className="container-main">
        <ScrollReveal direction="up">
          <span className="section-eyebrow">About</span>
          <h2 className="section-title text-3d mt-3">About Me</h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <p className="mt-6 w-full max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {aboutBio}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25} amount={0.08}>
          <AboutTabs
            education={education}
            experience={experience}
            skillCategories={skillCategories}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
