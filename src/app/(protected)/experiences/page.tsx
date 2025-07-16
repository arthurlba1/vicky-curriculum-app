'use client';

import Link from 'next/link';

import { Briefcase, GraduationCap, RocketIcon } from 'lucide-react';

import BlurText from '@/components/react-bits/BlurText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion';
import { Separator } from '@/components/shadcn/separator';
import { useGetExperiences } from '@/lib/hooks/use-experience';
import { ExperienceOptions } from '@/types';

import EditableExperienceForm from './editable-experience-form';

export default function ExperiencesPage() {
  const { data: experiences, isLoading } = useGetExperiences();

  const professionalExperiences = experiences?.filter(
    exp => exp.category === ExperienceOptions.PROFESSIONAL
  );

  const academicExperiences = experiences?.filter(
    exp => exp.category === ExperienceOptions.ACADEMIC
  );

  const projectExperiences = experiences?.filter(
    exp => exp.category === ExperienceOptions.PROJECT
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-full relative">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-none border-b border-border/50">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-row justify-between items-center">
              <BlurText
                text="Experiences"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-3xl font-bold"
              />
              <Link
                href="/experiences/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                New Experience
              </Link>
            </div>
          </div>
          <Separator />
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-muted-foreground">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-none border-b border-border/50">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row justify-between items-center">
            <BlurText
              text="Experiences"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-3xl font-bold"
            />
            <Link
              href="/experiences/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              New Experience
            </Link>
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-8">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <p className="text-2xl font-semibold">
                    Professional Experiences
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {professionalExperiences?.map(experience => (
                    <EditableExperienceForm
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </div>
                {professionalExperiences?.length === 0 && (
                  <p>
                    No professional experiences added yet. Click &apos;New
                    Experience&apos; to add your first professional experience.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <p className="text-2xl font-semibold">Academic Experiences</p>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {academicExperiences?.map(experience => (
                    <EditableExperienceForm
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </div>
                {academicExperiences?.length === 0 && (
                  <p>
                    No academic experiences added yet. Click &apos;New Experience&apos; to
                    add your first academic experience.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <RocketIcon className="h-5 w-5" />
                  <p className="text-2xl font-semibold">Project Experiences</p>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {projectExperiences?.map(experience => (
                    <EditableExperienceForm
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </div>
                {projectExperiences?.length === 0 && (
                  <p>
                    No project experiences added yet. Click &apos;New Experience&apos; to
                    add your first project experience.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
