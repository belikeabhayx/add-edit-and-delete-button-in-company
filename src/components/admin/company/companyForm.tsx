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
import { insertCompanySchema } from "@/server/db/schema";
import { toast } from "sonner";
import { api } from "@/trpc/react";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertCompanySchema>;
};

const CompanyForm = ({ btn, formBtnTitle, values }: Props) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertCompanySchema>>({
    resolver: zodResolver(insertCompanySchema),
    defaultValues: values,
  });

  const onSubmit = async (values: z.infer<typeof insertCompanySchema>) => {
    await createOrUpdateCompany.mutateAsync(values);
  };

  const createOrUpdateCompany = api.company.createOrUpdate.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success(values?.id ? "Company updated!" : "Company created!");
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
          <SheetTitle>Company</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form className="grid grid-cols-4 gap-4">
              
              {/* Legal Name */}
              <FormField
                control={form.control}
                name="legalname"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>legalname</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* businessname */}
              <FormField
                control={form.control}
                name="businessname"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>businessname</FormLabel>
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
                name="GSTIN"
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

              {/* pan */}
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>pan</FormLabel>
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

export default CompanyForm;
