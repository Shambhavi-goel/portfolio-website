"use client";

import { motion } from "framer-motion";
import { Code2, Globe, BrainCircuit, Database, BookOpen, Cloud } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { SKILL_GROUPS } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Code2, Globe, BrainCircuit, Database, BookOpen, Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-neutral-50/60 py-32 md:py-40 flex justify-center">
      <Container className="flex flex-col items-center">
        {/* Centered section header */}
        <SectionWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-caps mb-3">Capabilities</p>
            <h2 className="section-heading mb-4 text-neutral-950">
              Skills &amp; Expertise
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Proficient across modern software engineering stacks — from AI pipelines and data analysis to mobile apps and cloud deployment.
            </p>
          </div>
        </SectionWrapper>

        {/* Centered grid of skill groups */}
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = iconMap[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: gi * 0.06, type: "tween" }}
                whileHover={{ y: -2 }}
                className="portfolio-card p-6 sm:p-7 flex flex-col justify-between w-full"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-neutral-900" />
                    </div>
                    <h3 className="font-bold text-base text-neutral-950">{group.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {group.skills.map((skill, si) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
                          <span className="text-neutral-700">{skill.name}</span>
                          <span className="text-neutral-400 font-mono">{skill.level}%</span>
                        </div>
                        {/* Clean monochrome progress bar */}
                        <div className="skill-track">
                          <motion.div
                            className="skill-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: gi * 0.05 + si * 0.06, type: "tween" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centered technology tags cloud */}
        <SectionWrapper delay={0.25}>
          <div className="mt-16 text-center w-full">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5">
              Tools &amp; Frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
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
                  className="chip cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </Container>
    </section>
  );
}
