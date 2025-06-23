"use client"

import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import { ZodForm, useZodForm } from "@/components/shadcn/form"
import { TypographyH3 } from "@/components/shadcn/typography"
import { signInSchema, type SignInData } from "@/lib/validations/auth"
import { useSignIn } from "@/lib/hooks/use-auth"


export default function SignInPage() {
  const form = useZodForm({
    schema: signInSchema,
    mode: "onSubmit"
  })

  const signInMutation = useSignIn()

  const handleSignIn = (data: SignInData) => {
    signInMutation.mutate(data)
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
        <div className="flex flex-col gap-2">
            <TypographyH3 className="text-center">Sign In</TypographyH3>
        </div>

        <ZodForm className="w-full max-w-md" form={form} onSubmit={handleSignIn}>
            {({ Input }) => (
                <div className="flex flex-col gap-4 w-full">
                    <Input name="email" placeholder="Email" />
                    <Input name="password" placeholder="Password" type="password" />
                    <Button type="submit" disabled={signInMutation.isPending}>
                        {signInMutation.isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </div>
            )}
        </ZodForm>
  </div>
  )
}
