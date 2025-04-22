"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCalendar } from "@/components/booking-calendar"
import { PaymentStatusTag } from "@/components/payment-status-tag"
import { RatingStars } from "@/components/rating-stars"
import { createClient } from "@/lib/supabase/client"
import { Loader2, MapPin, Phone } from "lucide-react"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [skill, setSkill] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const supabase = createClient()

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        // In a real app, fetch skill from database
        // For now, use mock data
        setSkill({
          id,
          title: "Mathematics Tutoring",
          category: "Education",
          providerName: "John Doe",
          providerImage: "/placeholder.svg",
          location: "Mumbai, India",
          rating: 4.8,
          bio: "Experienced math tutor with 5+ years of teaching experience. Specializing in high school and college-level mathematics.",
          phone: "+91 9876543210",
          email: "john.doe@example.com",
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching skill:", error)
        setLoading(false)
      }
    }

    fetchSkill()
  }, [id])

  const handleSlotSelect = (date: Date, slot: TimeSlot) => {
    setSelectedDate(date)
    setSelectedSlot(slot)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) return

    setBookingStatus("processing")

    try {
      // In a real app, create booking in database
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setBookingStatus("success")

      // Redirect to dashboard after successful booking
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error creating booking:", error)
      setBookingStatus("error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-6xl py-8 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{skill.title}</CardTitle>
                <CardDescription>{skill.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={skill.providerImage || "/placeholder.svg"} alt={skill.providerName} />
                    <AvatarFallback>{skill.providerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{skill.providerName}</div>
                    <div className="flex items-center">
                      <RatingStars initialRating={skill.rating} readOnly />
                      <span className="ml-2 text-sm text-muted-foreground">{skill.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{skill.bio}</p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {skill.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      {skill.phone}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <BookingCalendar providerId={id as string} onSlotSelect={handleSlotSelect} />

            {selectedDate && selectedSlot && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your booking details before confirming</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Service</div>
                      <div className="text-sm text-muted-foreground">{skill.title}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Provider</div>
                      <div className="text-sm text-muted-foreground">{skill.providerName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Date</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Time</div>
                      <div className="text-sm text-muted-foreground">
                        {`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Payment Status</div>
                      <PaymentStatusTag status="unpaid" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handleBooking}
                    disabled={bookingStatus === "processing" || bookingStatus === "success"}
                  >
                    {bookingStatus === "processing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : bookingStatus === "success" ? (
                      "Booking Confirmed!"
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
