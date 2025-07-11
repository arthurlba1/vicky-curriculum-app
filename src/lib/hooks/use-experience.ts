import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { APIError } from '@/lib/api/client';
import { createExperiences, getExperiences } from '@/lib/api/experience';

export const useCreateExperiences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperiences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error: APIError) => {
      console.error(error.message || 'Create experiences failed');
    },
  });
};

export const useGetExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};
