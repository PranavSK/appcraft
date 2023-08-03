import type { Root } from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

import type { labelVariants } from './label.variants';

export type LabelProps = ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>;
export type LabelRef = ElementRef<typeof Root>;
