import {
  AcademicExperienceFormData,
  Experience,
  ProfessionalExperienceFormData,
  ProjectExperienceFormData,
} from '@/lib/validations/experiences';

export const transformExperienceFormData = (
  data:
    | ProfessionalExperienceFormData
    | AcademicExperienceFormData
    | ProjectExperienceFormData
): Experience | undefined => {
  const { category } = data;

  if (category === 'professional') {
    return transformProfessionalExperienceFormData(data);
  }
  if (category === 'academic') {
    return transformAcademicExperienceFormData(data);
  }
  if (category === 'project') {
    return transformProjectExperienceFormData(data);
  }
};

const transformProfessionalExperienceFormData = (
  data: ProfessionalExperienceFormData
): Experience => {
  return {
    category: 'professional',
    name: data.title,
    subname: data.company,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrent: data.isCurrent,
    location: data.location,
    description: data.description,
    skills: data.skills,
    skillsDescription: data.skillsDescription,
  };
};

const transformAcademicExperienceFormData = (
  data: AcademicExperienceFormData
): Experience => {
  return {
    category: 'academic',
    name: data.title,
    subname: data.institution,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrent: data.isCurrent,
    description: data.description,
    skills: data.skills,
    skillsDescription: data.skillsDescription,
  };
};

const transformProjectExperienceFormData = (
  data: ProjectExperienceFormData
): Experience => {
  return {
    category: 'project',
    name: data.title,
    description: data.description,
    skills: data.skills,
    skillsDescription: data.skillsDescription,
  };
};
