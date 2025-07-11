import axios, { AxiosError, AxiosResponse } from 'axios';

import { APIErrorResponse, APIResponse } from '@/types';

export interface APIError {
  message: string | string[];
  statusCode: number;
  errors?: Record<string, string[]>;
  error?: string;
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
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            document.cookie =
              'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = '/sign-in';
          }
          break;
        case 403:
          console.error('Access denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 422:
          console.error('Validation errors:', data?.message);
          break;
        case 500:
          console.error('Internal server error');
          break;
      }

      const apiError: APIError = {
        message: data?.message || 'An error occurred',
        statusCode: status,
      };

      return Promise.reject(apiError);
    } else if (error.request) {
      const networkError: APIError = {
        message: 'Network error - please check your connection',
        statusCode: 0,
      };
      return Promise.reject(networkError);
    } else {
      const unknownError: APIError = {
        message: error.message || 'An unknown error occurred',
        statusCode: 0,
      };
      return Promise.reject(unknownError);
    }
  }
);

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
