import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { useAuthContext } from '../auth/AuthProvider';

export const CustomQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { logout } = useAuthContext();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, _) => {
        const castedError = error as AxiosError;
        if (castedError.code === '403') {
          logout();
        }
      },
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
