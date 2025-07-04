'use client';

import { UseFormReturn } from 'react-hook-form';

import { TriangleAlert } from 'lucide-react';

import { ExperienceCard } from '@/components/experience-card';
import { techSkillsList } from '@/types/tech-skills';
import { getSkillLabel } from '@/utils';

interface ProfessionalFormProps {
  Input: any;
  Calendar: any;
  Textarea: any;
  MultiSelect: any;
  form: UseFormReturn<any>;
}

export function ProfessionalForm({
  Input,
  Calendar,
  Textarea,
  MultiSelect,
  form,
}: ProfessionalFormProps) {
  const skills = form.watch('skills') || [];

  return (
    <div className="flex flex-col gap-2">
      <ExperienceCard.Wrapper isLoading={false}>
        <ExperienceCard.Header>
          <div className="flex flex-col justify-center">
            <Input
              name="title"
              variant="text"
              placeholder="Professional Role (e.g., Senior Software Engineer)"
              className="text-foreground text-lg"
            />
            <Input
              name="company"
              variant="text"
              placeholder="Company Name"
              className="text-foreground"
            />
            <div className="flex flex-row space-x-2 items-center flex-wrap">
              <Calendar
                name="startDate"
                placeholder="Start Date"
                variant="text"
                disableIcon
              />
              <span className="text-muted-foreground/50 text-lg font-bold">
                {' '}
                -{' '}
              </span>
              <Calendar
                name="endDate"
                placeholder="End Date"
                variant="text"
                disableIcon
              />
            </div>
          </div>
        </ExperienceCard.Header>
        <ExperienceCard.Content>
          <Textarea
            name="description"
            placeholder="Brief description of your role in this position"
            variant="text"
            maxLength={350}
            rows={2}
            className="h-fit"
          />
        </ExperienceCard.Content>
        <ExperienceCard.Footer>
          <div className="flex flex-col w-full">
            <MultiSelect
              name="skills"
              options={techSkillsList}
              placeholder="Select all topics used in this role"
            />
            <span className="text-muted-foreground/50 text-sm flex items-center gap-2">
              <TriangleAlert className="sm:w-4 h-4" /> Note: For better
              performance, add a description of how you used each skill in this
              position.
            </span>
          </div>
        </ExperienceCard.Footer>
      </ExperienceCard.Wrapper>

      {skills?.map((skill: string) => (
        <ExperienceCard.Wrapper key={skill} isLoading={false}>
          <ExperienceCard.Header>
            <span className="text-lg font-semibold text-foreground">
              {getSkillLabel(skill)}
            </span>
          </ExperienceCard.Header>
          <ExperienceCard.Content>
            <Textarea
              name={`skillDescriptions.${skill}`}
              placeholder={`Describe how you used ${getSkillLabel(skill)} in this role`}
              variant="text"
              rows={2}
            />
          </ExperienceCard.Content>
        </ExperienceCard.Wrapper>
      ))}
    </div>
  );
}
