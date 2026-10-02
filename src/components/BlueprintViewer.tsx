import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Ruler, Download, Eye, CheckSquare, Square, Info } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectData } from '../types/portfolio';
import { generateProjectBlueprintPdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

export const BlueprintViewer: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Measurement Tool State
  const [measureMode, setMeasureMode] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);
  const [measuredDistance, setMeasuredDistance] = useState<string | null>(null);

  // Layer Toggles
  const [layers, setLayers] = useState({
    grid: true,
    walls: true,
    dimensions: true,
    annotations: true,
    services: true,
  });

  const [downloading, setDownloading] = useState(false);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setMeasurePoints([]);
    setMeasuredDistance(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (measureMode) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = (e.clientX - rect.left - pan.x) / zoomLevel;
      const clickY = (e.clientY - rect.top - pan.y) / zoomLevel;

      if (measurePoints.length === 0 || measurePoints.length === 2) {
        setMeasurePoints([{ x: clickX, y: clickY }]);
        setMeasuredDistance(null);
      } else if (measurePoints.length === 1) {
        const p1 = measurePoints[0];
        const p2 = { x: clickX, y: clickY };
        setMeasurePoints([p1, p2]);

        // Calculate simulated scale: 1 SVG unit ~ 0.15 meters at 1:100 scale
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const pixelDist = Math.sqrt(dx * dx + dy * dy);
        const meters = (pixelDist * 0.082).toFixed(2);
        setMeasuredDistance(`${meters} m (${(parseFloat(meters) * 3.28084).toFixed(1)} ft)`);
      }
      return;
    }

    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || measureMode) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      generateProjectBlueprintPdf(selectedProject);
      setDownloading(false);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.4 },
        });
      } catch {
        // ignore
      }
    }, 400);
  };

  return (
    <section id="blueprint-viewer" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>INTERACTIVE DRAFTING WORKBENCH</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>MEASUREMENT & LAYER AUDITING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Architectural CAD Blueprint Studio
            </h2>
            <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
              Inspect technical drawings drafted by Meghdeepa Maity. Toggle layers, measure spans with the architectural scale ruler, and download original high-resolution vector PDF blueprints.
            </p>
          </div>

          {/* Project Selector Segmented Control */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-900 border border-cyan-500/20 rounded-md">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  handleReset();
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  selectedProjectId === proj.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {proj.title.split(' ')[0]} {proj.title.includes('School') ? 'School' : proj.title.includes('High-Rise') ? 'G+16' : 'G+4'}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Viewer Container */}
        <div className="border-2 border-cyan-500/30 rounded-lg bg-slate-950 overflow-hidden shadow-2xl relative">
          {/* Top Control Toolbar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Project Technical Title */}
            <div className="flex items-center gap-2 text-cyan-300 font-semibold truncate max-w-xs sm:max-w-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="truncate">{selectedProject.title}</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-amber-400 hidden sm:inline text-[11px]">{selectedProject.drawingNo}</span>
            </div>

            {/* Viewport & Measurement Controls */}
            <div className="flex items-center gap-2">
              {/* Measure Tool Button */}
              <button
                onClick={() => {
                  setMeasureMode(!measureMode);
                  setMeasurePoints([]);
                  setMeasuredDistance(null);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  measureMode
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Measure distance between 2 points"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>{measureMode ? 'CLICK 2 POINTS' : 'MEASURE SPAN'}</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center border border-slate-700 rounded bg-slate-800">
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:bg-slate-700 text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[11px] text-cyan-300 font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:bg-slate-700 text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1 border-l border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct PDF Download */}
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
                title="Download Vector Architectural Sheet (PDF)"
              >
                {downloading ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">SHEET PDF</span>
              </button>
            </div>
          </div>

          {/* Interactive Layer Bar */}
          <div className="px-4 py-1.5 bg-slate-950/80 border-b border-cyan-500/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <Layers className="w-3 h-3" />
              CAD LAYERS:
            </span>
            <button
              onClick={() => toggleLayer('grid')}
              className={`flex items-center gap-1 hover:text-slate-200 ${
                layers.grid ? 'text-cyan-300' : 'text-slate-600'
              }`}
            >
              {layers.grid ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3" />}
              <span>Grid (0.5m/5m)</span>
            </button>
            <button
              onClick={() => toggleLayer('walls')}
              className={`flex items-center gap-1 hover:text-slate-200 ${
                layers.walls ? 'text-cyan-300' : 'text-slate-600'
              }`}
            >
              {layers.walls ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3" />}
              <span>Walls & RC Columns</span>
            </button>
            <button
              onClick={() => toggleLayer('dimensions')}
              className={`flex items-center gap-1 hover:text-slate-200 ${
                layers.dimensions ? 'text-cyan-300' : 'text-slate-600'
              }`}
            >
              {layers.dimensions ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3" />}
              <span>Dimension Strings</span>
            </button>
            <button
              onClick={() => toggleLayer('annotations')}
              className={`flex items-center gap-1 hover:text-slate-200 ${
                layers.annotations ? 'text-cyan-300' : 'text-slate-600'
              }`}
            >
              {layers.annotations ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3" />}
              <span>Room Program & Far</span>
            </button>
            <button
              onClick={() => toggleLayer('services')}
              className={`flex items-center gap-1 hover:text-slate-200 ${
                layers.services ? 'text-cyan-300' : 'text-slate-600'
              }`}
            >
              {layers.services ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3" />}
              <span>UGWR / Fire Services</span>
            </button>
          </div>

          {/* Main Blueprint Interactive Viewport Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`relative w-full h-[520px] bg-[#020b17] overflow-hidden select-none ${
              measureMode ? 'cursor-crosshair' : isPanning ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Live Measure Readout Banner */}
            {measuredDistance && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold shadow-lg border border-amber-300 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                <span>SCALED ARCHITECTURAL SPAN: {measuredDistance}</span>
              </div>
            )}

            {/* Blueprint Scaled Content */}
            <div
              className="absolute inset-0 transition-transform origin-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              }}
            >
              <svg
                viewBox="0 0 1000 650"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Grid Layer */}
                {layers.grid && (
                  <defs>
                    <pattern id="viewerGridSmall" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0ea5e9" strokeWidth="0.3" strokeOpacity="0.25" />
                    </pattern>
                    <pattern id="viewerGridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="url(#viewerGridSmall)" />
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.4" />
                    </pattern>
                  </defs>
                )}
                {layers.grid && <rect width="1000" height="650" fill="url(#viewerGridLarge)" />}

                {/* SVG Blueprint details tailored to selected project */}
                {selectedProjectId === 'foundation-school' && (
                  <g id="school-drawing">
                    {/* Outer Building Footprint */}
                    {layers.walls && (
                      <g stroke="#38bdf8" strokeWidth="2.5" fill="none">
                        <rect x="80" y="80" width="840" height="460" />
                        <rect x="88" y="88" width="824" height="444" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
                        
                        {/* 3000mm Corridor */}
                        <line x1="80" y1="280" x2="920" y2="280" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="80" y1="340" x2="920" y2="340" stroke="#38bdf8" strokeWidth="2" />
                        
                        {/* Vertical Classroom Partitions */}
                        <line x1="220" y1="80" x2="220" y2="280" />
                        <line x1="360" y1="80" x2="360" y2="280" />
                        <line x1="500" y1="80" x2="500" y2="280" />
                        <line x1="640" y1="80" x2="640" y2="280" />
                        <line x1="780" y1="80" x2="780" y2="280" />

                        {/* South Wing Partitions */}
                        <line x1="260" y1="340" x2="260" y2="540" />
                        <line x1="420" y1="340" x2="420" y2="540" />
                        <line x1="600" y1="340" x2="600" y2="540" />
                        <line x1="760" y1="340" x2="760" y2="540" />

                        {/* Structural RCC Columns */}
                        {[80, 220, 360, 500, 640, 780, 920].flatMap((x) =>
                          [80, 280, 340, 540].map((y) => (
                            <rect
                              key={`${x}-${y}`}
                              x={x - 6}
                              y={y - 6}
                              width="12"
                              height="12"
                              fill="#f59e0b"
                              stroke="#f59e0b"
                            />
                          ))
                        )}
                      </g>
                    )}

                    {/* Room Program Annotations */}
                    {layers.annotations && (
                      <g fill="#e2e8f0" fontFamily="monospace" fontSize="10" textAnchor="middle">
                        <text x="150" y="160" fontWeight="bold">CLASSROOM 1</text>
                        <text x="150" y="180" fill="#94a3b8" fontSize="8.5">6000 X 7800</text>

                        <text x="290" y="160" fontWeight="bold">CLASSROOM 2</text>
                        <text x="290" y="180" fill="#94a3b8" fontSize="8.5">6500 X 7250</text>

                        <text x="430" y="160" fontWeight="bold">CHEMISTRY LAB</text>
                        <text x="430" y="180" fill="#94a3b8" fontSize="8.5">8650 X 6500</text>

                        <text x="570" y="160" fontWeight="bold">PHYSICS LAB</text>
                        <text x="570" y="180" fill="#94a3b8" fontSize="8.5">8600 X 6500</text>

                        <text x="710" y="160" fontWeight="bold">BIOLOGY LAB</text>
                        <text x="710" y="180" fill="#94a3b8" fontSize="8.5">8600 X 6500</text>

                        <text x="850" y="160" fontWeight="bold">LIBRARY WING</text>
                        <text x="850" y="180" fill="#94a3b8" fontSize="8.5">17100 X 8000</text>

                        {/* Corridor text */}
                        <text x="500" y="315" fill="#38bdf8" fontSize="11" fontWeight="bold">
                          3000 WIDE CENTRAL CIRCULATION SPINE (CLEARWAY)
                        </text>

                        {/* South Wing */}
                        <text x="170" y="420" fontWeight="bold">ADMIN & PRINCIPAL</text>
                        <text x="170" y="440" fill="#94a3b8" fontSize="8.5">4625 X 4000</text>

                        <text x="340" y="420" fontWeight="bold">CANTEEN & PANTRY</text>
                        <text x="340" y="440" fill="#94a3b8" fontSize="8.5">7050 X 7800</text>

                        <text x="510" y="420" fontWeight="bold">MULTIPURPOSE AUDITORIUM</text>
                        <text x="510" y="440" fill="#94a3b8" fontSize="8.5">11550 X 6500</text>

                        <text x="680" y="420" fontWeight="bold">CWSN SPECIAL TOILETS</text>
                        <text x="680" y="440" fill="#94a3b8" fontSize="8.5">RAMP LEV+150</text>

                        <text x="840" y="420" fontWeight="bold">DUAL LIFT CORE</text>
                        <text x="840" y="440" fill="#10b981" fontSize="8.5">SPEED 1.5 M/S</text>
                      </g>
                    )}

                    {/* Services Layer (UGWR Fire & Drinking) */}
                    {layers.services && (
                      <g>
                        {/* Fire UGWR 52.29 KLD */}
                        <rect x="100" y="470" width="160" height="50" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x="180" y="495" fill="#38bdf8" fontFamily="monospace" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                          UGWR FIRE (52,290 L)
                        </text>
                        <text x="180" y="510" fill="#e2e8f0" fontFamily="monospace" fontSize="7" textAnchor="middle">
                          45MT FIRE TENDER RCC COVER
                        </text>

                        {/* Drinking UGWR 45.15 KLD */}
                        <rect x="280" y="470" width="140" height="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x="350" y="495" fill="#10b981" fontFamily="monospace" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                          DRINKING UGWR (45,150 L)
                        </text>
                        <text x="350" y="510" fill="#e2e8f0" fontFamily="monospace" fontSize="7" textAnchor="middle">
                          PHED FERRULE 100Ø
                        </text>
                      </g>
                    )}

                    {/* Dimensions Layer */}
                    {layers.dimensions && (
                      <g stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fontFamily="monospace" fontSize="9">
                        {/* Top total width dimension */}
                        <line x1="80" y1="50" x2="920" y2="50" />
                        <line x1="80" y1="45" x2="80" y2="55" />
                        <line x1="920" y1="45" x2="920" y2="55" />
                        <text x="500" y="42" textAnchor="middle" fontWeight="bold">
                          OVERALL SPAN: 51,075 mm (51.075 m)
                        </text>

                        {/* Right total depth dimension */}
                        <line x1="950" y1="80" x2="950" y2="540" />
                        <line x1="945" y1="80" x2="955" y2="80" />
                        <line x1="945" y1="540" x2="955" y2="540" />
                        <text x="965" y="315" textAnchor="middle" transform="rotate(90, 965, 315)" fontWeight="bold">
                          TOTAL DEPTH: 26,350 mm (26.350 m)
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {selectedProjectId === 'g16-newtown-highrise' && (
                  <g id="highrise-drawing">
                    {/* G+16 Elevation & Stackers */}
                    {layers.walls && (
                      <g stroke="#38bdf8" strokeWidth="2" fill="none">
                        {/* Tower Boundary */}
                        <rect x="220" y="60" width="560" height="520" />
                        <line x1="100" y1="580" x2="900" y2="580" stroke="#10b981" strokeWidth="3" />

                        {/* Floor Slabs */}
                        {Array.from({ length: 17 }).map((_, idx) => {
                          const y = 60 + (520 / 17) * idx;
                          return (
                            <line
                              key={idx}
                              x1="220"
                              y1={y}
                              x2="780"
                              y2={y}
                              stroke="#0284c7"
                              strokeWidth="0.9"
                            />
                          );
                        })}

                        {/* Fire Refuge Platforms at 8th and 13th */}
                        <rect x="175" y="305" width="45" height="15" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.2" />
                        <rect x="175" y="152" width="45" height="15" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.2" />

                        {/* Penthouse Lift Machine */}
                        <rect x="420" y="30" width="160" height="30" stroke="#f59e0b" strokeWidth="2" />
                      </g>
                    )}

                    {layers.annotations && (
                      <g fill="#e2e8f0" fontFamily="monospace" fontSize="9" textAnchor="middle">
                        <text x="500" y="50" fill="#f59e0b" fontWeight="bold">
                          LIFT OVERHEAD & MACHINE ROOM (+53.90m)
                        </text>
                        <text x="130" y="315" fill="#f59e0b" fontSize="7.5" textAnchor="end">
                          FIRE REFUGE 8TH FL (+23.529m)
                        </text>
                        <text x="130" y="162" fill="#f59e0b" fontSize="7.5" textAnchor="end">
                          FIRE REFUGE 13TH FL (+39.029m)
                        </text>
                        <text x="500" y="565" fill="#38bdf8" fontSize="10" fontWeight="bold">
                          GROUND PARKING & 10-UNIT PARKLIFT 411 MECHANICAL STACKERS (2.0 TONS)
                        </text>
                      </g>
                    )}

                    {layers.services && (
                      <g>
                        {/* Massive 151.49 KLD Fire UGWR */}
                        <rect x="230" y="590" width="340" height="45" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="400" y="618" fill="#38bdf8" fontFamily="monospace" fontSize="9" textAnchor="middle" fontWeight="bold">
                          FIRE FIGHTING UGWR: 151,491 LITERS (151.49 KLD)
                        </text>

                        {/* Domestic 30.3 KLD */}
                        <rect x="580" y="590" width="190" height="45" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
                        <text x="675" y="618" fill="#10b981" fontFamily="monospace" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                          DOMESTIC: 30,300 L
                        </text>
                      </g>
                    )}

                    {layers.dimensions && (
                      <g stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fontFamily="monospace" fontSize="9">
                        <line x1="820" y1="30" x2="820" y2="580" />
                        <line x1="815" y1="30" x2="825" y2="30" />
                        <line x1="815" y1="580" x2="825" y2="580" />
                        <text x="835" y="305" textAnchor="middle" transform="rotate(90, 835, 305)" fontWeight="bold">
                          TOTAL SUPERSTRUCTURE: 57,000 mm (57.00 m)
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {selectedProjectId === 'maheshtala-residential' && (
                  <g id="maheshtala-drawing">
                    {/* 15 Katha G+IV Layout */}
                    {layers.walls && (
                      <g stroke="#38bdf8" strokeWidth="2" fill="none">
                        <rect x="120" y="80" width="760" height="460" />
                        {/* 8 Flats division (Flats A-H) */}
                        <line x1="500" y1="80" x2="500" y2="540" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="120" y1="310" x2="880" y2="310" stroke="#38bdf8" strokeWidth="2" />
                        
                        {/* Corridors */}
                        <rect x="420" y="240" width="160" height="140" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                      </g>
                    )}

                    {layers.annotations && (
                      <g fill="#e2e8f0" fontFamily="monospace" fontSize="10" textAnchor="middle">
                        <text x="310" y="180" fontWeight="bold">FLAT A (2BHK)</text>
                        <text x="310" y="200" fill="#94a3b8" fontSize="8">MASTER BED + BALCONY</text>

                        <text x="690" y="180" fontWeight="bold">FLAT B (2BHK)</text>
                        <text x="690" y="200" fill="#94a3b8" fontSize="8">MASTER BED + BALCONY</text>

                        <text x="310" y="440" fontWeight="bold">FLAT C (3BHK)</text>
                        <text x="310" y="460" fill="#94a3b8" fontSize="8">CROSS VENTILATION SHAFT</text>

                        <text x="690" y="440" fontWeight="bold">FLAT D (3BHK)</text>
                        <text x="690" y="460" fill="#94a3b8" fontSize="8">CROSS VENTILATION SHAFT</text>

                        <text x="500" y="315" fill="#f59e0b" fontWeight="bold">
                          CENTRAL LIFT & STAIRWELL CORE
                        </text>
                      </g>
                    )}

                    {layers.dimensions && (
                      <g stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fontFamily="monospace" fontSize="9">
                        <line x1="120" y1="50" x2="880" y2="50" />
                        <text x="500" y="42" textAnchor="middle" fontWeight="bold">
                          PLOT WIDTH: 42,834 mm (42.834 m)
                        </text>
                        <text x="500" y="580" fill="#10b981" textAnchor="middle" fontWeight="bold">
                          PROPOSED FAR: 1.735 / PERMISSIBLE 1.75  |  21 CAR PARKING PROVIDED
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {selectedProjectId === 'doremi-newtown' && (
                  <g id="doremi-drawing">
                    {/* Doremi Society Layout */}
                    {layers.walls && (
                      <g stroke="#38bdf8" strokeWidth="2" fill="none">
                        <rect x="140" y="90" width="720" height="440" />
                        <line x1="140" y1="310" x2="860" y2="310" stroke="#38bdf8" strokeWidth="2" />
                        {/* Rooftop Garden Highlight */}
                        <rect x="520" y="110" width="320" height="180" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      </g>
                    )}

                    {layers.annotations && (
                      <g fill="#e2e8f0" fontFamily="monospace" fontSize="10" textAnchor="middle">
                        <text x="320" y="200" fontWeight="bold">TYPICAL APARTMENT SUITES</text>
                        <text x="320" y="220" fill="#94a3b8" fontSize="8">2-HOUR FIRE-RATED METER ROOM</text>

                        <text x="680" y="190" fill="#10b981" fontWeight="bold">ROOFTOP COMMUNITY GARDEN</text>
                        <text x="680" y="210" fill="#10b981" fontSize="8.5">48.73 SQ.M (29.51% TERRACE AREA)</text>

                        <text x="500" y="420" fontWeight="bold">GROUND EV RECHARGE STATION & CAR PARKING</text>
                        <text x="500" y="440" fill="#94a3b8" fontSize="8">NKDA TREE RATIO: 1 TREE PER 80 SQ.M</text>
                      </g>
                    )}

                    {layers.dimensions && (
                      <g stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" fontFamily="monospace" fontSize="9">
                        <text x="500" y="60" textAnchor="middle" fontWeight="bold">
                          FRONT ROAD WIDTH: 20.00 METER (STREET NO. 0839)
                        </text>
                        <text x="500" y="580" fill="#10b981" textAnchor="middle" fontWeight="bold">
                          TOTAL HEIGHT: 15.08 METER (G+IV STORIED RESIDENTIAL)
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* Measurement Overlay Line & Marker */}
                {measurePoints.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
                {measurePoints.length === 2 && (
                  <g>
                    <line
                      x1={measurePoints[0].x}
                      y1={measurePoints[0].y}
                      x2={measurePoints[1].x}
                      y2={measurePoints[1].y}
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <circle
                      cx={(measurePoints[0].x + measurePoints[1].x) / 2}
                      cy={(measurePoints[0].y + measurePoints[1].y) / 2}
                      r="3"
                      fill="#ef4444"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Status / Instructions Bar */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/90 border border-cyan-500/20 px-3 py-1.5 rounded backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {measureMode
                    ? 'CLICK ANY TWO POINTS ON THE DRAWING TO MEASURE REAL-WORLD DISTANCE'
                    : 'DRAG TO PAN · USE ZOOM CONTROLS · TOGGLE LAYERS ABOVE'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400">SCALE: {selectedProject.scale}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400">STATUS: SANCTIONED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
