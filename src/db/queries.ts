import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { locations } from '@/db/schema';
import { generateTemperatureData } from '@/lib/temp';

export const getLocations = () => db.select().from(locations);
export const getActiveLocations = () => db.select().from(locations).where(eq(locations.active, 1));

export const getLocationMetrics = async (location: string) => generateTemperatureData();
