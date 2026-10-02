import React, { useState } from 'react';
import { Download, FileDown, CheckCircle2, ShieldCheck, FileText, FolderDown, Sparkles } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf, generateProjectBlueprintPdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

export const PdfDownloadCenter: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const handleDownloadResume = () => {
    setDownloadingId('resume');
    setTimeout(() => {
      generateResumePdf();
      setDownloadingId(null);
      triggerConfetti();
    }, 400);
  };

  const handleDownloadProject = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (!proj) return;

    setDownloadingId(projectId);
    setTimeout(() => {
      generateProjectBlueprintPdf(proj);
      setDownloadingId(null);
      triggerConfetti();
    }, 450);
  };

  const handleDownloadAll = () => {
    setDownloadingAll(true);
    // Sequence downloads with small delays so the browser triggers each file cleanly
    setTimeout(() => {
      generateResumePdf();
    }, 200);

    PROJECTS.forEach((proj, idx) => {
      setTimeout(() => {
        generateProjectBlueprintPdf(proj);
        if (idx === PROJECTS.length - 1) {
          setDownloadingAll(false);
          triggerConfetti();
        }
      }, 500 + idx * 400);
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="pdf-center" className="py-16 border-b border-cyan-500/15 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>RECRUITER ASSET HUB</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>VECTOR PDF EXPORT ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Download Project Drawing Sheets & Resume
            </h2>
            <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
              Recruiters and hiring managers can download authentic, printable architectural drawing sheets, schedules, and technical resumes generated directly in crisp vector PDF format.
            </p>
          </div>

          {/* Download All Bundle Button */}
          <button
            onClick={handleDownloadAll}
            disabled={downloadingAll}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex-shrink-0"
          >
            {downloadingAll ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>PACKAGING ALL 5 PDFS...</span>
              </>
            ) : (
              <>
                <FolderDown className="w-4 h-4" />
                <span>DOWNLOAD COMPLETE DOSSIER (ALL PDFS)</span>
              </>
            )}
          </button>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Official Architecture Resume Card */}
          <div className="p-6 rounded-lg bg-slate-900 border-2 border-amber-500/40 hover:border-amber-400 transition-colors shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  OFFICIAL RESUME
                </span>
                <span className="text-slate-400">PDF · A4 PORTRAIT</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  {PERSONAL_INFO.name} - Architectural CV
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  Verified Technical Engineering Resume
                </p>
              </div>

              <ul className="text-xs font-mono text-slate-300 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Full experience at Rethym Space Design</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Diploma & NSTI Architecture Education</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>AutoCAD 2D, SketchUp & By-laws matrix</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadResume}
              disabled={downloadingId === 'resume' || downloadingAll}
              className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              {downloadingId === 'resume' ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>

          {/* Project Blueprint PDF Cards */}
          {PROJECTS.map((proj) => {
            const isDownloading = downloadingId === proj.id || downloadingAll;
            return (
              <div
                key={proj.id}
                className="p-6 rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400/60 transition-colors shadow-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-cyan-400 font-semibold truncate max-w-[170px]">
                      DWG: {proj.drawingNo}
                    </span>
                    <span className="text-slate-400 text-[11px]">A4 LANDSCAPE</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5 truncate">
                      {proj.subtitle}
                    </p>
                  </div>

                  <ul className="text-xs font-mono text-slate-300 space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{proj.areaStatement[0]?.label}: {proj.areaStatement[0]?.value.split('(')[0]}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Plumbing: {proj.plumbingAndFire[0]?.capacity}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Door & Window schedule + IS specs</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleDownloadProject(proj.id)}
                  disabled={isDownloading}
                  className="w-full py-2.5 rounded bg-slate-800 hover:bg-cyan-600 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500 transition-all shadow-sm active:scale-95"
                >
                  {isDownloading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Download className="w-4 h-4 text-cyan-400" />
                  )}
                  <span>DOWNLOAD BLUEPRINT (PDF)</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Recruiter Technical Assurance Footer */}
        <div className="mt-8 p-4 rounded-lg border border-cyan-500/20 bg-slate-950 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>All PDF documents are fully formatted with standard architectural title blocks, dimensions, and specifications.</span>
          </div>
          <div className="flex items-center gap-3 text-cyan-300">
            <span>FORMAT: VECTOR PDF</span>
            <span>·</span>
            <span>VERIFIED COMPLIANCE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
