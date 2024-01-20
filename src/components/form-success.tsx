import { CheckCircledIcon } from "@radix-ui/react-icons"; // Importing an icon for visual representation

interface FormSuccessProps {
  message?: string; // Accepts an optional 'message' string prop
};

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null; // If there's no message, don't display anything

  // Display the success message along with an icon for visual indication
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md mb-3 flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" /> {/* Icon representing a success */}
      <p>{message}</p> {/* Displaying the success message */}
    </div>
  );
};
