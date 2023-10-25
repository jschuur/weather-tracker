'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'next-usequerystate';

import { LocationDataSchema, type LocationData } from '@/lib/types';
import { fetchApi } from '@/lib/fetchApi';

export function useLocationData() {
  const [location] = useQueryState('location', { defaultValue: 'london' });

  const query = useQuery({
    queryKey: ['location', { location }],
    queryFn: () => fetchApi<LocationData>(`/api/location/${location}`, LocationDataSchema),
    staleTime: 60 * 60 * 1000,
  });

  return { location, ...query };
}
