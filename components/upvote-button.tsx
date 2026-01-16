"use client"

import * as React from "react"
import { Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UpvoteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

export function UpvoteButton({ 
  count, 
  className, 
  variant = "ghost",
  size = "default",
  ...props 
}: UpvoteButtonProps) {
  const [hasUpvoted, setHasUpvoted] = React.useState(false)
  const [currentCount, setCurrentCount] = React.useState(count)

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if inside a link
    if (hasUpvoted) {
      setCurrentCount(prev => prev - 1)
      setHasUpvoted(false)
    } else {
      setCurrentCount(prev => prev + 1)
      setHasUpvoted(true)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex flex-col gap-0 h-auto py-2 min-w-[50px] transition-all",
        hasUpvoted && "text-primary border-primary bg-primary/10",
        className
      )}
      onClick={handleUpvote}
      {...props}
    >
      <Triangle className={cn("h-4 w-4 mb-1 transition-all", hasUpvoted && "fill-current")} />
      <span className="font-semibold">{currentCount}</span>
    </Button>
  )
}
