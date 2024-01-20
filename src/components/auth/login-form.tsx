"use client"; // Indicates this code runs on the client-side

import { useForm } from "react-hook-form"; // Importing react-hook-form for form handling
import * as z from "zod"; // Importing Zod for schema validation
import { CardWrapper } from "./card-wrapper"; // Importing a card wrapper component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing form-related components
import { Input } from "../ui/input"; // Importing Input component
import { Button } from "../ui/button"; // Importing Button component
import { FormError } from "../form-error"; // Importing FormError component
import { FormSuccess } from "../form-success"; // Importing FormSuccess component

import { useState, useTransition } from "react"; // Importing useState and useTransition hooks for managing state and transitions
import { useSearchParams } from "next/navigation"; // Importing useSearchParams for accessing URL search parameters
import { LoginSchema } from "@/lib/validations/auth";
import { login } from "@/action/login";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  // Extracting error information from URL search params
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  // Managing state for error, success messages, and form pending status
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // Initializing form handling with react-hook-form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema), // Using Zod resolver for form validation
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handling form submission
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(""); // Clearing previous errors
    setSuccess(""); // Clearing previous success messages

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error); // Setting error message based on login result
        // setSuccess(data?.success); // Potentially setting success message on successful login (currently commented out)
      });
    });
  };

  return (
    // Rendering the login form within a CardWrapper component
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial // Showing social login options
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="sapce-y-6">
          <div className="space-y-4">
            {/* Email input field */}
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

            {/* Password input field */}
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

          {/* Displaying error messages */}
          <FormError message={error || urlError} />
          {/* Displaying success message (currently commented out) */}
          <FormSuccess message={success} />

          {/* Submit button */}
          <Button disabled={isPending} type="submit" className="mt-3 w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
