"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface RoleToggleSwitchProps {
  initialRole?: "seeker" | "provider"
  onToggle?: (role: "seeker" | "provider") => void
}

export function RoleToggleSwitch({ initialRole = "seeker", onToggle }: RoleToggleSwitchProps) {
  const [role, setRole] = useState<"seeker" | "provider">(initialRole)

  const handleToggle = (checked: boolean) => {
    const newRole = checked ? "provider" : "seeker"
    setRole(newRole)
    if (onToggle) {
      onToggle(newRole)
    }
  }

  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {role === "seeker" ? "Looking for skills" : "Offering skills"}
        </p>
        <p className="text-sm text-muted-foreground">
          {role === "seeker"
            ? "You are currently browsing as a skill seeker"
            : "You are currently browsing as a skill provider"}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="role-toggle" className={role === "seeker" ? "text-primary" : "text-muted-foreground"}>
          Seeker
        </Label>
        <Switch id="role-toggle" checked={role === "provider"} onCheckedChange={handleToggle} />
        <Label htmlFor="role-toggle" className={role === "provider" ? "text-primary" : "text-muted-foreground"}>
          Provider
        </Label>
      </div>
    </div>
  )
}
