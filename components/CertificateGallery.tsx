"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import CarouselSection from "@/components/ui/CarouselSection";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import { CERTIFICATES, type CertificateItem } from "@/data/certificates";

export default function CertificateGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = CERTIFICATES.map((cert) => ({
    id: cert.id,
    title: cert.title,
    image: cert.image,
  }));

  return (
    <>
      <CarouselSection
        id="certificates"
        badge="Credentials"
        title="Certificates & Honors"
        description="Verified academic scholarships, hackathon achievements, and technical certifications."
      >
        {CERTIFICATES.map((cert: CertificateItem, index: number) => (
          <article
            key={cert.id}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View certificate: ${cert.title}`}
            className="carousel-card flex flex-col w-[340px] sm:w-[420px] md:w-[480px] lg:w-[500px] shrink-0 snap-start rounded-[24px] sm:rounded-[28px] overflow-hidden group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-md hover:shadow-2xl hover:border-blue-400/40 dark:hover:border-blue-500/40 transition-all duration-300 select-none p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {/* Elegant Certificate Frame with Generous Spacing between Certificate and Frame */}
            <div className="relative w-full aspect-[16/11] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100/90 dark:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center p-4 sm:p-5 md:p-6">
              {/* Inner Certificate Mount with Soft Drop Shadow */}
              <div className="relative w-full h-full rounded-[8px] overflow-hidden shadow-xs flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 500px"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Subtle Expand Indicator on Hover */}
              <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </div>
            </div>

            {/* Centered Certificate Title with Generous 4-Sided Spacing from Frame and Boundaries */}
            <div className="pt-5 sm:pt-6 pb-3 sm:pb-4 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-sm sm:text-base md:text-[1.05rem] font-bold text-neutral-900 dark:text-white tracking-tight leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center w-full line-clamp-2">
                {cert.title}
              </h3>
            </div>
          </article>
        ))}
      </CarouselSection>

      {/* Lightbox for viewing certificate */}
      <Lightbox
        items={lightboxItems}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(index) => setSelectedIndex(index)}
      />
    </>
  );
}
