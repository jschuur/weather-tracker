import { NextResponse } from 'next/server';
import pluralize from 'pluralize';

import updateMetrics from '@/data/updateMetrics';
import { apiErrorResponse } from '@/lib/error';

export const revalidate = 0;

export async function GET() {
  try {
    const { locations, successes, errors } = (await updateMetrics()) || {};

    return NextResponse.json({
      message: `Update of ${pluralize(
        'location',
        locations.length,
        true
      )} completed with ${pluralize('success', successes.length, true)} and ${pluralize(
        'error',
        Object.keys(errors).length,
        true
      )}`,
      locations,
      successes,
      errors,
    });
  } catch (error) {
    console.error('updateMetrics error', { error });

    return apiErrorResponse(error);
  }
}
