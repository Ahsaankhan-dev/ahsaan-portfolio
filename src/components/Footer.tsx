"use client";

import { useEffect, useState } from "react";

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/Ahsaankhan-dev" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ahsaan-khan-53a5653aa/" },
  { name: "Twitter", url: "https://twitter.com" },
];

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour12: false });
      setTime(now);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="py-6 px-6" style={{ borderTop: "1px solid #1a1a1a" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs" style={{ color: "#555" }}>© 2026 M AHSAAN. All rights reserved.</span>
        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:text-site-cyan"
              style={{ color: "#888" }}
            >
              {s.name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FFFF" }} />
          <span style={{ color: "#888" }}>PKT</span>
          <span style={{ color: "#00FFFF" }}>{time}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
