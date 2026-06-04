// src\utils\api.js
import axios from "axios";

const BASE_URL = "baseURL: import.meta.env.VITE_API_BASE";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export const chatAPI = {
  sendMessage: (businessSlug, message, sessionId) =>
    api.post("/chat", { 
      business_slug: businessSlug, 
      message, 
      session_id: sessionId 
    }),

  uploadFAQ: (businessSlug, formData, onProgress) =>
    api.post(`/upload/${businessSlug}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) =>
        onProgress && onProgress(Math.round((e.loaded * 100) / e.total)),
    }),

  getBusinessInfo: (businessSlug) =>
    api.get(`/business/${businessSlug}`),

  getLogs: (businessSlug) =>
    api.get(`/logs/${businessSlug}`),

  createBusiness: (data) =>
    api.post("/business", data, {
      headers: { "X-Admin-Secret": "vorthix123" }
    }),
};

export default api;
