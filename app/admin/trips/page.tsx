'use client'
import { TripType } from '@/types/trips'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'

export default function Trips() {
  const [trips, setTrips] = useState<TripType[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/all-trips")
        if (response.data.response) {
          setTrips(response.data.response)
        }
      } catch (error) {
        console.error("Error fetching trips:", error)
      }
    }

    getData()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Available Trips</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Cities</TableHead>
                <TableHead className="w-[150px]">Duration</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[150px]">Scraped On</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip, index) => (
                <motion.tr
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TableCell className="font-medium">{trip.id}</TableCell>
                  <TableCell>{trip.name}</TableCell>
                  <TableCell>
                    {trip.destinationItinerary.map(dest => dest.place).join(', ')}
                  </TableCell>
                  <TableCell>{`${trip.nights} nights / ${trip.days} days`}</TableCell>
                  <TableCell>₹{trip.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {format(new Date(trip.scrapedOn), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}