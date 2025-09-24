
export interface BasicInfo {
  name: string;
  title: string;
  bio: string;
  profilePicture: string; // Base64 encoded string
}

export interface Skills {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
}

export interface Design {
  theme: 'light' | 'dark';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'cyan';
  layout: 'one-page' | 'multi-page';
}

export interface PortfolioData {
  basicInfo: BasicInfo;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  design: Design;
}
