"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"

export default function SubmitPage() {
    return (
        <div className="container max-w-3xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Submit a Tool</h1>
                <p className="text-muted-foreground">Share your masterpiece with the world.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                        Tell us about what you've built.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name of the tool</Label>
                        <Input id="name" placeholder="e.g. Magic AI Writer" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input id="tagline" placeholder="Concise and catchy (max 60 chars)" maxLength={60} />
                        <p className="text-xs text-muted-foreground text-right">0/60</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Link to tool</Label>
                        <Input id="link" placeholder="https://" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the problem it solves..." className="min-h-[120px]" />
                    </div>

                    <div className="space-y-2">
                        <Label>Topics</Label>
                        <Input placeholder="e.g. AI, Productivity, Design" />
                        <p className="text-xs text-muted-foreground hidden">Comma separated</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label>Thumbnail & Gallery</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="bg-muted p-4 rounded-full mb-4">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h4 className="font-semibold text-sm">Click to upload</h4>
                            <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button size="lg" className="w-full">Submit Tool</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
