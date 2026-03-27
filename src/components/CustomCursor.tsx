"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onDown = () => {
      if (dotRef.current) dotRef.current.style.transform += " scale(0.5)";
    };

    let raf: number;
    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(lerp);
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .tilt-card, [role="button"]').forEach((el) => {
        el.addEventListener("mouseenter", () => {
          if (ringRef.current) {
            ringRef.current.style.width = "48px";
            ringRef.current.style.height = "48px";
            ringRef.current.style.marginLeft = "-8px";
            ringRef.current.style.marginTop = "-8px";
            ringRef.current.style.background = "rgba(0,255,255,0.1)";
          }
        });
        el.addEventListener("mouseleave", () => {
          if (ringRef.current) {
            ringRef.current.style.width = "32px";
            ringRef.current.style.height = "32px";
            ringRef.current.style.marginLeft = "0";
            ringRef.current.style.marginTop = "0";
            ringRef.current.style.background = "transparent";
          }
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(lerp);
    setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] transition-transform duration-75"
        style={{ background: "#00FFFF" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99998] transition-[width,height,background,margin] duration-200"
        style={{ border: "1.5px solid #00FFFF", background: "transparent" }}
      />
    </>
  );
};

export default CustomCursor;
