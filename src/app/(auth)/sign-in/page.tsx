"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/shadcn/button"
import { ZodForm, useZodForm } from "@/components/shadcn/form"
import { TypographyH3, TypographyMuted } from "@/components/shadcn/typography"
import { signInSchema, type SignInData } from "@/lib/validations/auth"


export default function SignInPage() {
  const router = useRouter()
  const form = useZodForm({
    schema: signInSchema,
    mode: "onSubmit"
  })

  const handleSignIn = async (data: SignInData) => {
    try {
      console.log("Sign in data:", data)
      
      // TODO: Implement actual authentication logic here
      // Example: await signIn(data.email, data.password)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign in failed:", error)
      // Handle error (show toast, etc.)
    }
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
                    <Button type="submit">Sign In</Button>
                </div>
            )}
        </ZodForm>
  </div>
  )
}
