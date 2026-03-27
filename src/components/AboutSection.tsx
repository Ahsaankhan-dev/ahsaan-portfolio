"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
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
      gsap.fromTo(
        ".about-avatar",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">

        {/* ── Left — Spline Robot ── */}
        <div className="about-avatar opacity-0 relative h-[420px] md:h-[520px]">
          {/* Cyan glow behind robot */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at 50% 60%, rgba(0,255,255,0.08) 0%, transparent 70%)",
            }}
          />
          {splineReady ? (
            <spline-viewer
              url="https://prod.spline.design/Ub2ksGkNrglaxYLi/scene.splinecode"
              style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-xs font-mono" style={{ color: "#555" }}>Loading 3D...</div>
            </div>
          )}
        </div>

        {/* ── Right — Text ── */}
        <div className="about-content opacity-0">
          <h2
            className="text-xs font-bold tracking-[4px] uppercase mb-6"
            style={{ color: "#00FFFF" }}
          >
            ABOUT ME
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#888" }}>
            I&apos;m a passionate developer with{" "}
            <span className="font-bold" style={{ color: "#00FFFF" }}>5+ years</span> of experience
            building web applications that combine clean code with creative design. I specialize in
            creating performant, accessible, and visually stunning digital experiences using modern
            technologies.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#888" }}>
            From concept to deployment, I handle the entire development lifecycle — transforming
            ideas into production-ready applications that users love.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { num: "5+", label: "Years Exp." },
              { num: "30+", label: "Projects" },
              { num: "100%", label: "Commitment" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
                <div className="text-2xl font-black" style={{ color: "#00FFFF" }}>{s.num}</div>
                <div className="text-xs mt-1" style={{ color: "#555" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="w-2 h-2 rounded-full" style={{ background: "#00FFFF" }} />
            <span style={{ color: "#00FFFF" }}>Currently based in Pakistan</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;