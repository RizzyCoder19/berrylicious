import React from "react";

// ─── Wave Divider (cream to next section color) ───────────────────────────
interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
  position?: "top" | "bottom" | string;
  fill?: string;
  height?: number;
}

export function WaveDivider({
  fromColor = "#FFF9F0",
  toColor = "#382D32",
  flip = false,
  className = "",
  position,
  fill,
  height,
}: WaveDividerProps) {
  const isFlipped = flip || position === "top";
  const waveFill = fill || (isFlipped ? fromColor : toColor);
  const bgColor = fill ? "transparent" : (isFlipped ? toColor : fromColor);

  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: height ? `${height}px` : undefined,
          transform: isFlipped ? "scaleY(-1)" : undefined,
          display: "block",
        }}
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={waveFill}
        />
      </svg>
    </div>
  );
}

// ─── Blob Divider ─────────────────────────────────────────────────────────
interface BlobDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
}

export function BlobDivider({
  fromColor = "#FFF9F0",
  toColor = "#EBF7F4",
  flip = false,
  className = "",
}: BlobDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: flip ? toColor : fromColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          d="M0,50 C120,20 200,80 360,50 C520,20 600,80 720,50 C840,20 1000,90 1200,50 C1320,20 1380,70 1440,50 L1440,100 L0,100 Z"
          fill={flip ? fromColor : toColor}
        />
      </svg>
    </div>
  );
}

// ─── Torn Paper Divider ───────────────────────────────────────────────────
interface TornPaperProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
}

export function TornPaperDivider({
  fromColor = "#FFF9F0",
  toColor = "#FFF1E8",
  flip = false,
  className = "",
}: TornPaperProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: flip ? toColor : fromColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          d="M0,30 L40,15 L80,35 L120,10 L160,30 L200,12 L240,32 L280,8 L320,28 L360,14 L400,34 L440,6 L480,26 L520,18 L560,38 L600,5 L640,25 L680,15 L720,35 L760,10 L800,30 L840,18 L880,38 L920,8 L960,28 L1000,14 L1040,34 L1080,6 L1120,26 L1160,18 L1200,38 L1240,5 L1280,25 L1320,15 L1360,35 L1400,12 L1440,30 L1440,60 L0,60 Z"
          fill={flip ? fromColor : toColor}
        />
      </svg>
    </div>
  );
}
