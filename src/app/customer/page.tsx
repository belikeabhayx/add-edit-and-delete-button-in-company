import { columns } from '@/components/admin/customerSelect/columns'
import ProductsTable from '@/components/admin/customerSelect/customer-table'
import SideNavbar from '@/components/admin/dashboard/navbar/sidenav'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center items-center mt-36'>
      <SideNavbar/>
      <ProductsTable columns={columns} initialData={[]}/>
    </div>
  )
}

export default page