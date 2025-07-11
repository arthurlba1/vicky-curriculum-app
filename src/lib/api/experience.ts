import { transformExperienceFormData } from '@/helpers/experience-transform';
import { apiClient, handleApiCall } from '@/lib/api/client';
import { ExperienceFormData } from '@/lib/validations/experiences';
import { APIResponse } from '@/types';

// Get experiences
export const getExperiences = async () => {
  return handleApiCall(() =>
    apiClient.get<APIResponse<ExperienceFormData[]>>('/experiences')
  );
};

// Create experiences
export const createExperiences = async (data: ExperienceFormData[]) => {
  const experiences = data.map(transformExperienceFormData).filter(Boolean);

  return handleApiCall(() =>
    apiClient.post<APIResponse<void>>('/experiences/batch', { experiences })
  );
};
