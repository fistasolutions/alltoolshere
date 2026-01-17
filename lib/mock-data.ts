import { Target, TrendingUp, BarChart3, Star } from "lucide-react"

// Types
export interface Product {
    id: string
    rank?: number
    title: string
    tagline: string
    description: string
    thumbnail: string
    images?: string[]
    topics: string[]
    makers: { name: string; avatar: string; handle?: string }[]
    upvotes: number
    comments: number | { user: string; role?: string; text: string; time: string; avatar: string; upvotes: number }[]
    website?: string
    followers?: number
    launchDate?: string
    socials?: { twitter?: string; forum?: string }
    paymentType?: string
}

export interface PricingTier {
    name: string
    price: string
    period?: string
    description: string
    features: string[]
    cta: string
    popular: boolean
}

export interface Testimonial {
    name: string
    role: string
    company: string
    avatar: string
    rating: number
    content: string
}

// Data
export const TRUSTED_COMPANIES = [
    { name: "Notion", logo: "N" },
    { name: "Stripe", logo: "S" },
    { name: "Figma", logo: "F" },
    { name: "Linear", logo: "L" },
    { name: "Vercel", logo: "V" }
]

export const BENEFITS = [
    {
        icon: Target,
        title: "Reach Early Adopters",
        description: "Connect with thousands of tech enthusiasts actively looking for new tools and solutions."
    },
    {
        icon: TrendingUp,
        title: "Boost Your Launch",
        description: "Get featured during your product launch and maximize visibility when it matters most."
    },
    {
        icon: BarChart3,
        title: "Track Performance",
        description: "Access detailed analytics to measure engagement, clicks, and conversions from your campaign."
    },
    {
        icon: Star,
        title: "Premium Placement",
        description: "Stand out with top placements on our homepage, newsletter, and category pages."
    }
]

export const PRICING_TIERS: PricingTier[] = [
    {
        name: "Starter",
        price: "$199",
        period: "per week",
        description: "Perfect for new launches and getting initial traction",
        features: [
            "Featured in daily newsletter",
            "Homepage sidebar placement",
            "50,000+ impressions",
            "Basic analytics dashboard",
            "7-day campaign duration"
        ],
        cta: "Get Started",
        popular: false
    },
    {
        name: "Pro",
        price: "$499",
        period: "per week",
        description: "Best for growing products seeking maximum visibility",
        features: [
            "Everything in Starter",
            "Top homepage banner",
            "Dedicated social media post",
            "200,000+ impressions",
            "Advanced analytics & insights",
            "14-day campaign duration",
            "Priority support"
        ],
        cta: "Get Started",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "Tailored campaigns for established products",
        features: [
            "Everything in Pro",
            "Custom campaign strategy",
            "Dedicated account manager",
            "Unlimited duration",
            "Custom analytics dashboard",
            "A/B testing support",
            "Quarterly business reviews"
        ],
        cta: "Contact Us",
        popular: false
    }
]

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "Sarah Chen",
        role: "Co-founder",
        company: "TaskFlow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
        rating: 5,
        content: "Advertising on AllToolsHere helped us reach 10,000 early adopters in our first week. The ROI was incredible."
    },
    {
        name: "Michael Rodriguez",
        role: "Head of Growth",
        company: "DevTools Pro",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
        rating: 5,
        content: "The targeted audience and premium placement drove quality traffic. We saw a 500% return on our ad spend."
    },
    {
        name: "Emily Watson",
        role: "Marketing Director",
        company: "SaaSify",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60",
        rating: 5,
        content: "The quality of users we get from AllToolsHere is unmatched. They are engaged, provide great feedback, and convert well."
    }
]

export const MOCK_TOOL: Product = {
    id: "chessmaster-ai",
    title: "Chessmaster AI",
    tagline: "Transform Your Chess Skills with AI-Powered Training",
    description: "Chessmaster AI is more than just a chess game - it's your personal chess academy in your pocket. Designed for players of all skill levels, our app combines competitive gameplay with intelligent coaching to help you master the game of kings. Train against AI opponents across 70 progressive levels with personalized coaching.",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=150&auto=format&fit=crop&q=60",
    images: [
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=1200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1528819622765-d6bcf132f741?w=1200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=1200&auto=format&fit=crop&q=60"
    ],
    topics: ["Games", "Board Games", "Android"],
    website: "https://example.com",
    makers: [
        { name: "Shuvodip Ray", avatar: "https://github.com/shadcn.png", handle: "@shuvodip" },
        { name: "AuthorAI", avatar: "https://github.com/shadcn.png", handle: "@author_ai" }
    ],
    upvotes: 99,
    followers: 50,
    launchDate: "2026",
    socials: {
        twitter: "x.com/chessmaster-ai",
        forum: "p/chessmaster-ai"
    },
    paymentType: "Payment Required",
    comments: [
        { user: "Shuvodip Ray", role: "Maker", text: "Every game is a learning opportunity. Our adaptive AI opponent scales from complete beginner to expert level, ensuring you're always challenged at exactly the right difficulty. As you improve, the AI grows with you.", time: "4d ago", avatar: "https://github.com/shadcn.png", upvotes: 2 },
    ] as any // Simplified for mock
}
