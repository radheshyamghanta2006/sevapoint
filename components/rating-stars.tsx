"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  initialRating?: number
  readOnly?: boolean
  onRatingChange?: (rating: number) => void
}

export function RatingStars({ initialRating = 0, readOnly = false, onRatingChange }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingChange = (newRating: number) => {
    if (readOnly) return

    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 cursor-${readOnly ? "default" : "pointer"} transition-colors ${
            star <= (hoverRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          onClick={() => handleRatingChange(star)}
        />
      ))}
    </div>
  )
}
