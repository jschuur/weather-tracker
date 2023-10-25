import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { locations } from '@/db/schema';

// Basic data for all locations (to populate the select dropdown)
export const LocationListSchema = z.array(createSelectSchema(locations));
export type LocationList = z.infer<typeof LocationListSchema>;

export const LocationsDataSchema = z.object({ locations: LocationListSchema });
export type LocationsData = z.infer<typeof LocationsDataSchema>;

// Details for a single location, including metrics
export const LocationDataSchema = z.object({
  name: z.string(),
  metrics: z.array(
    z.object({
      timestamp: z.string(),
      temperature: z.number(),
    })
  ),
});
export type LocationData = z.infer<typeof LocationDataSchema>;
export type Metrics = LocationData['metrics'];
