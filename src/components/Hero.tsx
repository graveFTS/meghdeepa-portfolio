import React, { useState } from 'react';
import { Download, Compass, Eye, ShieldCheck, ArrowDownRight, Layers, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenPdfCenter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenPdfCenter }) => {
  const [activeTab, setActiveTab] = useState<'drawing' | 'section' | 'water'>('drawing');
  const [downloading, setDownloading] = useState(false);

  const handleResumeDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      generateResumePdf();
      setDownloading(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.3 },
        });
      } catch {
        // ignore
      }
    }, 450);
  };

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-cyan-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Architectural Profile & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project Classification Metadata (Clean unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="text-amber-400 font-bold">PROJECT DOSSIER</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>KOLKATA MUNICIPAL & NKDA SANCTIONS</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>DRAFTING DISCIPLINE: 2D AUTOCAD & SKETCHUP</span>
            </div>

            {/* Main Title & Role */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
                Civil Detailing & High-Rise Space Planning
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
                {PERSONAL_INFO.name}
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-mono text-amber-400 font-medium tracking-wide">
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Technical Narrative */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
              Specialized in developing municipal sanction drawing packages, high-density residential towers (G+16), campus space planning, and meticulous civil working drawings. Deeply versed in West Bengal Municipal Building Rules, NKDA New Town By-Laws, NBC India fire safety, and complex multi-reservoir hydraulic detailing.
            </p>

            {/* Key Engineering Metric Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-cyan-500/20">
              <div>
                <span className="text-xs font-mono text-slate-400 block">SUPERSTRUCTURE</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 block">G+16</span>
                <span className="text-[10px] text-slate-500 font-mono">57.0m High-Rise</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">CAMPUS SCALE</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 block">52,169</span>
                <span className="text-[10px] text-slate-500 font-mono">Sq.ft Land Area</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">FIRE HYDRAULICS</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 block">151.49</span>
                <span className="text-[10px] text-slate-500 font-mono">KLD Fire UGWR</span>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">PARKING DESIGN</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 block">PARKLIFT</span>
                <span className="text-[10px] text-slate-500 font-mono">2.0T Stacker Units</span>
              </div>
            </div>

            {/* Call To Action Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleResumeDownload}
                disabled={downloading}
                className="px-5 py-3 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>GENERATING RESUME PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD OFFICIAL RESUME (PDF)</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenPdfCenter}
                className="px-4 py-3 rounded border border-cyan-400/40 hover:border-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 font-mono text-xs tracking-wider flex items-center gap-2 transition-all active:scale-95"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>PROJECT PDF BLUEPRINTS</span>
              </button>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreProjects();
                }}
                className="px-4 py-3 rounded border border-slate-700 hover:border-slate-500 bg-slate-900/60 text-slate-300 hover:text-white font-mono text-xs tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Recruiter Quick Verification Note */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full compliance verified against West Bengal Municipal Act & National Building Code of India.</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Architectural Blueprint Drafting Board */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg border-2 border-cyan-500/40 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Drafting Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-cyan-500/20 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-cyan-300 font-bold ml-2">AUTOCAD MODELSPACE (2D)</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('drawing')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      activeTab === 'drawing'
                        ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    PLAN
                  </button>
                  <button
                    onClick={() => setActiveTab('section')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      activeTab === 'section'
                        ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ELEVATION
                  </button>
                  <button
                    onClick={() => setActiveTab('water')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      activeTab === 'water'
                        ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    UGWR
                  </button>
                </div>
              </div>

              {/* Dynamic Blueprint Canvas Canvas / SVG */}
              <div className="p-4 relative bg-[#04101d] aspect-[4/3] flex items-center justify-center overflow-hidden">
                {/* SVG Blueprint Animation based on activeTab */}
                {activeTab === 'drawing' && (
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full text-cyan-400 stroke-current"
                    fill="none"
                  >
                    {/* Background Grid */}
                    <defs>
                      <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0ea5e9" strokeWidth="0.2" strokeOpacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#miniGrid)" />

                    {/* Outer Wall Boundary */}
                    <rect x="40" y="30" width="320" height="230" stroke="#38bdf8" strokeWidth="2.5" />
                    <rect x="45" y="35" width="310" height="220" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 2" />

                    {/* Central 3000mm Corridor */}
                    <line x1="40" y1="140" x2="360" y2="140" stroke="#38bdf8" strokeWidth="1.8" />
                    <line x1="40" y1="170" x2="360" y2="170" stroke="#38bdf8" strokeWidth="1.8" />
                    <text x="200" y="157" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      3000 WIDE CIRCULATION CORRIDOR
                    </text>

                    {/* Classrooms / Lab Partitions */}
                    <line x1="120" y1="30" x2="120" y2="140" stroke="#38bdf8" strokeWidth="1.2" />
                    <line x1="200" y1="30" x2="200" y2="140" stroke="#38bdf8" strokeWidth="1.2" />
                    <line x1="280" y1="30" x2="280" y2="140" stroke="#38bdf8" strokeWidth="1.2" />

                    <line x1="140" y1="170" x2="140" y2="260" stroke="#38bdf8" strokeWidth="1.2" />
                    <line x1="260" y1="170" x2="260" y2="260" stroke="#38bdf8" strokeWidth="1.2" />

                    {/* Classroom Text Labels */}
                    <text x="80" y="85" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">CLASSROOM 1</text>
                    <text x="80" y="98" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">6000 X 7800</text>

                    <text x="160" y="85" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">CHEMISTRY LAB</text>
                    <text x="160" y="98" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">8650 X 6500</text>

                    <text x="240" y="85" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">PHYSICS LAB</text>
                    <text x="240" y="98" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">8600 X 6500</text>

                    <text x="320" y="85" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">BIOLOGY LAB</text>
                    <text x="320" y="98" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">8600 X 6500</text>

                    {/* Accessible Ramp & Staircase */}
                    <rect x="50" y="180" width="80" height="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="90" y="212" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="middle">1:12 ACCESSIBLE</text>
                    <text x="90" y="222" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="middle">RAMP (CWSN)</text>

                    {/* Dual Core Lifts */}
                    <rect x="150" y="180" width="45" height="40" stroke="#10b981" strokeWidth="1.2" />
                    <text x="172" y="204" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">LIFT 1</text>
                    <rect x="205" y="180" width="45" height="40" stroke="#10b981" strokeWidth="1.2" />
                    <text x="227" y="204" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">LIFT 2</text>

                    {/* Dimension Lines (AutoCAD style) */}
                    <line x1="40" y1="18" x2="360" y2="18" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="40" y1="14" x2="40" y2="22" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="360" y1="14" x2="360" y2="22" stroke="#f59e0b" strokeWidth="0.8" />
                    <text x="200" y="15" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      DIM: 51,075 mm (51.075 m)
                    </text>

                    <line x1="375" y1="30" x2="375" y2="260" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="371" y1="30" x2="379" y2="30" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="371" y1="260" x2="379" y2="260" stroke="#f59e0b" strokeWidth="0.8" />
                    <text x="382" y="145" fill="#f59e0b" fontSize="7" fontFamily="monospace" transform="rotate(90, 382, 145)">
                      26,350 mm
                    </text>
                  </svg>
                )}

                {activeTab === 'section' && (
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full text-cyan-400 stroke-current"
                    fill="none"
                  >
                    {/* G+16 High-Rise Elevation Wireframe */}
                    <line x1="30" y1="270" x2="370" y2="270" stroke="#10b981" strokeWidth="2" />
                    <text x="35" y="285" fill="#10b981" fontSize="7" fontFamily="monospace">GROUND LVL ±0.00</text>

                    {/* Tower shaft */}
                    <rect x="120" y="25" width="160" height="245" stroke="#38bdf8" strokeWidth="1.5" />

                    {/* 16 Floor slabs */}
                    {Array.from({ length: 16 }).map((_, i) => {
                      const y = 25 + (245 / 16) * i;
                      const isRefuge1 = i === 8;
                      const isRefuge2 = i === 13;
                      return (
                        <g key={i}>
                          <line x1="120" y1={y} x2="280" y2={y} stroke="#0284c7" strokeWidth="0.7" />
                          {/* Balcony cantilevers */}
                          <rect x="100" y={y + 2} width="18" height="10" stroke="#38bdf8" strokeWidth="0.6" />
                          <rect x="282" y={y + 2} width="18" height="10" stroke="#38bdf8" strokeWidth="0.6" />
                          {/* Fire refuge platform callouts */}
                          {(isRefuge1 || isRefuge2) && (
                            <g>
                              <rect x="85" y={y - 2} width="33" height="14" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
                              <text x="45" y={y + 7} fill="#f59e0b" fontSize="6.5" fontFamily="monospace">
                                {isRefuge1 ? 'REFUGE +23.52m' : 'REFUGE +39.02m'}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Lift Machine Room Feature */}
                    <rect x="170" y="10" width="60" height="15" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="200" y="7" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="middle">
                      PARAPET LVL +53.90m (57m TOP)
                    </text>

                    {/* Height Dimension Line */}
                    <line x1="330" y1="10" x2="330" y2="270" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="325" y1="10" x2="335" y2="10" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="325" y1="270" x2="335" y2="270" stroke="#f59e0b" strokeWidth="0.8" />
                    <text x="340" y="145" fill="#f59e0b" fontSize="8" fontFamily="monospace" transform="rotate(90, 340, 145)">
                      HEIGHT: 57,000 mm (G+16)
                    </text>
                  </svg>
                )}

                {activeTab === 'water' && (
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full text-cyan-400 stroke-current"
                    fill="none"
                  >
                    {/* UGWR Fire & Drinking Detail */}
                    <text x="200" y="24" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      UNDERGROUND WATER RESERVOIR (UGWR) SECTION
                    </text>

                    {/* Ground line */}
                    <line x1="30" y1="70" x2="370" y2="70" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="64" fill="#10b981" fontSize="7" fontFamily="monospace">FINISHED GROUND LVL</text>

                    {/* 45MT Fire Tender Load RCC Cover */}
                    <rect x="60" y="72" width="280" height="18" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="200" y="84" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                      200 THK RCC SLAB (45 MT FIRE TENDER BEARING LOAD)
                    </text>

                    {/* Tank Structure */}
                    <rect x="60" y="90" width="280" height="150" stroke="#0284c7" strokeWidth="2" />

                    {/* Fire Tank Section (151.49 KLD) */}
                    <rect x="65" y="95" width="180" height="140" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="155" y="150" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      FIRE FIGHTING UGWR
                    </text>
                    <text x="155" y="165" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      CAPACITY: 151,491 LITERS (151.49 KLD)
                    </text>
                    <text x="155" y="180" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">
                      DIM: 4.316m x 13.0m x 2.7m DEPTH
                    </text>

                    {/* Domestic Tank Section (30.3 KLD) */}
                    <rect x="250" y="95" width="85" height="140" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="292" y="150" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      DOMESTIC TANK
                    </text>
                    <text x="292" y="165" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                      30,300 LITERS
                    </text>
                    <text x="292" y="178" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      4.316m x 2.6m
                    </text>

                    {/* Manholes (560mm dia) */}
                    <rect x="135" y="60" width="35" height="12" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
                    <text x="152" y="55" fill="#f59e0b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      560Ø M.H. COVER
                    </text>

                    <rect x="275" y="60" width="35" height="12" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
                    <text x="292" y="55" fill="#f59e0b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      560Ø M.H. COVER
                    </text>

                    {/* Base Bedding */}
                    <rect x="55" y="240" width="290" height="14" fill="#64748b" fillOpacity="0.2" stroke="#64748b" strokeWidth="0.8" />
                    <text x="200" y="250" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                      150 THK CONCRETE BED OVER 75 THK B.F.S. (BRICK FLAT SOLING)
                    </text>
                  </svg>
                )}

                {/* Corner Cad Status Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
                  SCALE 1:100 · RSD-CAD-SYS
                </div>
              </div>

              {/* Title Block Bottom Footer */}
              <div className="px-4 py-2 bg-slate-900 border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400">
                <span>TITLE: ARCHITECTURAL WORKING DRAWING</span>
                <span className="text-amber-400">SHEET 01 OF 01</span>
                <span>ENGINEER: MEGHDEEPA MAITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
