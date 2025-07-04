'use server';

import {
  ExperienceFormData,
  experienceSchema,
} from '@/lib/validations/experiences';

// Mock function to simulate API call - replace with actual database operations
export async function createExperiences(experiences: ExperienceFormData[]) {
  try {
    // Validate all experiences
    const validatedExperiences = experiences.map((experience, index) => {
      const result = experienceSchema.safeParse(experience);
      if (!result.success) {
        throw new Error(
          `Experience ${index + 1} validation failed: ${result.error.message}`
        );
      }
      return result.data;
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would save to your database
    console.log('Saving experiences to database:', validatedExperiences);

    // Mock successful response
    return {
      success: true,
      message: `Successfully created ${validatedExperiences.length} experiences`,
      data: validatedExperiences.map((exp, index) => ({
        ...exp,
        id: `exp_${Date.now()}_${index}`, // Mock generated ID
        createdAt: new Date().toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error creating experiences:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
      data: null,
    };
  }
}

// Function to validate a single experience
export async function validateExperience(experience: ExperienceFormData) {
  const result = experienceSchema.safeParse(experience);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
