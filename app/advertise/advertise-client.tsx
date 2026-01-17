"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, ArrowRight, Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import {
    TRUSTED_COMPANIES,
    BENEFITS,
    PRICING_TIERS,
    TESTIMONIALS
} from "@/lib/mock-data"
import TestimonialsComponent from "@/components/testimonials-carousel"
import { toast } from "sonner"

export default function AdvertiseClient() {
    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSelectPlan = (planName: string) => {
        toast.success(`Selected ${planName} Plan`, {
            description: "Redirecting to checkout...",
            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        })
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background py-16 md:py-24">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Badge variant="outline" className="w-fit">
                                Trusted by 500+ companies
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Launch Your Product to{" "}
                                <span className="text-primary">
                                    Thousands of Early Adopters
                                </span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-xl">
                                Reach our community of 100,000+ active users searching for their next favorite tool. Get featured where it matters most.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-12 px-8" onClick={scrollToPricing}>
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8" onClick={scrollToPricing}>
                                    View Pricing
                                </Button>
                            </div>
                        </div>

                        {/* Avatar Grid */}
                        <div className="relative hidden lg:block">
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                    <Avatar key={i} className="h-20 w-20 border-2 border-background shadow-lg">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                                        <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-12 border-y bg-muted/30">
                <div className="container max-w-7xl mx-auto px-4">
                    <p className="text-center text-sm text-muted-foreground mb-8">Trusted by</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {TRUSTED_COMPANIES.map((company) => (
                            <div key={company.name} className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center font-bold text-xs">
                                    {company.logo}
                                </div>
                                <span className="font-medium">{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 md:py-20">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">Why Advertise With Us?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Tap into a highly engaged community of early adopters, makers, and tech enthusiasts
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BENEFITS.map((benefit) => (
                            <Card key={benefit.title} className="border-2 hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                                        <benefit.icon className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-12 md:py-20 bg-muted/30">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">Choose Your Campaign</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Flexible advertising packages to match your goals and budget
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {PRICING_TIERS.map((tier) => (
                            <Card
                                key={tier.name}
                                className={`relative flex flex-col ${tier.popular ? 'border-primary shadow-xl scale-105' : 'border-2'}`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <Badge className="bg-primary text-primary-foreground">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                                    <CardDescription>{tier.description}</CardDescription>
                                    <div className="pt-4">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        {tier.period && <span className="text-muted-foreground ml-2">{tier.period}</span>}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 flex-1 flex flex-col">
                                    <ul className="space-y-3 flex-1">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className={`w-full h-11 ${tier.popular ? 'bg-primary hover:bg-primary/90 mb-3' : ''}`}
                                        variant={tier.popular ? 'default' : 'outline'}
                                        onClick={() => handleSelectPlan(tier.name)}
                                    >
                                        {tier.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsComponent testimonials={TESTIMONIALS} />

            {/* Final CTA Section */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
                <div className="container max-w-7xl mx-auto px-4">
                    <Card className="border-2 max-w-4xl mx-auto">
                        <CardContent className="p-12 text-center space-y-6">
                            <Zap className="h-12 w-12 mx-auto text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold">Ready to Launch Your Campaign?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Join hundreds of successful companies who've grown their user base with AllToolsHere advertising
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90" onClick={scrollToPricing}>
                                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                                    <Link href="mailto:advertise@alltoolshere.com">Contact Sales</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
