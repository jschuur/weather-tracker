import 'dotenv/config';

import { LocationInsert } from '@/lib/types';

const locationSeedData: LocationInsert[] = [
  {
    name: 'London',
    slug: 'london',
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: 'Paris',
    slug: 'paris',
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    name: 'Beijing',
    slug: 'beijing',
    lat: 39.9042,
    lon: 116.4074,
  },
];

import { db } from '@/db/index';
import { locations } from '@/db/schema';

(async () => {
  console.log('Adding locations seed data');

  for (const location of locationSeedData)
    await db.insert(locations).values(location).onConflictDoNothing();

  console.log('Done');
})();
