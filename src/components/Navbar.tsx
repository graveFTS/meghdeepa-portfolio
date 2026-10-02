import React, { useState } from 'react';
import { Download, Crosshair, Sun, Moon, Compass, Menu, X, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface NavbarProps {
  themeMode: 'blueprint' | 'dark' | 'linen';
  setThemeMode: (mode: 'blueprint' | 'dark' | 'linen') => void;
  crosshairEnabled: boolean;
  setCrosshairEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  setThemeMode,
  crosshairEnabled,
  setCrosshairEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(false);

  const handleResumeDownload = () => {
    setDownloadingResume(true);
    setTimeout(() => {
      generateResumePdf();
      setDownloadingResume(false);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.2 },
        });
      } catch {
        // ignore
      }
    }, 400);
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Blueprints', href: '#blueprint-viewer' },
    { name: 'Experience', href: '#experience' },
    { name: 'FAR Calculator', href: '#far-calculator' },
    { name: 'PDF Downloads', href: '#pdf-center' },
    { name: 'Contact', href: '#contact' },
  ];

  const isLight = themeMode === 'linen';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 border-cyan-500/20 bg-slate-950/80 text-slate-200">
      {/* Top Architectural Coordinate Strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 text-[11px] font-mono border-b border-cyan-500/10 bg-slate-950/90 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AVAILABLE FOR ARCHITECTURE & AUTOCAD ROLES
          </span>
          <span className="text-slate-600">·</span>
          <span>LOCATION: Kolkata, West Bengal</span>
          <span className="text-slate-600">·</span>
          <span>BY-LAWS: NKDA / WBHIDCO / NBC INDIA</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-cyan-400/80">DWG: MM-PORTFOLIO-2026</span>
          <span className="text-slate-600">·</span>
          <a
            href="tel:8918760854"
            className="hover:text-amber-400 transition-colors text-slate-300"
          >
            +91 89187 60854
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded border border-cyan-400/40 bg-cyan-950/40 flex items-center justify-center font-mono font-bold text-amber-400 text-sm group-hover:border-amber-400 transition-colors">
              MM
            </div>
            <div>
              <span className="font-bold tracking-tight text-base sm:text-lg block text-white group-hover:text-amber-400 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-cyan-400/90 tracking-wide block uppercase">
                Architecture & AutoCAD Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-wider font-mono text-slate-300 hover:text-amber-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2">
            {/* CAD Crosshair Toggle */}
            <button
              onClick={() => setCrosshairEnabled(!crosshairEnabled)}
              title={crosshairEnabled ? 'Disable CAD Crosshair' : 'Enable CAD Crosshair Cursor'}
              className={`p-2 rounded border text-xs font-mono flex items-center gap-1.5 transition-all ${
                crosshairEnabled
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/30'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline text-[11px]">CAD CURSOR</span>
            </button>

            {/* Theme switcher */}
            <div className="flex items-center rounded border border-slate-700 bg-slate-900/60 p-0.5">
              <button
                onClick={() => setThemeMode('blueprint')}
                title="Blueprint Mode"
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  themeMode === 'blueprint'
                    ? 'bg-cyan-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CYAN
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                title="Dark CAD Mode"
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  themeMode === 'dark'
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                DARK
              </button>
              <button
                onClick={() => setThemeMode('linen')}
                title="Linen Studio Mode"
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  themeMode === 'linen'
                    ? 'bg-amber-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                LINEN
              </button>
            </div>

            {/* Download Resume Button */}
            <button
              onClick={handleResumeDownload}
              disabled={downloadingResume}
              className="flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono font-medium tracking-wide bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              {downloadingResume ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>DRAFTING...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>RESUME PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleResumeDownload}
              className="p-2 rounded bg-amber-500 text-slate-950 text-xs font-mono font-bold"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-slate-700 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-500/20 bg-slate-950 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-mono uppercase text-slate-300 hover:bg-slate-800 rounded transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setCrosshairEnabled(!crosshairEnabled)}
              className="px-3 py-1.5 rounded border border-slate-700 text-xs font-mono text-cyan-400"
            >
              Crosshair: {crosshairEnabled ? 'ON' : 'OFF'}
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setThemeMode('blueprint')}
                className={`px-2 py-1 text-xs font-mono rounded ${
                  themeMode === 'blueprint' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                Cyan
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`px-2 py-1 text-xs font-mono rounded ${
                  themeMode === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-400'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setThemeMode('linen')}
                className={`px-2 py-1 text-xs font-mono rounded ${
                  themeMode === 'linen' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                Linen
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
