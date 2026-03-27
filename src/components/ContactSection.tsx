"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-lets", { opacity: 0, x: -100 }, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
      gsap.fromTo(".contact-talk", { opacity: 0, x: 100 }, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
      gsap.fromTo(".contact-email", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 min-h-screen flex items-center justify-center relative grid-texture"
    >
      <div className="text-center">
        <div
          className="contact-lets text-6xl md:text-[120px] font-black leading-none opacity-0"
          style={{ color: "#fff" }}
        >
          LET&apos;S
        </div>
        <div
          className="contact-talk text-6xl md:text-[120px] font-black leading-none text-glow-cyan opacity-0"
          style={{ color: "#00FFFF" }}
        >
          TALK
        </div>
        <a
          href="mailto:HELLO@MAHSAAN.DEV"
          className="contact-email inline-block mt-8 text-sm tracking-[3px] uppercase transition-colors duration-300 opacity-0 relative group"
          style={{ color: "#888" }}
        >
          <span className="group-hover:text-site-cyan transition-colors duration-300">ahsaankhan.dev@gmail.com</span>
          <span
            className="absolute bottom-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
            style={{ background: "#00FFFF" }}
          />
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
