"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {InputGroup} from "@/components/ui/input-group"
import { userSchema } from "@/schemas/user"

import type { createUser } from "@/lib/actions"; // ✅ GOOD (type-only)


type CreateUserAction = typeof createUser;

interface OnboardingFormProps {
  userId: string;
  createUserAction: CreateUserAction;
}

export default function OnboardingForm({
  userId,
  createUserAction,
}: OnboardingFormProps)  {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      bankingName: "",
      upiId: "",
    },
  })

  const router = useRouter();
async function onSubmit(data: z.infer<typeof userSchema>) {
   await createUserAction(data.bankingName, data.upiId, userId);
   router.push("/home");
  }

  return (
    <div className="flex items-center justify-center md:h-screen md:w-[40%] w-full md:px-0 px-6">

    <Card className="w-full">
      <CardHeader>
        <CardTitle>Free money - Risk hai toh ishq hai !</CardTitle>
        <CardDescription>
          Help us move faster by filling out this form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="bankingName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Your Banking Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your banking name"
                    autoComplete="off"
                  />
                  <FieldDescription>Please enter a valid looking name.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="upiId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Your UPIID
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Please enter your UPIID"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  <FieldDescription>
                    Please add @oksbi after your upi name. Ex - abc@oksbi
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    </div>

  )
}
