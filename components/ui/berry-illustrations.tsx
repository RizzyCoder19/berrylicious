import React from "react";

export function BerryLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Strawberry icon */}
      <svg
        width="34"
        height="38"
        viewBox="0 0 34 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-6 hover:scale-105"
      >
        {/* Strawberry body */}
        <path
          d="M17 37C17 37 4 28 3 17C2 6 11 5 17 5C23 5 32 6 31 17C30 28 17 37 17 37Z"
          fill="#E98FA8"
          stroke="#9E4663"
          strokeWidth="2"
        />
        {/* Inner berry blush */}
        <path
          d="M17 33C17 33 7 25 6 16C5 7 12 7 17 7C22 7 29 7 28 16C27 25 17 33 17 33Z"
          fill="#FFB6C6"
          opacity="0.6"
        />
        {/* Seeds */}
        <ellipse cx="11" cy="15" rx="1" ry="1.5" fill="#FFF9F0" />
        <ellipse cx="23" cy="15" rx="1" ry="1.5" fill="#FFF9F0" />
        <ellipse cx="17" cy="20" rx="1" ry="1.5" fill="#FFF9F0" />
        <ellipse cx="12" cy="25" rx="1" ry="1.5" fill="#FFF9F0" />
        <ellipse cx="22" cy="25" rx="1" ry="1.5" fill="#FFF9F0" />
        {/* Eyes & smile */}
        <circle cx="13" cy="18" r="1.3" fill="#382D32" />
        <circle cx="21" cy="18" r="1.3" fill="#382D32" />
        <path d="M15 22C16 23 18 23 19 22" stroke="#382D32" strokeWidth="1.2" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="10" cy="20" rx="1.5" ry="1" fill="#E98FA8" />
        <ellipse cx="24" cy="20" rx="1.5" ry="1" fill="#E98FA8" />
        {/* Green leaves */}
        <path
          d="M17 6C15 2 10 1 7 4C11 6 14 7 17 6ZM17 6C19 2 24 1 27 4C23 6 20 7 17 6ZM17 6C16 1 18 0 19 0C18 3 18 5 17 6Z"
          fill="#BFE9DE"
          stroke="#9E4663"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Script wordmark */}
      <div className="flex flex-col">
        <span className="font-display text-3xl font-bold tracking-tight text-[#9E4663] leading-none">
          Berrylicious
        </span>
        <span className="text-[9px] font-bold tracking-widest text-[#382D32]/70 uppercase pl-0.5">
          Desserts • Coffee • Good Vibes
        </span>
      </div>
    </div>
  );
}

export function StrawberrySticker({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M32 60C32 60 10 46 8 28C6 11 20 9 32 9C44 9 58 11 56 28C54 46 32 60 32 60Z"
        fill="#E98FA8"
        stroke="#9E4663"
        strokeWidth="2.5"
      />
      <circle cx="25" cy="30" r="2.2" fill="#382D32" />
      <circle cx="39" cy="30" r="2.2" fill="#382D32" />
      <ellipse cx="20" cy="33" rx="2.5" ry="1.5" fill="#FF8EA7" />
      <ellipse cx="44" cy="33" rx="2.5" ry="1.5" fill="#FF8EA7" />
      <path d="M28 35C30 38 34 38 36 35" stroke="#382D32" strokeWidth="2" strokeLinecap="round" />
      {/* Leaves */}
      <path
        d="M32 10C27 3 19 3 15 8C21 11 27 12 32 10ZM32 10C37 3 45 3 49 8C43 11 37 12 32 10Z"
        fill="#BFE9DE"
        stroke="#9E4663"
        strokeWidth="2"
      />
    </svg>
  );
}

export function BlueberrySticker({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="26" r="18" fill="#B8DDF2" stroke="#9E4663" strokeWidth="2.5" />
      <circle cx="24" cy="26" r="14" fill="#D3EDFC" opacity="0.6" />
      {/* Crown */}
      <path
        d="M20 12L24 16L28 12L30 15L24 17L18 15L20 12Z"
        fill="#9E4663"
      />
      {/* Face */}
      <circle cx="19" cy="27" r="1.8" fill="#382D32" />
      <circle cx="29" cy="27" r="1.8" fill="#382D32" />
      <path d="M22 31C23 32.5 25 32.5 26 31" stroke="#382D32" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BowRibbonSticker({ className = "w-14 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left loop */}
      <path
        d="M26 22C14 10 4 14 6 24C8 32 20 28 26 24Z"
        fill="#E98FA8"
        stroke="#9E4663"
        strokeWidth="2"
      />
      {/* Right loop */}
      <path
        d="M34 22C46 10 56 14 54 24C52 32 40 28 34 24Z"
        fill="#E98FA8"
        stroke="#9E4663"
        strokeWidth="2"
      />
      {/* Tails */}
      <path d="M26 26L16 44L24 40L28 28" fill="#FFB6C6" stroke="#9E4663" strokeWidth="1.8" />
      <path d="M34 26L44 44L36 40L32 28" fill="#FFB6C6" stroke="#9E4663" strokeWidth="1.8" />
      {/* Center knot */}
      <circle cx="30" cy="23" r="5" fill="#E98FA8" stroke="#9E4663" strokeWidth="2" />
    </svg>
  );
}

export function BadgePill({
  text,
  color = "pink",
  className = "",
}: {
  text: string;
  color?: "pink" | "mint" | "blue" | "cream";
  className?: string;
}) {
  const styles = {
    pink: "bg-[#E98FA8] text-[#382D32] border-[#9E4663]",
    mint: "bg-[#BFE9DE] text-[#382D32] border-[#7DBDAE]",
    blue: "bg-[#B8DDF2] text-[#382D32] border-[#7BAFD4]",
    cream: "bg-[#FFF1E8] text-[#9E4663] border-[#E98FA8]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm select-none ${styles[color]} ${className}`}
    >
      <span>✦</span>
      <span>{text}</span>
    </span>
  );
}

export function DoodleSparkle({ className = "w-6 h-6 text-[#9E4663]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
    </svg>
  );
}

export function DoodleHeart({ className = "w-5 h-5 fill-[#E98FA8] stroke-[#9E4663]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* Illustrated Dessert Card Visuals matching the reference styleboard */
export function IllustratedDessertCup({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background soft glow circle */}
      <circle cx="120" cy="120" r="100" fill="#FFF1E8" />
      {/* Wafer stick behind */}
      <g transform="rotate(35 155 80)">
        <rect x="145" y="40" width="16" height="90" rx="8" fill="#C68B59" stroke="#9E4663" strokeWidth="2.5" />
        <line x1="145" y1="55" x2="161" y2="65" stroke="#7A4B29" strokeWidth="2.5" />
        <line x1="145" y1="75" x2="161" y2="85" stroke="#7A4B29" strokeWidth="2.5" />
        <line x1="145" y1="95" x2="161" y2="105" stroke="#7A4B29" strokeWidth="2.5" />
      </g>

      {/* Mint sprig */}
      <path d="M85 70C70 65 65 50 72 42C80 44 88 56 85 70Z" fill="#BFE9DE" stroke="#9E4663" strokeWidth="2" />
      <path d="M86 67C98 62 102 48 98 40C88 42 84 54 86 67Z" fill="#BFE9DE" stroke="#9E4663" strokeWidth="2" />

      {/* Gelato scoops */}
      {/* Vanilla scoop left */}
      <circle cx="95" cy="100" r="40" fill="#FFF9F0" stroke="#9E4663" strokeWidth="2.5" />
      {/* Pink berry scoop center */}
      <circle cx="125" cy="85" r="44" fill="#E98FA8" stroke="#9E4663" strokeWidth="2.5" />
      {/* Chocolate swirl scoop right */}
      <circle cx="150" cy="105" r="36" fill="#8B4513" stroke="#9E4663" strokeWidth="2.5" />

      {/* Chocolate drip over scoops */}
      <path
        d="M95 65C110 50 145 50 155 70C160 85 150 95 140 90C130 85 125 100 115 95C105 90 95 102 88 90C82 78 88 72 95 65Z"
        fill="#4A2E2B"
      />

      {/* Big Strawberry on top */}
      <g transform="translate(108, 40) rotate(-10)">
        <path
          d="M16 32C16 32 4 23 3 13C2 4 10 3 16 3C22 3 30 4 29 13C28 23 16 32 16 32Z"
          fill="#E98FA8"
          stroke="#9E4663"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="1" fill="#FFF9F0" />
        <circle cx="20" cy="14" r="1" fill="#FFF9F0" />
        <circle cx="16" cy="20" r="1" fill="#FFF9F0" />
        {/* Leaves */}
        <path d="M16 4C14 0 9 0 6 3C10 5 13 5 16 4ZM16 4C18 0 23 0 26 3C22 5 19 5 16 4Z" fill="#BFE9DE" stroke="#9E4663" strokeWidth="1.5" />
      </g>

      {/* Fresh blueberries on side */}
      <circle cx="75" cy="115" r="11" fill="#B8DDF2" stroke="#9E4663" strokeWidth="2" />
      <circle cx="165" cy="125" r="10" fill="#B8DDF2" stroke="#9E4663" strokeWidth="2" />

      {/* Cup Glass / Bowl */}
      {/* Bowl rim */}
      <ellipse cx="120" cy="125" rx="72" ry="18" fill="#FFF9F0" stroke="#9E4663" strokeWidth="3" />
      {/* Glass bowl body */}
      <path
        d="M50 128C54 175 80 195 120 195C160 195 186 175 190 128"
        fill="#FFFFFF"
        stroke="#9E4663"
        strokeWidth="3"
        fillOpacity="0.9"
      />
      {/* Glass reflections */}
      <path d="M68 140C72 165 85 180 100 185" stroke="#B8DDF2" strokeWidth="3.5" strokeLinecap="round" />
      {/* Stem & base */}
      <path d="M112 195V215H128V195" fill="#FFF9F0" stroke="#9E4663" strokeWidth="2.5" />
      <ellipse cx="120" cy="216" rx="42" ry="10" fill="#FFF1E8" stroke="#9E4663" strokeWidth="2.5" />
    </svg>
  );
}

export function IllustratedPancakes({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="85" fill="#FFF1E8" />
      {/* Plate */}
      <ellipse cx="100" cy="155" rx="75" ry="22" fill="#FFF9F0" stroke="#9E4663" strokeWidth="2.5" />
      <ellipse cx="100" cy="153" rx="60" ry="16" fill="#FFF1E8" stroke="#9E4663" strokeWidth="1.5" />

      {/* Bottom pancake */}
      <ellipse cx="100" cy="138" rx="52" ry="14" fill="#F4C287" stroke="#9E4663" strokeWidth="2.5" />
      {/* Middle pancake */}
      <ellipse cx="100" cy="122" rx="48" ry="13" fill="#F7CF9E" stroke="#9E4663" strokeWidth="2.5" />
      {/* Top pancake */}
      <ellipse cx="100" cy="106" rx="44" ry="12" fill="#FDE1BD" stroke="#9E4663" strokeWidth="2.5" />

      {/* Melting chocolate syrup drip */}
      <path
        d="M68 112C75 105 85 104 95 106C105 104 115 104 125 110C132 116 128 126 120 126C112 126 108 135 98 135C88 135 84 124 76 124C68 124 64 118 68 112Z"
        fill="#5C3A21"
      />

      {/* Melting butter cube */}
      <rect x="92" y="92" width="16" height="12" rx="3" fill="#FCE881" stroke="#9E4663" strokeWidth="1.8" />

      {/* Strawberry garnish on top */}
      <g transform="translate(102, 78) rotate(15)">
        <path d="M10 20C10 20 2 14 2 8C2 2 7 1 10 1C13 1 18 2 18 8C18 14 10 20 10 20Z" fill="#E98FA8" stroke="#9E4663" strokeWidth="1.5" />
        <path d="M10 2C9 0 6 0 4 2ZM10 2C11 0 14 0 16 2Z" fill="#BFE9DE" stroke="#9E4663" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function IllustratedWaffle({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="85" fill="#FFF1E8" />
      {/* Waffle base circle */}
      <circle cx="100" cy="105" r="58" fill="#F4C287" stroke="#9E4663" strokeWidth="3" />
      {/* Grid pattern pockets */}
      <rect x="68" y="73" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="92" y="73" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="116" y="73" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />

      <rect x="68" y="97" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="92" y="97" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="116" y="97" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />

      <rect x="68" y="121" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="92" y="121" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />
      <rect x="116" y="121" width="16" height="16" rx="3" fill="#E5A65A" stroke="#9E4663" strokeWidth="1.8" />

      {/* Whipped cream swirl */}
      <circle cx="100" cy="100" r="16" fill="#FFF9F0" stroke="#9E4663" strokeWidth="2" />
      {/* Strawberry slices */}
      <circle cx="120" cy="90" r="10" fill="#E98FA8" stroke="#9E4663" strokeWidth="1.8" />
      <circle cx="80" cy="115" r="9" fill="#B8DDF2" stroke="#9E4663" strokeWidth="1.8" />
    </svg>
  );
}

export function IllustratedGelatoCone({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="85" fill="#FFF1E8" />
      {/* Waffle Cone */}
      <path d="M72 105L100 175L128 105Z" fill="#F4C287" stroke="#9E4663" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Cone cross hatch lines */}
      <path d="M80 120L118 120M88 140L112 140M94 158L106 158" stroke="#D19754" strokeWidth="2" />
      <path d="M85 110L115 155M115 110L85 155" stroke="#D19754" strokeWidth="1.5" />

      {/* Lower scoop (Vanilla) */}
      <circle cx="100" cy="95" r="32" fill="#FFF9F0" stroke="#9E4663" strokeWidth="2.5" />
      {/* Upper swirl (Berry Pink) */}
      <circle cx="100" cy="65" r="28" fill="#E98FA8" stroke="#9E4663" strokeWidth="2.5" />
      {/* Swirl top */}
      <path d="M90 50C100 35 112 35 110 50Z" fill="#E98FA8" stroke="#9E4663" strokeWidth="2" />
      {/* Drizzle & cherry */}
      <circle cx="100" cy="38" r="8" fill="#9E4663" stroke="#382D32" strokeWidth="1.5" />
      <path d="M104 32C110 24 116 25 118 20" stroke="#382D32" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IllustratedFruitBowl({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="85" fill="#FFF1E8" />
      {/* Acai / fruit puree inside */}
      <ellipse cx="100" cy="108" rx="55" ry="20" fill="#9E4663" />
      {/* Sliced fruit toppings */}
      <circle cx="75" cy="102" r="12" fill="#E98FA8" stroke="#FFF9F0" strokeWidth="2" />
      <circle cx="95" cy="100" r="10" fill="#FAD02C" stroke="#FFF9F0" strokeWidth="2" />
      <circle cx="112" cy="104" r="10" fill="#B8DDF2" stroke="#FFF9F0" strokeWidth="2" />
      <circle cx="128" cy="108" r="9" fill="#BFE9DE" stroke="#FFF9F0" strokeWidth="2" />
      {/* Bowl */}
      <path
        d="M40 108C44 148 70 168 100 168C130 168 156 148 160 108"
        fill="#FFF9F0"
        stroke="#9E4663"
        strokeWidth="3"
      />
      <ellipse cx="100" cy="108" rx="60" ry="15" fill="none" stroke="#9E4663" strokeWidth="3" />
      {/* Chia seeds */}
      <circle cx="90" cy="115" r="1" fill="#382D32" />
      <circle cx="96" cy="118" r="1" fill="#382D32" />
      <circle cx="104" cy="115" r="1" fill="#382D32" />
    </svg>
  );
}
