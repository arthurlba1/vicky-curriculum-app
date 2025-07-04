import { apiClient, handleApiCall } from '@/lib/api/client';
import { SignInData, SignUpData } from '@/lib/validations/auth';
import { APIResponse, AuthResponse, UserResponse } from '@/types';

// Sign in
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  return handleApiCall(() =>
    apiClient.post<APIResponse<AuthResponse>>('/auth/login', data)
  );
};

// Sign up
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const { firstName, lastName, email, password } = data;
  const signUpPayload = {
    email,
    password,
    name: `${firstName} ${lastName}`,
  };

  return handleApiCall(() =>
    apiClient.post<APIResponse<AuthResponse>>('/auth/register', signUpPayload)
  );
};

// Get current user
export const getCurrentUser = async (): Promise<UserResponse> => {
  return handleApiCall(() =>
    apiClient.get<APIResponse<UserResponse>>('/auth/me')
  );
};

// Sign out
export const signOut = async (): Promise<void> => {
  return handleApiCall(() =>
    apiClient.post<APIResponse<void>>('/auth/sign-out')
  );
};
