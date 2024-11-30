import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const removeSpaces = (str: string) => str.replace(/\s/g, '');

export const capitalise = (str: string): string =>
	str.replace(/\b\w/g, (char) => char.toUpperCase());

export const formDataToObject = (formData: FormData) => {
	const obj: Record<string, unknown> = {};
	formData.forEach((value, key) => {
		obj[key] = value;
	});
	return obj;
};
