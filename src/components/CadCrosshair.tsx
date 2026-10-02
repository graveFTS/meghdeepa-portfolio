import React, { useEffect, useState } from 'react';

interface CadCrosshairProps {
  enabled: boolean;
}

export const CadCrosshair: React.FC<CadCrosshairProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cadCoords, setCadCoords] = useState({ x: '0.000', y: '0.000', z: '+0.000' });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      // Scale mouse position to realistic architectural meters (1px ~ 0.05m)
      const xMeters = (e.clientX * 0.045).toFixed(3);
      const yMeters = ((window.innerHeight - e.clientY) * 0.045).toFixed(3);
      const zMeters = (Math.sin(e.clientX / 300) * 4.5 + 6.0).toFixed(3);
      setCadCoords({ x: xMeters, y: yMeters, z: `+${zMeters}` });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled || pos.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Full-width Horizontal Hairline */}
      <div
        className="absolute left-0 right-0 h-px bg-cyan-400/40"
        style={{ top: `${pos.y}px` }}
      />
      {/* Full-height Vertical Hairline */}
      <div
        className="absolute top-0 bottom-0 w-px bg-cyan-400/40"
        style={{ left: `${pos.x}px` }}
      />

      {/* Crosshair Center Reticle */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/80 bg-cyan-400/10"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '24px',
          height: '24px',
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
      </div>

      {/* Floating CAD Coordinate Tooltip */}
      <div
        className="absolute rounded bg-slate-950/90 px-2 py-1 font-mono text-[10px] text-cyan-300 shadow-lg border border-cyan-500/30 backdrop-blur-sm"
        style={{
          left: `${pos.x + 14}px`,
          top: `${pos.y + 14}px`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-400">CAD:</span>
          <span>X: {cadCoords.x}m</span>
          <span className="text-slate-500">|</span>
          <span>Y: {cadCoords.y}m</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">Z: {cadCoords.z}m</span>
        </div>
      </div>
    </div>
  );
};
