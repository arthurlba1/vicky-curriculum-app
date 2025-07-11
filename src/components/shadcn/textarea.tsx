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
    'aria-invalid:placeholder-destructive'
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
  const { control, formState } = useFormContext();

  const getNestedError = (errors: any, path: string) => {
    return path.split('.').reduce((obj, key) => obj?.[key], errors);
  };

  const fieldError = getNestedError(formState.errors, name);
  const isTextVariant = variant === 'text';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { className: propsClassName, ...restProps } = props;
        const textareaProps =
          isTextVariant && fieldError
            ? {
                ...field,
                ...restProps,
                variant,
                placeholder: fieldError.message as string,
                'aria-invalid': true,
              }
            : {
                ...field,
                ...restProps,
                variant,
              };

        return (
          <FormItem>
            <FormControl>
              <Textarea
                {...textareaProps}
                onInput={e => {
                  field.onChange(e);
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }}
                className={cn(
                  propsClassName,
                  'resize-none overflow-hidden min-h-[2rem] transition-[height] duration-200 ease-in-out'
                )}
              />
            </FormControl>
            {!isTextVariant && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export { Textarea, TextareaForm };
