"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { UpvoteButton } from "@/components/upvote-button"
import { MakerAvatars } from "@/components/maker-avatars"
import { cn } from "@/lib/utils"

export interface Product {
    id: string
    title: string
    tagline: string
    description?: string // For hero
    thumbnail: string
    rank?: number
    topics: string[]
    makers: { name: string; avatar: string; handle?: string }[]
    upvotes: number
    comments: number
}

interface ProductCardProps {
    product: Product
    hideRank?: boolean,
    featured?: boolean
}

export function ProductCard({ product, hideRank = false, featured = false }: ProductCardProps) {
    if (featured) return null;

    return (
        <Link href={`/tool/${product.id}`} className="block group">
            <Card className={cn(
                "flex flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5",
                "bg-card border-border/60",
                "hover:border-primary/20 hover:bg-muted/20",
                "transition-colors cursor-pointer rounded-xl"
            )}>
                {/* Rank */}
                {!hideRank && product.rank && (
                    <div className="hidden sm:flex flex-none w-8 flex-col items-center justify-center self-start sm:self-center">
                        <span className="text-lg font-semibold text-muted-foreground/60 group-hover:text-primary/80 transition-colors font-mono">
                            {product.rank}
                        </span>
                    </div>
                )}

                {/* Thumbnail */}
                <div className="flex-none self-start sm:self-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-border/50 bg-muted/10">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="grow min-w-0 flex flex-col justify-center h-full pt-1 sm:pt-0">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="font-semibold text-base sm:text-lg leading-snug text-foreground group-hover:text-primary transition-colors truncate">
                                    {product.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                    {product.tagline}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {product.topics.slice(0, 2).map((topic) => (
                                <Badge
                                    key={topic}
                                    variant="secondary"
                                    className="font-normal text-xs bg-secondary/60 text-secondary-foreground/80 px-2 py-0.5 rounded-md"
                                >
                                    {topic}
                                </Badge>
                            ))}
                            {product.topics.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                    +{product.topics.length - 2}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-0.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{product.comments}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                                <MakerAvatars makers={product.makers} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-none flex flex-col items-end justify-center self-start sm:self-center pl-2" onClick={(e) => e.stopPropagation()}>
                    <UpvoteButton
                        count={product.upvotes}
                        variant="outline"
                        className="h-auto py-2.5 px-3.5 min-w-[72px] border-border bg-background hover:border-primary/50 hover:bg-primary/5"
                    />
                </div>
            </Card>
        </Link>
    )
}
