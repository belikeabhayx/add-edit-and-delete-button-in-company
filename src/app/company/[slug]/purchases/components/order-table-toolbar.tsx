"use client";

import { X, Settings2 } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import useStore from "@/hook/use-store";
import AddOrderForm from "@/components/admin/form/add-order";



type ToolbarProps<TData> = {
  table: Table<TData>;
  slug: number;
};

const options = [
  {
    value: "available",
    label: (
      <Badge className="rounded-sm bg-green-300 text-green-950">
        Available
      </Badge>
    ),
  },
  {
    value: "sold",
    label: <Badge className="rounded-sm bg-blue-300 text-blue-950">Sold</Badge>,
  },
  {
    value: "hold",
    label: (
      <Badge className="rounded-sm" variant="secondary">
        Hold
      </Badge>
    ),
  },
];

const OrderTableToolbar = <TData,>({ table, slug }: ToolbarProps<TData>) => {

  const setProductForm = useStore((state) => state.setProductForm);
  const isFiltered = table.getState().columnFilters.length > 0;
  
  return (
    <div className="flex items-center justify-between gap-2">
      <Input
        placeholder="Search for a product..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Settings2 className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <FacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={options}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <AddOrderForm btn={<Button>Add orders</Button>} formBtnTitle="add orders" slug={slug}/>
      {/* <Button onClick={setProductForm}>Add Product</Button> */}
    </div>
  );
};

export default OrderTableToolbar;