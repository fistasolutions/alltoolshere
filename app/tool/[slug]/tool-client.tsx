"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import {
    ExternalLink,
    MessageSquare,
    Share2,
    Flag,
    ChevronRight,
    ChevronLeft,
    Plus,
    Bookmark,
    BarChart2,
    Play,
    Rocket,
    Link as LinkIcon
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AnimatedUnderlineTabs from "@/components/shadcn-studio/tabs/tabs-29"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ToolData {
    id: string
    title: string
    tagline: string
    description: string
    thumbnail: string
    images?: string[]
    topics: string[]
    categories?: { name: string; slug: string }[]
    website?: string
    makers: { name: string; avatar: string; handle?: string }[]
    upvotes: number
    followers?: number
    launchDate?: string
    socials?: { twitter?: string; forum?: string }
    links?: { type: string; url: string; label?: string }[]
    paymentType?: string
    comments?: any[]
}

interface ToolClientProps {
    tool: ToolData
}

export default function ToolClient({ tool }: ToolClientProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showAllCategories, setShowAllCategories] = useState(false)
    const TOOL = tool

    // Type guard for complex comments or simplified comments
    const comments = Array.isArray(TOOL.comments) ? TOOL.comments : []


    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div className="flex gap-5">
                    <img
                        src={TOOL.thumbnail}
                        alt={TOOL.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border shadow-sm"
                    />
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <h1 className="text-2xl sm:text-3xl font-bold">{TOOL.title}</h1>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 border-none rounded-md px-2 py-0.5 text-xs font-semibold self-start sm:self-auto">
                                Launching today
                            </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground leading-snug max-w-2xl">
                            {TOOL.tagline}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                            <span>{TOOL.followers} followers</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                {TOOL.topics.slice(0, 1).map(t => <span key={t}>{t}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="h-10 px-6 font-semibold shrink-0" asChild>
                    <a href={TOOL.website} target="_blank" rel="noopener noreferrer">
                        Visit website
                    </a>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">

                    <p className="text-muted-foreground/90 leading-relaxed text-[15px]">
                        {TOOL.description}
                    </p>

                    {/* Tabs Navigation */}
                    <AnimatedUnderlineTabs
                        defaultTab="overview"
                        tabs={[
                            {
                                name: "Overview",
                                value: "overview",
                                content: (
                                    <div className="space-y-8 animate-in fade-in-50">
                                        {/* Gallery */}
                                        <div className="space-y-6">
                                            <Carousel className="w-full">
                                                <CarouselContent>
                                                    {TOOL.images?.map((img, index) => (
                                                        <CarouselItem key={index} className="basis-full sm:basis-1/1 md:basis-2/3 lg:basis-1/2 pl-4">
                                                            <div className="aspect-[16/10] relative overflow-hidden rounded-xl border bg-muted">
                                                                <img src={img} alt={`Screenshot ${index + 1}`} className="object-cover w-full h-full" />
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="left-2" />
                                                <CarouselNext className="right-2" />
                                            </Carousel>
                                        </div>

                                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
                                            <span className="text-foreground/80">{TOOL.paymentType}</span>
                                            <div className="flex items-center gap-2">
                                                <span>Categories:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {(TOOL.categories || TOOL.topics.map(t => ({ name: t, slug: t })))
                                                        .slice(0, showAllCategories ? undefined : 5)
                                                        .map((cat, i) => (
                                                            <Link
                                                                key={i}
                                                                href={`/category/${cat.slug}`}
                                                                className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors px-2 py-1 rounded-md bg-muted/50 text-xs font-medium"
                                                            >
                                                                {cat.name}
                                                            </Link>
                                                        ))}
                                                    {(TOOL.categories || TOOL.topics).length > 5 && !showAllCategories && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 px-2 text-xs text-muted-foreground"
                                                            onClick={() => setShowAllCategories(true)}
                                                        >
                                                            +{(TOOL.categories || TOOL.topics).length - 5} more
                                                        </Button>
                                                    )}
                                                    {showAllCategories && (TOOL.categories || TOOL.topics).length > 5 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 px-2 text-xs text-muted-foreground"
                                                            onClick={() => setShowAllCategories(false)}
                                                        >
                                                            Show less
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Launch Team */}
                                        <Card className="border-border/60 bg-card/50 shadow-sm">
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center border">
                                                        <Rocket className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                    <span className="font-semibold">Launch Team</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-2">
                                                        {TOOL.makers.map((maker, i) => (
                                                            <Avatar key={i} className="border-2 border-background w-8 h-8">
                                                                <AvatarImage src={maker.avatar} />
                                                                <AvatarFallback>M</AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    </div>
                                                    <Button variant="outline" size="sm" className="h-8 text-xs">Show more</Button>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Promoted Ad (Mock) */}
                                        <Card className="bg-muted/20 border-border/40 shadow-sm">
                                            <CardContent className="p-4 flex gap-4 items-start">
                                                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                                    <div className="text-white font-bold text-xs">AS</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-sm">
                                                        <span className="font-semibold">AppSignal</span> — Full-stack monitoring for errors, metrics, and logs
                                                    </div>
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 rounded-sm font-normal text-muted-foreground">Promoted</Badge>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Separator />

                                        {/* Discussion & Reviews Preview */}
                                        <div className="space-y-6">
                                            <div className="bg-card border rounded-xl p-4">
                                                <p className="text-sm font-medium mb-3 text-muted-foreground">What do you think? ...</p>
                                                <div className="flex justify-between items-center">
                                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                                        @
                                                    </div>
                                                    <Button variant="outline" size="sm" className="font-medium">Login to comment</Button>
                                                </div>
                                            </div>

                                            {/* Recent Comments */}
                                            <div className="space-y-6">
                                                {comments.slice(0, 3).map((comment: any, i: number) => (
                                                    <div key={i} className="flex gap-4">
                                                        <Avatar className="w-10 h-10 border">
                                                            <AvatarImage src={comment.avatar} />
                                                            <AvatarFallback>U</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-sm">{comment.user}</span>
                                                                {comment.role === "Maker" && (
                                                                    <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none px-1.5 h-5">
                                                                        Maker
                                                                    </Badge>
                                                                )}
                                                                <Rocket className="h-3 w-3 text-red-500 fill-red-500" />
                                                            </div>
                                                            <p className="text-sm leading-relaxed text-foreground/90">
                                                                {comment.text}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                                                <button className="flex items-center gap-1 hover:text-foreground">
                                                                    <ChevronLeft className="h-3 w-3 rotate-90" /> Upvote ({comment.upvotes})
                                                                </button>
                                                                <button className="hover:text-foreground">Report</button>
                                                                <button className="hover:text-foreground">Share</button>
                                                                <span>{comment.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "Reviews",
                                value: "reviews",
                                content: (
                                    <div className="space-y-8 animate-in fade-in-50">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">User Reviews</h2>
                                            <Button>Write a Review</Button>
                                        </div>
                                        <div className="space-y-6">
                                            {comments.map((comment: any, i: number) => (
                                                <div key={i} className="flex gap-4 p-4 border rounded-xl bg-card">
                                                    <Avatar className="w-10 h-10 border">
                                                        <AvatarImage src={comment.avatar} />
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-sm">{comment.user}</span>
                                                                <div className="flex text-orange-500">
                                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                                        <Rocket key={s} className="w-3 h-3 fill-current" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                                                        </div>
                                                        <p className="text-sm leading-relaxed text-foreground/90">
                                                            {comment.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "Alternatives",
                                value: "alternatives",
                                content: (
                                    <div className="space-y-6 animate-in fade-in-50">
                                        <h2 className="text-xl font-bold">Similar Tools</h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <Card key={i} className="hover:bg-muted/50 transition-colors cursor-pointer">
                                                    <CardContent className="p-4 flex gap-4">
                                                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                                            Alt
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold">Alternative Tool {i}</h3>
                                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                                A great alternative with similar features and pricing.
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "Team",
                                value: "team",
                                content: (
                                    <div className="space-y-6 animate-in fade-in-50">
                                        <h2 className="text-xl font-bold">Meet the Makers</h2>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {TOOL.makers.map((maker, i) => (
                                                <Card key={i}>
                                                    <CardContent className="p-6 flex items-center gap-4">
                                                        <Avatar className="w-16 h-16 border-2">
                                                            <AvatarImage src={maker.avatar} />
                                                            <AvatarFallback>M</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h3 className="font-bold text-lg">{maker.name}</h3>
                                                            <p className="text-sm text-muted-foreground">{maker.handle}</p>
                                                            <div className="flex gap-2 mt-2">
                                                                <Button size="sm" variant="outline" className="h-7 text-xs">Follow</Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "Awards",
                                value: "awards",
                                content: (
                                    <div className="space-y-6 animate-in fade-in-50">
                                        <h2 className="text-xl font-bold">Awards & Recognition</h2>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center gap-3 p-4 border rounded-xl bg-yellow-500/10 border-yellow-500/20">
                                                <Rocket className="w-8 h-8 text-yellow-500" />
                                                <div>
                                                    <div className="font-bold">Product of the Day</div>
                                                    <div className="text-xs text-muted-foreground">1st Place • AllToolsHere</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 border rounded-xl bg-purple-500/10 border-purple-500/20">
                                                <Rocket className="w-8 h-8 text-purple-500" />
                                                <div>
                                                    <div className="font-bold">Community Favorite</div>
                                                    <div className="text-xs text-muted-foreground">Voted by 100+ users</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "More",
                                value: "more",
                                content: (
                                    <div className="space-y-6 animate-in fade-in-50">
                                        <div className="p-8 border-2 border-dashed rounded-xl text-center space-y-4">
                                            <h3 className="font-bold text-lg">More Information</h3>
                                            <p className="text-muted-foreground max-w-md mx-auto">
                                                Check out the official documentation, changelog, and roadmap to learn more about where {TOOL.title} is heading.
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                <Button variant="outline">View Roadmap</Button>
                                                <Button variant="outline">Read Docs</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Launch Wrapper */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold">Launching Today</h3>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted/30 rounded-xl p-6 border flex flex-col items-center gap-5 relative overflow-hidden group">
                            <div className="text-center space-y-2 z-10 w-full px-8">
                                <Badge variant="outline" className="text-xs font-semibold text-muted-foreground uppercase tracking-widest bg-background/50 border-0">Featured</Badge>
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold h-14 text-lg shadow-lg hover:shadow-xl transition-all rounded-xl border-t border-white/20 relative z-10"
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        setShowLoginModal(true);
                                    }
                                }}
                            >
                                <div className="w-0 border-[8px] border-transparent border-b-white border-t-0 -mt-1 mr-3" />
                                Upvote • {TOOL.upvotes}
                            </Button>

                            <p className="text-xs text-muted-foreground z-10">73 people upvoted today</p>
                        </div>

                        {/* Login Modal */}
                        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
                            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden gap-0">
                                <DialogHeader className="p-6 pb-2">
                                    <DialogTitle className="text-center text-2xl font-bold">Welcome back</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Login to upvote, comment, and launch tools.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="p-6 pt-2 grid gap-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(true)}>
                                            Google
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            GitHub
                                        </Button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
                                        </div>
                                        <Button onClick={() => setShowLoginModal(false)}>Continue with Email</Button>
                                    </div>
                                </div>
                                <div className="p-4 bg-muted/50 text-center text-xs text-muted-foreground">
                                    By clicking continue, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Actions List */}
                    <div className="space-y-1">
                        {[
                            { icon: Plus, label: `Follow ${TOOL.title}` },
                            { icon: Bookmark, label: "Add to collection" },
                            { icon: Share2, label: "Share" },
                            { icon: BarChart2, label: "Analytics" },
                        ].map((action, i) => (
                            <Button
                                key={i}
                                variant="ghost"
                                className="w-full justify-start h-10 px-2 text-muted-foreground hover:text-foreground font-medium"
                            >
                                <action.icon className="mr-3 h-4 w-4" />
                                {action.label}
                            </Button>
                        ))}
                    </div>

                    <Separator />

                    {/* Company Info */}
                    {TOOL.links && TOOL.links.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm">Company Info</h3>
                            <div className="space-y-3 text-sm">
                                {TOOL.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                                    >
                                        {link.type === 'play_store' ? (
                                            <Play className="h-4 w-4 fill-current shrink-0" />
                                        ) : link.type === 'app_store' ? (
                                            <LinkIcon className="h-4 w-4 shrink-0" /> // Using generic Link icon for App Store just in case, or maybe ExternalLink
                                        ) : (
                                            <ExternalLink className="h-4 w-4 shrink-0" />
                                        )}
                                        <span className="truncate">{link.label || link.url}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tool Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">{TOOL.title} Info</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Rocket className="h-4 w-4" />
                            <span>Launched in {TOOL.launchDate || "2024"}</span>
                        </div>
                    </div>

                    {/* Forum */}
                    {TOOL.socials?.forum && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm">Forum</h3>
                            <a href={TOOL.socials.forum} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                <span className="truncate">Product Hunt Discussion</span>
                            </a>
                        </div>
                    )}

                    {/* Social */}
                    {TOOL.socials?.twitter && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm">Social</h3>
                            <a href={TOOL.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <div className="w-4 h-4 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-[10px]">X</div>
                                <span>X (Twitter)</span>
                            </a>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
