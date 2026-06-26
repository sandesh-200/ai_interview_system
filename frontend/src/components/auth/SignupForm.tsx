import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerFormSchema, type RegisterFormData } from "@/types/auth"
import { registerUser } from "@/api/auth"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()

  // 1. Initialize useForm with your Zod schema resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 2. Define your submission logic
  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Destructure to drop confirmPassword before hitting your backend API
      const { confirmPassword, ...backendPayload } = data
      
      await registerUser(backendPayload)
      
      // Redirect or show a success message
      navigate("/login")
    } catch (error) {
      console.error("Signup error:", error)
    }
  }

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      onSubmit={handleSubmit(onSubmit)} // 🔥 Replaced native submission
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* FULL NAME */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="bg-background border-md"
            {...register("name")} // 🔥 Register input
          />
          {errors.name && (
            <p className="text-destructive text-sm font-medium mt-1">{errors.name.message}</p>
          )}
        </Field>

        {/* EMAIL */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background border-md"
            {...register("email")} // 🔥 Register input
          />
          {errors.email ? (
            <p className="text-destructive text-sm font-medium mt-1">{errors.email.message}</p>
          ) : (
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email with anyone else.
            </FieldDescription>
          )}
        </Field>

        {/* PASSWORD */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            className="bg-background border-md"
            {...register("password")} // 🔥 Register input
          />
          {errors.password ? (
            <p className="text-destructive text-sm font-medium mt-1">{errors.password.message}</p>
          ) : (
            <FieldDescription>
              Must be at least 6 characters long.
            </FieldDescription>
          )}
        </Field>

        {/* CONFIRM PASSWORD */}
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            className="bg-background border-md"
            {...register("confirmPassword")} // 🔥 Register input
          />
          {errors.confirmPassword ? (
            <p className="text-destructive text-sm font-medium mt-1">{errors.confirmPassword.message}</p>
          ) : (
            <FieldDescription>Please confirm your password.</FieldDescription>
          )}
        </Field>

        {/* SUBMIT BUTTON */}
        <Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/login" className="underline hover:text-primary">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

