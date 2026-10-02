import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PROJECTS } from '../data/portfolioData';
import { ProjectData } from '../types/portfolio';
import { Building, Layers, School, Building2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'educational' | 'highrise' | 'residential'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>PROJECT DOSSIER</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>SANCTION DRAWINGS & CIVIL DETAILING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Featured Architectural Work
            </h2>
            <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
              Authentic projects drafted with AutoCAD 2D, SketchUp, and statutory municipal sanction compliance for Kolkata and New Town development authorities. Download official technical drawing PDFs for each sheet.
            </p>
          </div>

          {/* Interactive Filter Control (Zero-pill button segmented bar per anti-slop rules) */}
          <div className="flex flex-wrap p-1 bg-slate-900 border border-cyan-500/20 rounded-md text-xs font-mono">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ALL PROJECTS ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('highrise')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeFilter === 'highrise'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HIGH-RISE (G+16)
            </button>
            <button
              onClick={() => setActiveFilter('educational')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeFilter === 'educational'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EDUCATIONAL
            </button>
            <button
              onClick={() => setActiveFilter('residential')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeFilter === 'residential'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              RESIDENTIAL (G+IV)
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Specifications Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
