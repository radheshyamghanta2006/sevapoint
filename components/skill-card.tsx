import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"

interface SkillCardProps {
  id: string
  title: string
  category: string
  providerName: string
  providerImage?: string
  location: string
  rating: number
  intent: "teach" | "learn"
}

export function SkillCard({
  id,
  title,
  category,
  providerName,
  providerImage,
  location,
  rating,
  intent,
}: SkillCardProps) {
  const initials = providerName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={providerImage || "/placeholder.svg"} alt={providerName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{providerName}</CardDescription>
            </div>
          </div>
          <Badge variant={intent === "teach" ? "default" : "secondary"}>
            {intent === "teach" ? "Teaching" : "Learning"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{category}</span>
          <span className="text-muted-foreground">{location}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/book/${id}`}>{intent === "teach" ? "Book Now" : "Connect"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
