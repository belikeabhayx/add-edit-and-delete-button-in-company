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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { insertProductSchema } from "@/server/db/schema";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { api } from "@/trpc/react";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertProductSchema>;
};

const ProductForm = ({ btn, formBtnTitle, values }: Props) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: values,
  });

  const onSubmit = async (values: z.infer<typeof insertProductSchema>) => {
    await createOrUpdateProduct.mutateAsync(values);
  };

  const createOrUpdateProduct = api.product.createOrUpdate.useMutation({
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

  // logic for total price based on price and tax rate
  useEffect(() => {
    if (form.watch("price") && form.watch("tax")) {
      const taxRate = form.watch("tax");
      const price = form.watch("price");
      const total = price * (1 + taxRate / 100);
      form.setValue("total", total);
    }
  }, [form.watch("price"), form.watch("tax")]);

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

              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement & {
                              files: FileList;
                            };

                            const file = target.files[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              const base64Image = reader.result;
                              if (!base64Image) return;
                              onChange(base64Image.toString());
                            };
                          }}
                          {...rest}
                        />
                        {value && (
                          <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage src={value} />
                          </Avatar>
                        )}
                      </div>
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

              {/* tax rate */}
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0} max={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* total price */}
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Total Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} readOnly />
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
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="hold">Hold</SelectItem>
                        </SelectContent>
                      </Select>
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

export default ProductForm;