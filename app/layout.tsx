import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shambhavi Goel — AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Shambhavi Goel — AI/ML engineer and full-stack developer building impactful products with Python, Flutter, and modern web tech.",
  keywords: [
    "Shambhavi Goel",
    "AI ML Engineer",
    "Full Stack Developer",
    "Flutter",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Shambhavi Goel" }],
  creator: "Shambhavi Goel",
  openGraph: {
    title: "Shambhavi Goel — AI/ML Engineer & Full-Stack Developer",
    description:
      "Building impactful products with AI, Flutter, and full-stack tech.",
    url: "https://shambhavigoel.vercel.app",
    siteName: "Shambhavi Goel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shambhavi Goel — AI/ML Engineer",
    description: "Building impactful products with AI, Flutter, and full-stack tech.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
