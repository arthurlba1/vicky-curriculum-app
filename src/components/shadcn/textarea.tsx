import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  variant?: 'default' | 'text';
}

interface TextareaFormProps extends TextareaProps {
  name: string;
}

const variants = {
  default:
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  text: cn(
    'resize-none bg-transparent outline-none w-full px-0 py-2 text-base leading-relaxed placeholder:text-muted-foreground/50 caret-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none border-none shadow-none',
    "aria-invalid:('colors.destructive')]"
  ),
};

function Textarea({ className, variant = 'default', ...props }: TextareaProps) {
  const isTextVariant = variant === 'text';

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        isTextVariant ? variants.text : variants.default,
        className
      )}
      {...props}
    />
  );
}

function TextareaForm({
  name,
  variant = 'default',
  ...props
}: TextareaFormProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                {...props}
                variant={variant}
                onInput={e => {
                  field.onChange(e);
                  const el = e.currentTarget;
                  el.style.height = 'auto'; // reset
                  el.style.height = `${el.scrollHeight}px`; // ajusta
                }}
                className={cn(
                  props.className,
                  'resize-none overflow-hidden min-h-[2rem] transition-[height] duration-200 ease-in-out'
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { Textarea, TextareaForm };
