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
    fileUrl: cert.fileUrl,
    issuer: cert.issuer,
    year: cert.year,
    tag: cert.issuer || "Verified Credential",
    subtitle: cert.issuer ? `Issued by ${cert.issuer}${cert.year ? ` · ${cert.year}` : ""}` : undefined,
    description: cert.detail,
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
            className="carousel-card flex flex-col w-[340px] sm:w-[420px] md:w-[480px] lg:w-[500px] shrink-0 snap-start rounded-[24px] sm:rounded-[28px] overflow-hidden group cursor-pointer bg-white border border-neutral-200/90 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ padding: "clamp(1.15rem, 2vw, 1.45rem)" }}
          >
            {/* Elegant Landscape Certificate Frame */}
            <div
              className="relative w-full aspect-[16/10] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100/90 border border-neutral-200/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center"
              style={{ padding: "clamp(0.75rem, 1.5vw, 1.1rem)" }}
            >
              <div className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden shadow-xs bg-white flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 480px, 500px"
                  className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Top-Right Expand Indicator on Hover */}
              <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="w-8 h-8 rounded-full bg-neutral-950/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </div>
            </div>

            {/* Content Area with Generous Spacing & High Readability */}
            <div
              className="flex flex-col flex-1 justify-between gap-3"
              style={{ paddingTop: "1.15rem", paddingBottom: "0.25rem", paddingLeft: "0.35rem", paddingRight: "0.35rem" }}
            >
              <div>
                <h3 className="text-base sm:text-lg md:text-[1.15rem] font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                {cert.issuer && (
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 line-clamp-1 leading-relaxed font-normal">
                    Issued by {cert.issuer}{cert.year ? ` · ${cert.year}` : ""}
                  </p>
                )}
              </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  {cert.issuer ? (
                    <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-md truncate max-w-[220px]">
                      {cert.issuer}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                      Verified Credential
                    </span>
                  )}

                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-blue-600 inline-flex items-center gap-1 transition-colors shrink-0">
                    <span>View Certificate</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
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
