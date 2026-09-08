"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type Project } from "@/lib/data";

interface Props {
  project: Project;
  imageLeft?: boolean;
  index: number;
}

export default function ProjectCard({ project, imageLeft = true, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, type: "tween" }}
      className="portfolio-card overflow-hidden group"
    >
      <div className={`flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

        {/* ── Image panel — ALWAYS aspect-[4/3] ── */}
        <div className="w-full md:w-5/12 flex-shrink-0 bg-neutral-100 border-b md:border-b-0 md:border-r border-neutral-200/60">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={`/projects/${project.slug}.png`}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 500px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Clean monochrome placeholder overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100/90 p-6 text-center">
              <span className="text-4xl font-bold text-neutral-800 mb-1">
                {project.title.charAt(0)}
              </span>
              <span className="text-sm font-semibold text-neutral-900">
                {project.title}
              </span>
              <span className="text-[11px] text-neutral-500 mt-1">
                {project.tags.join(" · ")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="md:w-7/12 p-7 sm:p-9 flex flex-col justify-between gap-6">
          <div>
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                >
                  {tag}
                </span>
              ))}
              {project.featured && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-neutral-900 text-white">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-2.5 tracking-tight group-hover:text-neutral-700 transition-colors">
              {project.title}
            </h3>

            {/* One-liner description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-3">
              {project.description}
            </p>

            {/* Extended context */}
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-3 border-l-2 border-neutral-200">
              {project.longDescription}
            </p>
          </div>

          <div>
            {/* Tech stack chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech) => (
                <span key={tech} className="chip text-xs">
                  {tech}
                </span>
              ))}
            </div>

            {/* GitHub link */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-black link-underline"
            >
              View Repository <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
