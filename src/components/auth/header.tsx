import { Poppins } from "next/font/google"; // Importing Poppins font from Google Fonts

import { cn } from "@/lib/utils"; // Utility function for className composition

// Defining font styles for Poppins font
const font = Poppins({
  subsets: ["latin"], // Subset of characters to include
  weight: ["600"], // Font weight (600)
});

interface HeaderProps {
  label: string; // Accepts a 'label' string prop
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    // Rendering a header component with title and label
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* Title */}
      <h1 className={cn(
        "text-3xl font-semibold", // Styles for title text
        font.className, // Applying Poppins font styles
      )}>
        🔐 Auth
      </h1>

      {/* Label */}
      <p className="text-muted-foreground text-sm">
        {label} {/* Displaying the provided label */}
      </p>
    </div>
  );
};
