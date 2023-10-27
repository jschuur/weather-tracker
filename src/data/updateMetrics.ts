import 'dotenv/config';

import { OpenWeatherAPI } from 'openweather-api-node';

import { publishMetrics } from '@/data/tinybirdServer';
import { getActiveLocations } from '@/db/queries';
import { getErrorMessage } from '@/lib/error';
import { Metrics, metricsSchema } from '@/lib/types';

if (!process.env.OPENWEATHER_API_KEY) throw new Error('OPENWEATHER__API_KEY is not set');

const openWeather = new OpenWeatherAPI({
  key: process.env.OPENWEATHER_API_KEY,
  units: 'metric',
});

// flatten OpenWeather API data for a TinyBird snapshot
function transformWeatherData(weather: Record<string, any>): Metrics {
  const { temp, feelsLike, wind, icon, ...rest } = weather;

  const transformedWeather = {
    temp: temp.cur,
    feelsLike: feelsLike.cur,
    windSpeed: wind.speed,
    windDeg: wind.deg,
    iconRaw: icon.raw,
    ...rest,
  };

  return metricsSchema.parse(transformedWeather);
}

export default async function updateMetrics() {
  const locations = await getActiveLocations();
  const response = { locations: locations.map((l) => l.slug), successes: [], errors: {} } as {
    locations: string[];
    successes: string[];
    errors: Record<string, string>;
  };

  if (!locations.length) {
    console.warn('No active locations found');
  } else {
    console.log(`Updating ${locations.length} active locations`);

    for (const location of locations) {
      try {
        openWeather.setLocationByCoordinates(location.lat, location.lon);
        const { weather, dt } = await openWeather.getCurrent();

        const metrics = {
          location: location.slug,
          timestamp: dt,
          ...transformWeatherData(weather),
        };

        await publishMetrics(metrics);

        response.successes.push(location.slug);

        console.log(`[${location.name}] Success (temp: ${metrics.temp})`);
      } catch (error) {
        const errorMessage = getErrorMessage(error);

        console.log(`[${location.name}] Error: ${errorMessage}`);
        response.errors[location.slug] = errorMessage;
      }
    }
    console.log('Done');
  }

  return response;
}
