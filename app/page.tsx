import Link from "next/link"
import type { Metadata } from "next"
import { Mail, Flame, ExternalLink, MessageSquare, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProductRow, Product as ProductRowType } from "@/components/product-row"
import { UpvoteButton } from "@/components/upvote-button"

import { getProducts, Product as ApiProduct } from "@/lib/products"

// Dummy fallback for featured product until logic is enhanced
const FEATURED_PRODUCT_FALLBACK: ProductRowType = {
    id: "adb-wrench",
    slug: "adb-wrench",
    title: "ADB Wrench",
    tagline: "ADB in your browser + AI assistant with no install required",
    description: "Browser-based ADB tool via WebUSB. No SDK, no drivers, no install — just plug in and debug. Includes an AI assistant that runs ADB commands from plain English. BYOK, zero tracking.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=60",
    topics: ["Developer Tools", "Productivity", "AI"],
    upvotes: 73,
    comments: 1,
    website_url: "https://adbwrench.com",
    makers: [
        { name: "Mukul Joshi", avatar: "https://ph-avatars.imgix.net/784363/e4a65efc-63c3-4936-8f98-ca98bf5ef9db.png" }
    ]
}

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://alltoolshere.com',
    },
}

// Convert API product to Component product
function mapToRowProduct(p: ApiProduct): ProductRowType {
    return {
        id: p.id,
        slug: p.slug,
        title: p.name,
        tagline: p.tagline || "",
        description: p.description || "",
        thumbnail: p.icon_url || "https://placehold.co/60x60/png?text=Icon",
        topics: p.built_with?.map(b => b.category).filter((c): c is string => !!c) || [], // fallback topics from built_with
        categories: p.categories, // new categories
        makers: (p.team_members || []).map(tm => ({
            name: tm.name,
            avatar: tm.avatar_url || "",
            handle: tm.ph_username ? `@${tm.ph_username}` : undefined
        })),
        upvotes: 0, // Not yet in backend
        comments: 0, // Not yet in backend
        website_url: p.website_url || undefined
    };
}

export default async function Home() {
    // Fetch products
    const apiProducts = await getProducts(1, 20);
    const products = apiProducts.map(mapToRowProduct);

    // Use the first product as featured if available
    const featuredProduct = products.length > 0 ? products[0] : FEATURED_PRODUCT_FALLBACK;

    // Remaining products for the feed
    const feedProducts = products.length > 0 ? products.slice(1) : [];

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

                {/* Main Content Area (Feed) */}
                <div className="lg:col-span-8 space-y-7">

                    {/* Welcome / Header */}
                    <div className="relative overflow-hidden  bg-linear-to-r from-orange-50 to-orange-100/50 p-6 sm:p-10 border border-orange-100">
                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                                Discover the next <span className="text-primary">big thing</span>.
                            </h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                AllToolsHere is the place to find the best new products in tech.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg" className="font-semibold shadow-lg shadow-primary/20">
                                    <Link href="/submit">Submit a tool</Link>
                                </Button>
                                <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-orange-200 text-orange-700 hover:bg-white/80 hover:text-orange-800" asChild>
                                    <Link href="/about">How it works</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-orange-200/20 to-transparent pointer-events-none" />
                        <div className="absolute -right-10 -bottom-10 h-64 w-64 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    {/* Featured Product Hero - Premium Redesign */}
                    <section className="relative group">
                        <Card className="relative overflow-hidden border border-border/50 bg-card text-card-foreground shadow-sm">
                            {/* Background decoration - Subtler Theme Based */}
                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Image / Media Side */}
                                <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-muted/30">
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card" />
                                    <img
                                        src={featuredProduct.thumbnail}
                                        alt={featuredProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <Badge className="bg-primary/90 hover:bg-primary border-0 text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                            <Flame className="w-3 h-3 mr-1.5 fill-current" />
                                            Product of the Day
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center relative z-20">
                                    <div className="mb-6">
                                        <Link href={`/tool/${featuredProduct.slug}`} className="block group/title">
                                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-card-foreground mb-2 group-hover/title:text-primary transition-colors">
                                                {featuredProduct.title}
                                            </h2>
                                        </Link>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                            {featuredProduct.tagline}
                                        </p>
                                    </div>

                                    <p className="text-muted-foreground/80 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {featuredProduct.description}
                                    </p>

                                    {/* Maker & Stats Row */}
                                    <div className="flex items-center justify-between mt-auto py-4 border-t border-border/50">
                                        <div className="flex items-center gap-3">
                                            {featuredProduct.makers && featuredProduct.makers.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="relative">
                                                        <img
                                                            src={featuredProduct.makers[0].avatar || "/placeholder-avatar.jpg"}
                                                            className="w-10 h-10 rounded-full border-2 border-background"
                                                            alt="Maker"
                                                        />
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Maker</span>
                                                        <span className="text-sm font-medium text-foreground">{featuredProduct.makers[0].name}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-muted-foreground">Team</div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="text-center px-4 py-1 border-l border-border/50">
                                                <div className="text-xl font-bold text-foreground">{featuredProduct.upvotes}</div>
                                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Upvotes</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <Button size="lg" variant="default" className="font-bold shadow-sm" asChild>
                                            <Link href={`/tool/${featuredProduct.slug}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {featuredProduct.website_url && (
                                            <Button size="lg" variant="outline" className="text-foreground hover:bg-muted" asChild>
                                                <a href={featuredProduct.website_url} target="_blank" rel="noopener noreferrer">
                                                    Visit Website
                                                    <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Today's Feed */}
                    <section>
                        <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-2">
                            <h2 className="text-xl font-bold">Today</h2>
                            <span className="text-sm text-muted-foreground font-medium">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        <div className="space-y-0">
                            {feedProducts.map((product, i) => (
                                <ProductRow key={product.id} product={product} rank={i + 2} />
                            ))}

                            {feedProducts.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No other products found today. <Link href="/submit" className="underline hover:text-primary">Be the first to submit!</Link>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <Button variant="outline" className="w-full sm:w-auto min-w-[200px]" asChild>
                                <Link href="/tools">View all products</Link>
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <aside className="lg:col-span-4 space-y-8">



                    {/* Trending Categories */}
                    <div>
                        <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider mb-4">Trending Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Artificial Intelligence", "Developer Tools", "Productivity", "Marketing", "Design", "No-Code", "SaaS"].map(v => (
                                <Link key={v} href={`/category/${v.toLowerCase().replace(' ', '-')}`}>
                                    <Badge variant="secondary" className="px-3 py-1.5 hover:bg-secondary/80 cursor-pointer font-medium text-secondary-foreground/80">
                                        {v}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Community / Forum Teaser (Static / Coming Soon) */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider">Community Discussions</h3>
                        </div>

                        <Card className="border-border/60 shadow-sm overflow-hidden bg-card/50">
                            <CardContent className="p-0 divide-y divide-border/40">
                                {[
                                    { title: "Is AI replacing junior devs? Honest thoughts.", comments: 42, author: "sarah_dev", time: "2h ago", avatar: "https://i.pravatar.cc/150?u=sarah" },
                                    { title: "Best stack for a solo SaaS founder in 2024?", comments: 28, author: "indie_hacker", time: "5h ago", avatar: "https://i.pravatar.cc/150?u=indie" },
                                    { title: "My launch checklist for Product Hunt (Free Template)", comments: 15, author: "alex_m", time: "8h ago", avatar: "https://i.pravatar.cc/150?u=alex" },
                                ].map((thread, i) => (
                                    <Link key={i} href="#" className="flex gap-3 items-start p-4 hover:bg-muted/50 transition-colors group">
                                        <div className="shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                                                <img src={thread.avatar} alt={thread.author} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                                                {thread.title}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground/80">{thread.author}</span>
                                                <span>•</span>
                                                <span>{thread.time}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    {thread.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                    </div>

                    {/* Newsletter Widget */}
                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                        <CardHeader className="pb-3 pt-5">
                            <CardTitle className="text-lg">Don't miss the next big thing</CardTitle>
                            <CardDescription>Get the top tools delivered to your inbox weekly.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-5">
                            <Input placeholder="Your email address" className="bg-background" />
                            <Button className="w-full font-semibold">
                                Subscribe
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">
                                No spam, unsubscribe anytime.
                            </p>
                        </CardContent>
                    </Card>



                </aside>
            </div>
        </>
    );
}