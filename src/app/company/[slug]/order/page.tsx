import SideNavbar from "@/components/admin/dashboard/navbar/sidenav";
import Summary from "@/components/admin/summary/summary";
import { Button } from "@/components/ui/button";
import { products } from "@/server/db/schema";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";
import NoSSR from "@/components/no-ssr";
import OrderTable from "@/app/company/[slug]/order/components/order-table";
import { columns } from "@/app/company/[slug]/order/components/columns";


const Order = async ({ params }: { params: { slug: string } })=> {

const slug = Number(params.slug);
  const order = await api.order.read.query({
    companyId: slug,
  });
  console.log("Slug value:", slug);

  return (
    <div className="grainy min-h-screen p-8">
      <SideNavbar slug={slug} />
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
            <OrderTable columns={columns} initialData={order} slug={slug} />
          </NoSSR>
          {/* <Summary /> */}
        </div>
      </div>
    </div>
  );
};

export default Order;
