"use client";

import { useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTable } from "@/components/ui/data-table/data-table";
import { api } from "@/trpc/react";
import CustomersTableToolbar from "./customer-table-toolbar";
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
import useStore from "@/hook/use-store";
import { Button } from "@/components/ui/button";
import AddCustomerForm from "../form/add-customer";

type ProductsTableProps = {
  slug: number;
  columns: ColumnDef<Product>[];
  initialData: Product[];
};

const CustomersTable = ({ columns, initialData, slug }: ProductsTableProps) => {
  // console.log("Slug valuee:", slug);
  const { data } = api.customer.read.useQuery(
    { companyId: slug },
    { initialData },
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const setCustomerForm = useStore((state) => state.setCustomerForm);

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
      <CustomersTableToolbar slug={slug} table={table} />
      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default CustomersTable;
