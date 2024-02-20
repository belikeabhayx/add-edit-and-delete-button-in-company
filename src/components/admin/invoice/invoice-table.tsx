"use client";

import { useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTable } from "@/components/ui/data-table/data-table";
import { api } from "@/trpc/react";
import { Invoice } from "./columns";
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
import { TbFileInvoice } from "react-icons/tb";
import InvoiceTableToolbar from "./invoice-table-toolbar";

type InvoiceTableProps = {
  slug: number;
  columns: ColumnDef<Invoice>[];
  initialData: Invoice[];
};

const InvoiceTable = ({ slug, columns, initialData }: InvoiceTableProps) => {
  const { data } = api.invoice.read.useQuery(
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
          <TbFileInvoice className="text-5xl" />
          <div className="font-bold text-3xl mt-2 ml-2">Invoices</div>
        </div>
      </div>
      <InvoiceTableToolbar slug={slug} table={table} />
      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default InvoiceTable;
