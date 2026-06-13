import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4545/api",
    withCredentials: true,
});

// Don't set Content-Type for FormData - let browser set it
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
});

// Items API calls
export const createItem = (itemData) => api.post("/items/add", itemData);
export const getItems = () => api.get("/items/all");
export const getItemById = (id) => api.get(`/items/${id}`);
