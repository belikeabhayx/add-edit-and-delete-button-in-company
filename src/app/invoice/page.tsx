import SideNavbar from "@/components/admin/dashboard/navbar/sidenav";
import { columns } from "@/components/admin/invoice/columns";
import ProductsTable from "@/components/admin/invoice/invoice-table";
import { products } from "@/server/db/schema";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-center items-center border border-black mt-36">
        <SideNavbar/>
      <ProductsTable columns={columns} initialData={[]} />
    </div>
  );
};

export default page;
