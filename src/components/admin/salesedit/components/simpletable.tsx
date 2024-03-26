import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddSalesproductsForm from "../../form/add-salesproduct";

export interface Product {
  id: number;
  name: string;
  hsn: number;
  quantity: number;
  price: number;
  gst: number;
  cgst: number;
  taxableamount: number;
  amount: number;
  createdAt: Date;
  companyId: number;
 }

export function TableDemo() {

  const addInvoice = (newInvoice: Product) => {
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
   };

  const [invoices, setInvoices] = useState([
    {
      name: "egg",
      hsn: 99,
      quantity: 10,
      price: 123,
      gst: 12,
      cgst: 13,
      taxableamount: 124,
      amount: 1230,
    },
  ]);

  return (
    <Table className="mt-8">
      <TableCaption className="mt-4">A list of your added products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>HSN</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>GST</TableHead>
          <TableHead>CGST</TableHead>
          <TableHead>Taxable Amount</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.hsn}</TableCell>
            <TableCell>{invoice.quantity}</TableCell>
            <TableCell>{invoice.price}</TableCell>
            <TableCell>{invoice.gst}</TableCell>
            <TableCell>{invoice.cgst}</TableCell>
            <TableCell>{invoice.taxableamount}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <AddSalesproductsForm
            btn={"add"}
            formBtnTitle={"add"}
            slug={2}
            addInvoice={addInvoice}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
