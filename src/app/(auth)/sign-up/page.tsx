"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/shadcn/button"
import { ZodForm, useZodForm } from "@/components/shadcn/form"
import { TypographyH3, TypographyMuted } from "@/components/shadcn/typography"
import { signUpSchema, type SignUpData } from "@/lib/validations/auth"
import Link from "next/link"


export default function SignInPage() {
  const router = useRouter()
  const form = useZodForm({
    schema: signUpSchema,
    mode: "onSubmit"
  })

  const handleSignIn = async (data: SignUpData) => {
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
          <TypographyH3 className="text-center">Sign Up</TypographyH3>
          <TypographyMuted className="text-center">
              Create resumes tailored to every opportunity.
          </TypographyMuted>
      </div>
        <ZodForm className="w-full max-w-md" form={form} onSubmit={handleSignIn}>
            {({ Input }) => (
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between w-full gap-4">
                        <Input name="firstName" placeholder="First Name" />
                        <Input name="lastName" placeholder="Last Name" />
                    </div>
                    <Input name="email" placeholder="Email" />
                    <Input name="password" placeholder="Password" type="password" />
                    <Input name="confirmPassword" placeholder="Confirm Password" type="password" />
                    <Button type="submit">Sign In</Button>
                </div>
            )}
        </ZodForm>

        <div className="flex flex-col gap-2 w-full">
          <TypographyMuted className="text-center w-4/5 mx-auto">
            By clicking continue, you agree to our
            {' '}
            <Link href="/terms-of-service" className="underline hover:text-primary">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
          </TypographyMuted>
        </div>
  </div>
  )
}
