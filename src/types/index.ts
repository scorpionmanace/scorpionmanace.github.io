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

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  category: string;
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
