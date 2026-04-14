export const SOCIAL_LINKS = {
  github: "https://github.com/ravikarmakar",
  linkedin: "https://linkedin.com/in/ravikarmakar",
  twitter: "https://x.com/ravi_karmakar4",
  email: "ravikarmkar94457@gmail.com",
  avatar: "https://drive.google.com/thumbnail?id=1QTWouE6fvLIewnvr_4UitqKHxDRplPJD&sz=w1000",
} as const;

export const SITE_CONFIG = {
  name: "Ravi",
  lastName: "Karmakar",
  role: "Full-Stack Developer & System Architect",
  description: "Passionate about building scalable systems and crafting premium digital experiences.",
  headline: ["Ravi", "Karmakar"],
  subheadline: ["Full-Stack", "Developer", "&", "System", "Architect."],
  bio: "Building high-concurrency digital infrastructure and premium web experiences.",
  cvDriveId: "1s6AnGptI9whtdbbo-EA6yjAw80JaC3fy",
} as const;

export const CERTIFICATIONS = [
  {
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM Skillbuild",
    date: "2026",
    id: "ibm-artificial-intelligence-fundamentals",
    short: "AI",
    image: "https://drive.google.com/file/d/1yPPdWICogkVVCB4ApMlyF3JDC7ANQU0W/view?usp=sharing"
  },
  {
    name: "Ace Your Professional Interview",
    issuer: "IBM Skillbuild",
    date: "2026",
    id: "ibm-interview-prep",
    short: "IBM",
    image: "https://drive.google.com/file/d/1EK1aJ_9GoroA1BiYDAtknFdCRV-757jN/view?usp=sharing"
  }
] as const;

export const EXPERIENCES = [
  {
    role: "Full-Stack Developer Intern",
    company: "TechFlow Systems",
    duration: "6 Months",
    period: "2025 — 2026",
    description: "Optimized Next.js performance pipelines and integrated real-time Socket.io features for collaboration tools serving 10k+ daily active users. Reduced SSR load times by 40% through strategic code-splitting and edge caching.",
    tags: ["Next.js", "Socket.io", "TypeScript", "Redis", "Performance"],
    side: "left" as "left" | "right",
  },
] as const;

export const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Brindavan College, Bangalore",
    period: "2025 — Present",
    description: "Pursuing postgraduate studies focusing on advanced software engineering, application architecture, and modern scalable system design.",
    icon: "graduation",
  },
  {
    degree: "Full Stack Development Certification",
    institution: "Apna College, Remote",
    period: "6 Months Program — 2024",
    description: "Completed a rigorous 6-month specialized curriculum covering modern web development, backend API creation, database management, and responsive UI frameworks.",
    icon: "code",
  },
  {
    degree: "Bachelor of Science in Physics",
    institution: "B.S.K College, Barharwa",
    period: "2020 — 2023",
    description: "Built a strong analytical foundation in mathematical modeling, computational physics, and scientific problem-solving that translates directly into software engineering logic.",
    icon: "graduation",
  },
] as const;

export const PROJECTS = [
  {
    name: "Real-Time Esports Management System",
    description: "High-concurrency tournament engine handling 50k+ concurrent users with real-time bracket updates, live scoring, and automated matchmaking.",
    href: "#",
    cta: "View Project",
    icon: "gamepad",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "AI-Powered Face Communication Tool",
    description: "Real-time emotion detection and interactive UI using face-api.js with dynamic emotional feedback loops.",
    href: "#",
    cta: "View Project",
    icon: "smile",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Modern E-Commerce Platform",
    description: "Full-scale marketplace with optimized database indexing, Stripe payment flows, and a Shadcn UI admin dashboard.",
    href: "#",
    cta: "View Project",
    icon: "cart",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "BYG Architects Digital HQ",
    description: "Professional architectural portfolio with high-end GSAP-powered motion design and immersive 3D scroll sequences.",
    href: "#",
    cta: "View Project",
    icon: "building",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Global Real-Time Chat App",
    description: "Low-latency communication system built with Socket.io and Redis pub/sub, supporting 100k+ concurrent connections with message persistence.",
    href: "#",
    cta: "View Project",
    icon: "message",
    className: "md:col-span-2 md:row-span-1",
  },
] as const;

export const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "var(--glow-cyan)",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "var(--glow-violet)",
    skills: ["Node.js", "PostgreSQL", "Redis", "Socket.io", "Prisma", "REST APIs"],
  },
  {
    category: "DevOps & Tools",
    color: "var(--glow-emerald)",
    skills: ["Docker", "Git", "Vercel", "Linux", "CI/CD", "Nginx"],
  },
  {
    category: "Architecture",
    color: "#f59e0b",
    skills: ["System Design", "Microservices", "Database Design", "API Design", "Caching Strategies", "Real-Time Systems"],
  },
] as const;

/**
 * Standardized Animation Tokens
 */
export const PREMIUM_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94],
} as const;

export const SPRING_PREMIUM = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

/**
 * Helper to resolve Google Drive Links
 */
export const getGoogleDriveDirectLink = (url: string) => {
  if (!url || !url.includes("drive.google.com")) return url;
  
  const fileId = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)|file\/d\/(.+?)(\/|$)/)?.[1] || 
                 url.match(/\/d\/(.+?)(\/|$)/)?.[1] ||
                 url.match(/id=(.+?)(&|$)/)?.[1];
  
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return url;
};
