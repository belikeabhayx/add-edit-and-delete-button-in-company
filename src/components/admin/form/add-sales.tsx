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
import { insertSalesSchema } from "@/server/db/schema/salesedit";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddCustomerForm from "./add-customer";
import AddProductForm from "./add-product";
import { TableDemo } from "../salesedit/components/simpletable";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertSalesSchema>;
  slug: number;
};

const AddInvoiceForm = ({ btn, formBtnTitle, values, slug }: Props) => {
  const isInvoiceFormOpen = useStore((state) => state.isInvoiceFormOpen);
  const setInvoiceForm = useStore((state) => state.setInvoiceForm);

  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertSalesSchema>>({
    resolver: zodResolver(insertSalesSchema),
    defaultValues: {
      ...values,
      companyId: slug,
    },
  });

  const onSubmit = async (values: z.infer<typeof insertSalesSchema>) => {
    await createOrUpdateProduct.mutateAsync(values);
  };

  const { data: customerData } = api.customer.read.useQuery({
    companyId: slug,
  });
  // select customer feature
  const { setValue } = form;
  const fetchProductData = async (selectedUser: any) => {
    if (selectedUser) {
      // Set form values based on the fetched product data
      setValue("custaddress", selectedUser.custaddress);
      setValue("gstin", selectedUser.gstin);
    }
  };
  useEffect(() => {
    if (customerData && form.control) {
      const selectedCustomer = customerData.find(
        (customer) => customer.legalname === form.watch("legalname"),
      );

      if (selectedCustomer) {
        form.reset({
          custaddress: selectedCustomer.businessname,
          gstin: selectedCustomer.gstin,
        });
      }
    }
  }, [customerData, form]);

  const handleSelectChange = (value: any) => {
    if (customerData) {
      const selectedCustomer = customerData.find(
        (customer) => customer.legalname === value,
      );
      if (selectedCustomer) {
        // Set form values based on the fetched customer data
        setValue("custaddress", selectedCustomer.businessname);
        setValue("gstin", selectedCustomer.gstin);
      }
    }
 };

  const utils = api.useUtils();

  const createOrUpdateProduct = api.salesproduct.create.useMutation({
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
    <div className="mx-auto p-4">
      <Dialog open={isInvoiceFormOpen} onOpenChange={setInvoiceForm}>
        <DialogTrigger asChild>
          <Button>{btn}</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-7xl">
          <DialogHeader>
            <DialogTitle>Invoice Form</DialogTitle>
            <DialogDescription>
              <div className="w-full">
                <AddCustomerForm
                  slug={slug}
                  btn={<Button>Add customer</Button>}
                  formBtnTitle="add customer"
                />
                <AddProductForm
                  slug={slug}
                  btn={<Button>Add Product</Button>}
                  formBtnTitle="add Product"
                />
                <Form {...form}>
                  <form className="w-full">
                    {/*customer Name */}
                    <div className="flex items-center justify-center gap-6">
                      <FormField
                        control={form.control}
                        name="legalname"
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <FormLabel className="font-semibold">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={handleSelectChange} // Add this line
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a customer" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Customers</SelectLabel>
                                    {customerData?.map((customer) => (
                                      <SelectItem
                                        key={customer.id}
                                        value={customer.legalname}
                                      >
                                        {customer.legalname}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="font-medium text-red-500" />
                          </FormItem>
                        )}
                      />

                      {/* Customer address */}
                      <FormField
                        control={form.control}
                        name="custaddress"
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* GSTIN */}
                      <FormField
                        control={form.control}
                        name="gstin"
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <FormLabel>GSTIN</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <TableDemo />
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
