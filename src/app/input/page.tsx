"use client"
import CustomerForm from "@/components/admin/customerSelect/customer-form";
import ProductForm from "@/components/admin/products/product-form";
import { Button } from "@/components/ui/button";
import useStore from "@/hook/use-store";
import { PackagePlus } from "lucide-react";
import React from "react";

const page = () => {

  const setCustomerForm = useStore((state) => state.setCustomerForm);
  const setProductForm = useStore((state) => state.setProductForm);

  return (
    <div>
      <Button onClick={setCustomerForm}>add zustand</Button>
      <ProductForm btn={
          <Button size="sm" className="h-8 ">
            <PackagePlus className="mr-2 h-4 w-4" />
            Addd product
          </Button>
        } formBtnTitle="addd product"/>
        <Button onClick={setProductForm}>addd project</Button>
    </div>
  );
};

export default page;
