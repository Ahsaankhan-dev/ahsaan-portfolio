"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STACK = [
  { name: "React.js", level: 95 },
  { name: "Next.js", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Three.js", level: 78 },
  { name: "GSAP", level: 82 },
  { name: "PostgreSQL", level: 80 },
  { name: "Docker", level: 75 },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tech-item", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.fromTo(".tech-bar-fill", { width: "0%" }, {
        width: (i, el) => el.getAttribute("data-width") + "%",
        duration: 1, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stack" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          <span style={{ color: "#fff" }}>Tech </span>
          <span className="italic" style={{ color: "#00FFFF" }}>stack</span>
        </h2>
        <div className="flex flex-col gap-6">
          {STACK.map((tech, i) => (
            <div key={i} className="tech-item opacity-0">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: "#fff" }}>{tech.name}</span>
                <span className="font-mono text-xs" style={{ color: "#00FFFF" }}>{tech.level}%</span>
              </div>
              <div className="h-[2px] w-full rounded-full" style={{ background: "#1a1a1a" }}>
                <div
                  className="tech-bar-fill h-full rounded-full"
                  data-width={tech.level}
                  style={{ background: "#00FFFF", width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
