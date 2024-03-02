import React from 'react'
import Homepage from '@/components/Homepage'
import Newmain from '@/components/admin/dashboard/mainPage/newmain'
import Footer from '@/components/admin/dashboard/mainPage/footer'
import Navbar from '@/components/admin/dashboard/mainPage/navbar'

const page = () => {
  return (
    <div>
      <Navbar />
      <Newmain />
      <Footer />
    </div>
  )
}

export default page
