"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Project One",
    desc: "A full-stack web application built with Next.js and Node.js.",
    tags: ["NEXT.JS", "NODE.JS", "POSTGRESQL"],
    year: "2024",
  },
  {
    title: "Project Two",
    desc: "Interactive 3D experience using Three.js and WebGL.",
    tags: ["THREE.JS", "WEBGL", "GSAP"],
    year: "2023",
  },
  {
    title: "Project Three",
    desc: "E-commerce platform with real-time features and payment integration.",
    tags: ["REACT", "STRIPE", "DOCKER"],
    year: "2023",
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-card", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">
          <span style={{ color: "#fff" }}>Selected </span>
          <span className="italic" style={{ color: "#00FFFF" }}>work</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <TiltCard
              key={i}
              className="work-card opacity-0 p-6 rounded-xl"
              style={{ background: "#111", border: "1px solid #1a1a1a" }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs" style={{ color: "#555" }}>{p.year}</span>
                <span style={{ color: "#555" }}>↗</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#fff" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
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

export default WorkSection;
