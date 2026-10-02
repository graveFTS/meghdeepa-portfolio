import React, { useState } from 'react';
import { Download, Eye, FileText, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { ProjectData } from '../types/portfolio';
import { generateProjectBlueprintPdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    setTimeout(() => {
      generateProjectBlueprintPdf(project);
      setDownloading(false);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }, 400);
  };

  return (
    <div
      onClick={() => onOpenModal(project)}
      className="group relative rounded-lg border border-cyan-500/25 bg-slate-900/80 hover:bg-slate-900 hover:border-cyan-400/60 transition-all duration-300 shadow-xl overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Top Title Block Header Strip */}
      <div className="px-5 py-3 bg-slate-950 border-b border-cyan-500/20 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 text-cyan-300 font-semibold truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="truncate">{project.drawingNo}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <span>SCALE: {project.scale.split(',')[0]}</span>
          <span className="text-slate-600">·</span>
          <span>{project.date}</span>
        </div>
      </div>

      {/* Blueprint Visual Preview Zone */}
      <div className="relative aspect-[16/9] bg-[#030d1a] border-b border-cyan-500/20 overflow-hidden flex items-center justify-center p-4">
        {/* Architectural grid background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Dynamic preview SVG schematic */}
        <svg viewBox="0 0 320 180" className="w-full h-full text-cyan-400 stroke-current opacity-85 group-hover:opacity-100 transition-opacity" fill="none">
          {project.category === 'educational' && (
            <g strokeWidth="1.2">
              <rect x="20" y="20" width="280" height="140" stroke="#38bdf8" />
              <line x1="20" y1="90" x2="300" y2="90" stroke="#38bdf8" strokeWidth="1.8" />
              <line x1="100" y1="20" x2="100" y2="90" />
              <line x1="180" y1="20" x2="180" y2="90" />
              <line x1="260" y1="20" x2="260" y2="90" />
              <line x1="140" y1="90" x2="140" y2="160" />
              <line x1="240" y1="90" x2="240" y2="160" />
              <text x="160" y="95" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="middle">
                3000 CORRIDOR
              </text>
              <rect x="30" y="110" width="60" height="35" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" />
              <text x="60" y="130" fill="#38bdf8" fontSize="6" fontFamily="monospace" textAnchor="middle">
                UGWR 52.29KL
              </text>
            </g>
          )}

          {project.category === 'highrise' && (
            <g strokeWidth="1">
              <line x1="40" y1="160" x2="280" y2="160" stroke="#10b981" strokeWidth="2" />
              <rect x="90" y="15" width="140" height="145" stroke="#38bdf8" strokeWidth="1.5" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="90" y1={15 + i * 18} x2="230" y2={15 + i * 18} stroke="#0284c7" strokeWidth="0.8" />
              ))}
              <rect x="75" y="80" width="15" height="8" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" />
              <text x="65" y="86" fill="#f59e0b" fontSize="5" fontFamily="monospace" textAnchor="end">REFUGE</text>
              <text x="160" y="172" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                G+16 (57M) · 10 PARKLIFT UNITS
              </text>
            </g>
          )}

          {project.category === 'residential' && (
            <g strokeWidth="1.2">
              <rect x="30" y="25" width="260" height="130" stroke="#38bdf8" />
              <line x1="160" y1="25" x2="160" y2="155" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="30" y1="90" x2="290" y2="90" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="160" cy="90" r="14" fill="#0284c7" fillOpacity="0.2" stroke="#f59e0b" />
              <text x="160" y="93" fill="#f59e0b" fontSize="6" fontFamily="monospace" textAnchor="middle">CORE</text>
              <text x="95" y="60" fill="#e2e8f0" fontSize="7" fontFamily="monospace" textAnchor="middle">FLAT A</text>
              <text x="225" y="60" fill="#e2e8f0" fontSize="7" fontFamily="monospace" textAnchor="middle">FLAT B</text>
            </g>
          )}
        </svg>

        {/* Hover inspect overlay badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 backdrop-blur-sm group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
          INSPECT BLUEPRINT
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata clean text discipline (No pills) */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
            <span className="text-amber-400 uppercase font-semibold">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{project.location}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-sans">
            {project.title}
          </h3>

          <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Key Metric Snapshot */}
          <div className="mt-3.5 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">COVERED/FAR:</span>
              <span className="text-slate-200 font-semibold truncate block">
                {project.areaStatement[0]?.value.split('(')[0] || 'Sanctioned Plate'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">WATER CAPACITY:</span>
              <span className="text-cyan-300 font-semibold truncate block">
                {project.plumbingAndFire[0]?.capacity || 'Multi-tier storage'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          {/* Download Vector Sheet PDF Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all active:scale-95 shadow-md"
            title="Download Vector Architectural PDF Sheet"
          >
            {downloading ? (
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>DOWNLOAD PDF</span>
          </button>

          {/* View Details Button */}
          <span className="text-xs font-mono text-cyan-400 group-hover:text-amber-400 flex items-center gap-1">
            <span>DRAWING SPECS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
