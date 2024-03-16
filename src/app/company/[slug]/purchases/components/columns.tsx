"use client"
import { type ColumnDef } from "@tanstack/react-table";
import { Badge, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import React from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { selectProductSchema, selectorderSchema } from "@/server/db/schema";
import { ColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import ProductForm from "./purchase-form";


export type Order = z.infer<typeof selectorderSchema>;

export const columns: ColumnDef<Order>[] = [
      // id
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => (
      <p className="w-24 truncate">{getValue<Order["id"]>()}</p>
    ),
  },
    // name
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => (getValue<Order["name"]>()),
  },
   // HSN
   {
    accessorKey: "hsn",
    header: "HSN",
    cell: ({ getValue }) => (getValue<Order["hsn"]>()),
  },
  // Quantity
  {
    accessorKey: "quantity",
    header: "quantity",
    cell: ({ getValue }) => (getValue<Order["quantity"]>()),
  },
    // price
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: ({ getValue }) => {
      const amount = parseFloat(getValue<string>());

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
    // CGST
  {
    accessorKey: "cgst",
    header: "CGST (%)",
    cell: ({ getValue }) => (getValue<Order["cgst"]>()),
  },
   // GST
   {
    accessorKey: "gst",
    header: "GST (%)",
    cell: ({ getValue }) => (getValue<Order["gst"]>()),
  },
    // Taxable Amount
  {
    accessorKey: "taxableamount",
    header: "taxableAmount",
    cell: ({ getValue }) => (getValue<Order["taxableamount"]>()),
  },
   // Amount
   {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => (getValue<Order["amount"]>()),
  },
    // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const utils = api.useUtils();

      const deleteProduct = api.inventory.delete.useMutation({
        onSuccess: () => {
          utils.inventory.invalidate();
          toast.success("Product deleted!");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });

      const handleClick = (id: number) => {
        deleteProduct.mutate({ id });
      };
      return (
        <div className="flex">
          <ProductForm
            formBtnTitle="Update Product"
            btn={<Button
              variant="outline"
              className="group h-7 rounded-r-none p-2"
            >
              <Pencil className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Button>}
            values={row.original}/>
          <Button
            variant="outline"
            className="group h-7 rounded-l-none border-l-0 p-2"
            disabled={deleteProduct.isLoading}
            onClick={() => handleClick(Number(row.original.id))}
          >
            {deleteProduct.isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            )}
          </Button>
        </div>
      );
    },
  },
];