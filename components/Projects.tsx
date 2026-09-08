"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS, type ProjectTag } from "@/lib/data";

const ALL_TAGS: ("All" | ProjectTag)[] = ["All", "Mobile", "Web", "AI/ML", "Blockchain"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectTag>("All");
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="w-full bg-white py-32 md:py-40 flex justify-center">
      <Container className="flex flex-col items-center">
        {/* Centered section header */}
        <SectionWrapper>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="label-caps mb-3">Portfolio</p>
            <h2 className="section-heading mb-4 text-neutral-950">
              Selected Projects
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              End-to-end applications built for real-world utility across AI/ML, web, mobile, and blockchain systems.
            </p>
          </div>
        </SectionWrapper>

        {/* Centered filter tabs */}
        <SectionWrapper delay={0.1}>
          <div className="w-full flex flex-wrap justify-center gap-2 mb-14">
            {ALL_TAGS.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                  activeFilter === tag
                    ? "bg-neutral-950 text-white border-neutral-950"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </SectionWrapper>

        {/* Centered projects list */}
        <div className="w-full max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="flex flex-col gap-8 md:gap-10">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} imageLeft={i % 2 === 0} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
