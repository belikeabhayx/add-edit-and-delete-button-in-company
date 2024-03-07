"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import React from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { selectCustomerSchema } from "@/server/db/schema";
import { ColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import AddCustomerForm from "../form/add-customer";
import useStore from "@/hook/use-store";

export type Product = z.infer<typeof selectCustomerSchema>;



export const columns: ColumnDef<Product>[] = [
  // id
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => (
      <p className="w-24 truncate">{getValue<Product["id"]>()}</p>
    ),
  },
  // Legal Name
  {
    accessorKey: "legalname",
    header: "legalname",
    enableSorting: false,
    enableHiding: false,
    cell: ({ getValue }) => (
      <p className="w-24 truncate">{getValue<Product["legalname"]>()}</p>
    ),
  },
  // business Name
  {
    accessorKey: "businessname",
    header: ({ column }) => (
      <ColumnHeader column={column} title="business Name" />
    ),
    cell: ({ getValue }) => getValue<Product["businessname"]>(),
  },
  // GSTIN Name
  {
    accessorKey: "gstin",
    header: ({ column }) => <ColumnHeader column={column} title="gstin" />,
    cell: ({ getValue }) => getValue<Product["gstin"]>(),
  },
  // Phone No.
  {
    accessorKey: "pno",
    header: ({ column }) => <ColumnHeader column={column} title="pno" />,
    cell: ({ getValue }) => getValue<Product["pno"]>(),
  },
  // Email
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="email" />,
    cell: ({ getValue }) => getValue<Product["email"]>(),
  },

  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const utils = api.useUtils();

      const deleteProduct = api.customer.delete.useMutation({
        onSuccess: () => {
          utils.customer.invalidate();
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
          <AddCustomerForm
            formBtnTitle="Update Product"
            btn={<Button
              variant="outline"
              className="group h-7 rounded-r-none p-2"
            >
              <Pencil className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Button>}
            values={row.original} slug={1}/>
          <Button
            variant="outline"
            className="group h-7 rounded-l-none border-l-0 p-2"
            disabled={deleteProduct.isLoading}
            onClick={() => handleClick(row.original.id)}
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

// ...ProductForm component
