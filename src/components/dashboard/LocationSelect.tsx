'use client';

import { Select, SelectItem } from '@tremor/react';
import { useQueryState } from 'next-usequerystate';

import { useLocations } from '@/hooks/useLocations';

export function LocationSelect() {
  const [location, setLocation] = useQueryState('location');
  const { data, isError, isFetching, error } = useLocations();

  const locations = data?.locations || [];
  const hasLocations = Boolean(locations && locations.length > 0);
  const placeholder = hasLocations
    ? 'Select a location'
    : isFetching
    ? 'Loading...'
    : isError
    ? 'Error fetching locations'
    : 'No locations';

  return (
    <div className='max-w-sm mx-auto space-y-6'>
      <Select
        className='w-full'
        defaultValue={location || locations?.[0]?.slug}
        enableClear={false}
        onValueChange={setLocation}
        placeholder={placeholder}
        disabled={locations.length === 0}
      >
        {locations.map((location) => (
          <SelectItem key={location.id} value={location.slug}>
            {location.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
