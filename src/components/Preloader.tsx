"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll("span");
      tl.fromTo(letters, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" });
    }

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => setProgress(Math.round(counter.val)),
    }, 0.3);

    tl.to(nameRef.current, { scale: 1.5, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.3");
    tl.to(containerRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut", onComplete }, "-=0.2");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
      style={{ background: "#080808" }}
    >
      <div ref={nameRef} className="text-5xl md:text-7xl font-black tracking-wider mb-8">
        {"M.AHSAAN".split("").map((char, i) => (
          <span key={i} className="inline-block" style={{ color: i > 1 ? "#00FFFF" : "#fff" }}>
            {char}
          </span>
        ))}
      </div>
      <div className="w-64 h-[2px] rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{ width: `${progress}%`, background: "#00FFFF" }}
        />
      </div>
      <div className="mt-4 font-mono text-sm" style={{ color: "#00FFFF" }}>{progress}%</div>
      <div className="mt-2 text-xs loading-dots" style={{ color: "#888" }}>
        Loading Portfolio<span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
};

export default Preloader;
