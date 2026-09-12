"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "DSA", href: "#dsa" },
  { label: "GitHub", href: "#github" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const SECTIONS = [
  "hero",
  "about",
  "academics",
  "skills",
  "projects",
  "dsa",
  "github",
  "certificates",
  "contact",
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      // 1. Top of page
      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      // 2. Near bottom of page (within 100px of the end)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
      if (scrollHeight - scrollPos < 100) {
        setActiveSection("contact");
        return;
      }

      // 3. Focal probe line at 40% of viewport height (just below 2cm top navbar)
      const probeY = window.innerHeight * 0.4;

      for (let i = 0; i < SECTIONS.length; i++) {
        const id = SECTIONS[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom > probeY) {
            setActiveSection(id);
            return;
          }
        }
      }

      // 4. Fallback: select section whose top is closest to probe line
      let closestId = "hero";
      let minDistance = Infinity;

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - probeY);
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }
      }

      setActiveSection(closestId);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);

    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const topOffset = 76; // clearance for the 2cm top navbar
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Navbar: 2cm breadth, fixed, buttons 100% centered in the middle */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs flex items-center justify-center px-4 sm:px-8"
        style={{ height: "1.5cm", minHeight: "1.5cm" }}
      >
        <div className="w-full flex items-center justify-center h-full relative">
          {/* Desktop Navigation Links — 100% Centered in the middle */}
          <nav className="hidden md:flex items-center justify-center gap-6 sm:gap-7 lg:gap-8 h-full">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isTarget =
                item.href === "#hero"
                  ? activeSection === "hero" || activeSection === ""
                  : activeSection === sectionId;

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-xs sm:text-[13px] tracking-wide transition-all duration-150 relative font-medium cursor-pointer h-full flex items-center px-1 ${isTarget
                      ? "text-[#4338CA] font-bold"
                      : "text-neutral-600 hover:text-neutral-950"
                    }`}
                >
                  {item.label}
                  {isTarget && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1.5 left-0 right-0 h-[2.5px] bg-[#4338CA] rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile View Toggle */}
          <div className="flex items-center justify-between w-full md:hidden h-full">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Portfolio
            </span>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 rounded-lg text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-64 z-50 bg-white border-l border-neutral-200 pt-16 px-6 shadow-2xl"
            >
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-neutral-700 hover:text-[#4338CA] hover:bg-blue-50 font-semibold text-sm transition-colors"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
