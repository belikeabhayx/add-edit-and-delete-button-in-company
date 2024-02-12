"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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


type Props = {
	btn: React.ReactNode;
	formBtnTitle: string;
	values?: z.infer<typeof insertCustomerSchema>;
  };

const AddCustomerForm = ({ values }: Props) => {

  const [open, setOpen] = React.useState(false);
  const isCustomerFormOpen = useStore((state) => state.isCustomerFormOpen);
  const setCustomerForm = useStore((state) => state.setCustomerForm);
  const form = useForm<z.infer<typeof insertCustomerSchema>>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: values,
  });

  const onSubmit = async (values: z.infer<typeof insertCustomerSchema>) => {
    await createOrUpdateProduct.mutateAsync(values);
  };

  const createOrUpdateProduct = api.customer.createOrUpdate.useMutation({
    onSuccess: () => {
      setOpen(false);
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
                    name="title"
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

                  {/* phone No. */}
                  <FormField
                    control={form.control}
                    name="Pno"
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
                </form>
              </Form>
			  <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting ? true : false}
            >
              Add Customer
            </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
