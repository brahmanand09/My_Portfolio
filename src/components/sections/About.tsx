import { aboutBio, education, experience, skillCategories } from "@/data/portfolio";
import { AboutTabs } from "./AboutTabs";

export function About() {
  return (
    <section id="about" className="section-block scene-3d">
      <div className="container-main">
        <h2 className="section-title text-3d">About Me</h2>

        <p className="mt-6 w-full text-base leading-relaxed text-muted md:text-lg">
          {aboutBio}
        </p>

        <AboutTabs
          education={education}
          experience={experience}
          skillCategories={skillCategories}
        />
      </div>
    </section>
  );
}
