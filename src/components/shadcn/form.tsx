'use client';

import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as z from 'zod';

import { CalendarForm } from '@/components/shadcn/calendar';
import { CheckboxForm } from '@/components/shadcn/checkbox';
import { InputForm } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { MultiSelectForm } from '@/components/shadcn/multi-select';
import { TextareaForm } from '@/components/shadcn/textarea';
import { cn } from '@/lib/utils';

const components = {
  Input: InputForm,
  Calendar: CalendarForm,
  Checkbox: CheckboxForm,
  Textarea: TextareaForm,
  MultiSelect: MultiSelectForm,
} as const;

interface UseZodFormProps<S extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema: S;
}

type FormComponent<
  S extends z.ZodSchema,
  T extends (typeof components)[keyof typeof components],
> = (props: Parameters<T>[0] & { name: keyof z.infer<S> }) => ReturnType<T>;

const useZodFormContext = <S extends z.ZodSchema>(): UseFormReturn<
  z.infer<S>
> => useFormContext<z.infer<S>>();

const useZodForm = <S extends z.ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<S>): UseFormReturn<z.infer<S>> =>
  useForm({
    ...formProps,
    mode: 'onSubmit',
    resolver: zodResolver(schema as any),
  });

type ZodFormProps<S extends z.ZodType<any, any, any>> = {
  onSubmit: SubmitHandler<z.infer<S>>;
  children: (props: {
    form: UseFormReturn<z.TypeOf<S>, unknown, undefined>;
    Input: FormComponent<S, typeof InputForm>;
    Calendar: FormComponent<S, typeof CalendarForm>;
    Checkbox: FormComponent<S, typeof CheckboxForm>;
    Textarea: FormComponent<S, typeof TextareaForm>;
    MultiSelect: FormComponent<S, typeof MultiSelectForm>;
  }) => React.JSX.Element;
  className?: string;
  action?: string;
  method?: string;
} & Exclude<UseFormProps<z.infer<S>>, 'resolver'> &
  (
    | {
        schema: S;
      }
    | { form: UseFormReturn<z.infer<S>> }
  );

const ZodForm = React.memo(
  <S extends z.ZodSchema>({
    children: Children,
    onSubmit,
    className,
    defaultValues,
    ...props
  }: ZodFormProps<S>) => {
    const isSchemaBased = 'schema' in props;
    const form = useForm<z.infer<S>>({
      mode: 'onSubmit',
      ...(isSchemaBased
        ? { resolver: zodResolver(props.schema as any), defaultValues }
        : {}),
    });

    return (
      <FormProvider {...(isSchemaBased ? form : props.form)}>
        <form
          className={className}
          onSubmit={(isSchemaBased ? form : props.form).handleSubmit(onSubmit)}
          {...props}
        >
          {Children({ ...components, form: isSchemaBased ? form : props.form })}
        </form>
      </FormProvider>
    );
  }
);

ZodForm.displayName = 'ZodForm';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  ZodForm,
  useZodFormContext,
  useZodForm,
};
