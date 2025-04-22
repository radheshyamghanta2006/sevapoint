"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RatingStars } from "@/components/rating-stars"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // In a real app, fetch booking from database
        // For now, use mock data
        setBooking({
          id,
          service: "Mathematics Tutoring",
          provider: "John Doe",
          seeker: "Alex Johnson",
          date: "2023-05-15",
          time: "10:00 - 11:00",
          status: "completed",
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching booking:", error)
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setSubmitting(true)

    try {
      // In a real app, submit review to database
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard after successful submission
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting review:", error)
      setSubmitting(false)
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
      <main className="flex-1 container mx-auto max-w-md py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
            <CardDescription>Share your experience with {booking.provider}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Service</h3>
                <p className="text-sm">{booking.service}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Date & Time</h3>
                <p className="text-sm">
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {booking.time}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rating</h3>
                <RatingStars initialRating={rating} onRatingChange={handleRatingChange} />
                {rating === 0 && <p className="text-xs text-red-500">Please select a rating</p>}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Comments</h3>
                <Textarea
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={rating === 0 || submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
