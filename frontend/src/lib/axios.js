import axios from "axios";

const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL
  ? (import.meta.env.VITE_BACKEND_URL.startsWith('http') ? import.meta.env.VITE_BACKEND_URL : `https://${import.meta.env.VITE_BACKEND_URL}`)
  : "";

// Remove trailing slash if it exists
export const backendUrl = configuredBackendUrl.endsWith('/')
  ? configuredBackendUrl.slice(0, -1)
  : configuredBackendUrl;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : (backendUrl ? `${backendUrl}/api` : "/api"),
    withCredentials: true,
});