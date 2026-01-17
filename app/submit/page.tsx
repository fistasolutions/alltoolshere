"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Upload, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SubmitPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tagline, setTagline] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        toast.success("Tool Submitted Successfully!", {
            description: "We'll review your submission shortly.",
            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        })

        // Optional: Redirect or clear form
        setTimeout(() => router.push("/"), 2000)
    }

    return (
        <div className="container max-w-3xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Submit a Tool</h1>
                <p className="text-muted-foreground">Share your masterpiece with the world.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                            Tell us about what you've built.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name of the tool</Label>
                            <Input id="name" placeholder="e.g. Magic AI Writer" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input
                                id="tagline"
                                placeholder="Concise and catchy (max 60 chars)"
                                maxLength={60}
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                <span className={tagline.length > 50 ? "text-orange-500" : ""}>{tagline.length}</span>/60
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link to tool</Label>
                            <Input id="link" placeholder="https://" type="url" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe the problem it solves..." className="min-h-[120px]" required />
                        </div>

                        <div className="space-y-2">
                            <Label>Topics</Label>
                            <Input placeholder="e.g. AI, Productivity, Design" />
                            <p className="text-xs text-muted-foreground hidden">Comma separated</p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Thumbnail & Gallery</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors group">
                                <div className="bg-muted p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h4 className="font-semibold text-sm">Click to upload</h4>
                                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                <input type="file" className="hidden" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Tool"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}
