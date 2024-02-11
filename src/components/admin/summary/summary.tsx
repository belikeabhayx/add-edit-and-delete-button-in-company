import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/server";

const Summary = async () => {
  const product = await api.product.read.query();

  //  fetch taxable amount
  const totalTaxableAmount = product.reduce(
    (sum, item) =>
      sum + (item.taxableamount),
    0,
  );

  //  fetch CGST
  const totalCGST = product.reduce(
    (sum, item) => sum + (item.price - (item.price * (1 - item.cgst / 100))),
    0,
  );

  //  fetch GST
  const totalGST = product.reduce(
    (sum, item) => sum + (item.price - (item.price * (1 - item.gst / 100))),
    0,
  );

  //  fetch Total
  const total = product.reduce(
    (sum, item) =>
      sum + (item.amount),
    0,
  );

  return (
    <div className="mt-32 flex items-center justify-center -mr-48">
      <div className="mx-auto max-w-xl overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Summary</TableHead>
              <TableHead className="w-[200px] ">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[150px]">Taxable Amount</TableCell>
              <TableCell className="w-[150px] pl-20">
                {totalTaxableAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[150px]">CGST</TableCell>
              <TableCell className="w-[150px] pl-20">
                {totalCGST}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[150px]">GST</TableCell>
              <TableCell className="w-[150px] pl-20">
                {totalGST}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[150px]">Total</TableCell>
              <TableCell className="w-[150px] pl-20">
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Summary;