import { ExclamationTriangleIcon } from "@radix-ui/react-icons"; // Icon for indicating an error
import { CardWrapper } from "@/components/auth/card-wrapper"; // Wrapper component for the card layout

export const ErrorCard = () => {
  return (
    // Rendering an error card within a CardWrapper
    <CardWrapper
      headerLabel="Oops! Something went wrong!" // Header label indicating an error
      backButtonHref="/auth/login" // Back button redirects to the login page
      backButtonLabel="Back to login" // Label for the back button
    >
      <div className="w-full flex justify-center items-center">
        {/* Displaying an icon for an error */}
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
