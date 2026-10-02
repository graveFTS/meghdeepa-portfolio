import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Ruler, Building2, Droplets, Grid, Shield, ExternalLink } from 'lucide-react';
import { ProjectData } from '../types/portfolio';
import { generateProjectBlueprintPdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'area' | 'specs' | 'schedules' | 'water' | 'floors'>('area');
  const [downloading, setDownloading] = useState(false);

  if (!project) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      generateProjectBlueprintPdf(project);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border-2 border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden my-6">
        {/* Modal Header Bar with CAD Title Block */}
        <div className="px-6 py-4 bg-slate-950 border-b border-cyan-500/20 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="text-amber-400 font-bold">SANCTION DRAWING DOSSIER</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>DWG NO: {project.drawingNo}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>DATE: {project.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-sans">{project.title}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              {downloading ? (
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>DOWNLOAD PDF SHEET</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-navigation Tabs */}
        <div className="px-6 py-2 bg-slate-900/90 border-b border-cyan-500/10 flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('area')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'area'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AREA STATEMENT & FAR
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'specs'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CIVIL SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'schedules'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DOORS & WINDOWS ({project.doorWindowSchedule.length})
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'water'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WATER RESERVOIRS & FIRE
          </button>
          <button
            onClick={() => setActiveTab('floors')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'floors'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FLOOR BY FLOOR PROGRAM
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* TAB 1: Area Statement & FAR */}
          {activeTab === 'area' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-500/20">
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  MUNICIPAL ACT & NATIONAL BUILDING CODE COMPLIANCE
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The area schedule below was computed and formatted strictly according to the statutory formulas mandated by the West Bengal Municipal Building Rules and NKDA Kolkata Rules 2009.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border border-slate-800">
                  <thead className="bg-slate-950 text-cyan-300 border-b border-cyan-500/20">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">PARAMETER / CLAUSE</th>
                      <th className="py-2.5 px-4 font-semibold text-right">STATUTORY SPECIFICATION / VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {project.areaStatement.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-4 text-slate-300">{item.label}</td>
                        <td className="py-2.5 px-4 text-right font-bold text-amber-400">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statutory Certification Stamp Box */}
              <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>OFFICIAL STATUTORY ARCHITECTURAL DECLARATION</span>
                </div>
                <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                  "I/We do hereby certify that this building plan has been drawn up as per provisions of Municipality Building Rules / New Town Kolkata Building Rules 2009 as amended from time to time. Site condition conforms with the abutting road and common passage, and all structural seismic loads are certified safe."
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-mono text-slate-400 border-t border-amber-500/20">
                  <span>Sign. of Architect: Rahul Majumdar</span>
                  <span>Drafted by: {project.tools.includes('AutoCAD 2D') ? 'Meghdeepa Maity' : 'Meghdeepa Maity'}</span>
                  <span>Scale: {project.scale}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Civil Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.specifications.map((spec, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                      {spec.component}
                    </span>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  GENERAL TECHNICAL NOTES (AS SHOWN IN DRAWINGS)
                </span>
                <ul className="text-xs font-mono text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Except otherwise noted, all dimensions and levels are indicated in millimeters (mm).</li>
                  <li>Unless otherwise noted, all internal partition walls are 125mm thick & external walls are 200mm/250mm thick brick masonry.</li>
                  <li>Grade of steel Fe-415 and Grade of concrete M-20 conforming to IS:456 and IS:1786.</li>
                  <li>40mm thick damp proof course (DPC) provided at ground floor plinth wall junctions.</li>
                  <li>Roof treatment done with approved elastomeric waterproofing compound with 1:100 screed slope.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Door & Window Schedules */}
          {activeTab === 'schedules' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border border-slate-800">
                  <thead className="bg-slate-950 text-cyan-300 border-b border-cyan-500/20">
                    <tr>
                      <th className="py-2.5 px-3">MARK</th>
                      <th className="py-2.5 px-3">TYPE</th>
                      <th className="py-2.5 px-3">WIDTH</th>
                      <th className="py-2.5 px-3">HEIGHT</th>
                      <th className="py-2.5 px-3">SILL HT</th>
                      <th className="py-2.5 px-3">LINTEL HT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {project.doorWindowSchedule.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-amber-400">{item.mark}</td>
                        <td className="py-2.5 px-3 text-slate-300">{item.type}</td>
                        <td className="py-2.5 px-3 text-cyan-300">{item.width}</td>
                        <td className="py-2.5 px-3 text-cyan-300">{item.height}</td>
                        <td className="py-2.5 px-3 text-slate-400">{item.sillHeight || '-'}</td>
                        <td className="py-2.5 px-3 text-slate-400">{item.lintelHeight || '2.20 m'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Water Reservoirs & Fire */}
          {activeTab === 'water' && (
            <div className="space-y-4">
              {project.plumbingAndFire.map((tank, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-cyan-300 font-sans">{tank.tankType}</span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                      {tank.capacity}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    <span className="text-slate-500">Dimensions: </span>
                    <span className="text-white font-medium">{tank.dimensions}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    {tank.notes}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Floor By Floor Program */}
          {activeTab === 'floors' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.floorPlans.map((fp, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-sans">{fp.name}</span>
                    <span className="text-xs font-mono text-cyan-400">{fp.level}</span>
                  </div>
                  <div className="text-xs font-mono text-amber-400">
                    Floor Area Plate: {fp.area}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {fp.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-slate-400">
            ENGINEER: Meghdeepa Maity · Kolkata, West Bengal
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD BLUEPRINT (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded border border-slate-700 text-slate-300 hover:text-white"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
