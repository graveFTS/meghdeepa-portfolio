import { jsPDF } from 'jspdf';
import { ProjectData, SpecificationItem, AreaStatementItem, DoorWindowItem } from '../types/portfolio';
import { PERSONAL_INFO, EXPERIENCES, EDUCATIONS } from '../data/portfolioData';

// Helper to draw architectural blueprint border & title block
function drawArchitecturalBorder(doc: jsPDF, sheetTitle: string, drawingNo: string, scale: string, date: string, pageNum: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Outer border
  doc.setDrawColor(20, 45, 80);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Inner border
  doc.setDrawColor(30, 60, 100);
  doc.setLineWidth(0.3);
  doc.rect(margin + 2, margin + 2, pageWidth - 2 * margin - 4, pageHeight - 2 * margin - 4);

  // Bottom Title Block
  const titleBlockHeight = 24;
  const tbY = pageHeight - margin - titleBlockHeight - 2;
  const tbWidth = pageWidth - 2 * margin - 4;
  const tbX = margin + 2;

  doc.setFillColor(245, 248, 252);
  doc.rect(tbX, tbY, tbWidth, titleBlockHeight, 'F');
  doc.setDrawColor(40, 80, 130);
  doc.setLineWidth(0.4);
  doc.line(tbX, tbY, tbX + tbWidth, tbY);

  // Subdivisions in title block
  doc.line(tbX + 55, tbY, tbX + 55, tbY + titleBlockHeight);
  doc.line(tbX + 130, tbY, tbX + 130, tbY + titleBlockHeight);
  doc.line(tbX + tbWidth - 35, tbY, tbX + tbWidth - 35, tbY + titleBlockHeight);

  // Title block content
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(20, 50, 90);
  doc.text('ARCHITECTURAL DRAWING SHEET', tbX + 3, tbY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(70, 85, 105);
  doc.text(`CANDIDATE: ${PERSONAL_INFO.name}`, tbX + 3, tbY + 12);
  doc.text(`ROLE: ${PERSONAL_INFO.title}`, tbX + 3, tbY + 17);
  doc.text(`PHONE: ${PERSONAL_INFO.phone}`, tbX + 3, tbY + 22);

  // Center: Project & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 35, 65);
  doc.text(sheetTitle.toUpperCase(), tbX + 58, tbY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(60, 80, 100);
  doc.text(`DWG NO: ${drawingNo}`, tbX + 58, tbY + 12);
  doc.text(`SCALE: ${scale}  |  DATE: ${date}`, tbX + 58, tbY + 17);
  doc.text(`MUNICIPALITY: WB Municipal Building Rules / NBC India`, tbX + 58, tbY + 22);

  // Office / Studio Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(20, 50, 90);
  doc.text('CONSULTING STUDIO', tbX + 133, tbY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(70, 85, 105);
  doc.text('Rethym Space Design / Architecture', tbX + 133, tbY + 11);
  doc.text('Kolkata & Siliguri, West Bengal', tbX + 133, tbY + 16);
  doc.text(`EMAIL: ${PERSONAL_INFO.email}`, tbX + 133, tbY + 21);

  // Sheet number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(20, 45, 80);
  doc.text('SHEET', tbX + tbWidth - 30, tbY + 8);
  doc.setFontSize(11);
  doc.setTextColor(10, 30, 60);
  doc.text(`0${pageNum} / 0${totalPages}`, tbX + tbWidth - 30, tbY + 17);
}

// Generate Meghdeepa's Comprehensive Architectural Resume PDF
export function generateResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy slate #0f172a
  doc.rect(margin, margin, contentWidth, 34, 'F');

  // Decorative border
  doc.setDrawColor(245, 158, 11); // Amber accent
  doc.setLineWidth(1.5);
  doc.line(margin, margin + 34, margin + contentWidth, margin + 34);

  // Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(PERSONAL_INFO.name, margin + 8, margin + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(245, 158, 11); // Amber
  doc.text(PERSONAL_INFO.title.toUpperCase(), margin + 8, margin + 18);

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(`${PERSONAL_INFO.location}  |  Tel: ${PERSONAL_INFO.formattedPhone}  |  Email: ${PERSONAL_INFO.email}`, margin + 8, margin + 26);

  let y = margin + 42;

  // Helper Section Heading
  const drawSectionHeading = (title: string, currentY: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, currentY);

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY + 2, margin + contentWidth, currentY + 2);

    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(1.2);
    doc.line(margin, currentY + 2, margin + 30, currentY + 2);

    return currentY + 8;
  };

  // Professional Summary
  y = drawSectionHeading('Professional Profile & Engineering Summary', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(PERSONAL_INFO.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4 + 4;

  // Professional Experience
  y = drawSectionHeading('Professional Experience', y);

  EXPERIENCES.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.company, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${exp.period}  |  ${exp.location}`, margin + contentWidth, y, { align: 'right' });
    y += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(217, 119, 6);
    doc.text(exp.role, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);

    exp.responsibilities.forEach((resp) => {
      doc.text('•', margin + 2, y);
      const respLines = doc.splitTextToSize(resp, contentWidth - 8);
      doc.text(respLines, margin + 6, y);
      y += respLines.length * 3.6 + 1.2;
    });

    y += 2;
  });

  // Projects Summary
  y = drawSectionHeading('Key Architectural & Engineering Projects', y);

  const projectsSummary = [
    {
      title: 'Maheshtala G+IV Residential Building',
      tools: 'AutoCAD, SketchUp, Area Statement Math',
      desc: 'Developed comprehensive 2D floor plans, elevations, sections, and structural layouts for a 15-Katha G+IV residential complex. Accommodated 21 covered car parking slots, 8 units per typical floor, and 2.5m municipal road gift strip.',
    },
    {
      title: 'The Foundation School Campus (Educational G+IV)',
      tools: 'AutoCAD, Space Planning, Universal Accessibility, Fire UGWR',
      desc: 'Formulated master space planning for educational campus on a 72-Katha plot. Designed 20+ specialized classrooms, 4 science/math laboratories, 3m wide corridors, 1:12 accessible ramps, and 52,290L fire + 45,150L drinking underground reservoirs.',
    },
    {
      title: 'G+16 Residential High-Rise Tower, Newtown',
      tools: 'AutoCAD, SketchUp, High-Rise Fire By-Laws, Mechanical Parklift',
      desc: 'Engineered 57-meter high-rise superstructure drawings complying with NKDA Kolkata Rules 2009. Incorporated 10-unit Parklift 411 (2.0 Tons) vehicular stackers, dual fire refuge decks (+23.529m and +39.029m), and 151.49 KLD fire UGWR.',
    },
  ];

  projectsSummary.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 64, 14);
    doc.text(proj.tools, margin + contentWidth, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(proj.desc, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 3.5 + 2.5;
  });

  // Education
  y = drawSectionHeading('Education & Certifications', y);

  EDUCATIONS.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(edu.period, margin + contentWidth, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(edu.degree, margin, y);
    y += 4;
  });

  // Technical Skills Matrix
  y = drawSectionHeading('Technical Skills & Domain Competencies', y + 1);

  const skillsBlock = [
    { label: 'Drafting & 3D Modeling:', val: 'AutoCAD (2D Advanced), SketchUp (3D Modeling & Exterior Visualization)' },
    { label: 'Visualization & Rendering:', val: 'Adobe Photoshop, Presentation Drawings, Architectural Plan Rendering' },
    { label: 'Documentation & Drawings:', val: 'Working Drawings, Construction Detailing, Site Plans, Sections A-A/B-B/C-C, Elevations' },
    { label: 'Codes, By-Laws & Calculation:', val: 'Space Planning, FAR & Ground Coverage Math, NKDA & HIDCO By-Laws, NBC Fire Norms' },
    { label: 'Engineering Software & Tools:', val: 'MS Word, MS Excel (Area Statements & BOQ), MS PowerPoint' },
  ];

  skillsBlock.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sk.label, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(sk.val, margin + 46, y);
    y += 4.2;
  });

  // Verification Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - margin - 6, margin + contentWidth, pageHeight - margin - 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Official Architectural Portfolio Document  |  Meghdeepa Maity  |  Verified Technical Resume', margin, pageHeight - margin - 2);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-GB')}`, margin + contentWidth, pageHeight - margin - 2, { align: 'right' });

  doc.save('Meghdeepa_Maity_Architecture_Resume.pdf');
}

// Generate Detailed Architectural Drawing Sheet & Specification Dossier PDF for a given Project
export function generateProjectBlueprintPdf(project: ProjectData): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const totalPages = 2;

  // ---------------- PAGE 1: PROJECT DECLARATION, AREA STATEMENT & SPECS ----------------
  drawArchitecturalBorder(doc, `${project.title} - Architectural Drawing & Area Statement`, project.drawingNo, project.scale, project.date, 1, totalPages);

  // Sheet Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(14, 14, pageWidth - 28, 16, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(project.title.toUpperCase(), 18, 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(245, 158, 11);
  doc.text(`PROJECT SUBTITLE: ${project.subtitle}  |  LOCATION: ${project.location}`, 18, 27);

  // Column 1: Project Description & Key Highlights (Left side)
  const col1X = 14;
  const col1W = 125;
  let y1 = 35;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('PROJECT OVERVIEW & ARCHITECTURAL INTENT', col1X, y1);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.line(col1X, y1 + 1.5, col1X + col1W, y1 + 1.5);
  y1 += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(project.description, col1W);
  doc.text(descLines, col1X, y1);
  y1 += descLines.length * 3.5 + 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('TECHNICAL & DESIGN HIGHLIGHTS', col1X, y1);
  doc.line(col1X, y1 + 1.5, col1X + col1W, y1 + 1.5);
  y1 += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  project.keyHighlights.forEach((hl: string) => {
    doc.text('•', col1X + 1, y1);
    const hlLines = doc.splitTextToSize(hl, col1W - 6);
    doc.text(hlLines, col1X + 5, y1);
    y1 += hlLines.length * 3.4 + 2;
  });

  // Specifications block
  y1 += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CIVIL & MATERIAL SPECIFICATIONS (AS PER IS CODES)', col1X, y1);
  doc.line(col1X, y1 + 1.5, col1X + col1W, y1 + 1.5);
  y1 += 5;

  project.specifications.forEach((sp: SpecificationItem) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(20, 50, 90);
    doc.text(`- ${sp.component}:`, col1X, y1);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 75, 95);
    const spLines = doc.splitTextToSize(sp.detail, col1W - 25);
    doc.text(spLines, col1X + 25, y1);
    y1 += spLines.length * 3.2 + 1.5;
  });

  // Column 2: Area Statement & Statutory Declarations (Right side)
  const col2X = 145;
  const col2W = pageWidth - 145 - 14;
  let y2 = 35;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('STATEMENT OF AREA & STATUTORY BY-LAWS', col2X, y2);
  doc.setDrawColor(245, 158, 11);
  doc.line(col2X, y2 + 1.5, col2X + col2W, y2 + 1.5);
  y2 += 5;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(col2X, y2, col2W, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text('PARAMETER', col2X + 3, y2 + 4);
  doc.text('SPECIFIED VALUE / BY-LAW VALUE', col2X + col2W - 3, y2 + 4, { align: 'right' });
  y2 += 6.5;

  // Table rows
  project.areaStatement.forEach((item: AreaStatementItem, index: number) => {
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(col2X, y2 - 3.2, col2W, 5, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(51, 65, 85);
    doc.text(item.label, col2X + 3, y2);
    doc.setFont('helvetica', 'bold');
    doc.text(item.value, col2X + col2W - 3, y2, { align: 'right' });
    y2 += 5.2;
  });

  // Statutory Declarations Box
  y2 += 2;
  doc.setFillColor(254, 252, 232); // light amber box
  doc.setDrawColor(251, 191, 36);
  doc.rect(col2X, y2, col2W, 35, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(146, 64, 14);
  doc.text('PROJECT DECLARATION & STATUTORY CERTIFICATION', col2X + 3, y2 + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(69, 26, 3);
  const certText = `I/WE HEREBY CERTIFY THAT THIS BUILDING PLAN HAS BEEN DRAWN UP IN CONFORMITY WITH THE PROVISIONS OF WEST BENGAL MUNICIPALITY BUILDING RULES / NKDA BUILDING RULES 2009 AND PREVAILING NATIONAL BUILDING CODE OF INDIA (NBC). THE SITE CONDITIONS, ROAD WIDTHS, MANDATORY SETBACKS, FIRE SYSTEMS, AND LOAD CALCULATIONS CONFORM TO FIELD CONDITIONS AND STATUTORY CODES.`;
  const certLines = doc.splitTextToSize(certText, col2W - 6);
  doc.text(certLines, col2X + 3, y2 + 10);

  // Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(20, 50, 90);
  doc.text('ARCHITECT: Rahul Majumdar', col2X + 3, y2 + 30);
  doc.text(`DRAFTED BY: ${PERSONAL_INFO.name}`, col2X + 65, y2 + 30);
  doc.text('STRUCTURAL: Prantik Chowdhury / S. Guha', col2X + 3, y2 + 33.5);

  // ---------------- PAGE 2: WATER RESERVOIR DETAILS, DOOR/WINDOW SCHEDULE & FLOOR LEVELS ----------------
  doc.addPage('landscape');
  drawArchitecturalBorder(doc, `${project.title} - Schedules, Water Systems & Floor Profiles`, project.drawingNo, project.scale, project.date, 2, totalPages);

  // Sheet Header
  doc.setFillColor(15, 23, 42);
  doc.rect(14, 14, pageWidth - 28, 13, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('ENGINEERING SCHEDULES & HYDRAULIC RESERVOIR SIZING', 18, 22);

  // Left side: Door & Window Schedule
  let sY = 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('SCHEDULE OF DOORS & WINDOWS', 14, sY);
  doc.setDrawColor(245, 158, 11);
  doc.line(14, sY + 1.5, 140, sY + 1.5);
  sY += 5;

  // Door Window Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, sY, 126, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('MARK', 16, sY + 4);
  doc.text('TYPE', 32, sY + 4);
  doc.text('WIDTH', 54, sY + 4);
  doc.text('HEIGHT', 76, sY + 4);
  doc.text('SILL HT', 98, sY + 4);
  doc.text('LINTEL HT', 120, sY + 4);
  sY += 6.5;

  project.doorWindowSchedule.forEach((dw: DoorWindowItem, idx: number) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, sY - 3.2, 126, 5, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(20, 50, 90);
    doc.text(dw.mark, 16, sY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(dw.type, 32, sY);
    doc.text(dw.width, 54, sY);
    doc.text(dw.height, 76, sY);
    doc.text(dw.sillHeight || '-', 98, sY);
    doc.text(dw.lintelHeight || '2.20 m', 120, sY);
    sY += 5;
  });

  // Right Side: Plumbing & Fire Water Reservoirs
  let rY = 32;
  const rX = 148;
  const rW = pageWidth - 148 - 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('UNDERGROUND WATER RESERVOIR & FIRE FIGHTING SYSTEM', rX, rY);
  doc.line(rX, rY + 1.5, rX + rW, rY + 1.5);
  rY += 6;

  project.plumbingAndFire.forEach((item: ProjectData['plumbingAndFire'][number]) => {
    doc.setFillColor(241, 245, 249);
    doc.rect(rX, rY, rW, 5.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(item.tankType.toUpperCase(), rX + 3, rY + 4);
    rY += 6.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    doc.text(`Capacity: ${item.capacity}`, rX + 4, rY);
    doc.text(`Dimensions: ${item.dimensions}`, rX + 65, rY);
    rY += 4.2;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    const nLines = doc.splitTextToSize(item.notes, rW - 8);
    doc.text(nLines, rX + 4, rY);
    rY += nLines.length * 3.2 + 3.5;
  });

  // Bottom block: Floor Level Zoning
  const bY = 115;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('FLOOR PROGRAMMING & SPATIAL BREAKDOWN', 14, bY);
  doc.line(14, bY + 1.5, pageWidth - 14, bY + 1.5);

  let fpX = 14;
  const cardW = (pageWidth - 28 - 9) / 4;
  project.floorPlans.forEach((fp: ProjectData['floorPlans'][number]) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.rect(fpX, bY + 5, cardW, 46, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(fp.name, fpX + 3, bY + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(217, 119, 6);
    doc.text(`Level: ${fp.level}`, fpX + 3, bY + 16);
    doc.setTextColor(71, 85, 105);
    doc.text(`Plate: ${fp.area}`, fpX + 3, bY + 20);

    const fpLines = doc.splitTextToSize(fp.description, cardW - 6);
    doc.text(fpLines, fpX + 3, bY + 25);

    fpX += cardW + 3;
  });

  doc.save(project.pdfFileName);
}
