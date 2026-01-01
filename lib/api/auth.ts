// lib/api/auth.ts
/**
 * Authentication API functions
 */

import { api, ApiResponse, setAuthToken, setMerchantData, clearAuthToken } from './client';

// Types
export interface RegisterRequest {
  businessName: string;
  email: string;
  password: string;
  businessType?: string;
  phone?: string;
  rcNumber?: string;
  nin?: string;
  taxId?: string;
  accountType: 'individual' | 'business';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MerchantData {
  id: string;
  businessName: string;
  email: string;
  tier: string;
  accountStatus: string;
  businessType: string;
  verificationRequired?: boolean;
}

export interface AuthResponseData {
  token: string;
  merchant: MerchantData;
}

// API Functions
export const authApi = {
  /**
   * Register a new merchant
   */
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await api.post<AuthResponseData>('/auth/register', data);

    if (response.status === "success" && response.data?.token) {
      setAuthToken(response.data.token);
      if (response.data.merchant) {
        setMerchantData(response.data.merchant);
      }
    }

    return response;
  },

  /**
   * Login merchant
   */
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await api.post<AuthResponseData>('/auth/login', data);

    if (response.status === "success" && response.data?.token) {
      setAuthToken(response.data.token);
      if (response.data.merchant) {
        setMerchantData(response.data.merchant);
      }
    }

    return response;
  },

  /**
   * Get current merchant
   */
  getMe: async (): Promise<ApiResponse<{ merchant: any }>> => {
    return api.get<{ merchant: any }>('/auth/me');
  },

  /**
   * Logout merchant
   */
  logout: async (): Promise<ApiResponse<{}>> => {
    const response = await api.post<{}>('/auth/logout');
    if (response.status === "success") {
      clearAuthToken();
      if (typeof window !== "undefined") {
        localStorage.removeItem("paydeck_merchant");
      }
    }
    return response;
  },

  /**
   * Update password
   */
  updatePassword: async (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<{ token: string }>> => {
    return api.put<{ token: string }>('/auth/updatepassword', data);
  },
};

// Export individual functions for convenience
export const register = authApi.register;
export const login = authApi.login;
export const getMe = authApi.getMe;
export const logout = authApi.logout;
export const updatePassword = authApi.updatePassword;