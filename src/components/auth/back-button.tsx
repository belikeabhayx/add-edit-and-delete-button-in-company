"use client"; // Indicates this code runs on the client-side

import Link from "next/link"; // Next.js Link component for navigation
import { Button } from "@/components/ui/button"; // Button component for styling

interface BackButtonProps {
  href: string; // URL to navigate back
  label: string; // Label displayed on the button
};

export const BackButton = ({
  href,
  label,
}: BackButtonProps) => {
  return (
    // Button component wrapped in Next.js Link for navigation
    <Button
      variant="link" // Styling variant for the button
      className="font-normal w-full" // CSS classes for styling
      size="sm" // Size of the button
      asChild // Indicates Button is a child element
    >
      <Link href={href}> {/* Link component directing to the specified URL */}
        {label} {/* Displayed label on the button */}
      </Link>
    </Button>
  );
};
