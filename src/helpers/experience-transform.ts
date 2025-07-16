import {
  AcademicExperienceFormData,
  Experience,
  ProfessionalExperienceFormData,
  ProjectExperienceFormData,
} from '@/lib/validations/experiences';
import { ExperienceResponse } from '@/types';
import { techSkillsList } from '@/types/tech-skills';

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

// Reverse transform functions - from API response to form data
export const transformExperienceResponseToFormData = (
  experience: ExperienceResponse
):
  | ProfessionalExperienceFormData
  | AcademicExperienceFormData
  | ProjectExperienceFormData => {
  const { category } = experience;

  if (category === 'professional') {
    return transformProfessionalExperienceResponseToFormData(experience);
  }
  if (category === 'academic') {
    return transformAcademicExperienceResponseToFormData(experience);
  }
  if (category === 'project') {
    return transformProjectExperienceResponseToFormData(experience);
  }

  throw new Error(`Unknown experience category: ${category}`);
};

const transformProfessionalExperienceResponseToFormData = (
  experience: ExperienceResponse
): ProfessionalExperienceFormData => {
  const skillsDescription: Record<string, string> = {};
  const skills = experience.topics.map(topic => {
    skillsDescription[topic.category] = topic.description || '';

    const found = techSkillsList.find(t => t.value === topic.category);
    return found ?? { value: topic.category, label: topic.category };
  });

  return {
    category: 'professional',
    title: experience.name,
    company: experience.subName,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : undefined,
    isCurrent: experience.isCurrent || false,
    location: experience.location || '',
    description: experience.description,
    skills: skills.map(skill => skill.value),
    skillsDescription,
  };
};

const transformAcademicExperienceResponseToFormData = (
  experience: ExperienceResponse
): AcademicExperienceFormData => {
  const skillsDescription: Record<string, string> = {};
  const skills = experience.topics.map(topic => {
    skillsDescription[topic.category] = topic.description || '';

    const found = techSkillsList.find(t => t.value === topic.category);
    return found ?? { value: topic.category, label: topic.category };
  });

  return {
    category: 'academic',
    title: experience.name,
    institution: experience.subName,
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : undefined,
    isCurrent: experience.isCurrent || false,
    description: experience.description,
    skills: skills.map(skill => skill.value),
    skillsDescription,
  };
};

const transformProjectExperienceResponseToFormData = (
  experience: ExperienceResponse
): ProjectExperienceFormData => {
  const skillsDescription: Record<string, string> = {};
  const skills = experience.topics.map(topic => {
    skillsDescription[topic.category] = topic.description || '';

    const found = techSkillsList.find(t => t.value === topic.category);
    return found ?? { value: topic.category, label: topic.category };
  });

  return {
    category: 'project',
    title: experience.name,
    description: experience.description,
    skills: skills.map(skill => skill.value),
    skillsDescription,
  };
};

const transformProfessionalExperienceFormData = (
  data: ProfessionalExperienceFormData
): Experience => {
  return {
    category: 'professional',
    name: data.title,
    subName: data.company,
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
    subName: data.institution,
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
