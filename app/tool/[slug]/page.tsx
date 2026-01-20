import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import ToolClient from "./tool-client"
import { getProductBySlug } from "@/lib/products"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        return { title: "Product Not Found | AllToolsHere" }
    }

    return {
        title: `${product.name} - ${product.tagline || ""} | AllToolsHere`,
        description: product.description || product.tagline || "",
        openGraph: {
            title: `${product.name} | AllToolsHere`,
            description: product.tagline || "",
            images: product.image_url ? [product.image_url] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} | AllToolsHere`,
            description: product.tagline || "",
            images: product.image_url ? [product.image_url] : [],
        }
    }
}

export default async function ToolPage({ params }: Props) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    // Map API product to the format expected by ToolClient
    const tool = {
        id: product.slug,
        title: product.name,
        tagline: product.tagline || "",
        description: product.description || "",
        thumbnail: product.icon_url || product.image_url || "https://placehold.co/80x80/png?text=Icon",
        images: product.images?.map(img => img.image_url) || [],
        topics: (product as any).topics || [],
        categories: product.categories || [],
        website: product.website_url || "#",
        makers: (product.team_members || []).map(tm => ({
            name: tm.name,
            avatar: tm.avatar_url || "",
            handle: tm.ph_username ? `@${tm.ph_username}` : undefined
        })),
        upvotes: 0,
        followers: 0,
        launchDate: product.launch_year ? product.launch_year.toString() : (product.created_at ? new Date(product.created_at).getFullYear().toString() : "2024"),
        socials: {
            twitter: product.twitter_url || undefined,
            forum: product.forum_url || undefined
        },
        links: product.links?.map(link => ({
            type: link.type,
            url: link.url,
            label: link.label || undefined
        })) || [],
        paymentType: "Free",
        comments: []
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.title,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": tool.upvotes || 1
        },
        "description": tool.description,
        "image": tool.thumbnail,
        "author": tool.makers[0] ? {
            "@type": "Person",
            "name": tool.makers[0].name
        } : undefined
    }

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://alltoolshere.com"
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://alltoolshere.com/tools"
        }, {
            "@type": "ListItem",
            "position": 3,
            "name": tool.title
        }]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ToolClient tool={tool} />
        </>
    )
}
