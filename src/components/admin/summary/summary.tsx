import { Separator } from "@/components/ui/separator";
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
import { api } from "@/trpc/server";
import Image from "next/image";

const Summary = async () => {
  const product = await api.inventory.read.query();

  //  fetch taxable amount
  const totalTaxableAmount = product.reduce(
    (sum, item) => sum + item.taxableamount,
    0,
  );

  //  fetch CGST
  const totalCGST = product.reduce(
    (sum, item) => sum + (item.price - item.price * (1 - item.cgst / 100)),
    0,
  );

  //  fetch GST
  const totalGST = product.reduce(
    (sum, item) => sum + (item.price - item.price * (1 - item.gst / 100)),
    0,
  );

  //  fetch Total
  const total = product.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <div className=" mt-10 items-center justify-center">
        {/* icon and heading */}
        <div className="flex ml-2 mb-4">
          <Image
            src="/pricing.svg"
            alt=""
            width={50}
            height={50}
          />
          <div className="font-bold text-3xl mt-2 ml-2">Summary</div>
        </div>
        <div className="mx-auto w-full overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] font-bold text-lg pl-36">Summary</TableHead>
                <TableHead className="w-[150px] font-bold text-lg pl-24 ">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="w-[150px] pl-32">Taxable Amount</TableCell>
                <TableCell className="w-[150px] pl-20">
                ₹{totalTaxableAmount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-[150px] pl-32">CGST</TableCell>
                <TableCell className="w-[150px] pl-20">₹{totalCGST}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-[150px] pl-32">GST</TableCell>
                <TableCell className="w-[150px] pl-20">₹{totalGST}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-[150px] pl-32 font-bold">Total</TableCell>
                <TableCell className="w-[150px] pl-20">₹{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
