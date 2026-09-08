"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import CarouselSection from "@/components/ui/CarouselSection";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/data/gallery";

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = GALLERY_PHOTOS.map((photo) => ({
    id: photo.id,
    title: photo.title,
    image: photo.image,
    subtitle: `${photo.category} · ${photo.date}`,
    description: photo.caption,
    tag: photo.category,
  }));

  return (
    <>
      <CarouselSection
        id="gallery"
        badge="Moments & Community"
        title="Life & Hackathons"
        description="Snapshots from 36-hour hackathons, prototype showcases, scholarship ceremonies, and engineering communities."
      >
        {GALLERY_PHOTOS.map((photo: GalleryPhoto, index: number) => (
          <article
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedPhotoIndex(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View full photo: ${photo.title}`}
            className="carousel-card relative w-[300px] sm:w-[340px] md:w-[360px] h-[450px] shrink-0 snap-start rounded-[28px] overflow-hidden group cursor-pointer border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none"
          >
            {/* Gallery Photo */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 300px, 360px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Subtle Top Gradient for Contrast */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Top Row: Category tag + Top-Right Glass Arrow Button */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10 pointer-events-none">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/15">
                {photo.category}
              </span>

              <span className="w-10 h-10 rounded-full bg-white/25 group-hover:bg-white text-white group-hover:text-neutral-950 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-md transform group-hover:scale-110">
                <ArrowUpRight size={18} strokeWidth={2.2} />
              </span>
            </div>

            {/* Bottom Frosted Gradient Overlay matching reference */}
            <div className="absolute inset-x-0 bottom-0 pt-20 pb-7 px-7 z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end">
              {/* 5 Golden Stars matching reference design */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-blue-200 transition-colors">
                {photo.title}
              </h3>

              {/* Subtitle / Date */}
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {photo.category} · {photo.date}
              </p>

              {/* Caption */}
              <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed pt-2 border-t border-white/10">
                {photo.caption}
              </p>
            </div>
          </article>
        ))}
      </CarouselSection>

      {/* Lightbox for Photos */}
      <Lightbox
        items={lightboxItems}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
      />
    </>
  );
}
