export const SOCIAL_LINKS = {
  github: "https://github.com/ravikarmakar",
  linkedin: "https://linkedin.com/in/ravikarmakar",
  twitter: "https://x.com/ravi_karmakar4",
  email: "ravikarmkar94457@gmail.com",
  avatar: "https://drive.google.com/file/d/1QTWouE6fvLIewnvr_4UitqKHxDRplPJD/view",
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
    name: "Full Stack Web Development",
    issuer: "Apna College",
    date: "2024",
    id: "apna-college-full-stack-web-development",
    short: "Apna College",
    image: "https://drive.google.com/file/d/1OYwTmOmL6yjPbakz0ik4yHTIemDHyuT6/view?usp=sharing"
  },
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
    role: "Full Stack Developer Intern",
    company: "SoftwareFarm",
    duration: "5 mos",
    period: "Jul 2025 — Nov 2025",
    location: "West Bengal, India · Remote",
    description: "Architected and implemented scalable features using the MEAN stack (MongoDB, Express.js, Angular, Node.js). Engineered responsive user interfaces and robust RESTful APIs, collaborating in a remote environment to deliver high-quality software solutions for production-grade systems.",
    tags: ["MongoDB", "Express.js", "TypeScript", "Node.js", "MEAN Stack", "Remote"],
    side: "left" as "left" | "right",
  },
  {
    role: "Web Development Intern",
    company: "KRMSolutions",
    duration: "3 Months",
    period: "Jan 2025 — Apr 2025",
    location: "Malda, West Bengal, India",
    description: "Developed responsive web interfaces and assisted in the creation of localized business management software. Focused on optimizing frontend performance and implementing secure user authentication modules.",
    tags: ["React", "JavaScript", "Web Development", "UI/UX"],
    side: "right" as "left" | "right",
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

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly tags: readonly string[];
  readonly github: string;
  readonly live: string;
  readonly featured?: boolean;
  readonly className?: string;
}

export const PROJECTS = [
  {
    name: "Real-Time Esports Management",
    description: "High-concurrency tournament engine handling 50k+ concurrent users with automated matchmaking.",
    github: "https://github.com/ravikarmakar",
    live: "https://esports-demo.ravikarmakar.com",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000",
    tags: ["Next.js", "Redis", "Socket.io", "PostgreSQL"],
    featured: true,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "AI Face Communication",
    description: "Emotion detection using face-api.js with dynamic feedback loops.",
    github: "https://github.com/ravikarmakar",
    live: "https://ai-face-demo.ravikarmakar.com",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=2000",
    tags: ["React", "Face-API", "Webhooks"],
    featured: false,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Modern E-Commerce",
    description: "Marketplace with optimized indexing and Stripe payment flows.",
    github: "https://github.com/ravikarmakar",
    live: "https://shop-demo.ravikarmakar.com",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2000",
    tags: ["TypeScript", "Stripe", "Prisma"],
    featured: false,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "BYG Architects HQ",
    description: "Architectural portfolio with GSAP-powered motion design.",
    github: "https://github.com/ravikarmakar",
    live: "https://byg-demo.ravikarmakar.com",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    tags: ["GSAP", "Three.js", "Framer Motion"],
    featured: false,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Global Real-Time Chat",
    description: "Low-latency system supporting 100k+ concurrent connections.",
    github: "https://github.com/ravikarmakar",
    live: "https://chat-demo.ravikarmakar.com",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=2000",
    tags: ["Node.js", "Socket.io", "Redis"],
    featured: true,
    className: "md:col-span-2 md:row-span-1",
  },
] as const;

export const SKILL_CATEGORIES = ["Frontend", "Backend", "DevOps", "Architecture"] as const;

export const SKILLS = [
  // Frontend
  { name: "Next.js", category: "Frontend", color: "#00f0ff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React", category: "Frontend", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "GSAP", category: "Frontend", color: "#88CE02", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Framer Motion", category: "Frontend", color: "#E040FB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },
  // Backend
  { name: "Node.js", category: "Backend", color: "#a855f7", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", category: "Backend", color: "#4169E1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", category: "Backend", color: "#DC382D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Socket.io", category: "Backend", color: "#a855f7", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" },
  { name: "Prisma", category: "Backend", color: "#2D3748", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "Express", category: "Backend", color: "#a855f7", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  // DevOps
  { name: "Docker", category: "DevOps", color: "#2496ED", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Git", category: "DevOps", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Vercel", category: "DevOps", color: "#10b981", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Linux", category: "DevOps", color: "#FCC624", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "GitHub", category: "DevOps", color: "#10b981", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Nginx", category: "DevOps", color: "#009639", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  // Architecture (use conceptual icons)
  { name: "System Design", category: "Architecture", color: "#f59e0b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg" },
  { name: "Microservices", category: "Architecture", color: "#f59e0b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  { name: "MongoDB", category: "Architecture", color: "#47A248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "GraphQL", category: "Architecture", color: "#E10098", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
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

  // Extract file ID using a robust regex that handles all common Drive URL patterns
  const match = url.match(/\/d\/(.+?)(?:\/|$|\?)|id=(.+?)(?:&|$)/);
  const fileId = match ? (match[1] || match[2]) : null;

  if (fileId) {
    // We now use our internal proxy API to fetch the image.
    // This is the most robust way to handle Google Drive images in a portfolio.
    return `/api/drive-image?id=${fileId}`;
  }
  return url;
};
