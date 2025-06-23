import * as React from "react"
import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form"
import { cn } from "@/lib/utils"

interface InputFormProps extends React.ComponentProps<"input"> {
  name: string
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function InputForm({ name, ...props }: InputFormProps) {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <div className="flex flex-col gap-2">
                <Input
                  {...field}
                  {...props}
                  onChange={field.onChange}
                />
                <FormMessage />
              </div>
            </FormControl>
          </FormItem>
        )
      }}
    />
  )
}

export { Input, InputForm }
