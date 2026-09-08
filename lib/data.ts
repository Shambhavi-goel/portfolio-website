// ─────────────────────────────────────────────────────────────
// lib/data.ts  — All portfolio content data
// ─────────────────────────────────────────────────────────────

export const SOCIAL = {
  github: "https://github.com/Shambhavi-goel",
  linkedin: "https://www.linkedin.com/in/shambhavi-goel-29110b388/",
  email: "shambhavigoel2@gmail.com",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// ─── Projects ─────────────────────────────────────────────────
export type ProjectTag = "Mobile" | "Web" | "AI/ML" | "Blockchain";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  techStack: string[];
  github: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "foodloop",
    slug: "foodloop",
    title: "FoodLoop",
    description:
      "Cross-platform mobile app connecting surplus-food donors with recipients to reduce food wastage.",
    longDescription:
      "Real-time listing and coordination platform that bridges the gap between food donors (restaurants, households, events) and recipients (NGOs, shelters). Reduces urban food waste through live notifications and smart geolocation matching.",
    tags: ["Mobile"],
    techStack: ["Flutter", "Dart", "Node.js", "Express"],
    github: "https://github.com/anandtejaswi/FoodLoop",
    featured: true,
  },
  {
    id: "narirakshak",
    slug: "narirakshak",
    title: "NariRakshak",
    description:
      "AI-powered women's commute-safety app with real-time location tracking and a shareable web tracking link.",
    longDescription:
      "End-to-end safety platform with live GPS tracking via Socket.io, shareable Leaflet.js map links for trusted contacts, SOS alerts, and PostGIS-powered route-safety scoring. Built under hackathon constraints.",
    tags: ["Mobile", "Web"],
    techStack: [
      "Flutter", "Dart", "Node.js", "TypeScript",
      "Express", "PostgreSQL", "PostGIS", "Socket.io", "Leaflet.js",
    ],
    github: "https://github.com/pranjalg544/naarirakshak",
    featured: true,
  },
  {
    id: "saqms",
    slug: "saqms",
    title: "SAQMS",
    description:
      "Full-stack clinic platform for booking appointments and tracking real-time queue position.",
    longDescription:
      "Smart Appointment & Queue Management System with role-based dashboards for patients, staff, and admins. Uses Redis for real-time queue state and JWT auth.",
    tags: ["Web"],
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "JWT"],
    github:
      "https://github.com/Nilaykumar25/Smart_Appointment_Queue_Management_System",
  },
  {
    id: "face-recognition",
    slug: "face-recognition",
    title: "Face Recognition System",
    description:
      "Facial recognition pipeline supporting 100+ identities using InsightFace + ArcFace embeddings.",
    longDescription:
      "Production-grade pipeline with InsightFace detection, ArcFace embedding extraction, and cosine-similarity matching optimised for real-time inference using OpenCV.",
    tags: ["AI/ML"],
    techStack: ["Python", "InsightFace", "ArcFace", "OpenCV", "scikit-learn"],
    github: "https://github.com/Shambhavi-goel/face-recognition-system",
    featured: true,
  },
  {
    id: "clean-street",
    slug: "clean-street",
    title: "Clean Street",
    description:
      "Civic issue reporting platform with interactive map and real-time analytics. India Innovates 2026 Finalist.",
    longDescription:
      "Citizens report potholes, garbage, and civic issues via an interactive Leaflet map. Real-time analytics dashboard lets officials track resolution status.",
    tags: ["Web"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Leaflet", "Recharts", "JWT"],
    github: "https://github.com/Aman162004/clean-street",
    featured: true,
  },
  {
    id: "kissan-sathi",
    slug: "kissan-sathi",
    title: "Kissan Sathi",
    description:
      "Decentralized agricultural marketplace using smart contracts for direct farmer-to-buyer payments.",
    longDescription:
      "Blockchain-powered platform on Ethereum/Polygon eliminating middlemen with Solidity smart contracts handling escrow payments and a transparent on-chain supply-chain ledger.",
    tags: ["Blockchain", "Web"],
    techStack: ["Solidity", "Ethereum", "Polygon", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Aman162004/Blockchain-App-For-Farmers",
  },
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
      { name: "Python", level: 90 },
      { name: "C", level: 75 },
      { name: "C++", level: 78 },
    ],
  },
  {
    category: "Web & Mobile",
    icon: "Globe",
    skills: [
      { name: "HTML / CSS", level: 88 },
      { name: "JavaScript", level: 82 },
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

// ─── Certifications & Awards ──────────────────────────────────
export interface CertItem {
  title: string;
  issuer: string;
  year: string;
  type: "award" | "certification" | "scholarship";
  highlight?: boolean;
  detail?: string;
}

export const CERTIFICATIONS: CertItem[] = [
  {
    title: "NITORI Scholar",
    issuer: "Faculty of Technology, UoD",
    year: "2025",
    type: "award",
    highlight: true,
    detail: "One of the highest performers in the department, 1st year B.Tech",
  },
  {
    title: "Ericsson Empowering Girls",
    issuer: "Ericsson",
    year: "2025",
    type: "scholarship",
    highlight: true,
    detail: "Ericsson Empowering Girls Scholarship recipient",
  },
  {
    title: "GFG Hack-4-Viksit Bharat",
    issuer: "GeeksforGeeks",
    year: "2026",
    type: "award",
    highlight: true,
    detail: "Semifinalist — Top 15 teams. Carbon Coin Marketplace project.",
  },
  {
    title: "India Innovates 2026 Finalist",
    issuer: "India Innovates",
    year: "2026",
    type: "award",
    highlight: true,
    detail: "Finalist with Clean Street civic reporting platform",
  },
  {
    title: "AI for Bharat",
    issuer: "AWS-powered",
    year: "2025",
    type: "certification",
    detail: "AI for Bharat Certification (AWS-powered, 2025)",
  },
  {
    title: "ML Foundations",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "AWS Educate — Machine Learning Foundations badge",
  },
  {
    title: "Intro to Gen AI",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "AWS Educate — Introduction to Generative AI badge",
  },
  {
    title: "Cloud 101",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "AWS Educate — Introduction to Cloud 101 badge",
  },
];
