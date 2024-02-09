"use client";
import CustomerForm from "@/components/customer/customer-form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PackagePlus } from "lucide-react";
import React from "react";

export default function AnimatedMulti() {
  const { data } = api.customer.read.useQuery();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-md items-center space-x-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectContent>
                {data &&
                  data.map((item) => (
                    <SelectItem key={item.title} value={item.title}>
                      {item.title}-{item.Pno}
                    </SelectItem>
                  ))}
              </SelectContent>
            </SelectContent>
          </Select>
        </div>
        <div>
          <CustomerForm
            formBtnTitle="Add Product"
            btn={
              <Button size="sm" className="h-8 ">
                <PackagePlus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
