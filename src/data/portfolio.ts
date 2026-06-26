import type {
  EducationItem,
  ExperienceItem,
  NavLink,
  Project,
  Service,
  SkillCategory,
  SocialLink,
} from "@/types";

export const siteConfig = {
  name: "Brahmanand Mourya",
  shortName: "Brahma",
  title: "Brahmanand Mourya | Full Stack Developer Portfolio",
  description:
    "Full Stack Developer with 2+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, and Supabase — building scalable web applications, REST APIs, and performance-optimized systems.",
  url: "https://brahmanand09.github.io/My_Portfolio",
  email: "brahmanandmoury@gmail.com",
  phone: "+91-9616460598",
  role: "Full Stack Developer",
  location: "India",
  experienceYears: "2+",
  coreStack: "React.js · Next.js · Node.js",
  cvPath: "/images/Brahmanand_Mourya.pdf",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "My Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const aboutBio =
  "Full Stack Developer with 2+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, and Supabase. Skilled in building scalable web applications, REST APIs, RBAC systems, and performance-optimized backend architectures.";

export const education: EducationItem[] = [
  {
    period: "Jun 2021 – Jun 2024",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "ABES Institute of Technology",
    location: "Ghaziabad, Uttar Pradesh, India",
  },
  {
    period: "Jul 2019 – Jun 2021",
    degree: "Diploma in Computer Science and Engineering",
    institution: "Jawaharlal Nehru Polytechnic",
    location: "Sitapur, Uttar Pradesh, India",
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "Apr 2026 – Present",
    role: "SDE-I (Full-Stack Developer)",
    company: "Sarrthi IAS (Physics Wallah)",
    location: "Noida, India",
    highlights: [
      "Built scalable backend systems using Next.js, Node.js, Supabase, Cloudflare, Pabbly, and Zoho CRM for 2+ production applications.",
      "Led end-to-end development of a task system for 30+ users, improving operational visibility.",
      "Developed a real-time financial dashboard and RBAC-enabled sales tracking system used by 100+ users.",
    ],
  },
  {
    period: "Jun 2024 – Apr 2026",
    role: "SDE-I (Full-Stack Developer)",
    company: "LogiqueCode LLP",
    location: "Greater Noida, India",
    highlights: [
      "Engineered scalable backend systems using React.js, Node.js, Express.js, and MongoDB supporting 3+ production applications with RBAC and secure REST APIs.",
      "Built and deployed enterprise-grade applications handling 1000+ inventory records and 50+ daily transactions.",
      "Improved API performance by 30–40% through MongoDB query optimization, indexing, and pagination.",
      "Integrated Docker and Jenkins-based CI/CD pipelines for automated builds and deployments.",
    ],
  },
  {
    period: "Feb 2024 – May 2024",
    role: "Software Developer Intern",
    company: "LogiqueCode LLP",
    location: "Greater Noida, India",
    highlights: [
      "Developed and maintained REST APIs using React.js, Node.js, Express, MongoDB, and MySQL.",
      "Implemented JWT-based authentication and role-based authorization while reducing login API response time by ~400ms through query optimization and efficient indexing.",
    ],
  },
  {
    period: "Jan 2023 – Mar 2023",
    role: "Engineering Intern",
    company: "Conceptext Pvt. Ltd.",
    location: "Pune, India",
    highlights: [
      "Contributed to e-commerce product development by building reusable React.js components.",
      "Collaborated with cross-functional teams to deliver clean, maintainable, and efficient solutions in a fast-paced environment.",
    ],
  },
  {
    period: "Nov 2020 – Dec 2020",
    role: "Frontend Developer Intern",
    company: "Arcane Programming Infotech Pvt. Ltd.",
    location: "Lucknow, Uttar Pradesh, India",
    highlights: [
      "Created websites as a front-end developer using HTML and CSS.",
      "Learned how to write reusable code and build responsive websites.",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "Java"],
  },
  {
    category: "Frontend Technologies",
    items: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "EJS",
      "React.js",
      "TypeScript",
      "Next.js",
    ],
  },
  {
    category: "Backend Technologies",
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "API Design"],
  },
  {
    category: "Databases & Cloud",
    items: ["MySQL", "MongoDB", "AWS", "Database Design", "Supabase", "Cloudflare"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Jenkins (CI/CD)",
      "Redis",
      "RabbitMQ",
      "Socket.io",
      "Postman",
      "Jira",
      "WinSCP",
      "Pabbly",
      "Zoho CRM",
    ],
  },
  {
    category: "Concepts",
    items: [
      "DSA",
      "OOP's",
      "DBMS",
      "Authentication",
      "Role-Based Access Control (RBAC)",
      "Agile/Scrum Methodologies",
    ],
  },
];

export const services: Service[] = [
  {
    icon: "code",
    title: "Full Stack Development",
    description:
      "End-to-end web applications with React.js, Next.js, Node.js, and Express.js — from UI to production-ready backends.",
  },
  {
    icon: "server",
    title: "Backend & REST APIs",
    description:
      "Secure, scalable APIs with JWT authentication, RBAC, MongoDB/MySQL optimization, and performance-tuned architectures.",
  },
  {
    icon: "mobile",
    title: "Scalable Systems & DevOps",
    description:
      "Docker containerization, Jenkins CI/CD pipelines, Redis caching, and cloud integrations for reliable deployments.",
  },
];

export const projects: Project[] = [
  {
    title: "Inventory & Healthcare Management System",
    subtitle: "EJS, React.js, Node.js, Express.js, MongoDB, REST APIs · 2024–2026",
    description:
      "Full-stack platform handling 2.5+ lakh medicine records with billing, stock management, invoice generation, returns, and due payment tracking. Includes Material & Spare Requisition workflows with approval processes and MongoDB transaction-based data consistency.",
    image: "/images/work-2.jpg",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "EJS"],
  },
  {
    title: "Real-Time Chat Application (Microservices)",
    subtitle: "MERN Stack, TypeScript, Socket.io, RabbitMQ, Redis, Cloudinary, Docker · 2026",
    description:
      "Microservice-based real-time chat with instant messaging and media sharing via Socket.io and RabbitMQ. Uses Redis caching, Cloudinary storage, and Docker for scalable, performance-optimized deployments.",
    image: "/images/work-3.jpg",
    tech: ["MERN", "TypeScript", "Socket.io", "RabbitMQ", "Redis", "Docker"],
  },
  {
    title: "YouTube Clone",
    subtitle: "HTML, CSS, JavaScript and React.js",
    description:
      "Developed a user-friendly and responsive interface that closely matches the look and feel of YouTube. Gained hands-on experience in front-end development and API integration to replicate core features.",
    image: "/images/youtube..jpeg",
    liveUrl: "https://youtubelite.vercel.app/",
    githubUrl: "https://github.com/brahmanand09/YouTube_Lite",
    tech: ["React", "JavaScript", "CSS"],
  },
  {
    title: "Weather Checker",
    subtitle: "HTML, CSS, JavaScript and React.js",
    description:
      "Interactive platform for real-time weather data retrieval with a responsive UI. Fetches data from a third-party API and dynamically updates conditions on screen.",
    image: "/images/weather.jpeg",
    liveUrl: "https://weathercheckerapp.vercel.app/",
    githubUrl: "https://github.com/brahmanand09/Weather_Checker",
    tech: ["React", "JavaScript", "API"],
  },
  {
    title: "Code Editor",
    subtitle: "HTML, CSS and JavaScript",
    description:
      "User-friendly code editor with syntax highlighting, customizable color schemes, and cross-browser compatibility for writing and copying code.",
    image: "/images/code editor.jpeg",
    liveUrl: "https://livecodeeditor.vercel.app/",
    githubUrl: "https://github.com/brahmanand09/Code_Editor",
    tech: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Portfolio Website",
    subtitle: "Next.js, TypeScript and Tailwind CSS",
    description:
      "Official portfolio showcasing skills, projects, and experience. Fully responsive and built with Next.js, TypeScript, and modern CSS.",
    image: "/images/port.jpeg",
    liveUrl: "https://brahmanand09.github.io/My_Portfolio/",
    githubUrl: "https://github.com/brahmanand09/My_Portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Visualizing and Forecasting Stocks",
    description:
      "Stock forecasting project using Back Propagation and Artificial Neural Networks. Built with Dash to help clients analyze historical data and trends.",
    image: "/images/work-2.jpg",
    tech: ["Python", "Dash", "ANN"],
  },
  {
    title: "Crime Alert NGO",
    description:
      "NGO platform to support people in emergencies with food, clothing, and financial assistance based on available budget and needs.",
    image: "/images/work-3.jpg",
    tech: ["HTML", "CSS"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: "facebook",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/Brahmanand_9616",
    icon: "twitter",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/brahmanand09/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/brahmanand09",
    icon: "github",
  },
];
