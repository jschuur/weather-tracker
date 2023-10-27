import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { locations } from '@/db/schema';

export const LocationInsertSchema = createInsertSchema(locations);
export type LocationInsert = z.infer<typeof LocationInsertSchema>;

// basic data for all locations (to populate the select dropdown)
export const LocationListSchema = z.array(createSelectSchema(locations));
export type LocationList = z.infer<typeof LocationListSchema>;

export const LocationsDataSchema = z.object({ locations: LocationListSchema });
export type LocationsData = z.infer<typeof LocationsDataSchema>;

export const metricsSchema = z.object({
  main: z.string().optional(),
  description: z.string().optional(),

  temp: z.number().optional(),
  feelsLike: z.number().optional(),
  pressure: z.number().optional(),
  humidity: z.number().optional(),

  clouds: z.number().optional(),
  visibility: z.number().optional(),
  windDeg: z.number().optional(),
  windSpeed: z.number().optional(),
  windGust: z.number().optional(),
  rain: z.number().optional(),
  snow: z.number().optional(),

  conditionId: z.number().int().optional(),
  iconRaw: z.string().optional(),
});
export type Metrics = z.infer<typeof metricsSchema>;

// data format for a stored metric at Tinybird
export const tinyBirdSnapshotSchema = metricsSchema.extend({
  timestamp: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  location: z.string(),
});
export type TinyBirdSnapshot = z.infer<typeof tinyBirdSnapshotSchema>;

// details for a single location, including metrics
export const LocationDataSchema = z.object({
  name: z.string(),
  metrics: z.array(tinyBirdSnapshotSchema.omit({ location: true })),
});
export type LocationData = z.infer<typeof LocationDataSchema>;
