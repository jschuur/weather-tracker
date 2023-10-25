import { QueryCache, QueryClient, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/error';

export function useCustomQueryClient() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query?.meta?.toastError)
              toast.error(getErrorMessage(error, `Validation Error (${query.queryKey[0]})`), {
                duration: Infinity,
              });
          },
        }),
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            placeholderData: keepPreviousData,
          },
        },
      })
  );

  return queryClient;
}
