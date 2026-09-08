"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { NAV_LINKS, SOCIAL } from "@/lib/data";
import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-lg font-bold text-neutral-950 hover:opacity-80 transition-opacity"
          >
            Shambhavi Goel
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors duration-150 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {[
              { icon: GithubIcon,   href: SOCIAL.github,            label: "GitHub" },
              { icon: LinkedinIcon, href: SOCIAL.linkedin,          label: "LinkedIn" },
              { icon: Mail,         href: `mailto:${SOCIAL.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2 }}
                className="text-neutral-500 hover:text-neutral-950 transition-colors duration-150"
              >
                <Icon width={18} height={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <p>© {year} Shambhavi Goel. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}
