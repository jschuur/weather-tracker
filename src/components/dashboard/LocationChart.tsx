'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Callout, Card, LineChart, Title } from '@tremor/react';

import { useLocationData } from '@/hooks/useLocationData';
import { getErrorMessage } from '@/lib/error';
import { Metrics } from '@/lib/types';

function dataFormat(metrics: Metrics) {
  return metrics.map((metric) => ({
    ...metric,
    timestamp: new Date(metric.timestamp).toLocaleString(),
  }));
}

export function LocationChart() {
  const { data, isError, isFetching, error } = useLocationData();

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
      <Title>{data?.name ? `Recent Temperature for ${data.name}` : null}</Title>
      <LineChart
        className='mt-6'
        data={data?.metrics ? dataFormat(data.metrics) : []}
        index='timestamp'
        noDataText={isFetching ? 'Loading...' : 'No data available'}
        categories={['temperature']}
        colors={['emerald']}
        yAxisWidth={40}
        showAnimation={true}
        animationDuration={500}
      />
    </Card>
  );
}
