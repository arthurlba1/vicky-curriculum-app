import { ExperienceFormData } from '@/lib/validations/experiences';

export const ExperienceOptions = {
  PROJECT: 'project',
  PROFESSIONAL: 'professional',
  ACADEMIC: 'academic',
} as const;

export type ExperienceType =
  (typeof ExperienceOptions)[keyof typeof ExperienceOptions];

export type ExperienceState = 'creational' | 'display';

export interface BaseExperience {
  id?: string;
  category: ExperienceType;
  title: string;
  description: string;
  skills?: string[];
}

export interface ProfessionalExperience extends BaseExperience {
  category: 'professional';
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  company: string;
  location?: string;
}

export interface AcademicExperience extends BaseExperience {
  category: 'academic';
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  institution: string;
}

export interface ProjectExperience extends BaseExperience {
  category: 'project';
}

export type Experience =
  | ProfessionalExperience
  | AcademicExperience
  | ProjectExperience;

export interface ExperienceFormInstanceRef {
  validateAndGetValues: () => Promise<ExperienceFormData | null>;
}
