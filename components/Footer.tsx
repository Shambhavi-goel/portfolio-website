"use client";

import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { SOCIAL } from "@/lib/data";

export default function BottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#f4f5f8] border-t border-neutral-200/80 flex items-center justify-center px-4 sm:px-8"
      style={{ height: "1.5cm", minHeight: "1.5cm" }}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm">
        {/* Brand / Copyright */}
        <div className="flex items-center gap-2 text-neutral-600 font-medium">
          <span className="font-bold text-neutral-900">Shambhavi Goel</span>
          <span>·</span>
          <span>© {currentYear} All rights reserved</span>
        </div>

        {/* Basic Contact Details Only */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href={`tel:${SOCIAL.phoneHref}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-emerald-600 font-medium transition-colors shadow-2xs hover:shadow-xs"
            aria-label="Call or WhatsApp"
          >
            <Phone size={14} className="text-emerald-600" />
            <span className="hidden md:inline">{SOCIAL.phone}</span>
            <span className="md:hidden">Call</span>
          </a>

          <a
            href={`mailto:${SOCIAL.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-blue-600 font-medium transition-colors shadow-2xs hover:shadow-xs"
            aria-label="Send email"
          >
            <Mail size={14} className="text-blue-600" />
            <span className="hidden md:inline">{SOCIAL.email}</span>
            <span className="md:hidden">Email</span>
          </a>

          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-indigo-600 font-medium transition-colors shadow-2xs hover:shadow-xs"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon width={14} height={14} className="text-indigo-600" />
            <span>LinkedIn</span>
          </a>

          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-950 font-medium transition-colors shadow-2xs hover:shadow-xs"
            aria-label="GitHub profile"
          >
            <GithubIcon width={14} height={14} className="text-neutral-800" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
