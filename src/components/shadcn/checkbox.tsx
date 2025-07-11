'use client';

import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { cn } from '@/lib/utils';

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  className?: string;
}

function Checkbox({ className, ...props }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(props.checked || false);

  React.useEffect(() => {
    setIsChecked(props.checked || false);
  }, [props.checked]);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-all duration-200 ease-out outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onCheckedChange={checked => {
          setIsChecked(!!checked);
          props.onCheckedChange?.(checked);
        }}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current"
          asChild
        >
          <AnimatePresence mode="wait">
            {isChecked && (
              <motion.div
                key="check-icon"
                initial={{
                  scale: 0,
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 25,
                  duration: 0.3,
                }}
                className="flex items-center justify-center"
              >
                <CheckIcon className="size-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </motion.div>
  );
}

interface CheckboxFormProps extends CheckboxProps {
  name: string;
  label?: string;
  variant?: 'default' | 'text';
}

function CheckboxForm({ name, label, variant, ...props }: CheckboxFormProps) {
  const { control } = useFormContext();
  const isTextVariant = variant === 'text';
  const [isChecked, setIsChecked] = React.useState(false);

  const value = useWatch({ control, name });
  React.useEffect(() => {
    setIsChecked(!!value);
  }, [value]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleCheckedChange = (checked: boolean) => {
          setIsChecked(checked);
          field.onChange(checked);
        };

        return (
          <FormItem className="flex flex-row items-center gap-2">
            <FormControl>
              <Checkbox
                {...props}
                checked={field.value}
                onCheckedChange={handleCheckedChange}
                className={props.className}
              />
            </FormControl>
            {label && (
              <FormLabel
                className={
                  isTextVariant && isChecked
                    ? 'text-white'
                    : 'text-muted-foreground/50'
                }
              >
                {label}
              </FormLabel>
            )}
            {!isTextVariant && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export { Checkbox, CheckboxForm };
