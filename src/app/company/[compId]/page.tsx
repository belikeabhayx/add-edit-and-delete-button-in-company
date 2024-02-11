import { columns } from "@/components/admin/products/columns";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import NoSSR from "@/components/no-ssr";
import ProductsTable from "@/components/admin/products/products-table";
import { api } from "@/trpc/server";
import CustomerSelect from "@/components/admin/customerSelect/customerSelect";
import SideNavbar from "@/components/admin/dashboard/navbar/sidenav";
import Summary from "@/components/admin/summary/summary";

type Props = {
  params: {
    compId: string;
  };
};

const NotebookPage = async ({ params: { compId } }: Props) => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/dashboard");
  }
  const products = await api.product.read.query();
  const customer = await api.customer.read.query();

  return (
    <div className="grainy min-h-screen p-8">
      <SideNavbar/>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center ml-10 rounded-lg border border-stone-200 p-4 shadow-xl">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">{compId}</span>
          <span className="mx-1 inline-block">/</span>
          <span className="font-semibold text-stone-500"></span>
          <div className="ml-auto"></div>
        </div>

        <div className="h-4"></div>
        <div className="w-full ml-10 rounded-lg border border-stone-200 px-16 py-8 shadow-xl">

          {/* here i import my product table */}
          <CustomerSelect initialData={customer}/>
        <NoSSR>
          
        <ProductsTable columns={columns} initialData={products} />
        </NoSSR>
        <Summary/>
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
