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
            className="fixed inset-0 modal-backdrop"
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
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center bg-neutral-950/95 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
          >
            {/* Top Bar: Title & Close Button */}
            <div className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {currentItem.tag && (
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {currentItem.tag}
                  </span>
                )}
                <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-md">
                  {currentItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline mr-2">
                  {currentIndex + 1} / {items.length}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage: Image with Left & Right Arrows */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[62vh] sm:max-h-[66vh] bg-black/40 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
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
                    className="object-contain"
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
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 transition-all hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next item"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 transition-all hover:scale-110 shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="w-full px-6 py-4 border-t border-neutral-800/80 bg-neutral-900/80 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <p className="text-sm font-bold text-white">{currentItem.title}</p>
                {currentItem.subtitle && (
                  <p className="text-xs text-neutral-400 font-medium">
                    {currentItem.subtitle}
                  </p>
                )}
              </div>
              {currentItem.description && (
                <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl">
                  {currentItem.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
