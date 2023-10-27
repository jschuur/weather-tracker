'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Callout, Card, LineChart, Title } from '@tremor/react';

import { useLocationData } from '@/hooks/useLocationData';
import { useLocations } from '@/hooks/useLocations';
import { getErrorMessage } from '@/lib/error';
import { TinyBirdSnapshot } from '@/lib/types';

function dataFormat(metrics: Omit<TinyBirdSnapshot, 'location'>[]) {
  return metrics.map((metric) => ({
    ...metric,
    timestamp: metric.timestamp.toLocaleString(),
  }));
}

export function LocationChart() {
  const { data: metrics, location, isError, isFetching, error } = useLocationData();
  const { data: { locations } = { locations: [] } } = useLocations();

  const locationName = locations.find((loc) => loc.slug === location)?.name;

  if (isError)
    return (
      <Callout
        className='mt-4'
        title='Error fetching location data'
        icon={ExclamationTriangleIcon}
        color='red'
      >
        {getErrorMessage(error)}
      </Callout>
    );

  return (
    <Card>
      <Title>{locationName ? `Recent Temperature for ${locationName}` : null}</Title>
      <LineChart
        className='mt-6'
        data={metrics ? dataFormat(metrics) : []}
        index='timestamp'
        noDataText={isFetching ? 'Loading...' : 'No data available'}
        categories={['temp']}
        colors={['emerald']}
        yAxisWidth={40}
        showAnimation={true}
        animationDuration={500}
      />
    </Card>
  );
}
