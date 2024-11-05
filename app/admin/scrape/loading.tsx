import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading(){
  return (
    <section className="bg-gradient-to-br from-blue-100 to-green-100 flex min-w-[100%]">
      <aside className="w-64 p-4 bg-gray-200 flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-3/4" />
        ))}
      </aside>

      <section className="flex-1 flex flex-col">
        <div className="h-48 flex justify-center flex-col px-10 gap-3 relative">
          <div className="absolute bg-gray-300 rounded-lg top-2 left-2 z-10 h-10 w-10"></div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="p-10 flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
      </section>
    </section>
  )
}
