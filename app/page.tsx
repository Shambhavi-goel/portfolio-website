import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademicTimeline from "@/components/AcademicTimeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import DSAJourney from "@/components/DSAJourney";
import GitHubStats from "@/components/GitHubStats";
import CertificateGallery from "@/components/CertificateGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Content */}
      <main className="w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* Whitespace between Hero and About */}
        <div className="h-10 sm:h-12 lg:h-16" aria-hidden="true" />

        {/* 2. About Section */}
        <About />

        {/* Generous whitespace between About and Academic Background */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 3. Academic Background */}
        <AcademicTimeline />

        {/* Generous whitespace between Academic Background and Skills */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 4. Skills & Expertise */}
        <Skills />

        {/* Generous whitespace between Skills and Projects */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 5. Projects Carousel */}
        <Projects />

        {/* Generous whitespace between Projects and DSA Journey */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 6. DSA Journey & Competitive Programming */}
        <DSAJourney />

        {/* Generous whitespace between DSA Journey and GitHub Stats */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 7. GitHub Activity & Real-Time Stats */}
        <GitHubStats />

        {/* Generous whitespace between GitHub Stats and Certificates */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 8. Certificates & Honors Carousel */}
        <CertificateGallery />

        {/* Generous whitespace between Certificates and Contact */}
        <div className="h-24 sm:h-32 lg:h-40" aria-hidden="true" />

        {/* 9. Contact Section */}
        <Contact />
      </main>

      {/* Generous whitespace before Footer */}
      <div className="h-20 sm:h-28 lg:h-36" aria-hidden="true" />

      {/* 9. Bottom Bar */}
      <Footer />
    </>
  );
}
