"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

interface BookingCalendarProps {
  providerId: string
  onSlotSelect?: (date: Date, slot: TimeSlot) => void
  isProvider?: boolean
}

export function BookingCalendar({ providerId, onSlotSelect, isProvider = false }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Mock time slots - in a real app, these would come from the database
  const timeSlots: TimeSlot[] = [
    { id: "1", startTime: "09:00", endTime: "10:00", isAvailable: true },
    { id: "2", startTime: "10:00", endTime: "11:00", isAvailable: true },
    { id: "3", startTime: "11:00", endTime: "12:00", isAvailable: false },
    { id: "4", startTime: "13:00", endTime: "14:00", isAvailable: true },
    { id: "5", startTime: "14:00", endTime: "15:00", isAvailable: true },
    { id: "6", startTime: "15:00", endTime: "16:00", isAvailable: false },
    { id: "7", startTime: "16:00", endTime: "17:00", isAvailable: true },
  ]

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.isAvailable && !isProvider) return

    setSelectedSlot(slot)

    if (date && onSlotSelect) {
      onSlotSelect(date, slot)
    }
  }

  const handleToggleAvailability = (slot: TimeSlot) => {
    // In a real app, this would update the database
    console.log(`Toggle availability for slot ${slot.id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Date & Time</CardTitle>
        <CardDescription>
          {isProvider
            ? "Manage your availability by selecting dates and time slots"
            : "Choose an available time slot for your booking"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4">
            <Calendar mode="single" selected={date} onSelect={handleDateChange} className="rounded-md border" />
          </div>
          <div className="p-4 border-t md:border-t-0 md:border-l">
            <h3 className="mb-4 font-medium">Available Time Slots</h3>
            {date ? (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !slot.isAvailable && !isProvider && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <div className="flex flex-col">
                      <span>{`${slot.startTime} - ${slot.endTime}`}</span>
                      <span className="text-xs text-muted-foreground">
                        {slot.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Please select a date to view available time slots.</p>
            )}
          </div>
        </div>
      </CardContent>
      {isProvider && selectedSlot && (
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {`Selected: ${selectedSlot.startTime} - ${selectedSlot.endTime}`}
          </p>
          <Button
            variant={selectedSlot.isAvailable ? "destructive" : "default"}
            onClick={() => handleToggleAvailability(selectedSlot)}
          >
            {selectedSlot.isAvailable ? "Mark as Unavailable" : "Mark as Available"}
          </Button>
        </CardFooter>
      )}
      {!isProvider && selectedSlot && selectedSlot.isAvailable && (
        <CardFooter>
          <Button className="w-full">Confirm Booking</Button>
        </CardFooter>
      )}
    </Card>
  )
}
