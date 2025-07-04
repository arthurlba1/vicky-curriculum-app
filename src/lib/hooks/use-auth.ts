import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCurrentUser, signIn, signOut, signUp } from '@/lib/api/auth';
import { APIError } from '@/lib/api/client';
import { type AuthResponse } from '@/types';

const AUTH_TOKEN_KEY = 'auth_token';

export const useAuthTokens = () => {
  const setTokens = (authResponse: AuthResponse) => {
    if (typeof window !== 'undefined') {
      const isProduction = window.location.protocol === 'https:';
      const cookieSettings = `${AUTH_TOKEN_KEY}=${authResponse.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict${isProduction ? '; secure' : ''}`;
      document.cookie = cookieSettings;

      localStorage.setItem(AUTH_TOKEN_KEY, authResponse.accessToken);
    }
  };

  const clearTokens = () => {
    if (typeof window !== 'undefined') {
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  };

  return { setTokens, clearTokens, getToken };
};

export const useCurrentUser = () => {
  const { getToken } = useAuthTokens();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!getToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setTokens } = useAuthTokens();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: AuthResponse) => {
      console.log('Sign in success data:', data);
      setTokens(data);

      queryClient.prefetchQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
      });

      console.log('Welcome back!');

      router.push('/dashboard');
    },
    onError: (error: APIError) => {
      console.error(error.message || 'Sign in failed');
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setTokens } = useAuthTokens();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: AuthResponse) => {
      setTokens(data);

      queryClient.prefetchQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
      });

      console.log('Account created successfully!');

      router.push('/dashboard');
    },
    onError: (error: APIError) => {
      console.error(error.message || 'Sign up failed');
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearTokens } = useAuthTokens();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      clearTokens();

      queryClient.clear();

      console.log('Signed out successfully');

      router.push('/sign-in');
    },
    onError: (error: APIError) => {
      clearTokens();
      queryClient.clear();
      router.push('/sign-in');

      console.error(error.message || 'Sign out failed');
    },
  });
};

export const useAuth = () => {
  const { data: user, isLoading, error } = useCurrentUser();
  const { getToken } = useAuthTokens();

  const isAuthenticated = !!user && !!getToken();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};
