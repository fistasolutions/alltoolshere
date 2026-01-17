"use client"

import * as React from "react"
import { Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UpvoteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  orientation?: "vertical" | "horizontal"
}

export function UpvoteButton({
  count,
  className,
  variant = "ghost",
  size = "default",
  orientation = "vertical",
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
        "transition-all min-w-[50px]",
        orientation === "vertical"
          ? "flex flex-col gap-0 h-auto py-2"
          : "flex flex-row gap-2 items-center",
        hasUpvoted && "text-primary border-primary bg-primary/10",
        className
      )}
      onClick={handleUpvote}
      {...props}
    >
      <Triangle className={cn(
        "h-4 w-4 transition-all",
        orientation === "vertical" ? "mb-1" : "",
        hasUpvoted && "fill-current"
      )} />
      <span className="font-semibold">{currentCount}</span>
    </Button>
  )
}
