'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchApi } from '@/lib/fetchApi';
import { LocationsDataSchema, type LocationList } from '@/lib/types';

export const useLocations = () =>
  useQuery({
    queryKey: ['locations'],
    meta: { toastError: true },
    placeholderData: { locations: [] },
    queryFn: () => fetchApi<{ locations: LocationList }>('/api/locations', LocationsDataSchema),
    staleTime: 60 * 60 * 1000,
  });
