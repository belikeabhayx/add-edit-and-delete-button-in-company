"use client"; // Indicates this code runs on the client-side

import { signIn } from "next-auth/react"; // Importing signIn function from next-auth for authentication
import { FcGoogle } from "react-icons/fc"; // Google icon component
import { FaGithub } from "react-icons/fa"; // GitHub icon component
import { useSearchParams } from "next/navigation"; // Hook for accessing URL search parameters

import { Button } from "@/components/ui/button"; // Button component
import { DEFAULT_LOGIN_REDIRECT } from "routes";


export const Social = () => {
  // Function triggered when Google or GitHub buttons are clicked
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT, // Redirect URL after authentication
    });
  }

  return (
    // Rendering Google and GitHub buttons for social login
    <div className="flex items-center w-full gap-x-2">
      {/* Google login button */}
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")} // Click action for Google button
      >
        <FcGoogle className="h-5 w-5" /> {/* Google icon */}
      </Button>

      {/* GitHub login button */}
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")} // Click action for GitHub button
      >
        <FaGithub className="h-5 w-5" /> {/* GitHub icon */}
      </Button>
    </div>
  );
};
