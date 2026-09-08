// ─────────────────────────────────────────────────────────────
// data/academics.ts — Academic background timeline entries from resume
// ─────────────────────────────────────────────────────────────

export interface AcademicEntry {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  location: string;
  status: "current" | "completed";
  theme: "emerald" | "purple" | "blue";
  description: string;
  coursework: string[];
}

export const ACADEMIC_HISTORY: AcademicEntry[] = [
  {
    id: "btech",
    degree: "B.Tech in Computer Science (Artificial Intelligence & Machine Learning)",
    institution: "Faculty of Technology, University of Delhi",
    duration: "Aug 2024 – Present",
    grade: "CGPA 9.45 / 10",
    location: "Delhi, India",
    status: "current",
    theme: "emerald",
    description:
      "Specializing in machine learning architectures, statistical data modeling, and end-to-end intelligent software systems. Recipient of the NITORI Scholarship for being among the top academic performers in the department.",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning & Neural Networks",
      "Computer Vision & OpenCV",
      "Database Management Systems",
      "Object-Oriented Programming (C++/Java)",
      "Distributed Systems Basics",
    ],
  },
  {
    id: "class12",
    degree: "Senior Secondary Education (Class XII)",
    institution: "PT Murarilal Int. College",
    duration: "2022 – 2024",
    grade: "95.8%",
    location: "Firozabad, UP, India",
    status: "completed",
    theme: "purple",
    description:
      "Completed higher secondary schooling with 95.8% distinction, building a rigorous analytical and quantitative foundation in Physics, Chemistry, Mathematics, and Computer Science.",
    coursework: [
      "Mathematics (Calculus & Linear Algebra)",
      "Physics & Mechanics",
      "Chemistry",
      "Computer Science (Python / C++)",
    ],
  },
  {
    id: "class10",
    degree: "Secondary School Examination (Class X)",
    institution: "Kids Corner Happy Sr. Sec. School",
    duration: "2020 – 2022",
    grade: "98.6%",
    location: "Firozabad, UP, India",
    status: "completed",
    theme: "blue",
    description:
      "Graduated secondary school with 98.6% academic distinction honors, consistently leading in regional mathematics, general sciences, and scholastic competitions.",
    coursework: [
      "Advanced Mathematics",
      "General Sciences",
      "Social Sciences",
      "English Literature",
    ],
  },
];
