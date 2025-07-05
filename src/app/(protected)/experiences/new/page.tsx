'use client';

import React, { useRef, useState } from 'react';

import { Briefcase, GraduationCap, RocketIcon, X } from 'lucide-react';

import { FloatingActionButton as FAB } from '@/components/floating-action-button';
import BlurText from '@/components/react-bits/BlurText';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import { type ExperienceFormData } from '@/lib/validations/experiences';
import { ExperienceFormInstanceRef, ExperienceType } from '@/types/experience';

import { createExperiences } from './actions';
import { ExperienceFormInstance } from './new-form-instance';

export default function NewExperiencePage() {
  const [forms, setForms] = useState<{ id: string; type: ExperienceType }[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRefs = useRef<
    Record<string, React.RefObject<ExperienceFormInstanceRef | null>>
  >({});

  const handleAddForm = (type: ExperienceType) => {
    const id = `${type}-${Date.now()}`;
    formRefs.current[id] = React.createRef<ExperienceFormInstanceRef>();
    setForms(prev => [...prev, { id, type }]);
  };

  const handleRemoveForm = (idToRemove: string) => {
    setForms(prev => prev.filter(form => form.id !== idToRemove));
    delete formRefs.current[idToRemove];
  };

  const handleSubmitAll = async () => {
    if (forms.length === 0) {
      alert('Please add at least one experience form before submitting.');
      return;
    }

    setIsSubmitting(true);
    const validatedForms: ExperienceFormData[] = [];
    const errors: string[] = [];

    try {
      for (const { id, type } of forms) {
        const formRef = formRefs.current[id];
        if (!formRef?.current) {
          errors.push(`Form ${id} (${type}) reference not found`);
          continue;
        }

        const values = await formRef.current.validateAndGetValues();
        if (!values) {
          errors.push(`Form ${id} (${type}) validation failed`);
        } else {
          validatedForms.push(values);
        }
      }

      if (errors.length > 0) {
        console.error('Validation errors:', errors);
        alert(`Some forms have errors:\n${errors.join('\n')}`);
        return;
      }

      const response = await createExperiences(validatedForms);

      if (response.success) {
        alert(
          `${response.message}\n\nCreated IDs: ${response.data?.map(exp => exp.id).join(', ')}`
        );

        setForms([]);
        formRefs.current = {};
      } else {
        alert(`Submission failed: ${response.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Section - Sticky with transparency */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-none border-b border-border/50">
        <div className="flex flex-col gap-4 p-4">
          <BlurText
            text="Create New Experiences"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl font-bold"
          />
        </div>
        <Separator />
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {forms.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] text-muted-foreground">
              <p className="text-lg mb-2">No experiences added yet</p>
              <p>Use the floating action button to add your first experience</p>
            </div>
          )}

          {forms.map(form => (
            <div key={form.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 h-8 w-8 p-0"
                onClick={() => handleRemoveForm(form.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <ExperienceFormInstance
                id={form.id}
                type={form.type}
                ref={formRefs.current[form.id]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Section - Sticky bottom */}
      {forms.length > 0 && (
        <div className="sticky bottom-0 z-10 bg-background/90 backdrop-blur-none border-t border-border/50">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex gap-4 justify-start">
              <Button onClick={handleSubmitAll} disabled={isSubmitting}>
                {isSubmitting
                  ? 'Submitting...'
                  : `Submit All (${forms.length})`}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setForms([]);
                  formRefs.current = {};
                }}
                disabled={isSubmitting}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}

      <FAB
        actions={[
          {
            label: 'Professional',
            icon: <Briefcase className="h-4 w-4" />,
            onClick: () => handleAddForm('professional'),
          },
          {
            label: 'Academic',
            icon: <GraduationCap className="h-4 w-4" />,
            onClick: () => handleAddForm('academic'),
          },
          {
            label: 'Project',
            icon: <RocketIcon className="h-4 w-4" />,
            onClick: () => handleAddForm('project'),
          },
        ]}
      />
    </div>
  );
}
