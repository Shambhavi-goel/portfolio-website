"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowUpRight, UserCheck, Layers, FileText } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
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
            className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 p-2.5 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black backdrop-blur-md border border-neutral-200/90 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Container */}
            <div
              className="overflow-y-auto w-full custom-scrollbar"
              style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {/* 1. Header info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingRight: "3rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.45rem 1.15rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2
                    id="project-modal-title"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                      fontWeight: "800",
                      color: "#09090b",
                      lineHeight: "1.15",
                      letterSpacing: "-0.025em",
                      margin: 0,
                    }}
                  >
                    {project.title}
                  </h2>

                  {project.tagline && (
                    <p
                      style={{
                        fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
                        fontWeight: "500",
                        color: "#4b5563",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {project.tagline}
                    </p>
                  )}
                </div>

                {/* 2. Landscape Image Showcase with Frame (Just like certificates section) */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #e2e8f0",
                    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)",
                    padding: "clamp(0.75rem, 1.5vw, 1.25rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      backgroundColor: "#09090b",
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* 3. Separate Tile: Project Overview */}
                <div
                  style={{
                    borderRadius: "1.25rem",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: "clamp(1.25rem, 2.5vw, 1.85rem)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem" }}>
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "0.65rem",
                        backgroundColor: "#dbeafe",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FileText size={16} strokeWidth={2.2} />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#1e40af",
                        margin: 0,
                      }}
                    >
                      Project Overview
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(0.875rem, 1.2vw, 0.975rem)",
                      color: "#1e293b",
                      lineHeight: "1.75",
                      fontWeight: "400",
                      margin: 0,
                    }}
                  >
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* 4. Separate Tile: My Role & Contributions */}
                <div
                  style={{
                    borderRadius: "1.25rem",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    padding: "clamp(1.25rem, 2.5vw, 1.85rem)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem" }}>
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "0.65rem",
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <UserCheck size={16} strokeWidth={2.2} />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#166534",
                        margin: 0,
                      }}
                    >
                      My Role &amp; Contributions
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(0.875rem, 1.2vw, 0.975rem)",
                      color: "#14532d",
                      lineHeight: "1.75",
                      fontWeight: "400",
                      margin: 0,
                    }}
                  >
                    {project.role ||
                      "Core engineering contribution, architecture design, and feature implementation."}
                  </p>
                </div>

                {/* 5. Separate Tile: Technologies & Architecture */}
                <div
                  style={{
                    borderRadius: "1.25rem",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: "clamp(1.25rem, 2.5vw, 1.85rem)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "0.65rem",
                        backgroundColor: "#f3e8ff",
                        color: "#7e22ce",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Layers size={16} strokeWidth={2.2} />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      Technologies &amp; Architecture
                    </h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.45rem 0.95rem",
                          borderRadius: "0.75rem",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          backgroundColor: "#ffffff",
                          color: "#1e293b",
                          border: "1px solid #cbd5e1",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 6. Action Buttons Tile */}
                <div
                  style={{
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.85rem 1.75rem",
                        borderRadius: "9999px",
                        backgroundColor: "#09090b",
                        color: "#ffffff",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        cursor: "pointer",
                      }}
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
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          padding: "0.85rem 1.75rem",
                          borderRadius: "9999px",
                          backgroundColor: "#ffffff",
                          color: "#09090b",
                          border: "1px solid #d4d4d8",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          textDecoration: "none",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          cursor: "pointer",
                        }}
                      >
                        <ExternalLink size={15} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    style={{
                      padding: "0.65rem 1.25rem",
                      borderRadius: "9999px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#64748b",
                      backgroundColor: "#f1f5f9",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
