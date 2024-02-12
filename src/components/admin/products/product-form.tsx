import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertProductSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useStore from "@/hook/use-store";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertProductSchema>;
};

const ProductForm = ({ btn, formBtnTitle, values }: Props) => {
  const setCustomerForm = useStore((state) => state.setCustomerForm);
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: values,
  });

  const onSubmit = async (values: z.infer<typeof insertProductSchema>) => {
    await createOrUpdateProduct.mutateAsync(values);
  };

  const utils = api.useUtils();

  const createOrUpdateProduct = api.product.createOrUpdate.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      utils.product.invalidate();
      toast.success(values?.id ? "Product updated!" : "Product created!");
    },
    onError: () => {
      setOpen(false);
      toast.error("Something went wrong!");
    },
  });

  // logic for total price based on price and tax rate
  useEffect(() => {
    const price = form.watch("price");
    const cgstRate = form.watch("cgst");
    const gstRate = form.watch("gst");
    const quantity = form.watch("quantity");

    // Calculate the total amount including GST // math.round
    const totalWithGST = Math.round(
      price * (1 + cgstRate / 100) * (1 + gstRate / 100) * quantity,
    );
    form.setValue("amount", totalWithGST);

    // Calculate the taxable amount
    const taxableAmount = Math.round(totalWithGST - price * quantity);
    form.setValue("taxableamount", taxableAmount);
  }, [
    form.watch("price"),
    form.watch("cgst"),
    form.watch("gst"),
    form.watch("quantity"),
  ]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{btn}</SheetTrigger>
      <SheetContent className="flex flex-col data-[state=closed]:duration-200 data-[state=open]:duration-200">
        <SheetHeader>
          <SheetTitle>Product</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form className="grid grid-cols-4 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* HSN */}
              <FormField
                control={form.control}
                name="hsn"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>HSN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CGST */}
              <FormField
                control={form.control}
                name="cgst"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>CGST (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        min={0}
                        max={100}
                        value={field.value ?? 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* GST */}
              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>GST (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0} max={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Taxable Amount */}
              <FormField
                control={form.control}
                name="taxableamount"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Taxable Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={setCustomerForm}>add zustand</Button>
            </form>
            <Button onClick={setCustomerForm}>add customer</Button>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting ? true : false}
            >
              {formBtnTitle}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductForm;
