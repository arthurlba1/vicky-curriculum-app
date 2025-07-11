'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, TriangleAlert } from 'lucide-react';

import { ExperienceCard } from '@/components/experience-card';
import { Button } from '@/components/shadcn/button';
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
  const [expanded, setExpanded] = useState(false);
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
            rows={1}
            className="h-fit"
            variant="text"
          />
        </ExperienceCard.Content>
        <ExperienceCard.Footer>
          <div className="flex flex-col w-full">
            <MultiSelect
              name="skills"
              variant="text"
              options={techSkillsList}
              placeholder="Select all topics used in the project"
            />
            <span className="text-muted-foreground/50 text-sm flex items-center gap-2">
              <TriangleAlert className="sm:w-4 h-4" /> Note: For better
              performance, add a description of how you used each skill in this
              position.
            </span>
          </div>
        </ExperienceCard.Footer>
      </ExperienceCard.Wrapper>

      {skills.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Collapse Skills
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show All Skills ({skills.length})
            </>
          )}
        </Button>
      )}

      <AnimatePresence>
        {expanded &&
          skills.map((skill: string, index: number) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <ExperienceCard.Wrapper isLoading={false}>
                <ExperienceCard.Header>
                  <span className="text-lg font-semibold text-foreground">
                    {getSkillLabel(skill)}
                  </span>
                </ExperienceCard.Header>
                <ExperienceCard.Content>
                  <Textarea
                    name={`skillsDescription.${skill}`}
                    placeholder={`Describe how you used ${getSkillLabel(skill)} in this role`}
                    variant="text"
                    rows={2}
                  />
                </ExperienceCard.Content>
              </ExperienceCard.Wrapper>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
