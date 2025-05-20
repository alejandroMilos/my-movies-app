import axios from "axios";
import config from "@/config";

// Create an axios instance
const api = axios.create({
    baseURL: config.API_URL,
    timeout: 5000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config };
        newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
        newConfig.headers.accept = "application/json";
        console.log("Making request to:", newConfig.url);
        return newConfig;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Response error:", error);
        return Promise.reject(error);
    }
);

export default api;