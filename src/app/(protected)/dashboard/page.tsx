import React from "react";
import { auth } from "@/server/auth";
import Header from "@/components/dashboard/navbar/header";
import DashboardPage from "@/components/dashboard/mainPage/mainpage";
import ProductsTable from "@/components/admin/company/products-table";
import NoSSR from "@/components/no-ssr";

import { api } from "@/trpc/server";
import { columns } from "@/components/admin/company/columns";

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
