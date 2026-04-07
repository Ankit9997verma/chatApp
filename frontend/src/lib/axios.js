import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL 
  ? (import.meta.env.VITE_BACKEND_URL.startsWith('http') ? import.meta.env.VITE_BACKEND_URL : `https://${import.meta.env.VITE_BACKEND_URL}`)
  : "";

// Remove trailing slash if it exists
const cleanBackendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : (cleanBackendUrl ? `${cleanBackendUrl}/api` : "/api"),
    withCredentials: true,
});