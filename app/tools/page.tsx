import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductRow, Product as ProductRowType } from "@/components/product-row"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { getProducts, Product as ApiProduct } from "@/lib/products"

// Duplicate mapping logic for now (should be shared util, but keeping simple)
function mapToRowProduct(p: ApiProduct): ProductRowType {
    return {
        id: p.id,
        slug: p.slug,
        title: p.name,
        tagline: p.tagline || "",
        description: p.description || "",
        thumbnail: p.icon_url || "https://placehold.co/60x60/png?text=Icon",
        topics: p.built_with?.map(b => b.category).filter((c): c is string => !!c) || [],
        categories: p.categories,
        makers: (p.team_members || []).map(tm => ({
            name: tm.name,
            avatar: tm.avatar_url || "",
            handle: tm.ph_username ? `@${tm.ph_username}` : undefined
        })),
        upvotes: 0,
        comments: 0,
        website_url: p.website_url || undefined
    };
}

export default async function ToolsPage() {
    // Fetch products (server-side)
    const apiProducts = await getProducts(1, 50); // Fetch more for the list page
    const products = apiProducts.map(mapToRowProduct);

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">

                {/* Header */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-3xl font-bold">All Tools</h1>
                    <p className="text-xl text-muted-foreground">
                        Discover the best developer tools, SaaS, and productivity apps.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Sort: Newest <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Newest</DropdownMenuItem>
                                <DropdownMenuItem>Popular</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing {products.length} products
                    </div>
                </div>

                {/* List */}
                <div className="space-y-0">
                    {products.length > 0 ? (
                        products.map((product, i) => (
                            <ProductRow key={product.id} product={product} rank={i + 1} />
                        ))
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No tools found. <Link href="/submit" className="underline hover:text-primary">Submit one?</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:col-span-4 lg:block space-y-8 pl-4">
                <div className="sticky top-24">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Popular Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Developer Tools", "AI", "Productivity", "Marketing", "Design", "SaaS", "Open Source"].map(topic => (
                            <Link key={topic} href={`/category/${topic.toLowerCase().replace(' ', '-')}`}>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 px-3 py-1.5">
                                    {topic}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    )
}
