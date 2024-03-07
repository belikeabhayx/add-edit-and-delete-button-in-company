"use client";

import { useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
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
import { Button } from "@/components/ui/button";
import useStore from "@/hook/use-store";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table/data-table";
import AddProductForm from "@/components/admin/form/add-product";
import ProductsTableToolbar from "./products-table-toolbar";

type ProductsTableProps = {
  columns: ColumnDef<Product>[];
  initialData: Product[];
  slug: number;
};

const ProductsTable = ({ slug, columns, initialData }: ProductsTableProps) => {
  const { data } = api.inventory.read.useQuery(
    { companyId: slug },
    { initialData },
  );
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
      <ProductsTableToolbar table={table} slug={slug} />
      <DataTable table={table} columns={columns} />
      {/* <AddProductForm slug={slug} btn={<Button>Add Product</Button>} formBtnTitle="add product"/> */}
      <DataTablePagination table={table} />
    </div>
  );
};

export default ProductsTable;