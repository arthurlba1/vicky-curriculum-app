import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { Command as CommandPrimitive } from 'cmdk';
import { CircleX } from 'lucide-react';

import { Badge } from '@/components/shadcn/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/shadcn/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form';
import { cn } from '@/lib/utils';

type List = Record<'value' | 'label', string>;

const variants = {
  default: cn(
    'group rounded-md border border-input px-3 py-2 text-sm ring-offset-background',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
  ),
  text: cn(
    'bg-transparent border-none px-0 py-0',
    'aria-invalid:placeholder-destructive'
  ),
};

type MultiSelectProps = {
  options: List[];
  value: string[];
  onValueChange: (value: List[]) => void;
  placeholder: string;
  variant?: 'default' | 'text';
  'aria-invalid'?: boolean;
  disabled?: boolean;
};

function MultiSelect({
  options,
  onValueChange,
  placeholder,
  variant = 'default',
  'aria-invalid': ariaInvalid,
  value,
  ...props
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<List[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    const initial = options.filter(opt => value.includes(opt.value));
    setSelected(initial);
  }, [value, options]);

  const handleUnselect = React.useCallback(
    (list: List) => {
      setSelected(prev => {
        const updated = prev.filter(s => s.value !== list.value);
        onValueChange(updated);
        return updated;
      });
    },
    [onValueChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected(prev => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }

        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  const list = options satisfies List[];
  const selectables = list.filter(item => !selected.includes(item));
  const isTextVariant = variant === 'text';

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className={cn(variants[variant], ariaInvalid && 'aria-invalid')}>
        <div className={cn('flex flex-wrap gap-2', isTextVariant && 'gap-1')}>
          {selected.map(item => {
            return (
              <Badge
                key={item.value}
                variant={isTextVariant ? 'secondary' : 'default'}
                className={cn(
                  'hover:scale-105 transition-all duration-100',
                  isTextVariant && 'text-xs px-2 py-0.5'
                )}
              >
                {item.label}
                <button
                  className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleUnselect(item);
                      onValueChange(selected);
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleUnselect(item);
                    onValueChange(selected);
                  }}
                >
                  <CircleX className="h-3 w-3 text-black hover:text-black/80 hover:scale-130 transition-all duration-300 hover:cursor-pointer" />
                </button>
              </Badge>
            );
          })}

          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={cn(
              'flex-1 bg-transparent outline-none',
              isTextVariant
                ? 'placeholder:text-muted-foreground/50 aria-invalid:placeholder-destructive'
                : 'ml-2 placeholder:text-muted-foreground'
            )}
            aria-invalid={ariaInvalid}
            disabled={props.disabled}
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map(item => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        setSelected(prev => {
                          const updated = [...prev, item];
                          onValueChange(updated);
                          return updated;
                        });
                      }}
                      className={'cursor-pointer'}
                    >
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

interface MultiSelectFormProps
  extends Omit<MultiSelectProps, 'onValueChange' | 'value'> {
  name: string;
  variant?: 'default' | 'text';
}

function MultiSelectForm({
  name,
  variant = 'default',
  ...props
}: MultiSelectFormProps) {
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
        return (
          <FormItem className="gap-0">
            <FormControl>
              <MultiSelect
                options={props.options}
                placeholder={
                  fieldError ? fieldError.message : props.placeholder
                }
                variant={variant}
                value={field.value || []}
                onValueChange={newValues => {
                  const result = newValues.map(item => item.value);
                  field.onChange(result);
                }}
                disabled={props.disabled}
                aria-invalid={!!fieldError}
              />
            </FormControl>
            {!isTextVariant && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export { MultiSelectForm };
