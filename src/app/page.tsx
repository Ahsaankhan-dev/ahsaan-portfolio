"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// ─── Lazy load everything below the fold ───────────────────────────────────────
// These sections are NOT visible on first paint, so we defer their JS bundles.
// Each section still renders its HTML instantly (SSR-off means client-only, which
// is fine here because the whole page is "use client" anyway).

const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100vh" }} />,
});
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60vh" }} />,
});
const ExperienceSection = dynamic(() => import("@/components/ExperienceSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60vh" }} />,
});
const WorkSection = dynamic(() => import("@/components/WorkSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60vh" }} />,
});
const TechStackSection = dynamic(() => import("@/components/TechStackSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "40vh" }} />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "40vh" }} />,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <div
        className={
          loading
            ? "opacity-0 pointer-events-none"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ExperienceSection />
        <WorkSection />
        <TechStackSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}