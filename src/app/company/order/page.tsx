import SideNavbar from "@/components/admin/dashboard/navbar/sidenav";
import Summary from "@/components/admin/summary/summary";
import { Button } from "@/components/ui/button";
import { products } from "@/server/db/schema";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";
import NoSSR from "@/components/no-ssr";
import OrderTable from "@/components/admin/order/order-table";
import { columns } from "@/components/admin/order/columns";
;

type Props = {};

const Order = async (props: Props) => {
const products = await api.order.read.query();

  return (
    <div className="grainy min-h-screen p-8">
      <SideNavbar />
      <div className="mx-auto max-w-7xl">
        <div className="ml-10 flex items-center rounded-lg border border-stone-200 p-4 shadow-xl">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>

          <span className="mx-1 inline-block">/</span>
          <span className="font-semibold text-stone-500"></span>
          <div className="ml-auto"></div>
        </div>

        <div className="h-4"></div>
        <div className="ml-10 w-full rounded-lg border border-stone-200 px-16 py-8 shadow-xl">
          <NoSSR>
            <OrderTable columns={columns} initialData={products} />
          </NoSSR>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Order;
