import { Card, CardContent, CardHeader } from '@/components/ui/card'
import apiClient from '@/lib/api-client'
import React, { useEffect, useState } from 'react'

const ScrapingQueue = () => {
    const [onGoingJobs , setOnGoingJobs] = useState(0)

    const onGoingJobsColor = () => {

    }

    const onGoingJobsTextColor = () => {

    }

    useEffect(() => {
        const getData = async() => {
            const response = await apiClient.get("/admin/job-details" )
            setOnGoingJobs(response.data.onGoingJobs)
        };

       const interval = setInterval(() => {
        getData()
       } , 3000)
       return () => clearInterval(interval)

      } , []) 
  return (
    <Card className='h-full'>
        <CardHeader>Current Queue</CardHeader>
        <CardContent className='flex items-center justify-center'>
            <div className= {`h-52 w-52 rounded-fullflex items-center justify-center ${onGoingJobsColor()}`}>
            <div className='h-44 w-44 bg-white rounded-full flex items-center justify-center'>
                <h4 className='text-6xl font-bold'>
                    {onGoingJobs}
                </h4>

            </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ScrapingQueue