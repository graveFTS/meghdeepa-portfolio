import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight, FileSpreadsheet, RotateCcw } from 'lucide-react';

export const FarCalculator: React.FC = () => {
  // Inputs
  const [landKatha, setLandKatha] = useState<number>(15);
  const [roadWidth, setRoadWidth] = useState<number>(5.7);
  const [proposedCoveragePercent, setProposedCoveragePercent] = useState<number>(49.66);
  const [proposedFloors, setProposedFloors] = useState<number>(4);
  const [parkingSpacesProvided, setParkingSpacesProvided] = useState<number>(21);

  // Constants: 1 Katha = 66.89 sq.m (or 720 sq.ft)
  const landAreaSqM = Math.round(landKatha * 66.89 * 100) / 100;
  const landAreaSqFt = Math.round(landKatha * 720 * 100) / 100;

  // Determine Permissible FAR based on Road Width (WB Municipal Building Rules 1993 standard table)
  let permissibleFar = 1.25;
  let permissibleHeight = 11.5;
  let permissibleCoverage = 50.0;

  if (roadWidth >= 15.0) {
    permissibleFar = 2.75;
    permissibleHeight = 45.0;
  } else if (roadWidth >= 10.0) {
    permissibleFar = 2.25;
    permissibleHeight = 24.0;
  } else if (roadWidth >= 7.0) {
    permissibleFar = 2.0;
    permissibleHeight = 18.0;
  } else if (roadWidth >= 5.0) {
    permissibleFar = 1.75;
    permissibleHeight = 15.55;
  } else if (roadWidth >= 3.5) {
    permissibleFar = 1.5;
    permissibleHeight = 12.5;
  }

  // Permissible Ground Coverage Area
  const permissibleGroundCoverageSqM = (landAreaSqM * (permissibleCoverage / 100));
  const proposedGroundCoverageSqM = (landAreaSqM * (proposedCoveragePercent / 100));

  // Permissible Built-Up Area (BUA)
  const permissibleBuaSqM = (landAreaSqM * permissibleFar);

  // Estimated gross area across proposed floors
  const grossFloorAreaSqM = proposedGroundCoverageSqM * proposedFloors;

  // Standard deductions under municipal rules (staircase ~15m² x floors, lift ~15m², parking ~20m² per car)
  const stairDeduction = 15 * proposedFloors;
  const liftDeduction = 15;
  const parkingDeduction = parkingSpacesProvided * 19.15;
  const totalDeductedAreaSqM = stairDeduction + liftDeduction + parkingDeduction;

  const netFloorAreaSqM = Math.max(grossFloorAreaSqM - totalDeductedAreaSqM, 0);
  const achievedFar = landAreaSqM > 0 ? (netFloorAreaSqM / landAreaSqM) : 0;

  const isFarCompliant = achievedFar <= permissibleFar;
  const isCoverageCompliant = proposedCoveragePercent <= permissibleCoverage;
  const isFullyCompliant = isFarCompliant && isCoverageCompliant;

  const handleResetToMaheshtala = () => {
    setLandKatha(15);
    setRoadWidth(5.7);
    setProposedCoveragePercent(49.66);
    setProposedFloors(4);
    setParkingSpacesProvided(21);
  };

  const handleSetToSchool = () => {
    setLandKatha(72.46);
    setRoadWidth(7.7);
    setProposedCoveragePercent(19.84);
    setProposedFloors(3);
    setParkingSpacesProvided(12);
  };

  return (
    <section id="far-calculator" className="py-16 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>STATUTORY BY-LAW ENGINE</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>WEST BENGAL MUNICIPAL BUILDING RULES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Interactive FAR & Area Calculator
            </h2>
            <p className="mt-1 text-sm text-slate-400 font-sans max-w-2xl">
              An engineering utility demonstrating Meghdeepa's command over municipal floor area ratios, road width multipliers, statutory ground coverage, and deduction calculations.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">LOAD PRESET:</span>
            <button
              onClick={handleResetToMaheshtala}
              className="px-2.5 py-1 rounded border border-cyan-500/30 bg-slate-900 text-xs font-mono text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              Maheshtala 15K G+IV
            </button>
            <button
              onClick={handleSetToSchool}
              className="px-2.5 py-1 rounded border border-cyan-500/30 bg-slate-900 text-xs font-mono text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              School 72K G+IV
            </button>
          </div>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Controls (Left Column) */}
          <div className="lg:col-span-5 p-6 rounded-lg bg-slate-900 border border-cyan-500/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="font-mono text-xs font-bold text-amber-400">
                SITE & DESIGN PARAMETERS
              </span>
              <button
                onClick={handleResetToMaheshtala}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET</span>
              </button>
            </div>

            {/* Land Area in Katha */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-slate-300">Plot Land Area (Katha):</label>
                <span className="text-cyan-300 font-bold">{landKatha} Katha</span>
              </div>
              <input
                type="range"
                min="3"
                max="100"
                step="0.5"
                value={landKatha}
                onChange={(e) => setLandKatha(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>≈ {landAreaSqM.toLocaleString()} m²</span>
                <span>≈ {landAreaSqFt.toLocaleString()} sq.ft</span>
              </div>
            </div>

            {/* Abutting Road Width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-slate-300">Front Road Width (Meters):</label>
                <span className="text-amber-400 font-bold">{roadWidth} M ({(roadWidth * 3.28084).toFixed(1)} ft)</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="30.0"
                step="0.1"
                value={roadWidth}
                onChange={(e) => setRoadWidth(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] font-mono text-slate-500 block">
                Rule: Road width controls permissible building height & allowable F.A.R multiplier.
              </span>
            </div>

            {/* Proposed Ground Coverage % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-slate-300">Proposed Ground Coverage (%):</label>
                <span className="text-cyan-300 font-bold">{proposedCoveragePercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="65"
                step="0.5"
                value={proposedCoveragePercent}
                onChange={(e) => setProposedCoveragePercent(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] font-mono text-slate-500 block">
                Statutory Max for Residential/School: 50.00%
              </span>
            </div>

            {/* Proposed Storeys / Floors */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-slate-300">Proposed Building Floors:</label>
                <span className="text-white font-bold">{proposedFloors} Floors (G+{proposedFloors})</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={proposedFloors}
                onChange={(e) => setProposedFloors(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Provided Car Parking */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-slate-300">Provided Covered Parking Spaces:</label>
                <span className="text-amber-400 font-bold">{parkingSpacesProvided} Cars</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={parkingSpacesProvided}
                onChange={(e) => setParkingSpacesProvided(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] font-mono text-slate-500 block">
                Permissible parking deduction under Rule 20: ~19.15 m² / slot.
              </span>
            </div>
          </div>

          {/* Real-time Statutory Audit & Area Statement Table (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Compliance Banner */}
            <div
              className={`p-4 rounded-lg border font-mono text-xs flex items-center justify-between gap-4 ${
                isFullyCompliant
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/40 text-red-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {isFullyCompliant ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold block">
                    {isFullyCompliant
                      ? 'SANCTION ELIGIBLE: WITHIN STATUTORY LIMITS'
                      : 'VIOLATION DETECTED: EXCEEDS PERMISSIBLE PARAMETERS'}
                  </span>
                  <span className="text-[11px] text-slate-300 font-sans">
                    {isFullyCompliant
                      ? 'The proposed FAR and ground coverage satisfy West Bengal Municipal Building Rules.'
                      : 'Proposed FAR or Ground Coverage exceeds municipal threshold for the chosen road width.'}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[10px] block text-slate-400">ACHIEVED F.A.R</span>
                <span className="text-xl font-bold font-mono">
                  {achievedFar.toFixed(3)}
                </span>
                <span className="text-[10px] text-slate-400 block">/ {permissibleFar.toFixed(2)} MAX</span>
              </div>
            </div>

            {/* Generated Area Statement Table */}
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-cyan-300">
                <span className="font-bold">GENERATED MUNICIPAL AREA SCHEDULE</span>
                <span className="text-[10px] text-slate-500">SCHEDULE OF CALCULATION</span>
              </div>

              <div className="divide-y divide-slate-800/80 text-[11px]">
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">1. Total Site Land Area:</span>
                  <span className="text-white font-semibold">{landAreaSqM.toFixed(2)} m² ({landKatha} Katha)</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">2. Front Road Width:</span>
                  <span className="text-white font-semibold">{roadWidth} m (Permissible Height: {permissibleHeight} m)</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">3. Permissible Ground Coverage:</span>
                  <span className="text-slate-200">50.00% ({permissibleGroundCoverageSqM.toFixed(2)} m²)</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">4. Proposed Ground Coverage:</span>
                  <span className={`font-semibold ${isCoverageCompliant ? 'text-emerald-400' : 'text-red-400'}`}>
                    {proposedCoveragePercent.toFixed(2)}% ({proposedGroundCoverageSqM.toFixed(2)} m²)
                  </span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">5. Total Gross Built-Up Area:</span>
                  <span className="text-slate-200">{grossFloorAreaSqM.toFixed(2)} m² across {proposedFloors} tiers</span>
                </div>
                <div className="py-1.5 flex justify-between text-amber-400/90">
                  <span className="text-slate-400">6. Statutory Deductions (Stairs + Lift + Parking):</span>
                  <span>- {totalDeductedAreaSqM.toFixed(2)} m²</span>
                </div>
                <div className="py-1.5 flex justify-between font-bold border-t border-slate-700 pt-2 text-cyan-300">
                  <span>7. Total Net Floor Area (for F.A.R):</span>
                  <span>{netFloorAreaSqM.toFixed(2)} m²</span>
                </div>
                <div className="py-1.5 flex justify-between font-bold text-amber-400">
                  <span>8. Proposed F.A.R:</span>
                  <span>{achievedFar.toFixed(3)} (Permissible: {permissibleFar.toFixed(2)})</span>
                </div>
              </div>
            </div>

            {/* Technical Verification Note */}
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed p-3 bg-slate-950 rounded border border-cyan-500/10">
              Note: Calculations incorporate mandatory stairwell core exclusions (15 m²/flight), lift machine headroom deductions, and covered parking relief clauses pursuant to Rule 20 of West Bengal Municipal Building Rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
