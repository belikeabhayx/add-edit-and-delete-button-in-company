import { Button } from "@/components/ui/button";
import React from "react";
import { auth, signOut } from "@/server/auth";
import Header from "@/components/dashboard/navbar/header";
import DashboardPage from "@/components/dashboard/mainPage/mainpage";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <Header/>
      <DashboardPage />
    </div>
  );
};

export default SettingsPage;
