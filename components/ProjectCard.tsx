"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.08, type: "tween" }}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group flex flex-col w-full rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer bg-white border border-neutral-200/90 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 select-none p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Landscape Image Frame */}
      <div className="relative w-full aspect-[16/10] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100/90 border border-neutral-200/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden shadow-xs bg-neutral-900">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-5 left-5 z-10 pointer-events-none flex items-center gap-2">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-neutral-950/75 backdrop-blur-md text-white border border-white/15 shadow-xs">
            {project.tags[0]}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-4 sm:pt-5 pb-1 px-1 sm:px-2 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg md:text-[1.15rem] font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {project.tagline || project.description}
          </p>
        </div>

        <div className="mt-2 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200/80 px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200">
            <span>View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
