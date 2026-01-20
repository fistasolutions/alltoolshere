import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Server-side axios instance (for use in Server Components and API routes)
export const serverApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

// Response interceptor for error handling
serverApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.message);
        return Promise.reject(error);
    }
);

export default serverApi;
