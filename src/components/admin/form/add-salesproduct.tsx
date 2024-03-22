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
import { insertSalesproductsSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertSalesproductsSchema>;
  slug: number;
  setInvoices: Dispatch<
    SetStateAction<
      {
        name: string;
        hsn: number;
        quantity: number;
        price: number;
        gst: number;
        cgst: number;
        taxableamount: number;
        amount: number;
      }[]
    >
  >;
};

const AddSalesproductsForm = ({
  btn,
  formBtnTitle,
  values,
  slug,
  setInvoices,
}: Props) => {
  const isorderFormOpen = useStore((state) => state.isOrderFormOpen);
  const setorderForm = useStore((state) => state.setOrderForm);

  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertSalesproductsSchema>>({
    resolver: zodResolver(insertSalesproductsSchema),
    defaultValues: {
      ...values,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof insertSalesproductsSchema>,
  ) => {
    setInvoices([values]);
  };

  const { data: productData } = api.inventory.read.useQuery({
    companyId: slug,
  });
  const { setValue } = form;
  const fetchProductData = async (selectedUser: any) => {
    if (selectedUser) {
      setInvoices([{ ...selectedUser, name: "zzzz" }])
      // Set form values based on the fetched product data
      setValue("hsn", selectedUser.hsn);
      setValue("quantity", selectedUser.quantity);
      setValue("price", selectedUser.price);
      setValue("gst", selectedUser.gst);
      setValue("cgst", selectedUser.cgst);
      setValue("taxableamount", selectedUser.taxableamount);
      setValue("amount", selectedUser.amount);
    }
  };
  useEffect(() => {
    if (productData && form.control) {
      const selectedCustomer = productData.find(
        (customer) => customer.name === form.watch("name"),
      );

      if (selectedCustomer) {
        form.reset({
          hsn: selectedCustomer.hsn,
          quantity: selectedCustomer.quantity,
          price: selectedCustomer.price,
          gst: selectedCustomer.gst,
          cgst: selectedCustomer.cgst,
          taxableamount: selectedCustomer.taxableamount,
          amount: selectedCustomer.amount,
        });
      }
    }
  }, [productData, form]);

  const utils = api.useUtils();

  const createOrUpdateProduct = api.order.createOrUpdate.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      utils.order.invalidate();
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
    <div className="mx-auto p-4">
      <Dialog open={isorderFormOpen} onOpenChange={setorderForm}>
        <DialogTrigger asChild>
          <Button>{btn}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>order Form</DialogTitle>
            <DialogDescription>
              <div className="flex-1 overflow-auto">
                <Form {...form}>
                  <form className="grid grid-cols-4 gap-4">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel className="font-semibold">Name</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={(value: any) => {
                                field.onChange(value);
                                if (productData) {
                                  fetchProductData(
                                    productData.find(
                                      (c: any) => c.name === value,
                                    ),
                                  );
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Products</SelectLabel>
                                  {productData?.map((customer) => (
                                    <SelectItem
                                      key={customer.id}
                                      value={customer.name}
                                    >
                                      {customer.name}
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
                  </form>
                  <Button
                    className="ml-36 mt-6"
                   
                    disabled={form.formState.isSubmitting}
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

export default AddSalesproductsForm;
