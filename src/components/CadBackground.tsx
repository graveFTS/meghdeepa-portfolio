import React from 'react';

interface CadBackgroundProps {
  themeMode: 'blueprint' | 'dark' | 'linen';
}

export const CadBackground: React.FC<CadBackgroundProps> = ({ themeMode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background base color */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          themeMode === 'blueprint'
            ? 'bg-[#06182c]'
            : themeMode === 'dark'
            ? 'bg-[#090d14]'
            : 'bg-[#f4efe6]'
        }`}
      />

      {/* Blueprint Grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Small 20px grid */}
          <pattern
            id="cad-small-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={
                themeMode === 'blueprint'
                  ? '#38bdf8'
                  : themeMode === 'dark'
                  ? '#334155'
                  : '#a89f91'
              }
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>

          {/* Large 100px grid */}
          <pattern
            id="cad-large-grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#cad-small-grid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke={
                themeMode === 'blueprint'
                  ? '#38bdf8'
                  : themeMode === 'dark'
                  ? '#475569'
                  : '#8c8273'
              }
              strokeWidth="1"
              strokeOpacity="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-large-grid)" />
      </svg>

      {/* Subtle architectural radial lighting */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          themeMode === 'blueprint'
            ? 'bg-[radial-gradient(circle_800px_at_50%_200px,#0284c715,transparent)]'
            : themeMode === 'dark'
            ? 'bg-[radial-gradient(circle_800px_at_50%_200px,#f59e0b08,transparent)]'
            : 'bg-[radial-gradient(circle_800px_at_50%_200px,#ffffff60,transparent)]'
        }`}
      />

      {/* Architectural Corner Alignment Crosses */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-cyan-500/40 select-none">
        + 0,0,0 [DATUM]
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] text-cyan-500/40 select-none">
        + 120.00,0,0
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-cyan-500/40 select-none">
        GRID REF: WGS-84 / PLINTH ±0.00
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-cyan-500/40 select-none">
        SCALE 1:100 @ A1
      </div>

      {/* Architectural North Arrow Overlay */}
      <div className="hidden lg:flex fixed top-24 right-8 flex-col items-center opacity-30 pointer-events-none select-none">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" />
          <polygon points="20,4 25,20 20,16 15,20" fill="#38bdf8" />
          <polygon points="20,36 25,20 20,24 15,20" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="20" y="3" fontSize="8" fill="#38bdf8" fontWeight="bold" textAnchor="middle">N</text>
        </svg>
        <span className="font-mono text-[8px] text-cyan-400 mt-0.5">NORTH</span>
      </div>
    </div>
  );
};
