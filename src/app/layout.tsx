import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M.AHSAAN — Full Stack Developer",
  description: "Full Stack Developer & Engineer based in Pakistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
