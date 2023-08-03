import { forwardRef, type KeyboardEventHandler, useRef } from 'react';

import { cn } from '#/lib/utils';

import type { TextareaProps } from './textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const handleTextAreaEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      onKeyDown?.(e);
      if (e.isDefaultPrevented()) return;

      // TODO: Should it submit on Enter?
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        submitButtonRef.current?.click();
      }
    };
    return (
      <>
        <textarea
          data-testid="textarea"
          onKeyDown={handleTextAreaEnter}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2',
            'text-sm ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button type="submit" className="hidden" ref={submitButtonRef} />
      </>
    );
  },
);
Textarea.displayName = 'Textarea';
