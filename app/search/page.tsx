"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Filter, SlidersHorizontal, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard, Product } from "@/components/product-card"

// Mock Data for Search Results
const MOCK_RESULTS: Product[] = [
    {
        id: "1",
        title: "Magic AI Writer",
        tagline: "Write blogs 10x faster with advanced AI models",
        thumbnail: "https://images.unsplash.com/photo-1664575198308-3959904fa430?w=800&auto=format&fit=crop&q=60",
        topics: ["AI", "Writing"],
        makers: [{ name: "Alice", avatar: "https://github.com/shadcn.png" }],
        upvotes: 320,
        comments: 45
    },
    {
        id: "2",
        title: "Super Analytics",
        tagline: "Privacy-first analytics for your web apps",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        topics: ["Analytics", "Privacy"],
        makers: [{ name: "Bob", avatar: "https://github.com/shadcn.png" }],
        upvotes: 215,
        comments: 30
    },
    {
        id: "adb-wrench",
        title: "ADB Wrench",
        tagline: "ADB in your browser + AI assistant with no install required",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
        topics: ["Developer Tools", "Productivity", "AI"],
        makers: [{ name: "Mukul", avatar: "https://ph-avatars.imgix.net/784363/e4a65efc-63c3-4936-8f98-ca98bf5ef9db.png" }],
        upvotes: 73,
        comments: 1
    },
    {
        id: "3",
        title: "Design System Kit",
        tagline: "A comprehensive Figma kit for modern UI",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
        topics: ["Design", "Figma"],
        makers: [{ name: "Dave", avatar: "https://github.com/shadcn.png" }],
        upvotes: 180,
        comments: 12
    },
    {
        id: "4",
        title: "CodeSnap",
        tagline: "Beautiful code screenshots instantly",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
        topics: ["Developer Tools", "Social"],
        makers: [{ name: "Eve", avatar: "https://github.com/shadcn.png" }],
        upvotes: 156,
        comments: 28
    },
]

function SearchContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(initialQuery)

    // Sync input with URL param if it changes
    useEffect(() => {
        setQuery(searchParams.get("q") || "")
    }, [searchParams])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    const hasResults = query.length > 0
    const filteredResults = hasResults
        ? MOCK_RESULTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tagline.toLowerCase().includes(query.toLowerCase())
        )
        : []

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen">

            {/* Search Header */}
            <div className="max-w-3xl mx-auto mb-10 space-y-6">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 h-14 text-lg rounded-full shadow-sm bg-background border-2 focus-visible:ring-0 focus-visible:border-primary/50"
                        placeholder="Search for tools, makers, or topics..."
                        autoFocus
                    />
                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                                setQuery("")
                                router.push("/search")
                            }}
                        >
                            Clear
                        </Button>
                    )}
                </form>

                {/* Filters / Tags */}
                {!hasResults && (
                    <div className="text-center space-y-4">
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            <span className="text-sm text-muted-foreground">Popular:</span>
                            {["AI Writing", "Analytics", "No-Code", "Developer Tools", "Figma", "Marketing"].map(tag => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
                                    onClick={() => {
                                        setQuery(tag)
                                        router.push(`/search?q=${encodeURIComponent(tag)}`)
                                    }}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {hasResults && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Filter by</h3>
                            <Separator />

                            <div className="space-y-3">
                                <label className="text-sm font-medium">Category</label>
                                <Select defaultValue="all">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="dev">Developer Tools</SelectItem>
                                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium">Pricing</label>
                                <Select defaultValue="any">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select pricing" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">Any Price</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="freemium">Freemium</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <main className="col-span-1 lg:col-span-9 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} for "{query}"
                            </h2>
                            <div className="flex items-center gap-2 lg:hidden">
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <Tabs defaultValue="products" className="w-full">
                            <TabsList className="mb-6">
                                <TabsTrigger value="products">Products</TabsTrigger>
                                <TabsTrigger value="makers">Makers</TabsTrigger>
                                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                            </TabsList>

                            <TabsContent value="products" className="space-y-4">
                                {filteredResults.length > 0 ? (
                                    filteredResults.map(product => (
                                        <ProductCard key={product.id} product={product} hideRank />
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                                        <h3 className="text-lg font-semibold mb-2">No results found</h3>
                                        <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="makers">
                                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                                    <p className="text-muted-foreground">Maker search coming soon.</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="discussions">
                                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                                    <p className="text-muted-foreground">Discussion search coming soon.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            )}

            {!hasResults && (
                <div className="text-center py-20 mt-10">
                    <div className="inline-flex items-center justify-center p-6 bg-muted/30 rounded-full mb-6">
                        <Search className="h-10 w-10 text-muted-foreground/50" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Search for the next big thing</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Join millions of people discovering the best tools, apps, and resources every day.
                    </p>
                </div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container mx-auto py-20 text-center">Loading search...</div>}>
            <SearchContent />
        </Suspense>
    )
}
