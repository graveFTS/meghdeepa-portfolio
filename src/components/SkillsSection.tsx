import React from 'react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';
import { Layers, Compass, CheckCircle2, FileCheck, Ruler, Building, PenTool } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>TECHNICAL CAPABILITIES</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>AUTOCAD, BIM & BY-LAWS MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Technical & Architectural Competencies
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
            A comprehensive matrix of drafting standards, statutory building rules, space planning methodologies, and digital software suites applied in practice.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-lg space-y-4"
            >
              <div className="pb-3 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}% Proficiency</span>
                    </div>

                    {/* Progress Bar with CAD style ruler notches */}
                    <div className="w-full h-2 rounded bg-slate-950 border border-slate-800 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-600 to-amber-500 rounded transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>{skill.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Software Suite Badges & By-Laws Framework List */}
        <div className="mt-8 p-6 rounded-lg bg-slate-950 border border-cyan-500/20 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div>
            <span className="text-amber-400 font-bold block mb-2">PRIMARY SOFTWARE SUITES</span>
            <div className="space-y-1 text-slate-300">
              <div>• AutoCAD 2D (Advanced Drafting)</div>
              <div>• Trimble SketchUp (3D Visuals)</div>
              <div>• Adobe Photoshop (Plan Rendering)</div>
              <div>• MS Excel (Area Statements & BOQ)</div>
            </div>
          </div>

          <div>
            <span className="text-cyan-400 font-bold block mb-2">STATUTORY CODES & BY-LAWS</span>
            <div className="space-y-1 text-slate-300">
              <div>• West Bengal Municipal Rules 1993</div>
              <div>• NKDA Kolkata Building Rules 2009</div>
              <div>• WBHIDCO Sanction Protocols</div>
              <div>• National Building Code of India (NBC)</div>
            </div>
          </div>

          <div>
            <span className="text-emerald-400 font-bold block mb-2">DOCUMENTATION DISCIPLINES</span>
            <div className="space-y-1 text-slate-300">
              <div>• Foundation & Superstructure Plans</div>
              <div>• Cross-Sections A-A, B-B, C-C</div>
              <div>• Longitudinal & Latitudinal Elevations</div>
              <div>• Hydraulic Reservoirs & Septic Sizing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
