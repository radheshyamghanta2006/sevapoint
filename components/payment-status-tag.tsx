import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PaymentStatusTagProps {
  status: "unpaid" | "paid" | "offline"
  className?: string
}

export function PaymentStatusTag({ status, className }: PaymentStatusTagProps) {
  const variants = {
    unpaid: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    paid: "bg-green-100 text-green-800 hover:bg-green-100",
    offline: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  }

  const labels = {
    unpaid: "Unpaid",
    paid: "Paid",
    offline: "Offline Payment",
  }

  return (
    <Badge variant="outline" className={cn(variants[status], className)}>
      {labels[status]}
    </Badge>
  )
}
