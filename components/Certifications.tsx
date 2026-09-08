"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, BookOpen, X } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { CERTIFICATIONS, type CertItem } from "@/lib/data";

const typeIcon = {
  award: Trophy,
  scholarship: Star,
  certification: BookOpen,
};

export default function Certifications() {
  const [expanded, setExpanded] = useState<CertItem | null>(null);

  return (
    <section id="certifications" className="w-full bg-neutral-50/60 py-32 md:py-40 flex justify-center">
      <Container className="flex flex-col items-center">
        {/* Centered section header */}
        <SectionWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-caps mb-3">Recognition</p>
            <h2 className="section-heading mb-4 text-neutral-950">
              Certifications &amp; Awards
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Verified credentials, cloud architecture milestones, and competitive hackathon recognitions.
            </p>
          </div>
        </SectionWrapper>

        {/* Centered responsive grid */}
        <SectionWrapper delay={0.1}>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((item, i) => {
              const Icon = typeIcon[item.type];
              return (
                <motion.button
                  key={item.title}
                  onClick={() => setExpanded(item)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: "tween" }}
                  whileHover={{ y: -2 }}
                  className="portfolio-card text-left p-6 flex flex-col justify-between h-full gap-5 cursor-pointer hover:border-neutral-400 group w-full"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-semibold uppercase tracking-wider">
                        <Icon size={12} className="text-neutral-900" />
                        <span>{item.type}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">{item.year}</span>
                    </div>
                    <p className="text-sm font-bold leading-snug text-neutral-950 group-hover:text-neutral-700 transition-colors">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
                    <span>{item.issuer}</span>
                    <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">Details →</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </SectionWrapper>

        {/* Detail modal */}
        <AnimatePresence>
          {expanded && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(null)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-2xl p-7 mx-4"
              >
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 mb-4">
                  {(() => { const Icon = typeIcon[expanded.type]; return <Icon size={12} />; })()}
                  {expanded.type}
                </div>

                <h3 className="text-xl font-bold text-neutral-950 mb-1">{expanded.title}</h3>
                <p className="text-xs font-medium text-neutral-500 mb-4">{expanded.issuer} · {expanded.year}</p>

                {expanded.detail && (
                  <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    {expanded.detail}
                  </p>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
