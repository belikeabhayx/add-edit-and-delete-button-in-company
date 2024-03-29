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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import React, { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

type Props = {
  btn: React.ReactNode;
  formBtnTitle: string;
  values?: z.infer<typeof insertSalesproductsSchema>;
  slug: number;
  addInvoice: (invoice: Product) => void;
};

export interface Product {
  id: number;
  name: string;
  hsn: number;
  quantity: number;
  price: number;
  gst: number;
  cgst: number;
  taxableamount: number;
  amount: number;
  createdAt: Date;
  companyId: number;
 }

const AddSalesproductsForm = ({ btn, slug, addInvoice }: Props) => {
  const isorderFormOpen = useStore((state) => state.isOrderFormOpen);
  const setorderForm = useStore((state) => state.setOrderForm);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch data using useQuery
  const { data, isLoading, error } = api.inventory.read.useQuery({
    companyId: slug,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = data?.find((item) => item.name === selectedValue);
    if (selectedOption) {
      setSelectedProduct(selectedOption);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (selectedProduct) {
       addInvoice(selectedProduct); // Call the function passed as a prop
    }
   };

  return (
    <div className="mx-auto p-4">
      <Dialog open={isorderFormOpen} onOpenChange={setorderForm}>
        <DialogTrigger asChild>
          <Button>{btn}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-10 ml-44">Sales Form</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 space-x-4 space-y-4 overflow-auto">

                {/* Product */}
                <div>
                  <Label className="font-bold text-black">Products</Label>
                  <select onChange={handleSelectChange}>
                    <option value="">Select a product</option>
                    {data?.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* HSN */}

                <div>
                  <Label className="font-semibold text-black">HSN</Label>
                  <Input
                    type="number"
                    placeholder="Hsn"
                    value={selectedProduct?.hsn || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          hsn: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* quantity */}

                <div>
                  <Label className="font-semibold text-black">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={selectedProduct?.quantity || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          quantity: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* Price */}

                <div>
                  <Label className="font-semibold text-black">Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={selectedProduct?.price || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          price: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* GST */}
                <div>
                  <Label className="font-semibold text-black">GSt</Label>
                  <Input
                    type="text"
                    placeholder="Gst"
                    value={selectedProduct?.gst || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          gst: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* CGST */}

                <div>
                  <Label className="font-semibold text-black">CGST</Label>
                  <Input
                    type="text"
                    placeholder="Cgst"
                    value={selectedProduct?.cgst || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          cgst: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* Taxable Amount */}
                <div>
                  <Label className="font-semibold text-black">
                    Taxable Amount
                  </Label>
                  <Input
                    type="text"
                    placeholder="Taxable Amount"
                    value={selectedProduct?.taxableamount || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          taxableamount: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* Amount */}
                <div>
                  <Label className="font-semibold text-black">Amount</Label>
                  <Input
                    type="text"
                    placeholder="Amount"
                    value={selectedProduct?.amount || ""}
                    onChange={(e) => {
                      if (selectedProduct) {
                        setSelectedProduct({
                          ...selectedProduct,
                          amount: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </div>

                {/* Submit */}
                
                <Button className="ml-14" onClick={handleSubmit}> ADD </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSalesproductsForm;
