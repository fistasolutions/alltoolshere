"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink, MessageSquare, Share2, Flag, ChevronRight, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { UpvoteButton } from "@/components/upvote-button"

// Dummy Data for Logic
const TOOL = {
    id: "magic-ai-writer",
    title: "Magic AI Writer",
    tagline: "Write blogs 10x faster with advanced AI models",
    description: "Magic AI Writer helps content creators generate high-quality blog posts, social media captions, and emails in seconds. Powered by the latest GPT-4o models, it understands your brand voice and adapts to your style.",
    thumbnail: "https://images.unsplash.com/photo-1664575198308-3959904fa430?w=800&auto=format&fit=crop&q=60",
    images: [
        "https://images.unsplash.com/photo-1664575198308-3959904fa430?w=1200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=1200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=60"
    ],
    topics: ["AI", "Writing", "Productivity", "Marketing"],
    website: "https://example.com",
    makers: [
        { name: "Alice", avatar: "https://github.com/shadcn.png", handle: "@alice_dev" },
        { name: "Bob", avatar: "https://github.com/shadcn.png", handle: "@bob_builder" }
    ],
    upvotes: 342,
    comments: [
        { user: "John", text: "This is exactly what I needed! The tone matching feature is game-changing.", time: "2h ago", avatar: "https://github.com/shadcn.png" },
        { user: "Sarah", text: "Does it support custom templates?", time: "5h ago", avatar: "https://github.com/shadcn.png" },
    ]
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
    // In a real app, fetch data based on params.slug

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">

            {/* Breadcrumbs */}
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex items-center gap-1">
                            <Home className="h-3 w-3" /> Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{TOOL.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <img
                            src={TOOL.thumbnail}
                            alt={TOOL.title}
                            className="w-24 h-24 rounded-2xl object-cover shadow-sm border"
                        />
                        <div className="flex-1 space-y-2">
                            <h1 className="text-3xl font-bold">{TOOL.title}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">{TOOL.tagline}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {TOOL.topics.map(topic => (
                                    <Badge key={topic} variant="secondary" className="px-2 py-0.5">{topic}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[120px]">
                            <Button variant="outline" className="w-full justify-between group">
                                Visit
                                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                            </Button>
                            <UpvoteButton count={TOOL.upvotes} variant="default" className="w-full h-12" />
                        </div>
                    </div>

                    {/* Gallery Carousel */}
                    <div className="bg-muted/10 rounded-xl overflow-hidden border">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {TOOL.images.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <div className="aspect-video relative overflow-hidden rounded-xl">
                                            <img src={img} alt={`Screenshot ${index + 1}`} className="object-cover w-full h-full" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">About this tool</h2>
                        <p className="text-muted-foreground leading-7">
                            {TOOL.description}
                        </p>
                        <p className="text-muted-foreground leading-7 mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    <Separator />

                    {/* Discussion */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            Discussion <Badge variant="secondary" className="rounded-full">2</Badge>
                        </h3>

                        {/* Comment Input */}
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                                <Textarea placeholder="What do you think?" className="min-h-[100px]" />
                                <Button>Post Comment</Button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-6 pt-4">
                            {TOOL.comments.map((comment, i) => (
                                <div key={i} className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1.5 bg-muted/30 p-4 rounded-xl flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-sm">{comment.user}</span>
                                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                                        </div>
                                        <p className="text-sm">{comment.text}</p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <button className="text-xs text-muted-foreground hover:text-foreground font-medium">Reply</button>
                                            <button className="text-xs text-muted-foreground hover:text-foreground font-medium">Upvote</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">

                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" size="sm">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Flag className="h-4 w-4" />
                        </Button>
                    </div>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Makers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {TOOL.makers.map((maker, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={maker.avatar} />
                                        <AvatarFallback>{maker.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-sm">{maker.name}</div>
                                        <div className="text-xs text-muted-foreground">{maker.handle}</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Related Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 items-start group cursor-pointer">
                                    <div className="h-10 w-10 rounded-md bg-muted shrink-0" />
                                    <div>
                                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">Related Tool Name</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">A short description of the tool</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
