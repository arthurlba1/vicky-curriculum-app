'use client';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, TriangleAlert } from 'lucide-react';

import { ExperienceCard } from '@/components/experience-card';
import { Button } from '@/components/shadcn/button';
import { techSkillsList } from '@/types/tech-skills';
import { getSkillLabel } from '@/utils';

interface ProfessionalFormProps {
  Input: any;
  Calendar: any;
  Textarea: any;
  MultiSelect: any;
  Checkbox: any;
  form: UseFormReturn<any>;
  disabled?: boolean;
}

export function ProfessionalForm({
  Input,
  Calendar,
  Checkbox,
  Textarea,
  MultiSelect,
  form,
  disabled,
}: ProfessionalFormProps) {
  const [expanded, setExpanded] = useState(false);
  const skills = form.watch('skills') || [];
  const isCurrent = form.watch('isCurrent');
  const endDate = form.watch('endDate');

  useEffect(() => {
    if (isCurrent) {
      form.setValue('endDate', undefined);
    }
  }, [form, isCurrent]);

  useEffect(() => {
    if (endDate) {
      form.setValue('isCurrent', false);
    }
  }, [form, endDate]);

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
              disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
              />
              <span className="text-muted-foreground/50 text-sm font-semibold">
                {' '}
                or{' '}
              </span>
              <Checkbox
                name="isCurrent"
                label="Current"
                variant="text"
                className="text-muted-foreground/50 text-sm font-semibold"
                disabled={disabled}
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
            rows={1}
            className="h-fit"
            disabled={disabled}
          />
        </ExperienceCard.Content>
        <ExperienceCard.Footer>
          <div className="flex flex-col w-full">
            <MultiSelect
              name="skills"
              variant="text"
              options={techSkillsList}
              placeholder="Select all topics used in this role"
              disabled={disabled}
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
                    disabled={disabled}
                  />
                </ExperienceCard.Content>
              </ExperienceCard.Wrapper>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
