"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch / mobile devices — no fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId: number;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      // Dot snaps instantly
      if (dot) {
        dot.style.transform = `translate3d(${mouseX - 4}px,${mouseY - 4}px,0)`;
      }

      // Ring follows with lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      const scale = hovered ? 1.45 : 1;
      if (ring) {
        ring.style.transform = `translate3d(${ringX - 16}px,${ringY - 16}px,0) scale(${scale})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovered = true;
      if (ringRef.current) ringRef.current.style.borderColor = "#00FFFF";
    };
    const onLeave = () => {
      hovered = false;
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(0,255,255,0.5)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    // Attach hover listeners after content loads
    const t = setTimeout(() => {
      document.querySelectorAll("a, button, .magnetic-btn, .tilt-card").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }, 2500);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: "#00FFFF",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: "1px solid rgba(0,255,255,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          transition: "border-color 0.2s ease, transform 0.05s linear",
        }}
      />
    </>
  );
};

export default CustomCursor;