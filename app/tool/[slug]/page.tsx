import type { Metadata, ResolvingMetadata } from "next"
import ToolClient from "./tool-client"
import { MOCK_TOOL } from "@/lib/mock-data"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // In a real app, fetch data based on params.slug
    const tool = MOCK_TOOL

    return {
        title: `${tool.title} - ${tool.tagline} | AllToolsHere`,
        description: tool.description,
        openGraph: {
            title: `${tool.title} | AllToolsHere`,
            description: tool.tagline,
            images: [tool.thumbnail],
        },
        twitter: {
            card: "summary_large_image",
            title: `${tool.title} | AllToolsHere`,
            description: tool.tagline,
            images: [tool.thumbnail],
        }
    }
}

export default function ToolPage({ params }: Props) {
    const tool = MOCK_TOOL

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.title,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, Android, iOS",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": tool.upvotes
        },
        "description": tool.description,
        "image": tool.thumbnail,
        "author": {
            "@type": "Person",
            "name": tool.makers[0].name
        }
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
            <ToolClient />
        </>
    )
}
