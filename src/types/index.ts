export interface NavLink {
  label: string;
  href: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
}

export interface Service {
  icon: "code" | "layout" | "mobile" | "server";
  title: string;
  description: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  tech: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin" | "github";
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export type AboutTab = "education" | "experience" | "skills";
