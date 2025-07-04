'use client';

import { UseFormReturn } from 'react-hook-form';

import { ExperienceCard } from '@/components/experience-card';
import { techSkillsList } from '@/types/tech-skills';
import { getSkillLabel } from '@/utils';

interface ProjectFormProps {
  Input: any;
  Textarea: any;
  MultiSelect: any;
  form: UseFormReturn<any>;
}

export function ProjectForm({
  Input,
  Textarea,
  MultiSelect,
  form,
}: ProjectFormProps) {
  const skills = form.watch('skills') || [];

  return (
    <div className="flex flex-col gap-2">
      <ExperienceCard.Wrapper isLoading={false}>
        <ExperienceCard.Header>
          <Input
            name="title"
            variant="text"
            placeholder="Project Title"
            className="text-foreground text-lg"
          />
        </ExperienceCard.Header>
        <ExperienceCard.Content>
          <Textarea
            name="description"
            placeholder="Brief description of the project"
            maxLength={350}
            rows={2}
            className="h-fit"
            variant="text"
          />
        </ExperienceCard.Content>
        <ExperienceCard.Footer>
          <div className="flex flex-col w-full">
            <MultiSelect
              name="skills"
              options={techSkillsList}
              placeholder="Select all skills used in the project"
            />
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
