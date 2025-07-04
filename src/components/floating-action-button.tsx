'use client';

import { useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/popover';

export interface FABAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface FABSpeedDialProps {
  actions: FABAction[];
  icon?: React.ReactNode;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
  };
}

export function FloatingActionButton({
  actions,
  icon = <PlusIcon className="h-6 w-6" />,
  position = { bottom: 'bottom-5', right: 'right-6' },
}: FABSpeedDialProps) {
  const [open, setOpen] = useState(false);

  const positionClasses = `${position.bottom ?? ''} ${position.right ?? ''} ${position.left ?? ''}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`fixed ${positionClasses} rounded-full h-14 w-14 p-0 shadow-lg z-50`}
          size="icon"
          onClick={() => setOpen(prev => !prev)}
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={8}
        className="flex flex-col gap-2 w-fit p-2 z-50"
      >
        {actions.map(action => (
          <Button
            key={action.label}
            variant="ghost"
            className="flex items-center gap-2 justify-start hover:cursor-pointer"
            onClick={() => {
              action.onClick();
              setOpen(false);
            }}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
