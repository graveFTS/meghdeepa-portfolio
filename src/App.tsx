import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CadBackground } from './components/CadBackground';
import { CadCrosshair } from './components/CadCrosshair';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { BlueprintViewer } from './components/BlueprintViewer';
import { FarCalculator } from './components/FarCalculator';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
import { PdfDownloadCenter } from './components/PdfDownloadCenter';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [themeMode, setThemeMode] = useState<'blueprint' | 'dark' | 'linen'>('blueprint');
  const [crosshairEnabled, setCrosshairEnabled] = useState<boolean>(true);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPdfCenter = () => {
    const el = document.getElementById('pdf-center');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen relative font-sans ${themeMode === 'linen' ? 'theme-linen' : ''}`}>
      {/* Dynamic Architectural CAD Background */}
      <CadBackground themeMode={themeMode} />

      {/* CAD Crosshair Reticle Tool */}
      <CadCrosshair enabled={crosshairEnabled} />

      {/* Primary Architectural Navigation */}
      <Navbar
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        crosshairEnabled={crosshairEnabled}
        setCrosshairEnabled={setCrosshairEnabled}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onExploreProjects={scrollToProjects}
          onOpenPdfCenter={scrollToPdfCenter}
        />

        <ProjectsSection />

        <BlueprintViewer />

        <FarCalculator />

        <ExperienceTimeline />

        <SkillsSection />

        <PdfDownloadCenter />

        <ContactSection />
      </main>

      {/* Architectural Title Block Footer */}
      <Footer />
    </div>
  );
}
