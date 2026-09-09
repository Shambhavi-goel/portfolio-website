"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import CarouselSection from "@/components/ui/CarouselSection";
import ProjectModal from "@/components/ProjectModal";
import { PROJECTS, type Project } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <CarouselSection
        id="projects"
        badge="Portfolio"
        title="Projects"
        description="End-to-end applications built for real-world utility across AI/ML, web, mobile, and blockchain systems."
      >
        {PROJECTS.map((project: Project) => (
          <article
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View project details: ${project.title}`}
            className="carousel-card relative w-[300px] sm:w-[340px] md:w-[360px] h-[450px] shrink-0 snap-start rounded-[28px] overflow-hidden group cursor-pointer border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 300px, 360px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Subtle Top Gradient for Contrast */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Top Row: Category tag + Top-Right Glass Arrow Button */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10 pointer-events-none">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/15">
                {project.tags[0]}
              </span>

              <span className="w-10 h-10 rounded-full bg-white/25 group-hover:bg-white text-white group-hover:text-neutral-950 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-md transform group-hover:scale-110">
                <ArrowUpRight size={18} strokeWidth={2.2} />
              </span>
            </div>

            {/* Bottom Frosted Gradient Overlay matching reference */}
            <div className="absolute inset-x-0 bottom-0 pt-24 pb-8 px-8 sm:pb-9 sm:px-9 z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end">
              {/* 5 Orange Stars from reference design */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-blue-200 transition-colors">
                {project.title}
              </h3>

              {/* Subtitle / Tagline */}
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] sm:text-[11px] font-medium text-neutral-300 bg-white/10 px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded-md">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </CarouselSection>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
