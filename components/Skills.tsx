"use client";

import { motion } from "framer-motion";
import { Code2, Globe, BrainCircuit, Database, BookOpen, Cloud } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { SKILL_GROUPS } from "@/lib/data";

// Soft-color themes matching About section's stat card palette
const groupColors = [
  { border: "border-blue-100/80 hover:border-blue-300",       icon: "bg-blue-50 text-blue-600",       bar: "bg-blue-500"    },
  { border: "border-purple-100/80 hover:border-purple-300",   icon: "bg-purple-50 text-purple-600",   bar: "bg-purple-500"  },
  { border: "border-emerald-100/80 hover:border-emerald-300", icon: "bg-emerald-50 text-emerald-600", bar: "bg-emerald-500" },
  { border: "border-orange-100/80 hover:border-orange-300",   icon: "bg-orange-50 text-orange-600",   bar: "bg-orange-500"  },
  { border: "border-rose-100/80 hover:border-rose-300",       icon: "bg-rose-50 text-rose-600",       bar: "bg-rose-500"    },
  { border: "border-indigo-100/80 hover:border-indigo-300",   icon: "bg-indigo-50 text-indigo-600",   bar: "bg-indigo-500"  },
];

const iconMap: Record<string, React.ElementType> = {
  Code2, Globe, BrainCircuit, Database, BookOpen, Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden">
      <Container>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16">

          {/* ── Header Row: Left text + Right empty space ── same as About & Academic ── */}
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
                Proficient across modern software engineering stacks — from AI pipelines and data analysis
                to mobile apps and cloud deployment.
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
                    whileHover={{ y: -2 }}
                    className={`portfolio-card bg-white border transition-all duration-300 flex flex-col w-full rounded-3xl shadow-xs hover:shadow-md ${color.border}`}
                    style={{ padding: "clamp(2rem, 3.5vw, 2.75rem)" }}
                  >
                    {/* Icon + Category name */}
                    <div className="flex items-center gap-3.5 mb-7">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${color.icon}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-neutral-950">{group.category}</h3>
                    </div>

                    {/* Skills list with progress bars */}
                    <div className="space-y-5">
                      {group.skills.map((skill, si) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2 text-xs sm:text-[13px] font-medium">
                            <span className="text-neutral-700">{skill.name}</span>
                            <span className="text-neutral-400 font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-[6px] bg-neutral-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${color.bar}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: gi * 0.05 + si * 0.06, type: "tween" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SectionWrapper>

          {/* ── Tech tag cloud in a dedicated padded card ── */}
          <SectionWrapper delay={0.25}>
            <div
              className="portfolio-card bg-white border border-neutral-200/80 rounded-3xl shadow-xs w-full"
              style={{ padding: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-5">
                Tools, Libraries &amp; Frameworks
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Python", "Flutter", "React", "Next.js", "Node.js", "TypeScript",
                  "MySQL", "PostgreSQL", "MongoDB", "Git", "Solidity",
                  "OpenCV", "scikit-learn", "Socket.io", "AWS", "Tailwind CSS",
                  "REST APIs", "C++", "C", "Docker Basics",
                ].map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, type: "tween" }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="chip cursor-default px-3.5 py-1.5 text-xs sm:text-sm font-medium"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </SectionWrapper>

        </div>
      </Container>
    </section>
  );
}
