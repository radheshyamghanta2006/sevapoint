import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingStars } from "@/components/rating-stars"

interface ReviewBoxProps {
  reviewerName: string
  reviewerImage?: string
  rating: number
  comment: string
  date: string
}

export function ReviewBox({ reviewerName, reviewerImage, rating, comment, date }: ReviewBoxProps) {
  const initials = reviewerName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={reviewerImage || "/placeholder.svg"} alt={reviewerName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{reviewerName}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <RatingStars initialRating={rating} readOnly />
        </div>
        <p className="text-sm text-muted-foreground">{comment}</p>
      </CardContent>
    </Card>
  )
}
