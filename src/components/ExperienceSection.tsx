"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    year: "2024",
    role: "Full Stack Developer",
    company: "Freelance / Contract",
    desc: "Building complete web applications using React.js, Next.js, and Node.js. Creating interactive 3D experiences with Three.js and GSAP.",
    side: "left",
  },
  {
    year: "2023",
    role: "Senior Frontend Developer",
    company: "Creative Agency",
    desc: "Led development teams on large-scale web platforms. Developed multiple modules using React.js and migrated critical functionalities to microservices.",
    side: "right",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "Startup",
    desc: "Built complete web applications from scratch using React.js, integrating third-party APIs and optimizing performance.",
    side: "left",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 40%", scrub: 1 },
        });
      }
      gsap.fromTo(".exp-entry", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.3, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          <span style={{ color: "#fff" }}>My career &amp; </span>
          <span className="italic" style={{ color: "#00FFFF" }}>experience</span>
        </h2>
        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-px h-full origin-top"
            style={{ background: "#1a1a1a" }}
          />
          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className={`exp-entry opacity-0 flex items-start gap-8 ${exp.side === "right" ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                <div className="flex-1">
                  <div className="p-6 rounded-xl" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
                    <span className="text-xs font-mono" style={{ color: "#888" }}>{exp.year}</span>
                    <h3 className="text-lg font-bold mt-1" style={{ color: "#fff" }}>{exp.role}</h3>
                    <p className="font-mono text-sm mt-1" style={{ color: "#00FFFF" }}>{exp.company}</p>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "#888" }}>{exp.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#00FFFF", boxShadow: "0 0 12px rgba(0,255,255,0.5)" }}
                  />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
