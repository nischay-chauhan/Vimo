import { Card, CardContent, CardHeader } from '@/components/ui/card'
import apiClient from '@/lib/api-client'
import React, { useEffect, useState } from 'react'

const ScrapingQueue = () => {
    const [onGoingJobs , setOnGoingJobs] = useState(0)

    const onGoingJobsColor = () => {
        if(onGoingJobs <= 5){
            return "bg-green-500"
        }else if (onGoingJobs > 5 && onGoingJobs <= 10){
            return "bg-orange-500"
        }else{
            return "bg-red-500"
        }
    }

    const onGoingJobsTextColor = () => {
        if(onGoingJobs <= 5){
            return "text-green-500"
        }else if (onGoingJobs > 5 && onGoingJobs <= 10){
            return "text-orange-500"
        }else{
            return "text-red-500"
        }
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
            <div className= {`h-52 w-52 rounded-full flex items-center justify-center ${onGoingJobsColor()}`}>
            <div className='h-44 w-44 bg-white rounded-full flex items-center justify-center'>
                <h4 className={`text-6xl font-bold ${onGoingJobsTextColor()}`}>
                    {onGoingJobs}
                </h4>

            </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ScrapingQueue