import axios, { AxiosError, AxiosResponse } from 'axios';

import { APIErrorResponse, APIResponse } from '@/types';

export interface APIError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<APIResponse>) => {
    return response;
  },
  (error: AxiosError<APIErrorResponse>) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            window.location.href = '/sign-in';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 422:
          // Validation errors - your API might include validation details in message
          console.error('Validation errors:', data?.message);
          break;
        case 500:
          // Server error
          console.error('Internal server error');
          break;
      }

      // Return structured error
      const apiError: APIError = {
        message: data?.message || 'An error occurred',
        statusCode: status,
      };

      return Promise.reject(apiError);
    } else if (error.request) {
      // Network error
      const networkError: APIError = {
        message: 'Network error - please check your connection',
        statusCode: 0,
      };
      return Promise.reject(networkError);
    } else {
      // Other error
      const unknownError: APIError = {
        message: error.message || 'An unknown error occurred',
        statusCode: 0,
      };
      return Promise.reject(unknownError);
    }
  }
);

// Helper function to handle API calls
export const handleApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<APIResponse<T>>>
): Promise<T> => {
  try {
    const response = await apiCall();
    return response.data.data;
  } catch (error) {
    throw error as APIError;
  }
};
