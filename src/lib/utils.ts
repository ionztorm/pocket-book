import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const removeSpaces = (str: string) => str.replace(/\s/g, '');

export const capitalise = (str: string): string =>
	str.replace(/\b\w/g, (char) => char.toUpperCase());
