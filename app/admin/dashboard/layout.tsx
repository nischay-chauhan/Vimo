import Sidebar from '@/components/admin/sidebar/sidebar'
import React from 'react'
import { SidebarProvider , SidebarTrigger } from '@/components/ui/sidebar'
const AdminLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <SidebarProvider>     
   <section className='bg-gradient-to-br from-blue-100 to-green-100 flex w-full'>
    <Sidebar />
        <section className='flex-1 flex flex-col'>
       
        <div className='h-48 flex text-white bg-black justify-center flex-col px-10 gap-3'>
        <div className='absolute bg-black rounded-lg top-2 left-2 z-10'>
        <SidebarTrigger />
        </div>
        <h1 className='text-5xl'>DASHBOARD</h1>
        <p>Welcome to the admin dashboard</p>
        </div>
        {children}
    </section>
   </section>
   </SidebarProvider>
  )
}

export default AdminLayout