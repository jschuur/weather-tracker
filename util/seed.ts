import 'dotenv/config';

const locationSeedData = [
  {
    name: 'London',
    slug: 'london',
    metrics: ['temp'],
  },
  {
    name: 'Paris',
    slug: 'paris',
    metrics: ['temp'],
  },
  {
    name: 'Beijing',
    slug: 'beijing',
    metrics: ['temp'],
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
