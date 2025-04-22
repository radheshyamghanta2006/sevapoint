"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RoleToggleSwitch } from "@/components/role-toggle-switch"
import { BookingCalendar } from "@/components/booking-calendar"
import { ReviewBox } from "@/components/review-box"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2 } from "lucide-react"

// Mock data - in a real app, this would come from the database
const mockReviews = [
  {
    id: "1",
    reviewerName: "John Doe",
    reviewerImage: "/placeholder.svg",
    rating: 5,
    comment: "Excellent teacher! Very patient and explains concepts clearly.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    reviewerName: "Jane Smith",
    reviewerImage: "/placeholder.svg",
    rating: 4,
    comment: "Great experience. Would definitely recommend!",
    date: "1 month ago",
  },
]

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState({
    fullName: "",
    bio: "",
    location: "",
    phone: "",
  })
  const [role, setRole] = useState<"seeker" | "provider">("seeker")
  const [skills, setSkills] = useState<
    Array<{ id: string; name: string; category: string; intent: "teach" | "learn" }>
  >([])
  const [newSkill, setNewSkill] = useState<{
    name: string
    category: string
    intent: "teach" | "learn"
  }>({
    name: "",
    category: "Education",
    intent: "teach",
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/login")
          return
        }

        setUser(user)

        // In a real app, fetch profile from database
        // For now, use mock data
        setProfile({
          fullName: "Alex Johnson",
          bio: "Passionate educator with 5+ years of experience teaching mathematics and computer science.",
          location: "Mumbai, India",
          phone: "+91 9876543210",
        })

        // Mock skills data
        setSkills([
          { id: "1", name: "Mathematics", category: "Education", intent: "teach" },
          { id: "2", name: "Computer Science", category: "Technology", intent: "teach" },
          { id: "3", name: "Guitar", category: "Music", intent: "learn" },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching user:", error)
        setLoading(false)
      }
    }

    fetchUserAndProfile()
  }, [router, supabase])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, update profile in database
    console.log("Updating profile:", profile)

    // Show success message
    alert("Profile updated successfully!")
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newSkill.name.trim()) return

    // In a real app, add skill to database
    const id = Math.random().toString(36).substring(7)
    setSkills([...skills, { id, ...newSkill }])

    // Reset form
    setNewSkill({
      name: "",
      category: "Education",
      intent: "teach",
    })
  }

  const handleRemoveSkill = (id: string) => {
    // In a real app, remove skill from database
    setSkills(skills.filter((skill) => skill.id !== id))
  }
  
  const handleRoleToggle = (newRole: "seeker" | "provider") => {
    setRole(newRole)
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
      <main className="flex-1 container mx-auto max-w-6xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile and skills</p>
        </div>

        <RoleToggleSwitch initialRole={role} onToggle={handleRoleToggle} />

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt={profile.fullName} />
                    <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-center mt-4">{profile.fullName}</CardTitle>
                <CardDescription className="text-center">{profile.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Bio</h3>
                    <p className="text-sm text-muted-foreground">{profile.bio}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="skills">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Skills</CardTitle>
                    <CardDescription>Add skills you want to teach or learn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <div className="font-medium">{skill.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {skill.category} • {skill.intent === "teach" ? "Teaching" : "Learning"}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(skill.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <form onSubmit={handleAddSkill} className="space-y-4 pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="skill-name">Skill Name</Label>
                            <Input
                              id="skill-name"
                              placeholder="e.g., Mathematics"
                              value={newSkill.name}
                              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="skill-category">Category</Label>
                            <select
                              id="skill-category"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={newSkill.category}
                              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            >
                              <option value="Education">Education</option>
                              <option value="Technology">Technology</option>
                              <option value="Music">Music</option>
                              <option value="Arts">Arts</option>
                              <option value="Fitness">Fitness</option>
                              <option value="Home Services">Home Services</option>
                              <option value="Languages">Languages</option>
                              <option value="Food">Food</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Intent</Label>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant={newSkill.intent === "teach" ? "default" : "outline"}
                              onClick={() => setNewSkill({ ...newSkill, intent: "teach" })}
                            >
                              I want to teach this
                            </Button>
                            <Button
                              type="button"
                              variant={newSkill.intent === "learn" ? "default" : "outline"}
                              onClick={() => setNewSkill({ ...newSkill, intent: "learn" })}
                            >
                              I want to learn this
                            </Button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          <Plus className="h-4 w-4 mr-2" /> Add Skill
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <BookingCalendar providerId={user?.id} isProvider={true} />
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>Reviews from people you've worked with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReviews.length > 0 ? (
                        mockReviews.map((review) => (
                          <ReviewBox
                            key={review.id}
                            reviewerName={review.reviewerName}
                            reviewerImage={review.reviewerImage}
                            rating={review.rating}
                            comment={review.comment}
                            date={review.date}
                          />
                        ))
                      ) : (
                        <p className="text-center py-8 text-muted-foreground">
                          No reviews yet. Complete bookings to receive reviews.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          value={profile.fullName}
                          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full mt-6">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
