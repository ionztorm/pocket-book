import { type ClassValue, clsx } from 'clsx';
import { Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const removeSpaces = (str: string) => str.replace(/\s/g, '');

export const capitalise = (str: string): string =>
	str.replace(/\b\w/g, (char) => char.toUpperCase());

export const getInputType = <T extends string>(
	name: Path<{ [key in T]: string }>,
): 'text' | 'email' | 'password' => {
	if (name.toLowerCase().includes('password')) {
		return 'password';
	}
	if (name === 'email') {
		return 'email';
	}
	return 'text';
};
