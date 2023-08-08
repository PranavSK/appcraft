import * as z from 'zod';

export const hexColor = z.string().regex(/^$|^#[0-9A-F]{6}$/i, 'Not a valid hex code.');
