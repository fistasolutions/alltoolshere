import Link from "next/link"
import type { Metadata } from "next"
import { Mail, Flame, TrendingUp, ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ProductCard, Product as ProductCardType } from "@/components/product-card"
import { UpvoteButton } from "@/components/upvote-button"

import { getProducts, Product as ApiProduct } from "@/lib/products"

// Dummy Data for fallback or static parts
const FEATURED_PRODUCT_FALLBACK: ProductCardType = {
    id: "adb-wrench",
    title: "ADB Wrench",
    tagline: "ADB in your browser + AI assistant with no install required",
    description: "Browser-based ADB tool via WebUSB. No SDK, no drivers, no install — just plug in and debug. Includes an AI assistant that runs ADB commands from plain English. BYOK, zero tracking.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=60",
    topics: ["Developer Tools", "Productivity", "AI"],
    makers: [
        { name: "Mukul Joshi", avatar: "https://ph-avatars.imgix.net/784363/e4a65efc-63c3-4936-8f98-ca98bf5ef9db.png", handle: "@mukulhjoshi" }
    ],
    upvotes: 73,
    comments: 1
}

const FEATURED_MAKER_NOTE = {
    body: "Built this because I got tired of two things: the Android debugging setup dance, and Googling ADB commands every single time. ADB Wrench runs entirely in your browser (WebUSB) and has an AI assistant that knows ADB better than I do. Privacy-first: bring your own API key — we don't store or track anything.",
}

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://alltoolshere.com',
    },
}

// Convert API product to Component product
function mapToCardProduct(p: ApiProduct, index: number): ProductCardType {
    return {
        id: p.slug, // Use slug for navigation
        title: p.name,
        tagline: p.tagline || "",
        description: p.description || "",
        thumbnail: p.icon_url || p.image_url || "https://placehold.co/60x60/png?text=Icon", // Fallback
        rank: index + 1,
        topics: (p as any).topics || [], // Backend adds topics field
        makers: (p.team_members || []).map(tm => ({
            name: tm.name,
            avatar: tm.avatar_url || "",
            handle: tm.ph_username ? `@${tm.ph_username}` : undefined
        })),
        upvotes: 0, // Not yet in backend
        comments: 0 // Not yet in backend
    };
}

export default async function Home() {
    // Fetch products
    const apiProducts = await getProducts(1, 20);

    // Convert to card format
    const products = apiProducts.map((p, i) => mapToCardProduct(p, i));

    // Use the first product as featured if available, else fallback
    const featuredProduct = products.length > 0 ? products[0] : FEATURED_PRODUCT_FALLBACK;

    // List for tabs (exclude featured from top list if needed, or just show all)
    // For "Today" tab, let's show all fetched products
    const productsList = products;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AllToolsHere",
        "url": "https://alltoolshere.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://alltoolshere.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-10">

                    <div className="space-y-6">
                        <div className="flex items-start justify-between gap-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                    Discover tools people actually love
                                </h1>
                                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                                    Launches, discussions, and maker stories — all in one place.
                                </p>
                            </div>

                            <div className="hidden sm:flex items-center gap-2 shrink-0">
                                <Button asChild>
                                    <Link href="/tools">
                                        Explore tools
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/submit">Submit tool</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Card className="border-border/60 bg-card">
                                <CardContent className="p-4">
                                    <div className="text-sm text-muted-foreground">Launching today</div>
                                    <div className="text-2xl font-bold mt-1">{products.length || 12}</div>
                                </CardContent>
                            </Card>
                            <Card className="border-border/60 bg-card">
                                <CardContent className="p-4">
                                    <div className="text-sm text-muted-foreground">Upvotes today</div>
                                    <div className="text-2xl font-bold mt-1">2.4k</div>
                                </CardContent>
                            </Card>
                            <Card className="border-border/60 bg-card">
                                <CardContent className="p-4">
                                    <div className="text-sm text-muted-foreground">Active makers</div>
                                    <div className="text-2xl font-bold mt-1">318</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Flame className="text-orange-500 fill-orange-500" /> Featured today
                        </h2>
                        <Card className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow border-primary/20 bg-linear-to-br from-background to-muted/30">
                            <div className="md:w-1/2 relative h-64 md:h-auto">
                                <img
                                    src={featuredProduct.thumbnail.startsWith("http") ? featuredProduct.thumbnail : featuredProduct.thumbnail}
                                    alt={featuredProduct.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                                    <h3 className="text-white text-2xl font-bold">{featuredProduct.title}</h3>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-4">
                                <div className="hidden md:block">
                                    <h3 className="text-3xl font-bold">{featuredProduct.title}</h3>
                                    <p className="text-xl text-muted-foreground mt-2">{featuredProduct.tagline}</p>
                                </div>
                                <div className="md:hidden">
                                    <p className="text-lg text-muted-foreground">{featuredProduct.tagline}</p>
                                </div>

                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                                    {featuredProduct.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {featuredProduct.topics.map(topic => (
                                        <Badge key={topic} variant="secondary">{topic}</Badge>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {["Runs client-side", "BYOK (bring your own key)", "No install", "Privacy-first"].map((item) => (
                                        <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Sparkles className="h-4 w-4" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex -space-x-2">
                                            {featuredProduct.makers.map((maker, i) => (
                                                <Avatar key={i} className="border-2 border-background w-8 h-8">
                                                    <AvatarImage src={maker.avatar} />
                                                    <AvatarFallback>M</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">Makers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="lg" className="px-6 font-bold" asChild>
                                            <Link href={`/tool/${featuredProduct.id}`}>View</Link>
                                        </Button>
                                        <UpvoteButton
                                            count={featuredProduct.upvotes}
                                            variant="outline"
                                            size="lg"
                                            orientation="horizontal"
                                            className="px-4 min-w-[88px] border-border bg-background hover:border-primary/50 hover:bg-primary/5 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    <section>
                        <Card className="border-border/60 bg-muted/10">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Maker note</CardTitle>
                                <CardDescription>Why this was built (from the maker)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={featuredProduct.makers[0]?.avatar} />
                                        <AvatarFallback>M</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1 min-w-0">
                                        <div className="font-semibold text-sm">{featuredProduct.makers[0]?.name}</div>
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                            {FEATURED_MAKER_NOTE.body}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/tool/${featuredProduct.id}`}>
                                            Join the discussion
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Product List */}
                    <section>
                        <Tabs defaultValue="today" className="w-full">
                            <div className="flex items-center justify-between mb-6">
                                <TabsList>
                                    <TabsTrigger value="today">Today</TabsTrigger>
                                    <TabsTrigger value="week">This Week</TabsTrigger>
                                    <TabsTrigger value="month">This Month</TabsTrigger>
                                </TabsList>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/tools">View all</Link>
                                </Button>
                            </div>

                            <TabsContent value="today" className="space-y-4">
                                <h3 className="font-semibold text-lg pb-2">Top Ranked</h3>
                                <div className="space-y-4">
                                    {productsList.length > 0 ? productsList.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    )) : (
                                        <div className="text-muted-foreground py-8 text-center">No products found today</div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="week" className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">Trending this week</h3>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4" />
                                        Updated hourly
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[...productsList].slice(0, 4).map(product => (
                                        <ProductCard key={product.id} product={product} hideRank />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="month" className="space-y-4">
                                <h3 className="font-semibold text-lg">New & noteworthy</h3>
                                <div className="space-y-4">
                                    {[...productsList].reverse().map(product => (
                                        <ProductCard key={product.id} product={product} hideRank />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </section>
                </div>

                {/* Right Sidebar */}
                <aside className="hidden lg:col-span-4 lg:block space-y-6">


                    {/* Streak Widget */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Today on AllToolsHere</CardTitle>
                            <CardDescription>A quick snapshot</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg border border-border/60 bg-muted/10 p-3">
                                    <div className="text-xs text-muted-foreground">Launches</div>
                                    <div className="text-xl font-bold mt-1">12</div>
                                </div>
                                <div className="rounded-lg border border-border/60 bg-muted/10 p-3">
                                    <div className="text-xs text-muted-foreground">Discussions</div>
                                    <div className="text-xl font-bold mt-1">48</div>
                                </div>
                                <div className="rounded-lg border border-border/60 bg-muted/10 p-3">
                                    <div className="text-xs text-muted-foreground">Upvotes</div>
                                    <div className="text-xl font-bold mt-1">2.4k</div>
                                </div>
                                <div className="rounded-lg border border-border/60 bg-muted/10 p-3">
                                    <div className="text-xs text-muted-foreground">New makers</div>
                                    <div className="text-xl font-bold mt-1">37</div>
                                </div>
                            </div>
                            <Button className="w-full mt-4" variant="outline" asChild>
                                <Link href="/following">Go to community</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Trending Topics */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Trending Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Artificial Intelligence</Badge>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Developer Tools</Badge>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Productivity</Badge>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">User UX</Badge>
                            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Marketing</Badge>
                        </CardContent>
                    </Card>

                    {/* Newsletter */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Newsletter</CardTitle>
                            <CardDescription>Get the best tools delivered to your inbox.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input placeholder="Your email" />
                                <Button className="w-full">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Join 50,000+ subscribers. No spam.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Featured Collections */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Featured Collections</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: "Best AI Tools 2024", count: 12 },
                                { name: "No-Code Starter Pack", count: 8 },
                                { name: "Dev Utilities", count: 15 },
                                { name: "Open Source Gems", count: 23 }
                            ].map((collection, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                                            {["🤖", "⚡", "🛠️", "💎"][i]}
                                        </div>
                                        <div>
                                            <div className="font-semibold group-hover:text-primary transition-colors">{collection.name}</div>
                                            <div className="text-xs text-muted-foreground">{collection.count} tools</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </aside>
            </div>
        </>
    );
}