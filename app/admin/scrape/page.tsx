'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { Globe, RotateCw, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import axios from 'axios'
import apiClient from '@/lib/api-client'
import ScrapingQueue from '@/components/admin/scraping/scraping-queue'
import ScrapingTable, { ScrapingTableSkeleton } from './components/scraping-table'

// const scrapeHistory = [
//   { id: 1, url: 'https://example.com', status: 'Completed', date: '2024-03-01', itemsScraped: 150 },
//   { id: 2, url: 'https://anothersite.com', status: 'Failed', date: '2024-02-28', itemsScraped: 0 },
//   { id: 3, url: 'https://testsite.org', status: 'Completed', date: '2024-02-27', itemsScraped: 75 },
// ]

const ScrapeDataPage = () => {

  const [cities , setCities] = useState([])
  const [selectedCity , setSelectedCity] = useState<undefined | string>('')
  const [isScrapingActive, setIsScrapingActive] = useState(false)
  const [scrapeProgress, setScrapeProgress] = useState(0)
  const [scrapeHistory, setScrapeHistory] = useState<
  { id: number; url:string; createdAt: string; status: string , jobType : any , isComplete : boolean }[]
>([]);
  const searchCities = async(location : string) => {
    const response = await axios.get(`https://secure.geonames.org/searchJSON?q=${location}&maxRows=5&username=geonames&style=SHORT`);
    const loc = response.data.geonames
    setCities(loc?.map((city : {name : string}) => city.name) ?? [])
    console.log(cities)
  }

  const startScrape = async() => {
    const response = await apiClient.post("/admin/create-job" , {
      url : `https://packages.yatra.com/holidays/intl/search.htm?destination=${selectedCity}`,
      jobType : {
        type : "location",
      }
    })
    console.log(response)

    getJobsDetail()
  }

  const getJobsDetail = async() => {
    const response = await apiClient.get("/admin/job-details" )
    setScrapeHistory(response.data.response)
  }

  useEffect(() => {
    getJobsDetail()
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className='grid grid-cols-2 gap-2'>
      <Card >
        <CardHeader>
          <CardTitle>Start New Scrape</CardTitle>
          <CardDescription>Enter the URL and select the type of scrape to perform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-location">Search for a Location</Label>
            <Input
              type='text'
              id="search-location"
              placeholder="New Delhi"
              onChange={(e) => searchCities(e.target.value)}
            />
          </div>
          {cities.length > 0 && (
            <div className="mt-4">
              <Label>Select a City</Label>
              <ul className="mt-2 space-y-2">
                {cities.map((city, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left ${selectedCity === city ? 'bg-primary/10' : ''}`}
                      onClick={() => setSelectedCity(city)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {city}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedCity && (
            <div className="mt-4 flex justify-center">
              <p className="text-lg font-medium">Scraping data for {selectedCity}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className='w-full ' disabled={!selectedCity} onClick={startScrape}>
            <Globe className="mr-2 h-4 w-4" />
            Start Scraping
          </Button>
        </CardFooter>
      </Card>
      <ScrapingQueue />
      </div>

      {isScrapingActive && (
        <Card>
          <CardHeader>
            <CardTitle>Current Scrape Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={scrapeProgress} className="w-full" />
            <p className="mt-2 text-sm text-muted-foreground">
              Scraping in progress: {scrapeProgress}% complete
            </p>
          </CardContent>
        </Card>
      )}
      <Suspense fallback={<ScrapingTableSkeleton />}>
      <ScrapingTable scrapingHistory={scrapeHistory} />
      </Suspense>
    </div>
  )
}

export default ScrapeDataPage