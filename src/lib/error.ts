import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function getErrorMessage(error: unknown, prefix?: string) {
  if (error instanceof Error)
    return error instanceof z.ZodError
      ? // show readable version of zod errors
        fromZodError(error, { prefix }).message
      : error.message;

  return String(error);
}

export class HttpStatusError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'StatusError'; // Assign a name to your custom error class
    Object.setPrototypeOf(this, HttpStatusError.prototype); // Ensure proper prototype chain
  }
}

export function apiErrorResponse(error: unknown) {
  const status = error instanceof HttpStatusError ? error.status : 500;

  return NextResponse.json({ error: getErrorMessage(error) }, { status });
}
