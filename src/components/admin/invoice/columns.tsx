"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import React from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { selectInvoiceSchema } from "@/server/db/schema";
import { ColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export type Invoice = z.infer<typeof selectInvoiceSchema>;

export const columns: ColumnDef<Invoice>[] = [
  // Invoice
  {
    accessorKey: "id",
    header: "Invoice No.",
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => (
      <p className="w-24 truncate">{getValue<Invoice["id"]>()}</p>
    ),
  },
  // Customer Name
  {
    accessorKey: "customername",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ getValue }) => getValue<Invoice["customername"]>(),
  },
  // Invoice Amount
  {
    accessorKey: "invoiceamount",
    header: ({ column }) => <ColumnHeader column={column} title="Invoice Amount" />,
    cell: ({ getValue }) => {
      const amount = parseFloat(getValue<string>());

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  // Balance Due
  {
    accessorKey: "balancedue",
    header: ({ column }) => <ColumnHeader column={column} title="Balance Due" />,
    cell: ({ getValue }) => {
      const amount = parseFloat(getValue<string>());

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  // Payment Status

  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue<Invoice["status"]>();

      switch (status) {
        case "Paid":
          return (
            <Badge className="rounded-sm bg-green-300 text-green-950">
              {status}
            </Badge>
          );
        case "Unpaid":
          return (
            <Badge className="rounded-sm bg-blue-300 text-blue-950">
              {status}
            </Badge>
          );
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const utils = api.useUtils();

      const deleteProduct = api.product.delete.useMutation({
        onSuccess: () => {
          utils.product.invalidate();
          toast.success("Invoice deleted!");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });

      const handleClick = (id: string) => {
        deleteProduct.mutate({ id });
      };
      return (
        <div className="flex">
          {/* <ProductForm
            formBtnTitle="Update Invoice"
            btn={
              <Button
                variant="outline"
                className="group h-7 rounded-r-none p-2"
              >
                <Pencil className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Button>
            }
            values={row.original}
          />
          <Button
            variant="outline"
            className="group h-7 rounded-l-none bInvoice-l-0 p-2"
            disabled={deleteProduct.isLoading}
            onClick={() => handleClick(row.original.id)}
          >
            {deleteProduct.isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            )}
          </Button> */}
        </div>
      );
    },
  },
];

// ...ProductForm component
