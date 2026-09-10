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
            className="carousel-card flex flex-col w-[340px] sm:w-[420px] md:w-[480px] lg:w-[500px] shrink-0 snap-start rounded-[24px] sm:rounded-[28px] overflow-hidden group cursor-pointer bg-white border border-neutral-200/90 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ padding: "clamp(1.15rem, 2vw, 1.45rem)" }}
          >
            {/* Elegant Landscape Project Frame matching Certificates Section */}
            <div
              className="relative w-full aspect-[16/10] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100/90 border border-neutral-200/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center"
              style={{ padding: "clamp(0.75rem, 1.5vw, 1.1rem)" }}
            >
              <div className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden shadow-xs bg-neutral-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 480px, 500px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Top-Right Expand Indicator on Hover */}
              <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="w-8 h-8 rounded-full bg-neutral-950/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </div>

              {/* Top-Left Category & Featured Badges */}
              <div className="absolute top-5 left-5 z-10 pointer-events-none flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-950/75 backdrop-blur-md text-white border border-white/15 shadow-xs">
                  {project.tags[0]}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-neutral-950 shadow-xs">
                    <Star size={10} className="fill-neutral-950" />
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Content Area with Generous Spacing & High Readability */}
            <div
              className="flex flex-col flex-1 justify-between gap-3"
              style={{ paddingTop: "1.15rem", paddingBottom: "0.25rem", paddingLeft: "0.35rem", paddingRight: "0.35rem" }}
            >
              <div>
                <h3 className="text-base sm:text-lg md:text-[1.15rem] font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {project.tagline || project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200/80 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-md">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-neutral-500 group-hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight size={13} />
                </span>
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
