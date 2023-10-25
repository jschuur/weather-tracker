import { NextResponse } from 'next/server';

import { getLocationMetrics, getLocations } from '@/db/queries';
import { HttpStatusError, apiErrorResponse } from '@/lib/error';
import { capitalize } from '@/lib/utils';

export const revalidate = 0;

type Params = {
  location: string;
};

async function getLocationData(location: string) {
  const locations = await getLocations();

  if (!locations.find((l) => l.slug === location))
    throw new HttpStatusError(404, `Location '${location}' unknown`);

  return { name: capitalize(location), metrics: await getLocationMetrics(location) };
}

export async function GET(request: Request, { params: { location } }: { params: Params }) {
  try {
    const response = await getLocationData(location);

    return NextResponse.json(response);
  } catch (error) {
    console.error('metrics GET error', { error });

    return apiErrorResponse(error);
  }
}
