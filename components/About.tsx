"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Rocket,
  FileText,
  Trophy,
  Cloud,
  Users,
  Laptop,
  Code2,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";

export default function About() {
  return (
    <section id="about" className="w-full bg-white pt-12 md:pt-16 pb-20 md:pb-28 flex justify-center overflow-hidden">
      <Container>
        {/* Main Vertical Flow with Guaranteed Spacing between All Rows */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16 lg:gap-20">

          {/* ── ROW 1: Bio Story & Narrative Cards (Full Width) ── */}
          <div className="w-full flex flex-col gap-8 sm:gap-10">
            {/* Header label & Title */}
            <SectionWrapper delay={0.05}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-blue-600" />
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  ABOUT ME
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-neutral-950 tracking-tight leading-[1.15] mb-4">
                Engineering with Purpose &amp; Precision
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Aspiring AI/ML engineer and full-stack builder passionate about solving real-world challenges through code.
              </p>
            </SectionWrapper>

            {/* Two Narrative Cards Side by Side */}
            <SectionWrapper delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Narrative Card 1 */}
                <div
                  className="portfolio-card bg-white border border-blue-100/90 hover:border-blue-300 transition-all duration-300 rounded-3xl shadow-xs hover:shadow-md flex flex-col justify-between"
                  style={{ padding: "clamp(2.25rem, 4vw, 3.5rem)" }}
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Brain size={22} />
                    </div>
                    <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                      <p>
                        I&apos;m currently pursuing my B.Tech in Computer Science with a specialization in{" "}
                        <strong className="text-neutral-900 font-semibold">
                          Artificial Intelligence &amp; Machine Learning
                        </strong>
                        . My journey centers around transforming algorithmic ideas into robust, production-grade applications.
                      </p>
                      <p>
                        From training classification models and computer vision pipelines to architecting cross-platform mobile apps, I thrive in full-cycle software development where intelligent logic meets intuitive user experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative Card 2 */}
                <div
                  className="portfolio-card bg-white border border-indigo-100/90 hover:border-indigo-300 transition-all duration-300 rounded-3xl shadow-xs hover:shadow-md flex flex-col justify-between"
                  style={{ padding: "clamp(2.25rem, 4vw, 3.5rem)" }}
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Rocket size={22} />
                    </div>
                    <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                      <p>
                        Hackathons have shaped my ability to think on my feet, collaborate efficiently under tight deadlines, and ship functional MVPs. Whether it&apos;s a women&apos;s safety system, a food distribution network, or a blockchain marketplace, I prioritize tangible impact.
                      </p>
                      <p>
                        I am actively seeking{" "}
                        <strong className="text-neutral-900 font-semibold">
                          summer internships and collaborative engineering roles
                        </strong>{" "}
                        where I can contribute meaningful code and grow alongside ambitious teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>

          {/* ── ROW 2: 4 Stat Cards in 1 Row ── */}
          <SectionWrapper delay={0.2}>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {/* Stat 1: 6+ Projects Completed */}
              <motion.div
                whileHover={{ y: -2 }}
                className="portfolio-card flex items-center gap-4 bg-white border border-emerald-100 hover:border-emerald-300 transition-all duration-200 rounded-3xl"
                style={{ padding: "clamp(1.5rem, 2vw, 2rem)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-none">
                    6+
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium leading-tight">
                    Projects Completed
                  </p>
                </div>
              </motion.div>

              {/* Stat 2: 4 Hackathons Competed */}
              <motion.div
                whileHover={{ y: -2 }}
                className="portfolio-card flex items-center gap-4 bg-white border border-purple-100 hover:border-purple-300 transition-all duration-200 rounded-3xl"
                style={{ padding: "clamp(1.5rem, 2vw, 2rem)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Trophy size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-none">
                    4
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium leading-tight">
                    Hackathons Completed
                  </p>
                </div>
              </motion.div>

              {/* Stat 3: 3 AWS Cloud Badges */}
              <motion.div
                whileHover={{ y: -2 }}
                className="portfolio-card flex items-center gap-4 bg-white border border-blue-100 hover:border-blue-300 transition-all duration-200 rounded-3xl"
                style={{ padding: "clamp(1.5rem, 2vw, 2rem)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Cloud size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-none">
                    3
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium leading-tight">
                    AWS Cloud Badges
                  </p>
                </div>
              </motion.div>

              {/* Stat 4: 100% End-to-End Ownership */}
              <motion.div
                whileHover={{ y: -2 }}
                className="portfolio-card flex items-center gap-4 bg-white border border-orange-100 hover:border-orange-300 transition-all duration-200 rounded-3xl"
                style={{ padding: "clamp(1.5rem, 2vw, 2rem)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-none">
                    100%
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium leading-tight">
                    End-to-End Ownership
                  </p>
                </div>
              </motion.div>
            </div>
          </SectionWrapper>

          {/* ── ROW 3: Technical Breadth & Core Engineering Pillars Card ── */}
          <SectionWrapper delay={0.25}>
            <div className="w-full flex flex-col gap-5">
              {/* Header + Link to Academic Timeline */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                    TECHNICAL BREADTH
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                    Core Engineering Pillars
                  </h3>
                </div>
                <a
                  href="#academics"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#academics")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors self-start sm:self-auto"
                >
                  <span>Explore Academic Timeline</span>
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* 3 Pillars in 1 Horizontal Container with Dividers */}
              <div
                className="portfolio-card bg-white border border-neutral-200/80 shadow-xs rounded-3xl"
                style={{ padding: "clamp(1.75rem, 3vw, 2.75rem)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                  {/* Pillar 1: Machine Learning */}
                  <div className="flex items-center gap-4 p-3 md:p-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Laptop size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-950">Machine Learning</h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        Data preprocessing, model training, computer vision
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2: Full-Stack Web */}
                  <div className="flex items-center gap-4 p-3 md:p-5 md:pl-8">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Code2 size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-950">Full-Stack Web</h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        Next.js, TypeScript, REST APIs, databases
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3: Mobile Systems */}
                  <div className="flex items-center gap-4 p-3 md:p-5 md:pl-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Smartphone size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-950">Mobile Systems</h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        Flutter, cross-platform UI, real-time sync
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* ── ROW 4: Bottom CTA Row ── */}
          <SectionWrapper delay={0.3}>
            <div className="w-full flex flex-wrap justify-center items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary px-8 py-3.5 text-sm font-medium shadow-sm hover:shadow-md transition-all"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline px-8 py-3.5 text-sm font-medium hover:bg-neutral-50 transition-all"
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
