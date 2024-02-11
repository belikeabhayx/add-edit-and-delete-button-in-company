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

const Summary = async () => {
  const product = await api.product.read.query();

  return (
    <div className="flex items-center justify-center mt-32 bg-gray-100">
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
              {product &&
                product.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[150px]">Taxable Amount</TableCell>
                    <TableCell className="w-[150px] pl-20">{item.taxableamount}</TableCell>
                  </TableRow>
                ))}
            </TableRow>

            <TableRow>
              {product &&
                product.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[150px]">CGST</TableCell>
                    <TableCell>{item.cgst}</TableCell>
                  </TableRow>
                ))}
            </TableRow>

            <TableRow>
              {product &&
                product.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[150px]">GST</TableCell>
                    <TableCell>{item.gst}</TableCell>
                  </TableRow>
                ))}
            </TableRow>
            <TableRow>
              {product &&
                product.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[150px]">Total</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Summary;

{
  /* <TableRow>
          {product &&
            product.map((item) =>
             <TableCell>{item.amount}</TableCell>)}
        </TableRow> */
}
