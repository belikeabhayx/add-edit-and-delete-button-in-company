import { ExclamationTriangleIcon } from "@radix-ui/react-icons"; // Importing an icon for visual representation

interface FormErrorProps {
  message?: string; // Accepts an optional 'message' string prop
};

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null; // If there's no message, don't display anything

  // Display the error message along with an icon for visual indication
  return (
    <div className="bg-destructive/15 p-3 mt-3 mb-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" /> {/* Icon representing an error */}
      <p>{message}</p> {/* Displaying the error message */}
    </div>
  );
};
