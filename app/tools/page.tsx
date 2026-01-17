"use client"

import { Button } from "@/components/ui/button"
import { ProductCard, Product } from "@/components/product-card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useState } from "react"

const MOCK_IMAGES = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60", // Graph
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60", // Coding
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60", // Typing
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60", // Wireframe
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60", // Matrix
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60", // Charts
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60", // Laptop
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60", // Code
]

const TOOLS_PRODUCTS: Product[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `tool-${i}`,
    title: `Tool ${i + 1}`,
    tagline: "Amazing tool for your workflow",
    thumbnail: MOCK_IMAGES[i % MOCK_IMAGES.length],
    topics: ["Productivity", "SaaS"],
    makers: [{ name: "Maker", avatar: "https://github.com/shadcn.png" }],
    upvotes: 100 - i * 5,
    comments: 10 + i
}))

export default function ToolsPage() {
    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        if (!isFollowing) {
            toast.success("Topic Followed", {
                description: "You'll now receive updates about Productivity Tools.",
            })
        }
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">

                {/* Header */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-3xl font-bold">Productivity Tools</h1>
                    <p className="text-xl text-muted-foreground">
                        Discover the best productivity tools to help you get more done in less time.
                    </p>
                    <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                        {isFollowing ? (
                            <>
                                <Check className="mr-2 h-4 w-4" /> Following
                            </>
                        ) : (
                            "Follow Topic"
                        )}
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Time: This Week <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Today</DropdownMenuItem>
                                <DropdownMenuItem>This Week</DropdownMenuItem>
                                <DropdownMenuItem>This Month</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Sort: Popular <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Popular</DropdownMenuItem>
                                <DropdownMenuItem>Newest</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing 108 products
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {TOOLS_PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} hideRank />
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:col-span-4 lg:block space-y-8 pl-4">
                <div className="sticky top-24">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Related Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Design Tools", "Development", "Marketing", "Writing", "Remote Work", "Time Tracking", "Collaboration"].map(topic => (
                            <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-secondary px-3 py-1">
                                {topic}
                            </Badge>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    )
}
