"use client"

import Link from "next/link"
import { Bell, Menu, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-7xl mx-auto flex h-16 items-center px-4">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4 mt-8">
                            <Link href="/" className="text-lg font-semibold hover:text-primary">Home</Link>
                            <Link href="/tools" className="text-lg font-semibold hover:text-primary">Tools</Link>
                            <Link href="/following" className="text-lg font-semibold hover:text-primary">Following</Link>
                            <Link href="/topics" className="text-lg font-semibold hover:text-primary">Topics</Link>
                            <Link href="/about" className="text-lg font-semibold hover:text-primary">About</Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            T
                        </div>
                        <span className="hidden font-bold sm:inline-block text-xl">
                            AllToolsHere
                        </span>
                    </Link>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link href="/tools" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Tools
                        </Link>
                        <Link href="/following" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Community
                        </Link>
                        <Link href="/topics" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Topics
                        </Link>
                    </nav>
                </div>

                {/* Right Section */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                    {/* Search */}
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const query = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                            if (query.trim()) {
                                window.location.href = `/search?q=${encodeURIComponent(query)}`;
                            }
                        }} className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="q"
                                type="search"
                                placeholder="Search tools..."
                                className="h-9 md:w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted/50"
                            />
                        </form>
                    </div>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-purple-600">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <Button variant="default" size="sm" className="hidden sm:flex bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                        <Plus className="mr-2 h-4 w-4" />
                        Submit Tool
                    </Button>

                    <ModeToggle />

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">shadcn</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
