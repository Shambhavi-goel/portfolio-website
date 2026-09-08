"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface CarouselSectionProps {
  id: string;
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function CarouselSection({
  id,
  badge,
  title,
  description,
  children,
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scroll = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardEl = el.querySelector<HTMLElement>(".carousel-card");
    const step = cardEl ? cardEl.offsetWidth + 32 : el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden scroll-mt-20">
      <Container>
        {/* Same centered wrapper as About, Academic, and Skills */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-12 sm:gap-14">

          {/* Header Row: Left Title/Paragraph + Right Nav Buttons */}
          <SectionWrapper>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[2px] bg-blue-600" />
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    {badge}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                  {title}
                </h2>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              {/* Forward and Back Nav Buttons on Top Right */}
              <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
                <button
                  type="button"
                  onClick={() => scroll("prev")}
                  disabled={!canPrev}
                  aria-label="Previous slide"
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    canPrev
                      ? "border-neutral-300 text-neutral-800 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white shadow-xs cursor-pointer active:scale-95"
                      : "border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("next")}
                  disabled={!canNext}
                  aria-label="Next slide"
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    canNext
                      ? "border-neutral-300 text-neutral-800 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white shadow-xs cursor-pointer active:scale-95"
                      : "border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </SectionWrapper>

          {/* Carousel Track with Generous Spacing between Tiles matching Skills & Academic grids */}
          <div
            ref={trackRef}
            className="w-full flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-6 -mb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {children}
            {/* Spacer so trailing card has breathing space */}
            <div className="shrink-0 w-4" aria-hidden="true" />
          </div>

        </div>
      </Container>
    </section>
  );
}
