"use client";

import { motion } from "framer-motion";
import { Code2, Globe, BrainCircuit, Database, BookOpen, Cloud } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { SKILL_GROUPS } from "@/lib/data";

// Soft-color themes matching About section's stat card palette
const groupColors = [
  {
    border: "border-blue-100/90 hover:border-blue-300",
    icon: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
    pillHover: "hover:border-blue-300 hover:bg-blue-50/50",
  },
  {
    border: "border-purple-100/90 hover:border-purple-300",
    icon: "bg-purple-50 text-purple-600",
    dot: "bg-purple-500",
    pillHover: "hover:border-purple-300 hover:bg-purple-50/50",
  },
  {
    border: "border-emerald-100/90 hover:border-emerald-300",
    icon: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
    pillHover: "hover:border-emerald-300 hover:bg-emerald-50/50",
  },
  {
    border: "border-orange-100/90 hover:border-orange-300",
    icon: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
    pillHover: "hover:border-orange-300 hover:bg-orange-50/50",
  },
  {
    border: "border-rose-100/90 hover:border-rose-300",
    icon: "bg-rose-50 text-rose-600",
    dot: "bg-rose-500",
    pillHover: "hover:border-rose-300 hover:bg-rose-50/50",
  },
  {
    border: "border-indigo-100/90 hover:border-indigo-300",
    icon: "bg-indigo-50 text-indigo-600",
    dot: "bg-indigo-500",
    pillHover: "hover:border-indigo-300 hover:bg-indigo-50/50",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  BrainCircuit,
  Database,
  BookOpen,
  Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden">
      <Container>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16">

          {/* ── Header Row ── */}
          <div className="w-full">
            <SectionWrapper delay={0.05} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-blue-600" />
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  Capabilities
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                Skills &amp; Expertise
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Technologies, frameworks, and core engineering domains I actively use across production projects, research, and competitive problem solving.
              </p>
            </SectionWrapper>
          </div>

          {/* ── Skill Group Cards ── */}
          <SectionWrapper delay={0.15}>
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {SKILL_GROUPS.map((group, gi) => {
                const Icon = iconMap[group.icon] ?? Code2;
                const color = groupColors[gi % groupColors.length];
                return (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: gi * 0.06, type: "tween" }}
                    whileHover={{ y: -3 }}
                    className={`portfolio-card bg-white border transition-all duration-300 flex flex-col w-full rounded-3xl shadow-xs hover:shadow-md ${color.border}`}
                    style={{ padding: "clamp(1.75rem, 3vw, 2.5rem)" }}
                  >
                    {/* Icon + Category name */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${color.icon}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-neutral-950">{group.category}</h3>
                    </div>

                    {/* Technologies list */}
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {group.skills.map((tech) => (
                        <span
                          key={tech}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium bg-neutral-50/90 text-neutral-800 border border-neutral-200/80 transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 ${color.pillHover}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color.dot}`} />
                          <span>{tech}</span>
                        </span>
                      ))}
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
