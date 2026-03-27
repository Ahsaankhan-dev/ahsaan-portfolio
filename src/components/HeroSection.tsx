"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

// Tell TypeScript about the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url: string },
        HTMLElement
      >;
    }
  }
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ahsaanText, setAhsaanText] = useState("AHSAAN");
  const [subtitle, setSubtitle] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [splineReady, setSplineReady] = useState(false);

  // Load Spline script once
  useEffect(() => {
    if (document.querySelector('script[data-spline]')) {
      setSplineReady(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.72/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");
    script.onload = () => setSplineReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    tl.fromTo(".hero-badge", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(".hero-hello", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.2");
    tl.fromTo(".hero-m", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" });

    tl.add(() => {
      const target = "AHSAAN";
      let iteration = 0;
      const interval = setInterval(() => {
        setAhsaanText(
          target.split("").map((c, i) =>
            i < iteration ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          ).join("")
        );
        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.15;
      }, 30);
    });

    tl.fromTo(".hero-subtitle-wrap", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.5");

    tl.add(() => {
      const text = "A Full Stack DEVELOPER & ENGINEER";
      let i = 0;
      setShowCursor(true);
      const interval = setInterval(() => {
        setSubtitle(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
    }, "+=0.2");

    tl.fromTo(".hero-buttons", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "+=0.3");
    tl.fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");

    // Parallax
    gsap.to(".hero-m", {
      x: -40,
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".hero-ahsaan", {
      x: 40,
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden">

      {/* ── Spline 3D Robot — fills entire right half ── */}
      <div className="absolute inset-0 w-full h-full">
        {splineReady && (
          <spline-viewer
            url="https://prod.spline.design/Ub2ksGkNrglaxYLi/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
        {/* Dark gradient overlay so left text stays readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.2) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Left content ── */}
      <div className="relative z-10 flex items-center min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-lg">
            {/* Badge */}
            <div
              className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 opacity-0"
              style={{ border: "1px solid #1a1a1a", color: "#888" }}
            >
              <span className="w-2 h-2 rounded-full blink-green" style={{ background: "#22c55e" }} />
              AVAILABLE FOR WORK
            </div>

            {/* Hello */}
            <div className="hero-hello text-lg mb-2 opacity-0" style={{ color: "#00FFFF" }}>
              Hello! I&apos;m
            </div>

            {/* M */}
            <h1
              className="hero-m text-[80px] md:text-[120px] font-black leading-none opacity-0"
              style={{ color: "#fff" }}
            >
              M
            </h1>

            {/* AHSAAN */}
            <h1
              className="hero-ahsaan text-[80px] md:text-[120px] font-black leading-none text-glow-cyan"
              style={{ color: "#00FFFF" }}
            >
              {ahsaanText}
            </h1>

            {/* Subtitle */}
            <div className="hero-subtitle-wrap mt-4 text-lg md:text-xl opacity-0">
              <span className={showCursor ? "typing-cursor" : ""}>
                {subtitle.split(/(\bDEVELOPER\b|\bENGINEER\b|&)/).map((part, i) =>
                  part === "DEVELOPER" || part === "ENGINEER" ? (
                    <span key={i} className="font-bold" style={{ color: "#fff" }}>{part}</span>
                  ) : part === "&" ? (
                    <span key={i} style={{ color: "#00FFFF" }}> {part} </span>
                  ) : (
                    <span key={i} style={{ color: "#888" }}>{part}</span>
                  )
                )}
              </span>
            </div>

            {/* Buttons */}
            <div className="hero-buttons flex gap-4 mt-8 opacity-0">
              <a
                href="#work"
                className="magnetic-btn px-6 py-3 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-site-cyan hover:text-black"
                style={{ border: "1px solid #1a1a1a", color: "#fff" }}
              >
                VIEW WORK ↓
              </a>
              <a
                href="#contact"
                className="magnetic-btn px-6 py-3 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:opacity-90"
                style={{ background: "#00FFFF", color: "#080808" }}
              >
                RESUME →
              </a>
            </div>

            <div className="mt-12 text-xs" style={{ color: "#555" }}>© 2026</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10">
        <span className="text-xs tracking-widest" style={{ color: "#555" }}>Scroll to explore</span>
        <svg
          className="w-5 h-5 animate-scroll-bounce"
          fill="none"
          stroke="#00FFFF"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;