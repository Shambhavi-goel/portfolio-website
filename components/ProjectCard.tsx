"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
      className="group relative h-[360px] sm:h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer border border-neutral-800/40 shadow-card hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
    >
      {/* ── Full-Bleed Background Screenshot ── */}
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
      />

      {/* ── Dark Gradient Overlay for optimal contrast ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

      {/* ── Subtle Top Badges ── */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/50 text-white/90 backdrop-blur-md border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.featured && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-neutral-950 shadow-sm">
            <Sparkles size={11} className="text-neutral-950" />
            Featured
          </span>
        )}
      </div>

      {/* ── Bottom Overlay Content ── */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 line-clamp-2 leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* ── Hover "View Details →" Hint ── */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white transition-all duration-300">
          <span className="text-[11px] text-neutral-400 font-normal">
            {project.techStack.slice(0, 3).join(" · ")}
          </span>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform duration-200">
            <span>View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
