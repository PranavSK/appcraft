import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
}

export function preventRunts(text: string) {
  return text.replace(/\s([^\s<]+)\s*$/, '\u00A0$1');
}
