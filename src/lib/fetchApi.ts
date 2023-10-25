import { z } from 'zod';

export async function fetchApi<T>(url: string, schema: z.Schema<T>) {
  const response = await fetch(url);
  const body = await response.json();

  if (body.error) throw new Error(body.error);

  return schema.parse(body);
}
