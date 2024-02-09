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
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertCustomerSchema} from "@/server/db/schema";
import { toast } from "sonner";
import { api } from "@/trpc/react";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertCustomerSchema>;
};

const CustomerForm = ({ btn, formBtnTitle, values }: Props) => {
  const [open, setOpen] = React.useState(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{btn}</SheetTrigger>
      <SheetContent className="flex flex-col data-[state=closed]:duration-200 data-[state=open]:duration-200">
        <SheetHeader>
          <SheetTitle>Product</SheetTitle>
        </SheetHeader>
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

export default CustomerForm;
