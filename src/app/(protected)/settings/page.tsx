import { Button } from "@/components/ui/button";
import React from "react";
import { auth, signOut } from "@/server/auth";
import Header from "@/components/dashboard/navbar/header";
import DashboardPage from "@/components/dashboard/mainPage/mainpage";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <Header />
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit" className="flex items-center justify-center">
          signOut
        </Button>
      </form>
      <DashboardPage />
    </div>
  );
};

export default SettingsPage;
