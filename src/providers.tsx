'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React from 'react';

import { useCustomQueryClient } from '@/hooks/useCustomQueryClient';

export default function Providers(props: { children: React.ReactNode }) {
  const queryClient = useCustomQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
      {<ReactQueryDevtools initialIsOpen={true} />}
    </QueryClientProvider>
  );
}
