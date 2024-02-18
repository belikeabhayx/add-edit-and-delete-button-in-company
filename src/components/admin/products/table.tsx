"use client"
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import useStore from "@/hook/use-store";
import Image from "next/image";

import React from "react";

const table = () => {

  const setProductForm = useStore((state) => state.setProductForm);

  const invoices = [
    {
      id: "1",
      name: "FABRIC",
      hsn: 5407,
      quantity: 1,
      unit: "MTR",
      pricePerUnit: 87,
      taxableAmount: 787,
      cgst: 6,
      gst: 4.35,
      total: 791.35,
    },
    // ... more invoice objects can be added here
  ];

  return (
    <div>
      <div className="mb-4  flex">
        <Image src="/items.svg" alt="" width={50} height={50} />
        <div className="ml-2 mt-2 text-3xl font-bold">Items</div>
      </div>
      <Button onClick={setProductForm} className="w-full">Add Product</Button>
      <div className="mx-auto w-full overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-bold">#</TableHead>
              <TableHead className="pl-24 text-lg font-bold ">
                Item Name
              </TableHead>
              <TableHead className="pl-24 text-lg font-bold ">HSN</TableHead>
              <TableHead className="pl-24 text-lg font-bold ">
                Quantity
              </TableHead>
              <TableHead className="pl-24 text-lg font-bold ">Price</TableHead>
              <TableHead className="pl-24 text-lg font-bold ">GST</TableHead>
              <TableHead className="pl-24 text-lg font-bold ">CGST</TableHead>
              <TableHead className="pl-24 text-lg font-bold ">
                Taxable Amount
              </TableHead>
              <TableHead className="pl-24 text-lg font-bold ">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index} className="text-right">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell className="font-medium">{invoice.name}</TableCell>
                <TableCell>{invoice.hsn}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                <TableCell className="text-right">
                  {invoice.pricePerUnit}
                </TableCell>
                <TableCell>{invoice.gst}</TableCell>
                <TableCell>{invoice.cgst}</TableCell>
                <TableCell>{invoice.taxableAmount}</TableCell>
                <TableCell className="text-right">{invoice.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default table;
