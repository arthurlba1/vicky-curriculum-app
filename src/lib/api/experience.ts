import { transformExperienceFormData } from '@/helpers/experience-transform';
import { apiClient, handleApiCall } from '@/lib/api/client';
import { ExperienceFormData } from '@/lib/validations/experiences';
import { APIResponse, ExperienceResponse } from '@/types';

// Get experiences
export const getExperiences = async () => {
  return handleApiCall(() =>
    apiClient.get<APIResponse<ExperienceResponse[]>>('/experiences')
  );
};

// Create experiences
export const createExperiences = async (data: ExperienceFormData[]) => {
  const experiences = data.map(transformExperienceFormData).filter(Boolean);

  return handleApiCall(() =>
    apiClient.post<APIResponse<void>>('/experiences/batch', { experiences })
  );
};

// Update experience
export const updateExperience = async (
  id: string,
  data: ExperienceFormData
) => {
  const experience = transformExperienceFormData(data);

  return handleApiCall(() =>
    apiClient.put<APIResponse<ExperienceResponse>>(
      `/experiences/${id}`,
      experience
    )
  );
};
