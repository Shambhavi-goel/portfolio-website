// ─────────────────────────────────────────────────────────────
// lib/data.ts  — Portfolio data exports & central registry
// ─────────────────────────────────────────────────────────────

import { PROJECTS, type Project, type ProjectTag } from "@/data/projects";
import { CERTIFICATES, type CertificateItem } from "@/data/certificates";
import { ACADEMIC_HISTORY, type AcademicEntry } from "@/data/academics";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/data/gallery";
import { DSA_PROFILES, DSA_OVERVIEW_STATS, CORE_DSA_TOPICS, type DSAProfile } from "@/data/dsa";

export { PROJECTS, type Project, type ProjectTag };
export { CERTIFICATES, type CertificateItem };
export { ACADEMIC_HISTORY, type AcademicEntry };
export { GALLERY_PHOTOS, type GalleryPhoto };
export { DSA_PROFILES, DSA_OVERVIEW_STATS, CORE_DSA_TOPICS, type DSAProfile };

// Backward compatibility alias for CertItem
export type CertItem = CertificateItem;
export const CERTIFICATIONS = CERTIFICATES;

export const SOCIAL = {
  github: "https://github.com/Shambhavi-goel",
  linkedin: "https://www.linkedin.com/in/shambhavi-goel-29110b388/",
  leetcode: "https://leetcode.com/u/Pokemon_sg/",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/shambhavikikp?tab=activity",
  codeforces: "https://codeforces.com/profile/Pokemon_sg",
  email: "shambhavigoel2@gmail.com",
  phone: "+91 9389588755",
  phoneHref: "+919389588755",
  location: "Delhi, India",
  relocationNotice: "Open to relocate for summer internship · Open to remote internships",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "DSA", href: "#dsa" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

// ─── Skills ───────────────────────────────────────────────────
export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: ["C++", "C", "Python", "TypeScript", "JavaScript", "Dart", "SQL"],
  },
  {
    category: "Web & Mobile",
    icon: "Globe",
    skills: ["React", "Next.js", "Flutter", "Node.js", "Express", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "AI & Machine Learning",
    icon: "BrainCircuit",
    skills: ["Computer Vision", "OpenCV", "scikit-learn", "InsightFace", "ArcFace", "NumPy", "Pandas"],
  },
  {
    category: "Databases & Cloud",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS Cloud", "Prisma ORM", "Docker"],
  },
  {
    category: "Core CS & Algorithms",
    icon: "BookOpen",
    skills: ["Data Structures", "Algorithms", "Competitive Programming", "OOP", "DBMS", "Operating Systems"],
  },
  {
    category: "Tools & Architecture",
    icon: "Cloud",
    skills: ["Git", "GitHub", "REST APIs", "Socket.io", "PostGIS", "Leaflet.js", "JWT Auth"],
  },
];

