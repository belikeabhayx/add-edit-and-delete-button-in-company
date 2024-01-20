"use client"; // Code runs on the client-side

import { useForm } from "react-hook-form"; // Form handling with React Hook Form
import * as z from "zod"; // Schema validation using Zod
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver for form validation
import { CardWrapper } from "./card-wrapper"; // Component for card layout
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // UI components for form elements
import { Input } from "../ui/input"; // Input component
import { Button } from "../ui/button"; // Button component
import { FormError } from "../form-error"; // Component to display form errors
import { FormSuccess } from "../form-success"; // Component to display form success messages

import { useState, useTransition } from "react"; // State management with hooks
import { RegisterSchema } from "@/lib/validations/auth";
import { register } from "@/action/register";

export const RegisterForm = () => {
  // State for error, success messages, and form pending status
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition(); // Transition state for smoother UI changes

  // Form initialization using React Hook Form and RegisterSchema
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema), // Using Zod resolver for form validation
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handling form submission
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(""); // Clearing previous errors
    setSuccess(""); // Clearing previous success messages

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error); // Setting error message based on registration result
        setSuccess(data.success); // Setting success message based on registration result
      });
    });
  };

  return (
    // Rendering the registration form within a CardWrapper component
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already Have an account?"
      backButtonHref="/auth/login"
      showSocial // Showing social login options
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Input field for Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Abhay Chauhan"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input field for Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="abhay@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input field for Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Displaying error and success messages */}
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* Submit button */}
          <Button disabled={isPending} type="submit" className="w-full mt-3">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
