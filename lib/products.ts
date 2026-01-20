import { serverApi } from "@/config/axios";

// Product types matching the backend models
export interface ProductImage {
    id: string;
    image_url: string;
    position: number;
    is_primary: boolean;
}

export interface ProductBuiltWith {
    id: string;
    tool_name: string;
    tool_tagline: string | null;
    tool_icon_url: string | null;
    tool_ph_url: string;
    category: string | null;
    linked_product_id: string | null; // If set, can navigate to this product internally
}

export interface ProductTeamMember {
    id: string;
    name: string;
    role: string | null;
    avatar_url: string | null;
    ph_username: string | null;
    ph_profile_url: string | null;
}

export interface ProductLink {
    id: string;
    type: string;
    url: string;
    label: string | null;
}

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    tagline: string | null;
    icon_url: string | null;
    image_url: string | null;
    website_url: string | null;
    created_at: string;
    launch_year?: number | null;
    twitter_url?: string | null;
    forum_url?: string | null;
    images?: ProductImage[];
    built_with?: ProductBuiltWith[];
    team_members?: ProductTeamMember[];
    links?: ProductLink[];
    categories?: ProductCategory[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
}

/**
 * Fetch all products with pagination
 */
export async function getProducts(page = 1, limit = 20): Promise<Product[]> {
    try {
        const response = await serverApi.get<Product[]>("/products", {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const response = await serverApi.get<Product>(`/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product ${slug}:`, error);
        return null;
    }
}
