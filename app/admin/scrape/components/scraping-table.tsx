'use client'
import React from 'react'
import { format } from 'date-fns'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface ScrapeHistory {
  id: number
  url: string
  jobType: any
  createdAt: string
  isComplete: boolean
  status: string
}

interface ScrapingTableProps {
  scrapingHistory: ScrapeHistory[]
}

export default function ScrapingTable({ scrapingHistory }: ScrapingTableProps) {
  return (
    <Table className='w-full bg-white'>
      <TableCaption>A list of your recent scraping jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Key</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Job Type</TableHead>
          <TableHead className="w-[150px]">Created At</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scrapingHistory.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.id}</TableCell>
            <TableCell><Link target='_blank' className='text-blue-500' href={job.url}>{job.url}</Link></TableCell>
            <TableCell>{job.jobType.type}</TableCell>
            <TableCell>{format(new Date(job.createdAt), 'PPp')}</TableCell>
            <TableCell>
             {job.status === "success" ? <CheckCircle className='text-green-500' /> :job.status === "failed" ? <XCircle className='text-red-500' /> : <Clock className='text-yellow-500' />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


export  function ScrapingTableSkeleton() {
  const rows = 5 

  return (
    <Table className='w-full bg-white'>
      <TableCaption>A list of your recent scraping jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Key</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Job Type</TableHead>
          <TableHead className="w-[150px]">Created At</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}