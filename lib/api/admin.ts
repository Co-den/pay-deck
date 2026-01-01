// lib/api/admin.ts
/**
 * Admin API functions
 * Handles admin-specific operations like merchant verification
 */

import { api, ApiResponse } from './client';

// Types
export interface PendingMerchant {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  accountStatus: string;
  businessVerification: {
    rcNumber: string;
    nin: string;
    taxId: string;
    verified: boolean;
  };
  createdAt: string;
}

export interface AdminStats {
  pendingVerification: number;
  verifiedToday: number;
  averageReviewTime: string;
}

// API Functions
export const adminApi = {
  /**
   * Get all pending merchants for verification
   */
  getPendingMerchants: async (): Promise<PendingMerchant[]> => {
    const response = await api.get<{ merchants: PendingMerchant[] }>('/admin/pending-merchants');

    if (response.status !== "success" || !response.data) {
      throw new Error(response.message || "Failed to fetch pending merchants");
    }

    return response.data.merchants;
  },

  /**
   * Verify a business account
   */
  verifyBusiness: async (merchantId: string, notes?: string): Promise<void> => {
    const response = await api.put(`/auth/verify-business/${merchantId}`, { notes });

    if (response.status !== "success") {
      throw new Error(response.message || "Failed to verify business");
    }
  },

  /**
   * Reject a business account
   */
  rejectBusiness: async (merchantId: string, reason?: string): Promise<void> => {
    const response = await api.put(`/admin/reject-business/${merchantId}`, { reason });

    if (response.status !== "success") {
      throw new Error(response.message || "Failed to reject business");
    }
  },

  /**
   * Get admin statistics
   */
  getAdminStats: async (): Promise<AdminStats> => {
    const response = await api.get<AdminStats>('/admin/stats');

    if (response.status !== "success" || !response.data) {
      throw new Error(response.message || "Failed to fetch admin stats");
    }

    return response.data;
  },
};

// Export individual functions for convenience
export const getPendingMerchants = adminApi.getPendingMerchants;
export const verifyBusiness = adminApi.verifyBusiness;
export const rejectBusiness = adminApi.rejectBusiness;
export const getAdminStats = adminApi.getAdminStats;