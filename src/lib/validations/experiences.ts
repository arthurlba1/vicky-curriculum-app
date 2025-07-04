import { z } from 'zod';

export const professionalExperienceSchema = z.object({
  category: z.literal('professional'),
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  isCurrent: z.boolean().default(false),
  description: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters'),
  skills: z.array(z.string()).default([]),
  skillDescriptions: z.record(z.string()).optional(),
});

export const academicExperienceSchema = z.object({
  category: z.literal('academic'),
  title: z.string().min(1, 'Degree/Program title is required'),
  institution: z.string().min(1, 'Institution name is required'),
  startDate: z.date(),
  endDate: z.date().optional(),
  isCurrent: z.boolean().default(false),
  description: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters'),
  skills: z.array(z.string()).default([]),
  skillDescriptions: z.record(z.string()).optional(),
});

export const projectExperienceSchema = z.object({
  category: z.literal('project'),
  title: z.string().min(1, 'Project title is required'),
  description: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters'),
  skills: z.array(z.string()).default([]),
  skillDescriptions: z.record(z.string()).optional(),
});

export const experienceSchema = z.discriminatedUnion('category', [
  professionalExperienceSchema,
  academicExperienceSchema,
  projectExperienceSchema,
]);

export type ProfessionalExperienceFormData = z.infer<
  typeof professionalExperienceSchema
>;
export type AcademicExperienceFormData = z.infer<
  typeof academicExperienceSchema
>;
export type ProjectExperienceFormData = z.infer<typeof projectExperienceSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
