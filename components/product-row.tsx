"use client"

import Link from "next/link"
import { MessageSquare, ArrowUp, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Product {
    id: string
    slug: string
    title: string // mapped from name
    tagline: string
    description?: string
    thumbnail: string // mapped from icon_url
    image_url?: string
    website_url?: string
    rank?: number
    topics: string[] // legacy topics
    categories?: { name: string; slug: string }[] // new categories
    makers?: { name: string; avatar: string; handle?: string }[] // optional for row, but useful for mapping
    upvotes: number
    comments: number
}

interface ProductRowProps {
    product: Product
    rank?: number
}

export function ProductRow({ product, rank }: ProductRowProps) {
    // Prefer categories over topics if available, limit to 3
    const tags = (product.categories || product.topics.map(t => ({ name: t, slug: t }))).slice(0, 3);

    return (
        <div className="group relative flex items-center gap-4 py-4 border-b border-border/40 hover:bg-muted/30 transition-colors -mx-4 px-4 sm:mx-0 sm:px-4 sm:rounded-xl">
            {/* Rank - Desktop only */}
            {rank && (
                <div className="hidden sm:flex w-8 flex-col items-center justify-center text-xl font-medium text-muted-foreground/50">
                    {rank}
                </div>
            )}

            {/* Thumbnail */}
            <Link href={`/tool/${product.slug}`} className="shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-border/50 bg-muted">
                    <img
                        src={product.thumbnail || "/placeholder-icon.png"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex items-baseline gap-2">
                    <Link href={`/tool/${product.slug}`} className="hover:underline decoration-primary/50 underline-offset-4">
                        <h3 className="font-bold text-base sm:text-lg text-foreground truncate">
                            {product.title}
                        </h3>
                    </Link>
                    <span className="hidden sm:inline text-xs text-muted-foreground font-normal line-clamp-1">
                        — {product.tagline}
                    </span>
                </div>

                {/* Mobile Tagline */}
                <p className="sm:hidden text-sm text-muted-foreground line-clamp-1">
                    {product.tagline}
                </p>

                {/* Tags & Meta */}
                <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5">
                        {tags.map((tag, i) => (
                            <Link
                                key={i}
                                href="#"
                                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {tag.name}
                            </Link>
                        ))}
                    </div>

                    {/* Comments Count */}
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span>{product.comments || 0}</span>
                    </div>

                    {/* Quick Link Actions (Visible on Hover) */}
                    <div className="hidden group-hover:flex items-center gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {product.website_url && (
                            <a
                                href={product.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                                title="Visit Website"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Side */}
            <div className="shrink-0 flex flex-col items-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-1 px-2 min-w-[3.5rem] sm:min-w-[4rem] gap-0 border-border/60 hover:border-primary/50 hover:bg-background group/vote"
                >
                    <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover/vote:text-primary transition-colors" />
                    <span className="text-xs font-semibold sm:text-sm">{product.upvotes || 0}</span>
                </Button>
            </div>
        </div>
    )
}
