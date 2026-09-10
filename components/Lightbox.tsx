"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, FileText, ShieldCheck } from "lucide-react";

export interface LightboxItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  fileUrl?: string;
  issuer?: string;
  year?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Window matching ProjectModal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 p-2.5 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black backdrop-blur-md border border-neutral-200/90 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Container */}
            <div
              className="overflow-y-auto w-full custom-scrollbar"
              style={{ padding: "clamp(1.25rem, 2.5vw, 2rem)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                {/* 1. Header Information & Badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", paddingRight: "3rem" }}>
                  {(currentItem.tag || currentItem.year) && (
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                      {currentItem.tag && (
                        <span
                          style={{
                            padding: "0.45rem 1.15rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            backgroundColor: "#f8fafc",
                            color: "#334155",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {currentItem.tag}
                        </span>
                      )}

                      {currentItem.year && (
                        <span
                          style={{
                            padding: "0.45rem 1.15rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            backgroundColor: "#f1f5f9",
                            color: "#64748b",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {currentItem.year}
                        </span>
                      )}
                    </div>
                  )}

                  <h2
                    style={{
                      fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)",
                      fontWeight: "800",
                      color: "#09090b",
                      lineHeight: "1.2",
                      letterSpacing: "-0.025em",
                      margin: 0,
                    }}
                  >
                    {currentItem.title}
                  </h2>

                  {currentItem.subtitle && (
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                        fontWeight: "500",
                        color: "#4b5563",
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      {currentItem.subtitle}
                    </p>
                  )}
                </div>

                {/* 2. Landscape Certificate Showcase with Dedicated Museum Mount */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10.5",
                    maxHeight: "56vh",
                    minHeight: "260px",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #e2e8f0",
                    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)",
                    padding: "clamp(0.65rem, 1.25vw, 1rem)",
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
                      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={currentItem.image}
                          alt={currentItem.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 960px"
                          className="object-contain p-1 sm:p-2 select-none"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows */}
                  {items.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        aria-label="Previous credential"
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black backdrop-blur-md border border-neutral-200/90 shadow-md hover:shadow-xl transition-all hover:scale-110 cursor-pointer flex items-center justify-center z-20"
                      >
                        <ChevronLeft size={22} strokeWidth={2.2} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        aria-label="Next credential"
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-black backdrop-blur-md border border-neutral-200/90 shadow-md hover:shadow-xl transition-all hover:scale-110 cursor-pointer flex items-center justify-center z-20"
                      >
                        <ChevronRight size={22} strokeWidth={2.2} />
                      </button>
                    </>
                  )}
                </div>

                {/* 3. Credential Details Tile (if description exists) */}
                {currentItem.description && (
                  <div
                    style={{
                      borderRadius: "1rem",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      padding: "clamp(1rem, 2vw, 1.35rem)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.5rem" }}>
                      <div
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "#dbeafe",
                          color: "#1d4ed8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={14} strokeWidth={2.2} />
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
                        Credential Information
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.2vw, 0.925rem)",
                        color: "#1e293b",
                        lineHeight: "1.65",
                        margin: 0,
                      }}
                    >
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {/* 4. Action & Navigation Footer */}
                <div
                  style={{
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.85rem",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
                    {currentItem.fileUrl && (
                      <a
                        href={currentItem.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.55rem",
                          padding: "0.65rem 1.35rem",
                          borderRadius: "9999px",
                          backgroundColor: "#09090b",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          textDecoration: "none",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        }}
                      >
                        <ShieldCheck size={16} />
                        <span>View Original Document</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    style={{
                      padding: "0.6rem 1.25rem",
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
