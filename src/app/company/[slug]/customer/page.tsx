import { columns } from '@/components/admin/customerSelect/columns'
import CustomersTable from '@/components/admin/customerSelect/customer-table'
import SideNavbar from '@/components/admin/dashboard/navbar/sidenav'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/server'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: { params: { slug: string } })=> {

  const slug = Number(params.slug);
  const customer = await api.customer.read.query({
    companyId: slug,
  });
  console.log("Slug value:", slug);

  return (
    <div className="grainy min-h-screen p-8">
      <SideNavbar slug={slug}/>
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
          <CustomersTable slug={slug} columns={columns} initialData={customer}/>
        </div>
      </div>
    </div>
  )
}

export default page