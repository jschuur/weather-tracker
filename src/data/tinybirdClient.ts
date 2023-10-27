import { Tinybird } from '@chronark/zod-bird';
import { z } from 'zod';

import { tinyBirdSnapshotSchema } from '@/lib/types';

const tinyBirdToken = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;
if (!tinyBirdToken) throw new Error('NEXT_PUBLIC_TINYBIRD_TOKEN not set');

const tb = new Tinybird({ token: tinyBirdToken });

export const getLocationMetrics = tb.buildPipe({
  pipe: 'recent_location_metrics',
  parameters: z.object({
    location: z.string(),
    metrics: z.string().optional(),
  }),
  data: tinyBirdSnapshotSchema.omit({ location: true }),
});
