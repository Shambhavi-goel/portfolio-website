"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import { LeetCodeIcon, GeeksforGeeksIcon, CodeforcesIcon } from "@/components/ui/Icons";
import { type DSAProfile } from "@/data/dsa";

interface DSAModalProps {
  profile: DSAProfile | null;
  onClose: () => void;
}

const platformIcons: Record<string, React.ElementType> = {
  leetcode: LeetCodeIcon,
  geeksforgeeks: GeeksforGeeksIcon,
  codeforces: CodeforcesIcon,
};

const highlightThemes: Record<
  string,
  {
    cardBg: string;
    cardBorder: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
    bulletColor: string;
    textColor: string;
  }
> = {
  leetcode: {
    cardBg: "#fffbeb",
    cardBorder: "#fde68a",
    iconBg: "#fef3c7",
    iconColor: "#b45309",
    titleColor: "#92400e",
    bulletColor: "#d97706",
    textColor: "#1f2937",
  },
  geeksforgeeks: {
    cardBg: "#f0fdf4",
    cardBorder: "#bbf7d0",
    iconBg: "#dcfce7",
    iconColor: "#15803d",
    titleColor: "#166534",
    bulletColor: "#16a34a",
    textColor: "#1f2937",
  },
  codeforces: {
    cardBg: "#eff6ff",
    cardBorder: "#bfdbfe",
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
    titleColor: "#1e40af",
    bulletColor: "#2563eb",
    textColor: "#1f2937",
  },
};

export default function DSAModal({ profile, onClose }: DSAModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key & manage body scroll lock
  useEffect(() => {
    if (!profile) return;

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
  }, [profile, onClose]);

  if (!profile) return null;

  const IconComponent = platformIcons[profile.id] ?? Code2;
  const hTheme = highlightThemes[profile.id] ?? highlightThemes.geeksforgeeks;

  return (
    <AnimatePresence>
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
          aria-labelledby="dsa-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close profile details"
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
              {/* 1. Header info with generous badge spacing matching ProjectModal and AcademicTimeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingRight: "3rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    className={`inline-flex items-center justify-center rounded-full text-xs font-bold border ${profile.badgeColor} shadow-2xs`}
                    style={{
                      padding: "0.5rem 1.25rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {profile.badge}
                  </span>
                  <span
                    className="inline-flex items-center justify-center rounded-full text-xs font-mono font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200/90 shadow-2xs"
                    style={{
                      padding: "0.5rem 1.25rem",
                      lineHeight: "1.4",
                    }}
                  >
                    @{profile.handle}
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${profile.accentBg} flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2
                      id="dsa-modal-title"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                        fontWeight: "800",
                        color: "#09090b",
                        lineHeight: "1.15",
                        letterSpacing: "-0.025em",
                        margin: 0,
                      }}
                    >
                      {profile.name}
                    </h2>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
                    fontWeight: "500",
                    color: "#4b5563",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {profile.tagline}
                </p>
              </div>

              {/* 2. Landscape Profile Showcase Screenshot Frame (Matching ProjectModal & Certificates) */}
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
                    src={profile.image}
                    alt={`${profile.name} profile screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* 3. Verified Metrics Grid with generous padding */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {profile.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{ padding: "1.25rem 1.5rem" }}
                    className="rounded-2xl bg-neutral-50/90 border border-neutral-200/90 flex flex-col justify-center gap-1.5 shadow-2xs"
                  >
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{metric.label}</span>
                    <span className="text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* 4. Section: Profile Overview & Focus */}
              <div
                style={{
                  borderRadius: "1.25rem",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "clamp(1.35rem, 2.8vw, 2rem)",
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
                    <Sparkles size={16} strokeWidth={2.2} />
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
                    Profile Overview &amp; Algorithmic Approach
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
                  {profile.longDescription || profile.description}
                </p>
              </div>

              {/* 5. Section: Key Highlights & Methodologies */}
              {profile.highlights && profile.highlights.length > 0 && (
                <div
                  style={{
                    borderRadius: "1.25rem",
                    backgroundColor: hTheme.cardBg,
                    border: `1px solid ${hTheme.cardBorder}`,
                    padding: "clamp(1.35rem, 2.8vw, 2rem)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "0.65rem",
                        backgroundColor: hTheme.iconBg,
                        color: hTheme.iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircle2 size={16} strokeWidth={2.2} />
                    </div>
                    <h3
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: hTheme.titleColor,
                        margin: 0,
                      }}
                    >
                      Key Highlights &amp; Practice Patterns
                    </h3>
                  </div>
                  <ul className="space-y-3 m-0 p-0 list-none">
                    {profile.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                        style={{
                          fontSize: "clamp(0.875rem, 1.2vw, 0.95rem)",
                          lineHeight: "1.65",
                          color: hTheme.textColor,
                        }}
                      >
                        {/* Bullet container precisely matched to first line height (1.65em) for perfect vertical center alignment */}
                        <span
                          style={{
                            width: "0.85rem",
                            height: "1.65em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "9999px",
                              backgroundColor: hTheme.bulletColor,
                              display: "block",
                            }}
                          />
                        </span>
                        <span style={{ flex: 1 }}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 6. Section: Core Algorithmic Topics Covered */}
              <div
                style={{
                  borderRadius: "1.25rem",
                  backgroundColor: "#fafafa",
                  border: "1px solid #e5e5e5",
                  padding: "clamp(1.35rem, 2.8vw, 2rem)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.65rem",
                      backgroundColor: "#f3f4f6",
                      color: "#4b5563",
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
                      color: "#374151",
                      margin: 0,
                    }}
                  >
                    Core Algorithmic Topics Practiced
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {profile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs font-semibold text-neutral-700 bg-white border border-neutral-200/90 rounded-lg shadow-2xs"
                      style={{
                        padding: "0.45rem 1rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 7. Action Footer: View Profile & Close */}
              <div className="pt-3 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={profile.url}
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
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  className="hover:bg-neutral-800 hover:scale-[1.02]"
                >
                  <ExternalLink size={15} />
                  <span>View on {profile.name}</span>
                  <ArrowUpRight size={14} />
                </a>

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
                  className="hover:bg-neutral-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
