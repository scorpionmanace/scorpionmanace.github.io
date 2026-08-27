// Types for the application

export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  temperature: 'warm' | 'cool' | 'neutral';
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: Color[];
  type: 'manual' | 'generated';
}

export type ToolStatus = 'live' | 'planned';

export interface Tool {
  id: string;
  name: string;
  description: string;
  /** Short label for dense card/list layouts. */
  tagline?: string;
  icon: string;
  route: string;
  category: string;
  tags?: string[];
  status?: ToolStatus;
  /** Surfaced on the home page's featured strip. */
  featured?: boolean;
}

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
  technicalSkills: Array<{
    category: string;
    skills: Array<{
      name: string;
      level: 'expert' | 'proficient' | 'comfortable';
    }>;
  }>;
  education: Array<{
    degree: string;
    school: string;
    graduation: string;
  }>;
  publications: Array<{
    title: string;
    conference?: string;
    journal?: string;
    year: string;
  }>;
}
