import { Tinybird } from '@chronark/zod-bird';

import { tinyBirdSnapshotSchema } from '@/lib/types';

const tinyBirdToken = process.env.TINYBIRD_TOKEN;
if (!tinyBirdToken) throw new Error('TINYBIRD_TOKEN not set');

const tb = new Tinybird({ token: tinyBirdToken });

export const publishMetrics = tb.buildIngestEndpoint({
  datasource: 'metrics',
  event: tinyBirdSnapshotSchema,
});
