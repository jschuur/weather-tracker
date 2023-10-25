import { db } from '@/db';
import { locations } from '@/db/schema';
import { generateTemperatureData } from '@/lib/temp';

export const getLocations = () => db.select().from(locations);

export const getLocationMetrics = async (location: string) => generateTemperatureData();
