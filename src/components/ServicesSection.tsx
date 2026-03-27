"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";
import SafeSpline from "./SafeSpline";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "FRONTEND",
    subtitle: "Building Interactive Experiences",
    desc: "Crafting pixel-perfect, performant user interfaces with modern frameworks and creative animations.",
    tags: ["REACT.JS", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "GSAP", "TAILWIND"],
  },
  {
    title: "BACKEND",
    subtitle: "Scalable Server Architecture",
    desc: "Designing robust APIs and microservices that handle millions of requests with elegance.",
    tags: ["NODE.JS", "POSTGRESQL", "REST", "GRAPHQL", "DOCKER", "AWS"],
  },
  {
    title: "CREATIVE TECH",
    subtitle: "Pushing Browser Limits",
    desc: "Experimenting with WebGL, shaders, and creative coding to build immersive digital experiences.",
    tags: ["WEBGL", "CANVAS", "THREE.JS", "GSAP", "SHADERS", "CREATIVE"],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".service-what",
        { opacity: 0, x: -50 },
        {
          opacity: 0.07,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT — Spline: Hidden on mobile, visible on desktop */}
          {!isMobile && (
            <div className="relative min-h-[300px] md:min-h-[480px] hidden md:flex items-center justify-center order-2 md:order-1">
              <div
                className="service-what absolute inset-0 flex flex-col justify-center text-[80px] md:text-[140px] font-black leading-none select-none pointer-events-none z-0"
                style={{ color: "#fff", opacity: 0 }}
              >
                <span>WHAT</span>
                <span style={{ color: "#00FFFF" }}>I DO</span>
              </div>
              <div
                className="relative z-10 w-full h-[420px] md:h-[500px]"
                style={{
                  filter:
                    "hue-rotate(180deg) saturate(2) brightness(1.15) drop-shadow(0 0 32px rgba(0,255,255,0.35))",
                }}
              >
                <SafeSpline scene="https://prod.spline.design/tz1kyK0fNLIQojVA/scene.splinecode" />
              </div>
            </div>
          )}

          {/* RIGHT — Cards */}
          <div className="flex flex-col gap-4 sm:gap-6 relative z-10 order-1 md:order-2">
            <h2
              className="text-xs font-bold tracking-[4px] uppercase mb-2 md:hidden"
              style={{ color: "#00FFFF" }}
            >
              WHAT I DO
            </h2>

            {SERVICES.map((s, i) => (
              <TiltCard
                key={i}
                className="service-card opacity-0 p-4 sm:p-6 rounded-xl"
                style={{ background: "#111", border: "1px solid #1a1a1a" }}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div>
                    <h3
                      className="text-base sm:text-lg font-bold tracking-wider"
                      style={{ color: "#fff" }}
                    >
                      {s.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm mt-1" style={{ color: "#00FFFF" }}>
                      {s.subtitle}
                    </p>
                  </div>
                  <span className="text-base sm:text-lg" style={{ color: "#555" }}>
                    ↗
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                  style={{ color: "#888" }}
                >
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wider"
                      style={{ background: "#1a1a1a", color: "#888" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;