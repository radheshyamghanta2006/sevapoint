"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleToggleSwitch } from "@/components/role-toggle-switch"
import { PaymentStatusTag } from "@/components/payment-status-tag"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from the database
const mockBookings = [
  {
    id: "1",
    service: "Mathematics Tutoring",
    provider: "John Doe",
    seeker: "Alex Johnson",
    date: "2023-05-15",
    time: "10:00 - 11:00",
    status: "confirmed" as const,
    paymentStatus: "paid" as const,
  },
  {
    id: "2",
    service: "Guitar Lessons",
    provider: "Sarah Williams",
    seeker: "Alex Johnson",
    date: "2023-05-20",
    time: "14:00 - 15:00",
    status: "pending" as const,
    paymentStatus: "unpaid" as const,
  },
  {
    id: "3",
    service: "Web Development",
    provider: "Alex Johnson",
    seeker: "Mike Brown",
    date: "2023-05-18",
    time: "16:00 - 17:00",
    status: "confirmed" as const,
    paymentStatus: "offline" as const,
  },
  {
    id: "4",
    service: "Cooking Classes",
    provider: "Alex Johnson",
    seeker: "Jane Smith",
    date: "2023-05-25",
    time: "11:00 - 12:00",
    status: "pending" as const,
    paymentStatus: "unpaid" as const,
  },
]

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<"seeker" | "provider">("seeker")
  const [bookings, setBookings] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/login")
          return
        }

        setUser(user)

        // In a real app, fetch bookings from database
        // For now, use mock data
        setBookings(mockBookings)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching user:", error)
        setLoading(false)
      }
    }

    fetchUserAndBookings()
  }, [router, supabase])

  const handleRoleToggle = (newRole: "seeker" | "provider") => {
    setRole(newRole)
  }

  const handleUpdateBookingStatus = (id: string, status: "confirmed" | "completed" | "cancelled") => {
    // In a real app, update booking status in database
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
  }

  const handleUpdatePaymentStatus = (id: string, paymentStatus: "paid" | "unpaid" | "offline") => {
    // In a real app, update payment status in database
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, paymentStatus } : booking)))
  }

  const filteredBookings =
    role === "seeker"
      ? bookings.filter((booking) => booking.seeker === "Alex Johnson")
      : bookings.filter((booking) => booking.provider === "Alex Johnson")

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and availability</p>
        </div>

        <RoleToggleSwitch initialRole={role} onToggle={handleRoleToggle} />

        <div className="mt-8">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid gap-6">
                {filteredBookings.filter((booking) => booking.status !== "completed" && booking.status !== "cancelled")
                  .length > 0 ? (
                  filteredBookings
                    .filter((booking) => booking.status !== "completed" && booking.status !== "cancelled")
                    .map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        userRole={role}
                        onUpdateStatus={handleUpdateBookingStatus}
                        onUpdatePayment={handleUpdatePaymentStatus}
                      />
                    ))
                ) : (
                  <EmptyState
                    title="No upcoming bookings"
                    description={
                      role === "seeker"
                        ? "You don't have any upcoming bookings. Start exploring skills to book sessions."
                        : "You don't have any upcoming bookings. Update your availability to receive bookings."
                    }
                    actionLabel={role === "seeker" ? "Explore Skills" : "Update Availability"}
                    actionHref={role === "seeker" ? "/explore" : "/profile?tab=availability"}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <div className="grid gap-6">
                {filteredBookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled")
                  .length > 0 ? (
                  filteredBookings
                    .filter((booking) => booking.status === "completed" || booking.status === "cancelled")
                    .map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        userRole={role}
                        onUpdateStatus={handleUpdateBookingStatus}
                        onUpdatePayment={handleUpdatePaymentStatus}
                      />
                    ))
                ) : (
                  <EmptyState
                    title="No past bookings"
                    description="You don't have any past bookings yet."
                    actionLabel={role === "seeker" ? "Explore Skills" : "Update Availability"}
                    actionHref={role === "seeker" ? "/explore" : "/profile?tab=availability"}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userRole={role}
                      onUpdateStatus={handleUpdateBookingStatus}
                      onUpdatePayment={handleUpdatePaymentStatus}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No bookings"
                    description={
                      role === "seeker"
                        ? "You don't have any bookings yet. Start exploring skills to book sessions."
                        : "You don't have any bookings yet. Update your availability to receive bookings."
                    }
                    actionLabel={role === "seeker" ? "Explore Skills" : "Update Availability"}
                    actionHref={role === "seeker" ? "/explore" : "/profile?tab=availability"}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

interface BookingCardProps {
  booking: any
  userRole: "seeker" | "provider"
  onUpdateStatus: (id: string, status: "confirmed" | "completed" | "cancelled") => void
  onUpdatePayment: (id: string, paymentStatus: "paid" | "unpaid" | "offline") => void
}

function BookingCard({ booking, userRole, onUpdateStatus, onUpdatePayment }: BookingCardProps) {
  const isProvider = userRole === "provider"
  const isPending = booking.status === "pending"
  const isConfirmed = booking.status === "confirmed"
  const isCompleted = booking.status === "completed"
  const isCancelled = booking.status === "cancelled"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{booking.service}</CardTitle>
            <CardDescription>
              {isProvider ? `Booked by: ${booking.seeker}` : `Provider: ${booking.provider}`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-2 py-1 text-xs rounded-full ${
                isPending
                  ? "bg-yellow-100 text-yellow-800"
                  : isConfirmed
                    ? "bg-blue-100 text-blue-800"
                    : isCompleted
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
            <PaymentStatusTag status={booking.paymentStatus} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium">Date</div>
            <div className="text-sm text-muted-foreground">{formatDate(booking.date)}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Time</div>
            <div className="text-sm text-muted-foreground">{booking.time}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {isProvider ? (
          <div className="flex gap-2">
            {isPending && (
              <>
                <Button variant="outline" size="sm" onClick={() => onUpdateStatus(booking.id, "confirmed")}>
                  Confirm
                </Button>
                <Button variant="outline" size="sm" onClick={() => onUpdateStatus(booking.id, "cancelled")}>
                  Decline
                </Button>
              </>
            )}
            {isConfirmed && (
              <>
                <Button variant="outline" size="sm" onClick={() => onUpdateStatus(booking.id, "completed")}>
                  Mark as Completed
                </Button>
                {booking.paymentStatus === "offline" && (
                  <Button variant="outline" size="sm" onClick={() => onUpdatePayment(booking.id, "paid")}>
                    Mark as Paid
                  </Button>
                )}
              </>
            )}
            {(isCompleted || isCancelled) && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/review/${booking.id}`}>Leave Review</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            {isPending && (
              <Button variant="outline" size="sm" onClick={() => onUpdateStatus(booking.id, "cancelled")}>
                Cancel
              </Button>
            )}
            {isConfirmed && booking.paymentStatus === "unpaid" && (
              <Button variant="outline" size="sm">
                Pay Now
              </Button>
            )}
            {isCompleted && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/review/${booking.id}`}>Leave Review</Link>
              </Button>
            )}
          </div>
        )}
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/booking/${booking.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}

function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center py-12 border rounded-lg">
      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}
