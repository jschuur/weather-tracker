import { NextResponse } from 'next/server';

import { getLocations } from '@/db/queries';
import { apiErrorResponse } from '@/lib/error';

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const locations = await getLocations();

    return NextResponse.json({ locations });
  } catch (error) {
    console.error('locations GET error', { error });

    return apiErrorResponse(error);
  }
}
