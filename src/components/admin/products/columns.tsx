"use client"
import { type ColumnDef } from "@tanstack/react-table";
import { Badge, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { selectProductSchema } from "@/server/db/schema";
import { ColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import ProductForm from "./product-form";

export type Product = z.infer<typeof selectProductSchema> & {
  tax: number;
  total: number;
};

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
    //  name
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue }) => (
      <Avatar>
        <AvatarImage src={getValue<string>()} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
    // title
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
  },
    // description
  {
    accessorKey: "description",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Description" />
    ),
    cell: ({ getValue }) => (
      <p className="w-96 truncate">{getValue<Product["description"]>()}</p>
    ),
  },
    //  status
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue<Product["status"]>();

      switch (status) {
        case "available":
          return (
            <Badge className="rounded-sm bg-green-300 text-green-950">
              {status}
            </Badge>
          );
        case "sold":
          return (
            <Badge className="rounded-sm bg-blue-300 text-blue-950">
              {status}
            </Badge>
          );
        case "hold":
          return (
            <Badge className="rounded-sm">
              {status}
            </Badge>
          );
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    // tax
  {
    accessorKey: "tax",
    header: "Tax (%)",
    cell: ({ getValue }) => (getValue<Product["tax"]>()),
  },
    // total
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => (getValue<Product["total"]>()),
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
          toast.success("Product deleted!");
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
          <ProductForm
            formBtnTitle="Update Product"
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