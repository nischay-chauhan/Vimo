'use client'
import { TripType } from '@/types/trips'
import React, { useState } from 'react'

const Trips = () => {
    const [trips , setTrips] = useState<TripType[]>([])
    
  return (
    <div>Trips</div>
  )
}

export default Trips