"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SafeSpline from "./SafeSpline";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

// ── Lightweight CSS fallback shown on mobile instead of the heavy Spline scene
const MobileAvatarFallback = () => (
  <div
    className="w-full h-full flex items-center justify-center relative"
    style={{ minHeight: 260 }}
  >
    {/* Outer glow ring */}
    <div
      style={{
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: "50%",
        border: "1px solid rgba(0,255,255,0.15)",
        animation: "spin-slow 8s linear infinite",
      }}
    />
    {/* Inner ring */}
    <div
      style={{
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: "50%",
        border: "1px solid rgba(0,255,255,0.25)",
        animation: "spin-slow 5s linear infinite reverse",
      }}
    />
    {/* Core glow circle */}
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0,255,255,0.25) 0%, rgba(0,255,255,0.05) 60%, transparent 100%)",
        border: "1px solid rgba(0,255,255,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        animation: "pulse-avatar 3s ease-in-out infinite",
      }}
    >
      🤖
    </div>
    <style jsx>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-avatar {
        0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
        50% { box-shadow: 0 0 40px rgba(0,255,255,0.6); }
      }
    `}</style>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-avatar",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* LEFT — 3D Robot: Spline on desktop, lightweight CSS fallback on mobile */}
          <div className="about-avatar opacity-0 relative h-[300px] sm:h-[400px] md:h-[520px]">
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, rgba(0,255,255,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 1,
                filter:
                  "hue-rotate(180deg) saturate(2) brightness(1.15) drop-shadow(0 0 32px rgba(0,255,255,0.35))",
              }}
            >
              {isMobile ? (
                // CSS fallback — zero extra JS/network cost on mobile
                <MobileAvatarFallback />
              ) : (
                <SafeSpline scene="https://prod.spline.design/tz1kyK0fNLIQojVA/scene.splinecode" />
              )}
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="about-content opacity-0 text-center md:text-left">
            <h2
              className="text-xs font-bold tracking-[4px] uppercase mb-4 sm:mb-6"
              style={{ color: "#00FFFF" }}
            >
              ABOUT ME
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6"
              style={{ color: "#888" }}
            >
              I&apos;m a passionate developer with{" "}
              <span className="font-bold" style={{ color: "#00FFFF" }}>
                5+ years
              </span>{" "}
              of experience building web applications that combine clean code with creative design.
              I specialize in creating performant, accessible, and visually stunning digital
              experiences using modern technologies.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6"
              style={{ color: "#888" }}
            >
              From concept to deployment, I handle the entire development lifecycle — transforming
              ideas into production-ready applications that users love.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {[
                { num: "5+", label: "Years Exp." },
                { num: "30+", label: "Projects" },
                { num: "100%", label: "Commitment" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center p-3 sm:p-4 rounded-xl"
                  style={{ background: "#111", border: "1px solid #1a1a1a" }}
                >
                  <div className="text-xl sm:text-2xl font-black" style={{ color: "#00FFFF" }}>
                    {s.num}
                  </div>
                  <div className="text-[10px] sm:text-xs mt-1" style={{ color: "#555" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full" style={{ background: "#00FFFF" }} />
              <span style={{ color: "#00FFFF" }}>Currently based in Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;