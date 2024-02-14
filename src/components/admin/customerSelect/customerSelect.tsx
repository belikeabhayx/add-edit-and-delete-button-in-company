import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackagePlus } from "lucide-react";
import React from "react";
import CustomerForm from "./customer-form";

import { z } from "zod";
import { insertCustomerSchema } from "@/server/db/schema";
import { api } from "@/trpc/server";

// type CustomerSelectProp = {
//   initialData: z.infer<typeof insertCustomerSchema>[];
// };

const CustomerSelect = async () => {
  const data = await api.customer.read.query();
  const companies = await api.company.read.query();
  const company = companies[0]; // Assuming the array contains one company object

  return (
    <div className="flex flex-col">
      <header className="bg-blue-500 p-4 text-white">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bill From {company?.businessname}</h1>
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="mb-4 flex items-center">
          <div className="mr-4 w-64">
            <div className="mb-10 mt-8 flex items-center justify-start">
              <div className="mx-auto flex max-w-md items-center space-x-4">
                <div>
                  <Select>
                    <SelectTrigger className="w-[400px]">
                      <SelectValue placeholder="search customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Customer</SelectLabel>
                        {data &&
                          data.map((item) => (
                            <SelectItem key={item.title} value={item.title}>
                              {item.title}-{item.Pno}
                            </SelectItem>
                          ))}
                      </SelectGroup>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerSelect;
