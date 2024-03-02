"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/hook/use-store";
import { insertInvoiceSchema, insertProductSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertInvoiceSchema>;
  slug: number,
};

const AddInvoiceForm = ({ btn,formBtnTitle , values , slug }: Props) => {
  const isInvoiceFormOpen = useStore((state) => state.isInvoiceFormOpen);
  const setInvoiceForm = useStore((state) => state.setInvoiceForm);

  const data = api.customer.read.useQuery({ companyId: slug });

  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertInvoiceSchema>>({
    resolver: zodResolver(insertInvoiceSchema),
    defaultValues: {
        ...values,
        companyId: slug,
      },
  });

  const onSubmit = async (values: z.infer<typeof insertInvoiceSchema>) => {
    await createOrUpdateProduct.mutateAsync(values);
  };

  const utils = api.useUtils();

  const createOrUpdateProduct = api.invoice.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      utils.invoice.invalidate();
      toast.success(values?.id ? "Invoice updated!" : "Invoice created!");
    },
    onError: () => {
      setOpen(false);
      toast.error("Something went wrong!");
    },
  });

  return (
    <div className="mx-auto w-[500px] p-4">
      <Dialog open={isInvoiceFormOpen} onOpenChange={setInvoiceForm}>
      <DialogTrigger asChild>
        <Button>{btn}</Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Form</DialogTitle>
            <DialogDescription>
              <div className="flex-1 overflow-auto">
                <Form {...form}>
                  <form className="grid w-full grid-cols-4 gap-4">
                    {/*customer Name */}
                    <FormField
                      control={form.control}
                      name="customername"
                      render={({ field }) => (
                        <Select>
                          <SelectTrigger className="mt-5 w-[300px]">
                            <SelectValue placeholder="search customer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Customer</SelectLabel>
                              {data.data &&
                                data.data.map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.legalname}
                                  >
                                    {item.legalname}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {/* Invoice Amount */}
                    <FormField
                      control={form.control}
                      name="invoiceamount"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Invoice Amount</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* balance due */}
                    <FormField
                      control={form.control}
                      name="balancedue"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Balance Due</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* status */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Unpaid">Unpaid</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DevTool control={form.control} />
                  </form>
                  <Button
                    className="ml-36 mt-6"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={form.formState.isSubmitting ? true : false}
                  >
                    {formBtnTitle}
                  </Button>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddInvoiceForm;
