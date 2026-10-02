import React from 'react';
import { EXPERIENCES, EDUCATIONS } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>ENGINEERING PRACTICE & PEDAGOGY</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>CHRONOLOGICAL MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Experience & Architectural Education
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
            Hands-on professional trajectory spanning consulting studios in Kolkata, focused on statutory compliance, AutoCAD drafting, and academic rigor in architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Professional Experience Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-sm font-mono text-amber-400 font-bold">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>PROFESSIONAL PRACTICE ({EXPERIENCES.length})</span>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-xl font-bold text-white font-sans">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-mono text-amber-400 font-medium">
                        {exp.role}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-slate-400 text-left sm:text-right">
                      <span className="flex items-center gap-1 sm:justify-end text-cyan-300">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 sm:justify-end text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-400 font-medium">Competencies:</span>
                    {exp.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="text-slate-300">
                        {tool}
                        {tIdx < exp.tools.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Credentials Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 text-sm font-mono text-cyan-400 font-bold">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-4">
              {EDUCATIONS.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white font-sans">
                        {edu.institution}
                      </h4>
                      <p className="text-xs font-mono text-amber-400 font-semibold mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 flex-shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="pt-1 text-[11px] font-mono text-slate-500">
                    Location: {edu.location}
                  </div>
                </div>
              ))}
            </div>

            {/* Architectural Certification Credential Box */}
            <div className="p-5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 space-y-2 font-mono text-xs">
              <span className="text-amber-400 font-bold block">
                TECHNICAL SKILLS CERTIFICATION
              </span>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                Certified in AutoCAD (2D) drafting, architectural working drawings, and computer-aided design by National Skill Training Institute & Directorate of Technical Education.
              </p>
              <div className="pt-2 text-[11px] text-cyan-300">
                Verified: Kolkata, West Bengal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
