"use client";

import { GraduationCap, Sparkles, Terminal, Code2, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";

export default function About() {
  return (
    <section id="about" className="w-full bg-white py-32 md:py-40 flex justify-center">
      <Container className="flex flex-col items-center">
        {/* Centered section header */}
        <SectionWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-caps mb-3">About Me</p>
            <h2 className="section-heading mb-4 text-neutral-950">
              Engineering with Purpose &amp; Precision
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Aspiring AI/ML engineer and full-stack builder passionate about solving real-world challenges through code.
            </p>
          </div>
        </SectionWrapper>

        {/* Centered structured story */}
        <div className="w-full max-w-4xl mx-auto space-y-10">

          {/* Narrative card */}
          <SectionWrapper delay={0.1}>
            <div className="portfolio-card p-8 sm:p-10 w-full">
              <div className="grid md:grid-cols-2 gap-8 text-neutral-600 leading-relaxed text-base">
                <div className="space-y-4">
                  <p>
                    I&apos;m currently pursuing my B.Tech in Computer Science with a specialization in{" "}
                    <strong className="text-neutral-900 font-semibold">Artificial Intelligence &amp; Machine Learning</strong>.
                    My journey centers around transforming algorithmic ideas into robust, production-grade applications.
                  </p>
                  <p>
                    From training classification models and computer vision pipelines to architecting cross-platform mobile apps,
                    I thrive in full-cycle software development where intelligent logic meets intuitive user experience.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    Hackathons have shaped my ability to think on my feet, collaborate efficiently under tight deadlines, and ship functional MVPs.
                    Whether it&apos;s a women&apos;s safety system, a food distribution network, or a blockchain marketplace, I prioritize tangible impact.
                  </p>
                  <p>
                    I am actively seeking <strong className="text-neutral-900 font-semibold">summer internships and collaborative engineering roles</strong> where I can contribute meaningful code and grow alongside ambitious teams.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Stats & Highlights Row */}
          <SectionWrapper delay={0.2}>
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "6+", label: "Projects Completed" },
                { value: "4",  label: "Hackathons Competed" },
                { value: "3",  label: "AWS Cloud Badges" },
                { value: "100%", label: "End-to-End Ownership" },
              ].map(({ value, label }) => (
                <div key={label} className="portfolio-card p-6 text-center w-full">
                  <p className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">{value}</p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Education & Core Focus Card */}
          <SectionWrapper delay={0.3}>
            <div className="portfolio-card p-8 sm:p-10 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                    <GraduationCap size={22} className="text-neutral-800" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Education</span>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                      B.Tech in Computer Science (AI &amp; ML)
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      SRM Institute of Science and Technology · 2022 – 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 px-3.5 py-2 rounded-lg border border-neutral-200 self-start md:self-center">
                  <span>CGPA: 8.8 / 10</span>
                </div>
              </div>

              <div className="pt-6 grid sm:grid-cols-3 gap-5">
                <div className="flex items-start gap-3">
                  <Terminal size={18} className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Machine Learning</h4>
                    <p className="text-xs text-neutral-500 mt-1">Data preprocessing, model training, computer vision</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 size={18} className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Full-Stack Web</h4>
                    <p className="text-xs text-neutral-500 mt-1">Next.js, TypeScript, REST APIs, databases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Mobile Systems</h4>
                    <p className="text-xs text-neutral-500 mt-1">Flutter, cross-platform UI, real-time sync</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Centered CTA row */}
          <SectionWrapper delay={0.4}>
            <div className="flex justify-center items-center gap-4 pt-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
              >
                View Selected Work <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-outline"
              >
                Get In Touch
              </a>
            </div>
          </SectionWrapper>

        </div>
      </Container>
    </section>
  );
}
