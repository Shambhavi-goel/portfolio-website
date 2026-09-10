// ─────────────────────────────────────────────────────────────
// lib/data.ts  — Portfolio data exports & central registry
// ─────────────────────────────────────────────────────────────

import { PROJECTS, type Project, type ProjectTag } from "@/data/projects";
import { CERTIFICATES, type CertificateItem } from "@/data/certificates";
import { ACADEMIC_HISTORY, type AcademicEntry } from "@/data/academics";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/data/gallery";

export { PROJECTS, type Project, type ProjectTag };
export { CERTIFICATES, type CertificateItem };
export { ACADEMIC_HISTORY, type AcademicEntry };
export { GALLERY_PHOTOS, type GalleryPhoto };

// Backward compatibility alias for CertItem
export type CertItem = CertificateItem;
export const CERTIFICATIONS = CERTIFICATES;

export const SOCIAL = {
  github: "https://github.com/Shambhavi-goel",
  linkedin: "https://www.linkedin.com/in/shambhavi-goel-29110b388/",
  email: "shambhavigoel2@gmail.com",
  phone: "+91 9389588755",
  phoneHref: "+919389588755",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

// ─── Skills ───────────────────────────────────────────────────
export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: [
      { name: "Python", level: 70 },
      { name: "C", level: 75 },
      { name: "C++", level: 78 },
    ],
  },
  {
    category: "Web & Mobile",
    icon: "Globe",
    skills: [
      { name: "HTML / CSS", level: 88 },
      { name: "JavaScript", level: 70 },
      { name: "Flutter", level: 80 },
    ],
  },
  {
    category: "Data & ML",
    icon: "BrainCircuit",
    skills: [
      { name: "Data Cleaning & EDA", level: 85 },
      { name: "Feature Engineering", level: 80 },
      { name: "ML Classification Models", level: 82 },
    ],
  },
  {
    category: "Tools & Databases",
    icon: "Database",
    skills: [
      { name: "MySQL", level: 78 },
      { name: "Git", level: 85 },
    ],
  },
  {
    category: "CS Core",
    icon: "BookOpen",
    skills: [
      { name: "Data Structures & Algorithms", level: 88 },
      { name: "Competitive Programming", level: 80 },
    ],
  },
  {
    category: "AI & Cloud (AWS)",
    icon: "Cloud",
    skills: [
      { name: "ML Foundations (AWS)", level: 75 },
      { name: "Intro to Gen AI (AWS)", level: 72 },
      { name: "Intro to Cloud 101 (AWS)", level: 74 },
    ],
  },
];
