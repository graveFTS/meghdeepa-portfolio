export type ProjectCategory = 'all' | 'educational' | 'residential' | 'highrise';

export interface AreaStatementItem {
  label: string;
  value: string;
  metric?: string;
}

export interface SpecificationItem {
  component: string;
  detail: string;
}

export interface DoorWindowItem {
  mark: string;
  type: 'Door' | 'Window' | 'Sliding' | 'Ventilator';
  width: string;
  height: string;
  sillHeight?: string;
  lintelHeight?: string;
  count?: number;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'educational' | 'residential' | 'highrise';
  drawingNo: string;
  date: string;
  scale: string;
  location: string;
  municipality: string;
  tools: string[];
  client: string;
  description: string;
  keyHighlights: string[];
  areaStatement: AreaStatementItem[];
  specifications: SpecificationItem[];
  doorWindowSchedule: DoorWindowItem[];
  plumbingAndFire: {
    tankType: string;
    capacity: string;
    dimensions: string;
    notes: string;
  }[];
  floorPlans: {
    name: string;
    level: string;
    area: string;
    description: string;
  }[];
  pdfFileName: string;
}

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  responsibilities: string[];
  tools: string[];
}

export interface EducationData {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string;
}
