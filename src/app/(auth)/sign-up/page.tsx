'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Loader2Icon } from 'lucide-react';

import { AlertError } from '@/app/(auth)/sign-up/actions';
import { Button } from '@/components/shadcn/button';
import { ZodForm, useZodForm } from '@/components/shadcn/form';
import { TypographyH3, TypographyMuted } from '@/components/shadcn/typography';
import { useSignUp } from '@/lib/hooks/use-auth';
import { type SignUpData, signUpSchema } from '@/lib/validations/auth';

export default function SignUpPage() {
  const form = useZodForm({
    schema: signUpSchema,
    mode: 'onSubmit',
  });

  const signUpMutation = useSignUp();

  const handleSignUp = (data: SignUpData) => {
    signUpMutation.mutate(data);
  };

  useEffect(() => {
    console.log(signUpMutation.error);
  }, [signUpMutation.error]);

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-2">
        <TypographyH3 className="text-center">Sign Up</TypographyH3>
        <TypographyMuted className="text-center">
          Create resumes tailored to every opportunity.
        </TypographyMuted>
      </div>
      <ZodForm className="w-full max-w-md" form={form} onSubmit={handleSignUp}>
        {({ Input }) => (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between w-full gap-4">
              <Input name="firstName" placeholder="First Name" />
              <Input name="lastName" placeholder="Last Name" />
            </div>
            <Input name="email" placeholder="Email" />
            <Input name="password" placeholder="Password" type="password" />
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            {signUpMutation.error &&
              AlertError(signUpMutation.error.statusCode)}
            <Button type="submit" disabled={signUpMutation.isPending}>
              {signUpMutation.isPending && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </div>
        )}
      </ZodForm>

      <div className="flex flex-col gap-2 w-full">
        <TypographyMuted className="text-center w-4/5 mx-auto">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms-of-service"
            className="underline hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </TypographyMuted>
      </div>
    </div>
  );
}
