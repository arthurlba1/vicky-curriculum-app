export * from '@/types/app-sidebar';
export * from '@/types/experience';

// API Response Structure
export interface APIResponse<T = any> {
  data: T;
  message: string;
  statusCode: number;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface APIErrorResponse {
  data?: never;
  message: string;
  statusCode: number;
}
