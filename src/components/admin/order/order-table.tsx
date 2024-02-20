"use client";

import { useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { api } from "@/trpc/react";
import OrderTableToolbar from "./order-table-toolbar";
import { Product } from "./columns";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  SortingState,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table/data-table";
import useStore from "@/hook/use-store";

type ProductsTableProps = {
  columns: ColumnDef<Product>[];
  initialData: Product[];
  slug: number;
};

const OrderTable = ({ columns, initialData ,slug }: ProductsTableProps) => {
  const { data } = api.order.read.useQuery(
    { companyId: slug },
    { initialData },
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const setOrderForm = useStore((state) => state.setOrderForm);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    //  TODO getFacetedUniqueValues bug
    /*   When using getFacetedUniqueValues() there is a known bug in React Table where a warning message is logged in the console.
         Warning: Can't perform a React state update on a component that hasn't mounted yet.
         This issue is currently being tracked and can be viewed here:
         https://github.com/TanStack/table/issues/5026
         Until the issue is resolved, the warning message can be safely ignored.
         Please note that the current bug affects only the warning message, not the functionality of the table itself.
         React Table will continue to function as expected until the issue is resolved.
    */
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (

    <div className="space-y-4">
      <div className=" mt-10 items-center justify-center">
        {/* icon and heading */}
        <div className="flex  mb-4">
          <Image
            src="/items.svg"
            alt=""
            width={50}
            height={50}
          />
          <div className="font-bold text-3xl mt-2 ml-2">Inventory</div>
        </div>
      </div>
      <OrderTableToolbar table={table} />
      <DataTable table={table} columns={columns} />
      <Button onClick={setOrderForm} className="w-full">Add Productt</Button>
      <DataTablePagination table={table} />
    </div>
  );
};

export default OrderTable;