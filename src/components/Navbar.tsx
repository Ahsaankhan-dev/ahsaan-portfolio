"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = ["work", "services", "about", "contact"];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 });
    tl.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
    tl.fromTo(".nav-item", { opacity: 0, y: -10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, "-=0.3");

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    setTimeout(() => sections.forEach((s) => obs.observe(s)), 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-[9999] transition-all duration-500 ${scrolled ? "backdrop-blur-xl" : ""}`}
      style={{ background: scrolled ? "rgba(8,8,8,0.9)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="text-lg font-bold tracking-wide glitch-hover" style={{ color: "#fff" }}>
          M.AHSAAN
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`nav-item text-xs font-medium tracking-[2px] uppercase transition-colors duration-300 ${
                activeSection === item ? "text-site-cyan" : "text-site-muted hover:text-site-text"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full blink-green" style={{ background: "#22c55e" }} />
          <span style={{ color: "#888" }}>Available for work</span>
        </div>

        <button className="md:hidden text-site-text" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 8h18" />
                <path d="M3 16h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(8,8,8,0.95)" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm tracking-[2px] uppercase text-left"
              style={{ color: activeSection === item ? "#00FFFF" : "#888" }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
