"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  description?: string;
  tag?: string;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
          >
            {/* Top Bar: Balanced 4-sided spacing with Centered Title */}
            <div className="w-full flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6 border-b border-neutral-800/80 bg-neutral-900/90 backdrop-blur-md">
              {/* Left placeholder for symmetric centering */}
              <div className="w-10 shrink-0" aria-hidden="true" />

              {/* Title with generous spacing on all sides */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center truncate max-w-2xl px-4 flex-1 tracking-tight leading-relaxed">
                {currentItem.title}
              </h3>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage: Certificate with generous margin from edges */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[66vh] sm:max-h-[72vh] bg-neutral-950 flex items-center justify-center p-6 sm:p-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full min-h-[260px] flex items-center justify-center"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous item"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 transition-all hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next item"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 transition-all hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption Bar (Centered, only if subtitle or description exists) */}
            {(currentItem.subtitle || currentItem.description) && (
              <div className="w-full px-6 py-4 border-t border-neutral-800/80 bg-neutral-900/90 text-center">
                {currentItem.subtitle && (
                  <p className="text-xs text-neutral-400 font-medium mb-1">
                    {currentItem.subtitle}
                  </p>
                )}
                {currentItem.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    {currentItem.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
