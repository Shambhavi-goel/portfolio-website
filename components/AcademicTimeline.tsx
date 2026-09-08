"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, MapPin, Award, Calendar } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { ACADEMIC_HISTORY, type AcademicEntry } from "@/data/academics";

const themeStyles = {
  emerald: {
    cardBorder: "border-emerald-100/80 hover:border-emerald-300",
    iconBg: "bg-emerald-50 text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    gradeBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  purple: {
    cardBorder: "border-purple-100/80 hover:border-purple-300",
    iconBg: "bg-purple-50 text-purple-600",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    gradeBadge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  blue: {
    cardBorder: "border-blue-100/80 hover:border-blue-300",
    iconBg: "bg-blue-50 text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    gradeBadge: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export default function AcademicTimeline() {
  return (
    <section id="academics" className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden">
      <Container>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16">

          {/* ── Header Row ── */}
          <div className="w-full">
            <SectionWrapper delay={0.05} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-blue-600" />
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  My Education
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                Academic{" "}
                Background
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Formal engineering foundation in Artificial Intelligence, Machine Learning, and
                computational sciences.
              </p>
            </SectionWrapper>
          </div>

          {/* ── Cards Row ── */}
          <SectionWrapper delay={0.15}>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {ACADEMIC_HISTORY.map((entry: AcademicEntry, index: number) => {
                const theme = themeStyles[entry.theme];
                const isCurrent = entry.status === "current";

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.1, type: "tween" }}
                    whileHover={{ y: -3 }}
                    className={`portfolio-card bg-white border flex flex-col transition-all duration-300 overflow-hidden ${theme.cardBorder}`}
                  >
                    {/* ── Card Top Section ── */}
                    <div className="p-8 sm:p-9 lg:p-10 flex flex-col gap-5 flex-1">

                      {/* Row 1: Icon + Status */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                          <GraduationCap size={22} className={isCurrent ? "animate-pulse" : ""} />
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border ${theme.badgeBg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                          {isCurrent ? "Current Pursuing" : "Completed"}
                        </span>
                      </div>

                      {/* Row 2: Degree title */}
                      <h3 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug">
                        {entry.degree}
                      </h3>

                      {/* Row 3: Institution + Location + Duration */}
                      <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-500">
                        <span className="inline-flex items-center gap-2 font-semibold text-neutral-700">
                          <Building2 size={14} className="text-neutral-400 shrink-0" />
                          {entry.institution}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={14} className="text-neutral-400 shrink-0" />
                          {entry.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Calendar size={14} className="text-neutral-400 shrink-0" />
                          {entry.duration}
                        </span>
                      </div>
                    </div>

                    {/* ── Card Bottom Section: Grade ── */}
                    <div className="px-8 sm:px-9 lg:px-10 py-5 sm:py-6 border-t border-neutral-100 bg-neutral-50/50">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${theme.gradeBadge}`}>
                        <Award size={14} />
                        <span>{entry.grade}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SectionWrapper>

        </div>
      </Container>
    </section>
  );
}
