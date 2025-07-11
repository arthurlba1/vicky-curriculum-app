'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/shadcn/card';
import { Skeleton } from '@/components/shadcn/skeleton';

interface ExperienceCardProps {
  children: React.ReactNode;
  className?: string;
}

interface ExperienceCardWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
}

function ExperienceCardWrapper({
  children,
  isLoading = false,
}: ExperienceCardWrapperProps) {
  return (
    <Card
      className={`hover:shadow-md transition-shadow gap-0 ${isLoading ? 'p-0' : ''}`}
    >
      {isLoading ? <Skeleton className="h-64 w-full" /> : children}
    </Card>
  );
}

function ExperienceCardHeader({ children, className }: ExperienceCardProps) {
  return <CardHeader className={className}>{children}</CardHeader>;
}

function ExperienceCardContent({ children, className }: ExperienceCardProps) {
  return <CardContent className={className}>{children}</CardContent>;
}

function ExperienceCardFooter({ children, className }: ExperienceCardProps) {
  return <CardFooter className={className}>{children}</CardFooter>;
}

export const ExperienceCard = {
  Wrapper: ExperienceCardWrapper,
  Header: ExperienceCardHeader,
  Content: ExperienceCardContent,
  Footer: ExperienceCardFooter,
};
