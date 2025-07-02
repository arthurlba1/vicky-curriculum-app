import * as React from "react";
import { CircleX, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Badge } from "@/components/shadcn/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";


type List = Record<"value" | "label", string>;

type MultiSelectProps = {
  options: List[];
  placeholder: string;
  onValueChange: (value: List[]) => void;
}

function MultiSelect({ options, onValueChange, placeholder }: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<List[]>([]);
    const [inputValue, setInputValue] = React.useState("");
  
    const handleUnselect = React.useCallback((list: List) => {
      setSelected((prev) => {
        const updated = prev.filter((s) => s.value !== list.value);
        onValueChange(updated);
        return updated;
      });
    }, []);
  
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              });
            }
          }

          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      [],
    );

    const list = options satisfies List[]
  
    const selectables = list.filter(
      (item) => !selected.includes(item),
    );

    return (
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ">
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => {
              return (
                <Badge key={item.value} variant="default" className="hover:scale-105 transition-all duration-100">
                  {item.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                        onValueChange(selected);
                      }
                    }}
                    onMouseDown={(e) => {
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
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(_value) => {
                          setInputValue("");
                          setSelected((prev) => {
                            const updated = [...prev, item];
                            onValueChange(updated);
                            return updated;
                          });
                        }}
                        className={"cursor-pointer"}
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
  extends Omit<MultiSelectProps, "onValueChange" | "value"> {
  name: string;
}

function MultiSelectForm({ name, ...props }: MultiSelectFormProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <MultiSelect
                {...props}
                onValueChange={(newValues) => {
                  const result = newValues.map((item) =>
                    typeof item === "string" ? item : item.value
                  );
                  field.onChange(result);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { MultiSelectForm };
