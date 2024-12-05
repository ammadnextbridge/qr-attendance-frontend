import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import { CONFIG } from "@/config-global";

// ----------------------------------------------------------------------

const api = axios.create({ baseURL: CONFIG.serverUrl });

api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default api;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await api.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    profile: "/auth/profile",
    signIn: "/auth/login",
    signUp: "/auth/sign-up",
  },
  user: {
    root: "/users",
    active: "/users/active",
    updateStatus: (id: string) => `/users/${id}/update-status`,
  },
  qrCode: {
    current: "/qr/current",
    create: "/qr/generate",
  },
  center: {
    root: "/centers", // Endpoint for getting all centers and creating new centers
    update: (centerId: string) => `/centers/${centerId}`, // Endpoint for updating a center
  },
};
