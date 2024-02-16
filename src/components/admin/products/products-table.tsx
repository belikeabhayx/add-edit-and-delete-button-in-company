"use client";

import { useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

import { api } from "@/trpc/react";
import ProductsTableToolbar from "./products-table-toolbar";
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
import useStore from "@/hook/use-store";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table/data-table";

type ProductsTableProps = {
  columns: ColumnDef<Product>[];
  initialData: Product[];
};

const ProductsTable = ({ columns, initialData }: ProductsTableProps) => {
  const { data } = api.product.read.useQuery(undefined, { initialData });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const setProductForm = useStore((state) => state.setProductForm);

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
          <div className="font-bold text-3xl mt-2 ml-2">Items</div>
        </div>
      </div>
      <ProductsTableToolbar table={table} />
      <DataTable table={table} columns={columns} />
      <Button onClick={setProductForm} className="w-full">Add Product</Button>
      <DataTablePagination table={table} />
    </div>
  );
};

export default ProductsTable;