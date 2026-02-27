/**
 * API Client - Base client for all API requests
 * Handles authentication, error handling, and request formatting
 */

const API_URL = "https://pay-deck-api.onrender.com/api";

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("paydeck_token") || "";
}

/**
 * Set authentication token in localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("paydeck_token", token);
}

/**
 * Clear authentication token from localStorage
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("paydeck_token");
}

/**
 * Get merchant data from localStorage
 */
export function getMerchantData(): any {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("paydeck_merchant");
  return data ? JSON.parse(data) : null;
}

/**
 * Set merchant data in localStorage
 */
export function setMerchantData(merchant: any): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("paydeck_merchant", JSON.stringify(merchant));
}

export function sendEmail(merchant: any): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("paydeck_merchant", JSON.stringify(merchant));
}
/**
 * API Response structure from backend
 */
export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

/**
 * Base API request function
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    // If response is not ok, throw error with backend message
    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return data;
  } catch (error: any) {
    // Network errors or other exceptions
    throw new Error(error.message || "Network request failed");
  }
}

/**
 * API methods
 */
export const api = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, { method: "GET" }),

  /**
   * POST request
   */
  post: <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, { method: "DELETE" }),
};

/**
 * Auth helpers
 */
export const auth = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  /**
   * Login
   */
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === "success" && response.data?.token) {
      setAuthToken(response.data.token);
      if (response.data.merchant) {
        setMerchantData(response.data.merchant);
      }
    }

    return response;
  },
  //password reset
  passwordReset: async (email: string) => {
    const response = await api.post("/auth/passwordReset", { email });
    if (response.status === "success" && response.data) {
      sendEmail(response.data);
    }
    return response;
  },
  /**
   * Register
   */
  register: async (data: {
    businessName: string;
    email: string;
    password: string;
    businessType?: string;
    phone?: string;
    rcNumber?: string;
    nin?: string;
    taxId?: string;
    accountType: "individual" | "business";
  }) => {
    const response = await api.post("/auth/register", data);

    if (response.status === "success" && response.data?.token) {
      setAuthToken(response.data.token);
      if (response.data.merchant) {
        setMerchantData(response.data.merchant);
      }
    }

    return response;
  },

  /**
   * Logout
   */
  logout: () => {
    clearAuthToken();
    localStorage.removeItem("paydeck_merchant");
  },
};
