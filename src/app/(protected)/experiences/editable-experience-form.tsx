'use client';

import { useRef, useState } from 'react';

import { Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

import { ExperienceFormInstance } from '@/app/(protected)/experiences/form-instance';
import { Button } from '@/components/shadcn/button';
import { transformExperienceResponseToFormData } from '@/helpers/experience-transform';
import { useUpdateExperience } from '@/lib/hooks/use-experience';
import { ExperienceFormInstanceRef, ExperienceResponse } from '@/types';

interface Props {
  experience: ExperienceResponse;
}

export default function EditableExperienceForm({ experience }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const updateExperience = useUpdateExperience();
  const formRef = useRef<ExperienceFormInstanceRef>(null);

  const handleSave = async () => {
    const values = await formRef.current?.validateAndGetValues();
    if (!values) {
      toast.error('Please fix the form errors.');
      return;
    }

    try {
      await updateExperience.mutateAsync({ id: experience.id, data: values });
      toast.success('Experience updated');
      setIsEditing(false);
    } catch {
      toast.error('Failed to update experience');
    }
  };

  return (
    <div className="relative">
      {/* Action buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <ExperienceFormInstance
        id={experience.id}
        type={experience.category}
        ref={formRef}
        defaultValues={transformExperienceResponseToFormData(experience)}
        disabled={!isEditing}
      />
    </div>
  );
}
