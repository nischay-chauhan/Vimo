import Sidebar from '@/components/admin/sidebar/sidebar'
import React from 'react'
import { SidebarProvider , SidebarTrigger } from '@/components/ui/sidebar'
const AdminLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <SidebarProvider>     
   <section className='bg-gradient-to-br from-blue-100 to-green-100 flex min-w-[100%]'>
    <Sidebar />
        <section className='flex-1 flex flex-col'>
       
        <div className='h-48 flex  justify-center flex-col px-10 gap-3'>
        <div className='absolute bg-black rounded-lg top-2 left-2 z-10'>
        <SidebarTrigger />
        </div>
        <h1 className='text-5xl'>Scrape Data</h1>
        </div>
        {children}
    </section>
   </section>
   </SidebarProvider>
  )
}

export default AdminLayout