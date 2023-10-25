import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
