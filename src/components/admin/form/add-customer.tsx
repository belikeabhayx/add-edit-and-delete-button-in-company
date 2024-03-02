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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useStore from "@/hook/use-store";
import { insertCustomerSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

type Props = {
  slug: number;
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertCustomerSchema>;
};

const AddCustomerForm = ({ btn, formBtnTitle, values, slug }: Props) => {

  console.log("Slug value in customer-form:", slug);
  const [open, setOpen] = React.useState(false);
  const isCustomerFormOpen = useStore((state) => state.isCustomerFormOpen);
  const setCustomerForm = useStore((state) => state.setCustomerForm);
  const form = useForm<z.infer<typeof insertCustomerSchema>>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: {
      ...values,
      companyId: slug,
    },
  });

  const onSubmit = async (values: z.infer<typeof insertCustomerSchema>) => {
    console.log("onSubmit called");
    console.log("Submitted values:", values);
    await createOrUpdateProduct.mutateAsync(values);
  };

  const utils = api.useUtils();

  const createOrUpdateProduct = api.customer.createOrUpdate.useMutation({
    onSuccess: () => {
      setOpen(false);
      utils.customer.invalidate();
      form.reset();
      toast.success(values?.id ? "Product updated!" : "Product created!");
    },
    onError: () => {
      setOpen(false);
      toast.error("Something went wrong!");
    },
  });

  return (
    <Dialog open={isCustomerFormOpen} onOpenChange={setCustomerForm}>
      <DialogTrigger asChild>
        <Button>{btn}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer Form</DialogTitle>
          <DialogDescription>Fill your Customer Details here</DialogDescription>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>Legal Name</DialogTitle>
          <DialogDescription>
            <div className="flex-1 overflow-auto">
              <Form {...form}>
                <form className="grid grid-cols-4 gap-4">
                  {/* Legal Name */}
                  <FormField
                    control={form.control}
                    name="legalname"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Legal Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Business Name */}
                  <FormField
                    control={form.control}
                    name="businessname"
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

                  {/* phone No. */}
                  <FormField
                    control={form.control}
                    name="pno"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Phone No.</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Address */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <DevTool control={form.control} /> */}
                </form>
              </Form>
              <Button
                className="ml-44 mt-4"
                onClick={form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting ? true : false}
              >
                 {formBtnTitle}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
