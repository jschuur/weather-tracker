'use client';

import { Card } from '@tremor/react';

import { LocationChart } from '@/components/dashboard/LocationChart';
import { LocationSelect } from '@/components/dashboard/LocationSelect';
import { ScoreCards } from '@/components/dashboard/ScoreCards';

export function Dashboard() {
  return (
    <div className='mt-6'>
      <ScoreCards />
      <Card>
        <div className='flex flex-col'>
          <div className='py-4 ml-auto'>
            <LocationSelect />
          </div>
          <LocationChart />
        </div>
      </Card>
    </div>
  );
}
