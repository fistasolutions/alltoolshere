import type { Metadata } from "next"
import AdvertiseClient from "./advertise-client"

export const metadata: Metadata = {
    title: "Advertise with AllToolsHere | Reach 100k+ Developers",
    description: "Promote your developer tool, SaaS, or AI product to a highly engaged audience of early adopters and tech professionals.",
    openGraph: {
        title: "Advertise with AllToolsHere | Reach 100k+ Developers",
        description: "Promote your developer tool, SaaS, or AI product to a highly engaged audience of early adopters and tech professionals.",
    }
}

export default function AdvertisePage() {
    const jsonBusStruct = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AllToolsHere Advertising",
        "provider": {
            "@type": "Organization",
            "name": "AllToolsHere",
            "url": "https://alltoolshere.com"
        },
        "description": "Advertising services for developer tools and SaaS products.",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Advertising Packages",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Starter Package"
                    },
                    "price": "199.00",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Pro Package"
                    },
                    "price": "499.00",
                    "priceCurrency": "USD"
                }
            ]
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonBusStruct) }}
            />
            <AdvertiseClient />
        </>
    )
}
