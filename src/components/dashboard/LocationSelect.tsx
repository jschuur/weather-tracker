'use client';

import { Select, SelectItem } from '@tremor/react';
import { useQueryState } from 'next-usequerystate';
import { useMemo } from 'react';

import { useLocations } from '@/hooks/useLocations';
import { useEffect } from 'react';

export function LocationSelect() {
  const [location, setLocation] = useQueryState('location');
  const { data, isError, isFetching } = useLocations();

  const locations = useMemo(() => data?.locations || [], [data]);

  useEffect(() => {
    if (locations && locations?.length > 0 && !location) {
      setLocation(locations[0].slug);
    }
  }, [location, locations, setLocation]);

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
        enableClear={false}
        value={location || undefined}
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
