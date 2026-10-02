import React from 'react';
import { ArrowUp, Compass, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-slate-950 text-slate-400 py-10 font-mono text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-900">
          {/* Identity */}
          <div className="md:col-span-6 space-y-1">
            <span className="text-white font-bold text-base font-sans block">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-cyan-400">
              {PERSONAL_INFO.title} · Kolkata, West Bengal
            </p>
            <p className="text-slate-500 text-[11px] pt-1 font-sans">
              Dedicated to precision civil drawings, high-density residential planning, and West Bengal statutory sanction compliance.
            </p>
          </div>

          {/* Title Block Specs */}
          <div className="md:col-span-4 space-y-1 text-[11px] text-slate-400">
            <div>DWG SERIES: 2024–2026 ARCHITECTURAL CAD</div>
            <div>COMPLIANCE: WB MUNICIPAL BUILDING RULES / NKDA 2009</div>
            <div className="text-amber-400">HOSTING: OPTIMIZED FOR VERCEL STATIC DEPLOYMENT</div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded border border-slate-800 bg-slate-900 hover:border-amber-400 hover:text-white transition-colors flex items-center gap-2"
              title="Return to Drafting Datum (Top)"
            >
              <ArrowUp className="w-4 h-4 text-amber-400" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All technical blueprints and drawings reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>DRAFTED IN AUTOCAD</span>
            <span>·</span>
            <span className="text-cyan-400">PRECISION 1:100</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
