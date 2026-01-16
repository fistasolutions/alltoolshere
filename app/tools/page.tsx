import { Button } from "@/components/ui/button"
import { ProductCard, Product } from "@/components/product-card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const TOOLS_PRODUCTS: Product[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `tool-${i}`,
    title: `Tool ${i + 1}`,
    tagline: "Amazing tool for your workflow",
    thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&auto=format&fit=crop&q=60`,
    topics: ["Productivity", "SaaS"],
    makers: [{ name: "Maker", avatar: "https://github.com/shadcn.png" }],
    upvotes: 100 - i * 5,
    comments: 10 + i
}))

export default function ToolsPage() {
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
                    <Button>Follow Topic</Button>
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
