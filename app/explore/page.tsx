"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { SkillCard } from "@/components/skill-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Loader2, Search } from "lucide-react"

// Mock data - in a real app, this would come from the database
const mockSkills = [
  {
    id: "1",
    title: "Math Tutoring",
    category: "Education",
    providerName: "John Doe",
    providerImage: "/placeholder.svg",
    location: "Mumbai",
    rating: 4.8,
    intent: "teach" as const,
  },
  {
    id: "2",
    title: "Cooking Classes",
    category: "Food",
    providerName: "Jane Smith",
    providerImage: "/placeholder.svg",
    location: "Delhi",
    rating: 4.5,
    intent: "teach" as const,
  },
  {
    id: "3",
    title: "Home Repairs",
    category: "Home Services",
    providerName: "Mike Johnson",
    providerImage: "/placeholder.svg",
    location: "Bangalore",
    rating: 4.9,
    intent: "teach" as const,
  },
  {
    id: "4",
    title: "Guitar Lessons",
    category: "Music",
    providerName: "Sarah Williams",
    providerImage: "/placeholder.svg",
    location: "Chennai",
    rating: 4.7,
    intent: "teach" as const,
  },
  {
    id: "5",
    title: "Yoga Classes",
    category: "Fitness",
    providerName: "David Brown",
    providerImage: "/placeholder.svg",
    location: "Hyderabad",
    rating: 4.6,
    intent: "teach" as const,
  },
  {
    id: "6",
    title: "Photography Basics",
    category: "Arts",
    providerName: "Emily Davis",
    providerImage: "/placeholder.svg",
    location: "Pune",
    rating: 4.4,
    intent: "teach" as const,
  },
  {
    id: "7",
    title: "Web Development",
    category: "Technology",
    providerName: "Alex Johnson",
    providerImage: "/placeholder.svg",
    location: "Kolkata",
    rating: 4.9,
    intent: "teach" as const,
  },
  {
    id: "8",
    title: "Language Exchange",
    category: "Languages",
    providerName: "Maria Garcia",
    providerImage: "/placeholder.svg",
    location: "Ahmedabad",
    rating: 4.3,
    intent: "learn" as const,
  },
]

const categories = [
  "All Categories",
  "Education",
  "Food",
  "Home Services",
  "Music",
  "Fitness",
  "Arts",
  "Technology",
  "Languages",
]

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All Categories"
  const initialIntent = searchParams.get("intent") || "all"

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedIntent, setSelectedIntent] = useState<"all" | "teach" | "learn">((initialIntent as any) || "all")
  const [minRating, setMinRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState(mockSkills)

  // In a real app, this would fetch data from Supabase
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        let filteredSkills = [...mockSkills]

        // Filter by search term
        if (searchTerm) {
          filteredSkills = filteredSkills.filter(
            (skill) =>
              skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              skill.providerName.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        }

        // Filter by category
        if (selectedCategory !== "All Categories") {
          filteredSkills = filteredSkills.filter((skill) => skill.category === selectedCategory)
        }

        // Filter by intent
        if (selectedIntent !== "all") {
          filteredSkills = filteredSkills.filter((skill) => skill.intent === selectedIntent)
        }

        // Filter by rating
        filteredSkills = filteredSkills.filter((skill) => skill.rating >= minRating)

        setSkills(filteredSkills)
        setLoading(false)
      }, 500)
    }

    fetchSkills()
  }, [searchTerm, selectedCategory, selectedIntent, minRating])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The useEffect will handle the search
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-6xl py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Search</h2>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="justify-start w-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Intent</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Button
                    variant={selectedIntent === "all" ? "default" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => setSelectedIntent("all")}
                  >
                    All
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button
                    variant={selectedIntent === "teach" ? "default" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => setSelectedIntent("teach")}
                  >
                    Teaching
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button
                    variant={selectedIntent === "learn" ? "default" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => setSelectedIntent("learn")}
                  >
                    Learning
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Minimum Rating</h2>
              <div className="space-y-4">
                <Slider defaultValue={[0]} max={5} step={0.5} onValueChange={(value) => setMinRating(value[0])} />
                <div className="text-center">{minRating} stars and above</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {selectedCategory === "All Categories" ? "All Skills" : `${selectedCategory} Skills`}
              </h1>
              <div className="text-sm text-muted-foreground">{skills.length} results</div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : skills.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    id={skill.id}
                    title={skill.title}
                    category={skill.category}
                    providerName={skill.providerName}
                    providerImage={skill.providerImage}
                    location={skill.location}
                    rating={skill.rating}
                    intent={skill.intent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground">No skills found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All Categories")
                    setSelectedIntent("all")
                    setMinRating(0)
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
