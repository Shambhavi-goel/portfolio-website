// ─────────────────────────────────────────────────────────────
// data/projects.ts — Single shared source of truth for all projects
// ─────────────────────────────────────────────────────────────

export type ProjectTag = "Mobile" | "Web" | "AI/ML" | "Blockchain";

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  techStack: string[];
  github: string;
  demoUrl?: string;
  featured?: boolean;
  image: string;
  role?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "foodloop",
    slug: "foodloop",
    title: "FoodLoop",
    tagline: "Bridging surplus food donors and shelters to eliminate urban food waste in real time.",
    description:
      "Cross-platform mobile app connecting surplus-food donors with recipients to reduce food wastage.",
    longDescription:
      "Real-time listing and coordination platform that bridges the gap between food donors (restaurants, households, events) and recipients (NGOs, shelters). Reduces urban food waste through live notifications, smart geolocation matching, and status-tracked pickups.",
    tags: ["Mobile"],
    techStack: ["Flutter", "Dart", "Node.js", "Express", "REST APIs"],
    github: "https://github.com/anandtejaswi/FoodLoop",
    featured: true,
    image: "/projects/foodloop.png",
    // TODO: add specific role per project
    role: "Led mobile frontend development using Flutter; designed real-time listing workflows and integrated backend REST endpoints.",
  },
  {
    id: "narirakshak",
    slug: "narirakshak",
    title: "NariRakshak",
    tagline: "AI-powered women's commute safety companion with live GPS tracking and emergency SOS.",
    description:
      "AI-powered women's commute-safety app with real-time location tracking and a shareable web tracking link.",
    longDescription:
      "End-to-end safety platform with live GPS tracking via Socket.io, shareable Leaflet.js map links for trusted contacts, SOS alerts, and PostGIS-powered route-safety scoring. Built under hackathon constraints with high reliability under poor connectivity.",
    tags: ["Mobile", "Web"],
    techStack: [
      "Flutter",
      "Dart",
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "PostGIS",
      "Socket.io",
      "Leaflet.js",
    ],
    github: "https://github.com/pranjalg544/naarirakshak",
    featured: true,
    image: "/projects/narirakshak.png",
    // TODO: add specific role per project
    role: "Architected cross-platform client in Flutter and built WebSocket-driven real-time tracking pipelines with PostGIS route querying.",
  },
  {
    id: "saqms",
    slug: "saqms",
    title: "SAQMS",
    tagline: "Smart clinic appointment & live virtual queue tracking system with Redis-backed state.",
    description:
      "Full-stack clinic platform for booking appointments and tracking real-time queue position.",
    longDescription:
      "Smart Appointment & Queue Management System with role-based dashboards for patients, staff, and admins. Employs Redis for low-latency in-memory queue state updates, JWT-based role authentication, and PostgreSQL for audit trails.",
    tags: ["Web"],
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "JWT"],
    github: "https://github.com/Nilaykumar25/Smart_Appointment_Queue_Management_System",
    image: "/projects/saqms.png",
    // TODO: add specific role per project
    role: "Developed patient and administrative dashboard components and assisted in real-time queue synchronization logic.",
  },
  {
    id: "face-recognition",
    slug: "face-recognition",
    title: "Face Recognition System",
    tagline: "High-accuracy facial recognition pipeline supporting 100+ identities via InsightFace & ArcFace embeddings.",
    description:
      "Facial recognition pipeline supporting 100+ identities using InsightFace + ArcFace embeddings.",
    longDescription:
      "Production-grade computer vision pipeline featuring InsightFace multi-task cascaded detection, ArcFace deep embedding extraction, and cosine-similarity vector matching optimised for real-time video stream inference using OpenCV and scikit-learn.",
    tags: ["AI/ML"],
    techStack: ["Python", "InsightFace", "ArcFace", "OpenCV", "scikit-learn", "NumPy"],
    github: "https://github.com/Shambhavi-goel/face-recognition-system",
    featured: true,
    image: "/projects/face-recognition.png",
    // TODO: add specific role per project
    role: "Designed and implemented end-to-end model evaluation, embedding extraction pipeline, and cosine similarity matching threshold optimization.",
  },
  {
    id: "clean-street",
    slug: "clean-street",
    title: "Clean Street",
    tagline: "Civic issue reporting portal with geospatial mapping and administrative tracking — India Innovates 2026 Finalist.",
    description:
      "Civic issue reporting platform with interactive map and real-time analytics. India Innovates 2026 Finalist.",
    longDescription:
      "Citizens report potholes, garbage overflow, and public infrastructure issues via an interactive Leaflet map with geocoded photos. Municipal officials access an analytics dashboard to track resolution timelines and inspect citizen-verified resolutions.",
    tags: ["Web"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Leaflet", "Recharts", "JWT"],
    github: "https://github.com/Aman162004/clean-street",
    featured: true,
    image: "/projects/clean-street.png",
    // TODO: add specific role per project
    role: "Built interactive mapping components, citizen reporting workflows, and real-time status update feeds.",
  },
  {
    id: "kissan-sathi",
    slug: "kissan-sathi",
    title: "Kisaan Sathi",
    tagline: "Decentralized agricultural marketplace eliminating middlemen via automated Solidity escrow contracts.",
    description:
      "Decentralized agricultural marketplace using smart contracts for direct farmer-to-buyer payments.",
    longDescription:
      "Blockchain-powered marketplace on Ethereum/Polygon eliminating commission-heavy middlemen. Solidity smart contracts handle buyer deposits, proof-of-delivery release, and maintain a tamper-proof transparent supply chain ledger for crop provenance.",
    tags: ["Blockchain", "Web"],
    techStack: ["Solidity", "Ethereum", "Polygon", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Aman162004/Blockchain-App-For-Farmers",
    image: "/projects/kissan-sathi.png",
    // TODO: add specific role per project
    role: "Implemented frontend integration with Web3 provider, smart contract payment verification flows, and crop catalog interface.",
  },
];
