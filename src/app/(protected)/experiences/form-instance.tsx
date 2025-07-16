'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { AcademicForm } from '@/app/(protected)/experiences/forms/academic-form';
import { ProfessionalForm } from '@/app/(protected)/experiences/forms/professional-form';
import { ProjectForm } from '@/app/(protected)/experiences/forms/project-form';
import { ZodForm } from '@/components/shadcn/form';
import {
  type ExperienceFormData,
  academicExperienceSchema,
  professionalExperienceSchema,
  projectExperienceSchema,
} from '@/lib/validations/experiences';
import { ExperienceFormInstanceRef, ExperienceType } from '@/types/experience';

interface ExperienceFormInstanceProps {
  id: string;
  type: ExperienceType;
  defaultValues?: ExperienceFormData;
  disabled?: boolean;
}

export const ExperienceFormInstance = forwardRef<
  ExperienceFormInstanceRef,
  ExperienceFormInstanceProps
>(({ type, defaultValues, disabled }, ref) => {
  const getSchemaAndDefaults = () => {
    switch (type) {
      case 'professional':
        return {
          schema: professionalExperienceSchema,
          defaults: {
            category: 'professional' as const,
            title: '',
            company: '',
            description: '',
          },
        };
      case 'academic':
        return {
          schema: academicExperienceSchema,
          defaults: {
            category: 'academic' as const,
            title: '',
            institution: '',
            description: '',
          },
        };
      case 'project':
        return {
          schema: projectExperienceSchema,
          defaults: {
            category: 'project' as const,
            title: '',
            description: '',
          },
        };
      default:
        throw new Error(`Unknown experience type: ${type}`);
    }
  };

  const { schema, defaults } = getSchemaAndDefaults();

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues ?? (defaults as any),
    mode: 'onSubmit',
  });

  console.log('Default values:', defaultValues);

  useImperativeHandle(ref, () => ({
    async validateAndGetValues(): Promise<ExperienceFormData | null> {
      try {
        const isValid = await form.trigger();
        if (!isValid) return null;

        const values = form.getValues();
        return values as ExperienceFormData;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  }));

  return (
    <ZodForm form={form} className="flex flex-col gap-4" onSubmit={() => {}}>
      {({ Input, Calendar, Checkbox, Textarea, MultiSelect }) => (
        <>
          {type === 'professional' && (
            <ProfessionalForm
              Input={Input}
              Calendar={Calendar}
              Checkbox={Checkbox}
              Textarea={Textarea}
              MultiSelect={MultiSelect}
              form={form}
              disabled={disabled}
            />
          )}
          {type === 'academic' && (
            <AcademicForm
              Input={Input}
              Calendar={Calendar}
              Checkbox={Checkbox}
              Textarea={Textarea}
              MultiSelect={MultiSelect}
              form={form}
              disabled={disabled}
            />
          )}
          {type === 'project' && (
            <ProjectForm
              Input={Input}
              Textarea={Textarea}
              MultiSelect={MultiSelect}
              form={form}
              disabled={disabled}
            />
          )}
        </>
      )}
    </ZodForm>
  );
});

ExperienceFormInstance.displayName = 'ExperienceFormInstance';
