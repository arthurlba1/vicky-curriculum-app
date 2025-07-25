import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  name: string;
  variant?: 'default' | 'text';
}

interface InputFormProps extends InputProps {
  name: string;
}

const variants = {
  default: cn(
    'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'dark:bg-input/30 border-input',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
  ),

  text: cn(
    'bg-transparent border-none outline-none font-semibold text-md w-full p-0',
    'placeholder:text-muted-foreground/50 caret-white',
    'aria-invalid:placeholder-destructive'
  ),
};

function Input({ className, type, variant = 'default', ...props }: InputProps) {
  const isTextVariant = variant === 'text';

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        isTextVariant ? variants.text : variants.default,
        className
      )}
      {...props}
    />
  );
}

function InputForm({ name, variant = 'default', ...props }: InputFormProps) {
  const { control, formState } = useFormContext();
  const fieldError = formState.errors[name];
  const isTextVariant = variant === 'text';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const inputProps =
          isTextVariant && fieldError
            ? {
                ...field,
                ...props,
                variant,
                placeholder: fieldError.message as string,
                'aria-invalid': true,
              }
            : {
                ...field,
                ...props,
                variant,
              };

        return (
          <FormItem>
            <FormControl>
              <div className="flex flex-col gap-2 w-full">
                <Input {...inputProps} onChange={field.onChange} />
                {!isTextVariant && <FormMessage />}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

export { Input, InputForm };
