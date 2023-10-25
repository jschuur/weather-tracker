import { Card, Grid, Metric, Text } from '@tremor/react';
import prettyMilliseconds from 'pretty-ms';

import { useLocationData } from '@/hooks/useLocationData';

export function ScoreCards() {
  const { data } = useLocationData();
  let dataRange = '-',
    metricsCount = '-',
    temperatureRange = '-';
  const metrics = data?.metrics || [];
  const temperatures = metrics.map((metric) => metric.temperature);

  if (metrics.length) {
    dataRange = prettyMilliseconds(
      new Date(metrics[metrics.length - 1].timestamp).getTime() -
        new Date(metrics[0].timestamp).getTime(),
      {
        compact: true,
      }
    );
    metricsCount = String(metrics.length);
    temperatureRange = `${Math.min(...temperatures)} - ${Math.max(...temperatures)}°C`;
  }

  return (
    <Grid numItemsMd={2} numItemsLg={3} className='gap-6 my-6'>
      <Card className='' decoration='top' decorationColor='indigo'>
        <Text>Metrics</Text>
        <Metric>{metricsCount}</Metric>
      </Card>
      <Card className='' decoration='top' decorationColor='indigo'>
        <Text>Data Range</Text>
        <Metric>{dataRange}</Metric>
      </Card>
      <Card className='' decoration='top' decorationColor='indigo'>
        <Text>Temperature Range</Text>
        <Metric>{temperatureRange}</Metric>
      </Card>
    </Grid>
  );
}
