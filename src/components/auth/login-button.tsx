'use client'

import { useRouter } from "next/navigation"; // Importing Next.js useRouter hook for navigation

// Define the expected props for the LoginButton component
interface LoginButtonProps {
    children: React.ReactNode; // Content within the LoginButton component
    mode?: "modal" | "redirect", // Mode for login action - modal or redirect (default: redirect)
    asChild?: boolean; // Optional prop to indicate if the component is used as a child component
};

// LoginButton component definition
export const LoginButton = ({
    children, // Content within the LoginButton component
    mode = "redirect", // Default mode is redirect
    asChild // Optional prop to indicate if the component is used as a child component
}: LoginButtonProps) => {
    const router = useRouter(); // Get the router object for navigation

    // Function to handle click event for the login action
    const onClick = () => {
        router.push("/auth/login"); // Redirect to the "/auth/login" route upon click
    }

    // If mode is set to "modal", return placeholder text indicating modal implementation is pending
    if (mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    // If mode is set to "redirect" or unspecified, return a clickable span triggering router push on click
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
