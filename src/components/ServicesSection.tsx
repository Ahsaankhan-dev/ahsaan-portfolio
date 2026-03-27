"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

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
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    // Reuse script if already loaded
    if (document.querySelector('script[data-spline]')) {
      setSplineReady(true);
    } else {
      const check = setInterval(() => {
        if (document.querySelector('script[data-spline]')) {
          setSplineReady(true);
          clearInterval(check);
        }
      }, 200);
      return () => clearInterval(check);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark parallax
      gsap.fromTo(
        ".service-watermark",
        { scale: 1.2, opacity: 0.03 },
        {
          scale: 1, opacity: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 20%", scrub: 1 },
        }
      );
      // Cards slide in
      gsap.fromTo(
        ".service-card",
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, stagger: 0.2, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      // Watermark text
      gsap.fromTo(
        ".service-what",
        { opacity: 0, x: -50 },
        {
          opacity: 0.07, x: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left — Spline Desk Robot ── */}
        <div className="relative min-h-[480px] flex items-center justify-center">

          {/* "WHAT I DO" watermark */}
          <div
            className="service-what absolute inset-0 flex flex-col justify-center text-[90px] md:text-[140px] font-black leading-none select-none pointer-events-none z-0"
            style={{ color: "#fff", opacity: 0 }}
          >
            <span>WHAT</span>
            <span style={{ color: "#00FFFF" }}>I DO</span>
          </div>

          {/* Spline robot at desk */}
          <div className="relative z-10 w-full h-[420px] md:h-[500px]">
            {splineReady && (
              <spline-viewer
                url="https://prod.spline.design/Ub2ksGkNrglaxYLi/scene.splinecode"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {!splineReady && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-xs font-mono" style={{ color: "#555" }}>Loading 3D...</div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right — Cards ── */}
        <div className="flex flex-col gap-6 relative z-10">
          {SERVICES.map((s, i) => (
            <TiltCard
              key={i}
              className="service-card opacity-0 p-6 rounded-xl"
              style={{ background: "#111", border: "1px solid #1a1a1a" }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold tracking-wider" style={{ color: "#fff" }}>{s.title}</h3>
                  <p className="font-mono text-sm mt-1" style={{ color: "#00FFFF" }}>{s.subtitle}</p>
                </div>
                <span className="text-lg" style={{ color: "#555" }}>↗</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider"
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
    </section>
  );
};

export default ServicesSection;