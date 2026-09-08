// ─────────────────────────────────────────────────────────────
// data/certificates.ts — Credentials, awards, and scholarships
// ─────────────────────────────────────────────────────────────

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "award" | "certification" | "scholarship";
  highlight?: boolean;
  detail?: string;
  image: string;
  credentialUrl?: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "nitori-scholar",
    title: "NITORI Scholar",
    issuer: "Faculty of Technology, UoD",
    year: "2025",
    type: "award",
    highlight: true,
    detail: "Awarded to one of the highest academic performers in the department during 1st year B.Tech, recognizing sustained scholastic dedication and technical potential.",
    image: "/certificates/cert-1.png",
  },
  {
    id: "ericsson-empowering-girls",
    title: "Ericsson Empowering Girls Scholarship",
    issuer: "Ericsson",
    year: "2025",
    type: "scholarship",
    highlight: true,
    detail: "Selected for the prestigious Ericsson Empowering Girls Scholarship supporting exemplary female engineers pursuing advanced computing degrees.",
    image: "/certificates/cert-2.png",
  },
  {
    id: "gfg-hackathon",
    title: "GFG Hack-4-Viksit Bharat",
    issuer: "GeeksforGeeks",
    year: "2026",
    type: "award",
    highlight: true,
    detail: "Semifinalist — Top 15 teams nationwide for developing the Carbon Coin Marketplace, an eco-incentive verification architecture.",
    image: "/certificates/cert-3.png",
  },
  {
    id: "india-innovates",
    title: "India Innovates 2026 Finalist",
    issuer: "India Innovates",
    year: "2026",
    type: "award",
    highlight: true,
    detail: "National finalist recognized for Clean Street, an interactive geospatial civic reporting and real-time municipal dashboard platform.",
    image: "/certificates/cert-4.png",
  },
  {
    id: "ai-for-bharat",
    title: "AI for Bharat Certification",
    issuer: "AWS-powered",
    year: "2025",
    type: "certification",
    detail: "Demonstrated applied machine learning proficiency and cloud-native model deployment in the AWS-powered AI for Bharat national initiative.",
    image: "/certificates/cert-5.png",
  },
  {
    id: "aws-ml-foundations",
    title: "AWS Educate — Machine Learning Foundations",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "Verified badge covering supervised learning, unsupervised learning, model evaluation metrics, and cloud inference patterns on AWS.",
    image: "/certificates/cert-6.png",
  },
  {
    id: "aws-genai",
    title: "AWS Educate — Intro to Generative AI",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "Credential demonstrating foundational knowledge of foundational models, transformer architectures, prompt engineering, and ethical AI principles.",
    image: "/certificates/cert-7.png",
  },
  {
    id: "aws-cloud-101",
    title: "AWS Educate — Cloud 101",
    issuer: "AWS Educate",
    year: "2024",
    type: "certification",
    detail: "Foundational badge in core AWS cloud services, identity and access management (IAM), compute, object storage, and architectural reliability.",
    image: "/certificates/cert-8.png",
  },
];
