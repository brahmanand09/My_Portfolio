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
  images?: string[];
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

export interface AchievementItem {
  id: string;
  title: string;
  impact: string;
  description: string;
  image: string;
  images?: string[];
  tech: string[];
}

export interface CompanyAchievements {
  id: string;
  name: string;
  role: string;
  duration: string;
  logoText: string;
  achievements: AchievementItem[];
}
