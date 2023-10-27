'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'next-usequerystate';

import { getLocationMetrics } from '@/data/tinybirdClient';

export function useLocationData() {
  // TODO: remove London default
  const [location] = useQueryState('location', { defaultValue: 'london' });

  const query = useQuery({
    queryKey: ['location', { location }],
    queryFn: () => getLocationMetrics({ location }),
    select: (data) => data.data,
    staleTime: 60 * 60 * 1000,
  });

  return { location, ...query };
}
