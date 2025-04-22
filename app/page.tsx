import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { SkillCard } from "@/components/skill-card"
import CategoriesSection from "@/components/categories-section"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Wrench } from "lucide-react"
import categories from "@/lib/categories"

// Mock data - in a real app, this would come from the database
const featuredSkills = [
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
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Find and Share Skills in Your Community
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect with local experts or share your expertise. Learn, teach, and grow together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/explore">Find Skills</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/profile">Offer Your Skills</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] bg-muted rounded-lg overflow-hidden">
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Community Skills Illustration
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <CategoriesSection categories={categories} />

        {/* Featured Skills Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Skills</h2>
              <Button variant="ghost" asChild>
                <Link href="/explore" className="flex items-center gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSkills.map((skill) => (
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
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How SkillLink Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to connect with skilled individuals in your community
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up and create your profile, specifying whether you want to learn or teach skills
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect & Book</h3>
                <p className="text-muted-foreground">
                  Browse available skills, connect with providers, and book sessions that fit your schedule
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Share</h3>
                <p className="text-muted-foreground">
                  Meet up, exchange knowledge, and leave reviews to help others in the community
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SkillLink</h3>
              <p className="text-muted-foreground">Connecting communities through shared skills and knowledge.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/explore" className="text-muted-foreground hover:text-foreground">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/explore?intent=teach" className="text-muted-foreground hover:text-foreground">
                    Find Teachers
                  </Link>
                </li>
                <li>
                  <Link href="/explore?intent=learn" className="text-muted-foreground hover:text-foreground">
                    Find Learners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SkillLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
