"use client";

import { useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { api } from "@/trpc/react";
import OrderTableToolbar from "./order-table-toolbar";
import { Order } from "./columns";
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
import AddOrderForm from "@/components/admin/form/add-order";

type ProductsTableProps = {
  columns: ColumnDef<Order>[];
  initialData: Order[];
  slug: number,
};

const OrderTable = ({ columns ,slug ,initialData}: ProductsTableProps) => {
  const [data, setData] = useState<Order[]>(initialData);
  const { data: fetchedData } = api.order.read.useQuery({ companyId: slug });
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
          <div className="font-bold text-3xl mt-2 ml-2">Orders</div>
        </div>
      </div>
      <OrderTableToolbar table={table} />
      <DataTable table={table} columns={columns} />
      <AddOrderForm btn={<Button>Add orders</Button>} formBtnTitle="add orders" slug={slug}/>
      <DataTablePagination table={table} />
    </div>
  );
};

export default OrderTable;