// ─────────────────────────────────────────────────────────────
// data/gallery.ts — Personal, hackathon, and campus event gallery
// ─────────────────────────────────────────────────────────────

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "Hackathon" | "Campus" | "Award" | "Community";
  date: string;
  caption: string;
  image: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "hackathon-sprint",
    title: "Hackathon Finalist Presentation",
    category: "Hackathon",
    date: "2026",
    caption: "Presenting our civic reporting MVP Clean Street live in front of the jury panel at India Innovates 2026.",
    image: "/gallery/photo-1.jpg",
    aspectRatio: "landscape",
  },
  {
    id: "team-building",
    title: "All-Night Build Session",
    category: "Hackathon",
    date: "2025",
    caption: "36 hours deep into prototyping NariRakshak safety tracking algorithms and WebSocket synchronization.",
    image: "/gallery/photo-2.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "scholarship-award",
    title: "Scholarship Felicitation Ceremony",
    category: "Award",
    date: "2025",
    caption: "Recognized as a NITORI Scholar at the University auditorium for academic standing in computer science.",
    image: "/gallery/photo-3.jpg",
    aspectRatio: "square",
  },
  {
    id: "tech-summit",
    title: "Developer Community Meetup",
    category: "Community",
    date: "2025",
    caption: "Connecting with cloud practitioners and open-source enthusiasts discussing generative AI pipelines.",
    image: "/gallery/photo-4.jpg",
    aspectRatio: "landscape",
  },
  {
    id: "campus-research",
    title: "University AI/ML Lab Session",
    category: "Campus",
    date: "2024",
    caption: "Benchmarking face recognition embedding cosine similarity and optimizing OpenCV video stream throughput.",
    image: "/gallery/photo-5.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "women-in-tech",
    title: "Ericsson Empowering Girls Cohort",
    category: "Community",
    date: "2025",
    caption: "Connecting with inspiring fellow engineers and industry mentors during the scholarship cohort kickoff.",
    image: "/gallery/photo-6.jpg",
    aspectRatio: "landscape",
  },
];
