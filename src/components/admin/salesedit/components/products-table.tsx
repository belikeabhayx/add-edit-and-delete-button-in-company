"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
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
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import AddSalesproductsForm from "../../form/add-salesproduct";

type ProductsTableProps = {
  columns: ColumnDef<Product>[];
  initialData: Product[];
  slug: number;
};

const SaleseditTable = ({ slug, columns, initialData }: ProductsTableProps) => {
  const { data } = api.salesproduct.read.useQuery(
    { companyId: slug },
    { initialData },
  );
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
          <div className="font-bold text-3xl mt-2 ml-2"> Add </div>
        </div>
      </div>
      <DataTable table={table} columns={columns} />
    </div>
  );
};

export default SaleseditTable;