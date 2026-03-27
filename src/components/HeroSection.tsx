"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [ahsaanText, setAhsaanText] = useState("AHSAAN");
  const [subtitle, setSubtitle] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  // ── Three.js Background Scene ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const testCtx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!testCtx) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
    } catch (e) {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshPhongMaterial({ color: 0x00ffff, wireframe: true, opacity: 0.18, transparent: true })
    );
    scene.add(ico);

    const torus1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.45, 8, 70),
      new THREE.MeshPhongMaterial({ color: 0x9333ea, wireframe: true, opacity: 0.08, transparent: true })
    );
    torus1.rotation.x = Math.PI / 2.4;
    scene.add(torus1);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.15, 6, 55),
      new THREE.MeshPhongMaterial({ color: 0x00ffff, wireframe: true, opacity: 0.08, transparent: true })
    );
    torus2.rotation.y = Math.PI / 3;
    scene.add(torus2);

    const sphereColors = [0x00ffff, 0x9333ea, 0x22c55e, 0xf59e0b, 0x00ffff, 0x9333ea];
    const floatingSpheres: { mesh: THREE.Mesh; speed: number; phase: number; baseY: number; baseX: number }[] = [];
    sphereColors.forEach((color, i) => {
      const r = 0.08 + Math.random() * 0.12;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 16),
        new THREE.MeshPhongMaterial({ color, opacity: 0.6, transparent: true })
      );
      const angle = (i / sphereColors.length) * Math.PI * 2;
      const rad = 2 + Math.random() * 1.5;
      mesh.position.set(Math.cos(angle) * rad, (Math.random() - 0.5) * 2, Math.sin(angle) * rad * 0.5);
      floatingSpheres.push({ mesh, speed: 0.3 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2, baseY: mesh.position.y, baseX: mesh.position.x });
      scene.add(mesh);
    });

    const pGeo = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let i = 0; i < 600; i++) pts.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10);
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00ffff, size: 0.02, opacity: 0.3, transparent: true })));

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl = new THREE.DirectionalLight(0x00ffff, 1);
    dl.position.set(3, 3, 4);
    scene.add(dl);
    const pl = new THREE.PointLight(0x9333ea, 1.4, 14);
    pl.position.set(-3, 2, 2);
    scene.add(pl);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = (t = 0) => {
      frameRef.current = requestAnimationFrame(animate);
      const time = t * 0.001;
      ico.rotation.x = time * 0.00023 + my * 0.22;
      ico.rotation.y = time * 0.00028 + mx * 0.22;
      torus1.rotation.z = time * 0.00013;
      torus1.rotation.x = Math.PI / 2.4 + my * 0.07;
      torus2.rotation.x = time * 0.00018;
      torus2.rotation.z = -time * 0.00013 + mx * 0.07;
      floatingSpheres.forEach(({ mesh, speed, phase, baseY, baseX }) => {
        mesh.position.y = baseY + Math.sin(time * speed + phase) * 0.3;
        mesh.position.x = baseX + mx * 0.2;
        mesh.rotation.y = time * 0.5;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // ── GSAP Animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(".hero-badge", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(".hero-hello", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.2");
    tl.fromTo(".hero-m", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" });

    tl.add(() => {
      const target = "AHSAAN";
      let iteration = 0;
      const interval = setInterval(() => {
        setAhsaanText(
          target.split("").map((c, i) =>
            i < iteration ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          ).join("")
        );
        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.15;
      }, 30);
    });

    tl.fromTo(".hero-subtitle-wrap", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.5");
    tl.add(() => {
      const text = "A Full Stack DEVELOPER & ENGINEER";
      let i = 0;
      setShowCursor(true);
      const interval = setInterval(() => {
        setSubtitle(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
    }, "+=0.2");

    tl.fromTo(".hero-buttons", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "+=0.3");
    tl.fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    tl.fromTo(".hero-spline", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.8");

    if (!isMobile) {
      gsap.to(".hero-m", {
        x: -40,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-ahsaan", {
        x: 40,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-spline", {
        y: 60,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }

    return () => { tl.kill(); };
  }, [isMobile]);

  // Spline load hone ke baad scale adjust karne ke liye
  const onSplineLoad = (splineApp: any) => {
    try {
      if (splineApp && splineApp._object) {
        const obj = splineApp._object;
        
        if (obj.camera) {
          if (obj.camera.zoom) {
            obj.camera.zoom = 0.7;
            obj.camera.updateProjectionMatrix();
          }
          
          if (obj.camera.position) {
            obj.camera.position.z = 8;
            obj.camera.position.y = 1;
          }
        }
        
        if (obj.scene) {
          obj.scene.scale.set(0.8, 0.8, 0.8);
          obj.scene.position.y = -0.5;
        }
      }
      
      if (splineContainerRef.current && !isMobile) {
        splineContainerRef.current.style.transform = "scale(0.85)";
        splineContainerRef.current.style.transformOrigin = "center center";
      }
    } catch (error) {
      console.log("Spline adjustment error:", error);
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden">

      {/* Three.js Canvas - Hidden on mobile to improve performance */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobile 
            ? "linear-gradient(to right, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.95) 100%)"
            : "linear-gradient(to right, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.85) 35%, rgba(8,8,8,0.3) 60%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Main layout */}
      <div className="relative z-10 flex items-center min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[calc(100vh-4rem)]">

            {/* ── LEFT — Text Content ── */}
            <div className="max-w-lg w-full flex-shrink-0 py-16 md:py-0 z-20">
              <div
                className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 opacity-0"
                style={{ border: "1px solid #1a1a1a", color: "#888" }}
              >
              </div>

              <div className="hero-hello text-lg mb-2 opacity-0" style={{ color: "#00FFFF" }}>
                Hello! I&apos;m
              </div>

              <h1 className="hero-m text-[80px] md:text-[120px] font-black leading-none opacity-0" style={{ color: "#fff" }}>
                M
              </h1>

              <h1 className="hero-ahsaan text-[80px] md:text-[120px] font-black leading-none text-glow-cyan" style={{ color: "#00FFFF" }}>
                {ahsaanText}
              </h1>

              <div className="hero-subtitle-wrap mt-4 text-lg md:text-xl opacity-0">
                <span className={showCursor && !isMobile ? "typing-cursor" : ""}>
                  {subtitle.split(/(\bDEVELOPER\b|\bENGINEER\b|&)/).map((part, i) =>
                    part === "DEVELOPER" || part === "ENGINEER" ? (
                      <span key={i} className="font-bold" style={{ color: "#fff" }}>{part}</span>
                    ) : part === "&" ? (
                      <span key={i} style={{ color: "#00FFFF" }}> {part} </span>
                    ) : (
                      <span key={i} style={{ color: "#888" }}>{part}</span>
                    )
                  )}
                </span>
              </div>

              <div className="hero-buttons flex gap-4 mt-8 opacity-0">
                <a
                  href="#work"
                  className="magnetic-btn px-6 py-3 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-site-cyan hover:text-black"
                  style={{ border: "1px solid #1a1a1a", color: "#fff" }}
                >
                  VIEW WORK ↓
                </a>
                <a
                  href="#contact"
                  className="magnetic-btn px-6 py-3 rounded-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:opacity-90"
                  style={{ background: "#00FFFF", color: "#080808" }}
                >
                  RESUME →
                </a>
              </div>

              {/* Copyright - Hidden on mobile */}
              <div className="max-sm:hidden mt-12 text-xs" style={{ color: "#555" }}>© 2026</div>
            </div>

            {/* ── RIGHT — Spline Robot - Hidden on mobile ── */}
            <div className="max-sm:hidden">
              {!isMobile && (
                <div
                  ref={splineContainerRef}
                  className="hero-spline opacity-0 relative flex-1 w-full"
                  style={{ 
                    height: "clamp(450px, 80vh, 800px)", 
                    minWidth: 0, 
                    maxWidth: "750px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* Cyan glow behind robot */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0.05) 40%, transparent 80%)",
                      zIndex: 0,
                      borderRadius: "50%",
                      transform: "scale(1.2)"
                    }}
                  />
                  
                  {/* Spline Robot Container */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      marginLeft: "10%",
                      position: "relative",
                      zIndex: 1,
                      filter: "hue-rotate(180deg) saturate(1.8) brightness(1.1) drop-shadow(0 0 40px rgba(0,255,255,0.4))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Spline 
                      scene="https://prod.spline.design/tz1kyK0fNLIQojVA/scene.splinecode"
                      onLoad={onSplineLoad}
                      style={{
                        width: "150%",
                        height: "150%",
                        objectFit: "contain",
                        transform: "scale(0.9)",
                        transformOrigin: "center center"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="max-sm:hidden hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10">
        <span className="text-xs tracking-widest" style={{ color: "#555" }}>Scroll to explore</span>
        <svg className="w-5 h-5 animate-scroll-bounce" fill="none" stroke="#00FFFF" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-scroll-bounce {
          animation: scroll-bounce 2s infinite;
        }
        .blink-green {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .typing-cursor::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;