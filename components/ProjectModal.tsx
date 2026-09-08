"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowUpRight, UserCheck, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { type Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key & manage body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 modal-backdrop"
            aria-hidden="true"
          />

          {/* Dialog Window */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-950 backdrop-blur-md border border-neutral-200 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto w-full custom-scrollbar">
              {/* Banner/Hero Image: Full image visible, not cropped */}
              <div className="relative w-full bg-neutral-900 aspect-[16/9] border-b border-neutral-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Header info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.featured && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-neutral-950 text-white">
                        Featured Project
                      </span>
                    )}
                  </div>

                  <h2
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight"
                  >
                    {project.title}
                  </h2>

                  {project.tagline && (
                    <p className="text-sm sm:text-base font-medium text-neutral-500 mt-1">
                      {project.tagline}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Project Overview
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* My Role */}
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2 flex items-center gap-2">
                    <UserCheck size={15} className="text-neutral-900" />
                    My Role &amp; Contributions
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {project.role ||
                      "Core engineering contribution, architecture design, and feature implementation."}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                    <Layers size={13} />
                    Technologies &amp; Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-white text-neutral-800 border border-neutral-200 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <GithubIcon width={16} height={16} />
                    <span>View on GitHub</span>
                    <ArrowUpRight size={15} />
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <ExternalLink size={15} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
