import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PackagePlus } from 'lucide-react';
import React from 'react'
import CustomerForm from './customer-form';
import { api } from '@/trpc/react';
import { z } from 'zod';
import { insertCustomerSchema } from '@/server/db/schema';

type CustomerSelectProp = {
  initialData: [z.infer<typeof insertCustomerSchema>]
}

const customerSelect = (props: CustomerSelectProp) => {

  const { data } = api.customer.read.useQuery();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-md items-center space-x-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
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
  );
}
export default customerSelect

