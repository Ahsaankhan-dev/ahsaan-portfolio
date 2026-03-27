"use client";

import React, { useState } from "react";
import Spline from "@splinetool/react-spline";

interface SafeSplineProps {
  scene: string;
  style?: React.CSSProperties;
  onLoad?: (spline: any) => void;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const SafeSpline = ({ scene, style, onLoad }: SafeSplineProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="w-full h-full flex items-center justify-center rounded-xl"
        style={{ background: "#111", border: "1px solid #1a1a1a" }}
      >
        <div className="text-center">
          <div className="text-6xl mb-3">🤖</div>
          <div className="text-xs font-mono" style={{ color: "#555" }}>3D Model</div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={() => setError(true)}>
      <Spline scene={scene} style={style} onLoad={onLoad} />
    </ErrorBoundary>
  );
};

export default SafeSpline;
