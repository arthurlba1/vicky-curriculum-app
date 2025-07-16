import { z } from 'zod';

export const professionalExperienceSchema = z.object({
  category: z.literal('professional'),
  title: z
    .string({
      required_error: 'Job title is required',
      invalid_type_error: 'Job title must be text',
    })
    .min(1, 'Job title cannot be empty')
    .max(100, 'Job title must be less than 100 characters'),
  company: z
    .string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be text',
    })
    .min(1, 'Company name cannot be empty')
    .max(100, 'Company name must be less than 100 characters'),
  location: z
    .string({
      invalid_type_error: 'Location must be text',
    })
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  startDate: z
    .date({
      required_error: 'Start date is required',
      invalid_type_error: 'Please select a valid start date',
    })
    .refine(date => date <= new Date(), {
      message: 'Start date cannot be in the future',
    }),
  endDate: z
    .date({
      invalid_type_error: 'Please select a valid end date',
    })
    .optional()
    .refine(
      date => {
        if (date) return date <= new Date();
        return true;
      },
      {
        message: 'End date cannot be in the future',
      }
    ),
  isCurrent: z
    .boolean({
      invalid_type_error: 'Current position status must be true or false',
    })
    .default(false),
  description: z
    .string({
      required_error: 'Job description is required',
      invalid_type_error: 'Description must be text',
    })
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must be less than 500 characters'),
  skills: z
    .array(z.string(), {
      invalid_type_error: 'Skills must be a list',
    })
    .min(1, 'Please select at least one skill')
    .max(20, 'Maximum 20 skills allowed')
    .default([]),
  skillsDescription: z
    .record(
      z.string({
        required_error: 'Skill description is required',
      })
    )
    .optional(),
});

export const academicExperienceSchema = z.object({
  category: z.literal('academic'),
  title: z
    .string({
      required_error: 'Degree or program title is required',
      invalid_type_error: 'Title must be text',
    })
    .min(1, 'Degree/program title cannot be empty')
    .max(150, 'Title must be less than 150 characters'),
  institution: z
    .string({
      required_error: 'Institution name is required',
      invalid_type_error: 'Institution name must be text',
    })
    .min(1, 'Institution name cannot be empty')
    .max(100, 'Institution name must be less than 100 characters'),
  startDate: z
    .date({
      required_error: 'Start date is required',
      invalid_type_error: 'Please select a valid start date',
    })
    .refine(date => date <= new Date(), {
      message: 'Start date cannot be in the future',
    }),
  endDate: z
    .date({
      invalid_type_error: 'Please select a valid end date',
    })
    .optional()
    .refine(
      date => {
        if (date) return date <= new Date();
        return true;
      },
      {
        message: 'End date cannot be in the future',
      }
    ),
  isCurrent: z
    .boolean({
      invalid_type_error: 'Current status must be true or false',
    })
    .default(false),
  description: z
    .string({
      required_error: 'Academic experience description is required',
      invalid_type_error: 'Description must be text',
    })
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must be less than 500 characters'),
  skills: z
    .array(z.string(), {
      invalid_type_error: 'Skills must be a list',
    })
    .min(1, 'Please select at least one skill')
    .max(20, 'Maximum 20 skills allowed')
    .default([]),
  skillsDescription: z
    .record(
      z.string({
        required_error: 'Skill description is required',
      })
    )
    .optional(),
});

export const projectExperienceSchema = z.object({
  category: z.literal('project'),
  title: z
    .string({
      required_error: 'Project title is required',
      invalid_type_error: 'Project title must be text',
    })
    .min(1, 'Project title cannot be empty')
    .max(100, 'Project title must be less than 100 characters'),
  description: z
    .string({
      required_error: 'Project description is required',
      invalid_type_error: 'Description must be text',
    })
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must be less than 500 characters'),
  skills: z
    .array(z.string(), {
      invalid_type_error: 'Skills must be a list',
    })
    .min(1, 'Please select at least one skill')
    .max(20, 'Maximum 20 skills allowed')
    .default([]),
  skillsDescription: z
    .record(
      z.string({
        required_error:
          'Please provide a description of what you used this skill for',
      })
    )
    .optional(),
});

export const experienceSchema = z.discriminatedUnion('category', [
  professionalExperienceSchema,
  academicExperienceSchema,
  projectExperienceSchema,
]);

export type Experience = {
  category: 'professional' | 'academic' | 'project';
  name: string;
  subName?: string;
  startDate?: Date;
  endDate?: Date;
  isCurrent?: boolean;
  location?: string;
  description: string;
  skills: string[];
  skillsDescription?: Record<string, string>;
};

export type ProfessionalExperienceFormData = z.infer<
  typeof professionalExperienceSchema
>;
export type AcademicExperienceFormData = z.infer<
  typeof academicExperienceSchema
>;
export type ProjectExperienceFormData = z.infer<typeof projectExperienceSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
