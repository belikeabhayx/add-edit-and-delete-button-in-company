import { columns } from '@/components/admin/customerSelect/columns'
import ProductsTable from '@/components/admin/customerSelect/customer-table'
import SideNavbar from '@/components/admin/dashboard/navbar/sidenav'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/server'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = async(props: Props) => {

  const customer = await api.customer.read.query();

  return (
    <div className="grainy min-h-screen p-8">
      <SideNavbar/>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center ml-10 rounded-lg border border-stone-200 p-4 shadow-xl">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold"></span>
          <span className="mx-1 inline-block">/</span>
          <span className="font-semibold text-stone-500"></span>
          <div className="ml-auto"></div>
        </div>

        <div className="h-4"></div>
        <div className="w-full ml-10 rounded-lg border border-stone-200 px-16 py-8 shadow-xl">

          {/* here i import my product table */}
          {/* <CustomerSelect initialData={customer}/> */}
          <ProductsTable columns={columns} initialData={customer}/>
        </div>
      </div>
    </div>
  )
}

export default page