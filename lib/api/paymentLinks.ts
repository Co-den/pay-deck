// lib/api/paymentLinks.ts
/**
 * Payment Links Service
 * Handles payment link creation and management
 */

import { api, type ApiResponse } from "./client";

/**
 * Payment Link
 */
export interface PaymentLink {
  id: string;
  _id?: string;
  merchant: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  url: string;
  shortCode: string;
  status: "active" | "expired" | "disabled";
  expiresAt?: string | null;
  maxUses?: number | null;
  currentUses: number;

  // Statistics
  stats: {
    totalRevenue: number;
    successfulPayments: number;
    failedPayments: number;
    totalViews: number;
    conversionRate: number;
  };

  // Settings
  settings: {
    collectShipping: boolean;
    collectPhone: boolean;
    allowQuantity: boolean;
    redirectUrl?: string;
    successMessage?: string;
  };

  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Payment Link Request
 */
export interface CreatePaymentLinkRequest {
  title: string;
  description?: string;
  amount: number;
  currency: string;
  expiresAt?: string | null;
  maxUses?: number | null;
  settings?: {
    collectShipping?: boolean;
    collectPhone?: boolean;
    allowQuantity?: boolean;
    redirectUrl?: string;
    successMessage?: string;
  };
  metadata?: Record<string, any>;
}

/**
 * Update Payment Link Request
 */
export interface UpdatePaymentLinkRequest {
  title?: string;
  description?: string;
  amount?: number;
  currency?: string;
  status?: "active" | "expired" | "disabled";
  expiresAt?: string | null;
  maxUses?: number | null;
  settings?: {
    collectShipping?: boolean;
    collectPhone?: boolean;
    allowQuantity?: boolean;
    redirectUrl?: string;
    successMessage?: string;
  };
  metadata?: Record<string, any>;
}

/**
 * Payment Link Stats
 */
export interface PaymentLinkStats {
  totalLinks: number;
  activeLinks: number;
  totalUses: number;
  totalRevenue: number;
  averageOrderValue: number;
  topPerformingLinks: Array<{
    id: string;
    title: string;
    revenue: number;
    uses: number;
  }>;
}

/**
 * Get all payment links for merchant
 * GET /api/payment-links
 */
export async function getPaymentLinks(params?: {
  status?: string;
  limit?: number;
  skip?: number;
}): Promise<{ paymentLinks: PaymentLink[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append("status", params.status);
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.skip) queryParams.append("skip", params.skip.toString());

  const url = `/payment-links${
    queryParams.toString() ? `?${queryParams}` : ""
  }`;
  const response = await api.get<{
    paymentLinks: PaymentLink[];
    total: number;
  }>(url);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment links");
  }

  return response.data;
}

/**
 * Get single payment link
 * GET /api/payment-links/:id
 */
export async function getPaymentLink(id: string): Promise<PaymentLink> {
  const response = await api.get<{ paymentLink: PaymentLink }>(
    `/payment-links/${id}`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment link");
  }

  return response.data.paymentLink;
}

/**
 * Get payment link by short code (public)
 * GET /api/payment-links/public/:shortCode
 */
export async function getPaymentLinkByCode(
  shortCode: string
): Promise<PaymentLink> {
  const response = await api.get<{ paymentLink: PaymentLink }>(
    `/payment-links/public/${shortCode}`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment link");
  }

  return response.data.paymentLink;
}

/**
 * Create payment link
 * POST /api/payment-links
 */
export async function createPaymentLink(
  data: CreatePaymentLinkRequest
): Promise<PaymentLink> {
  const response = await api.post<{ paymentLink: PaymentLink }>(
    "/payment-links",
    data
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to create payment link");
  }

  return response.data.paymentLink;
}

/**
 * Update payment link
 * PUT /api/payment-links/:id
 */
export async function updatePaymentLink(
  id: string,
  data: UpdatePaymentLinkRequest
): Promise<PaymentLink> {
  const response = await api.put<{ paymentLink: PaymentLink }>(
    `/payment-links/${id}`,
    data
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to update payment link");
  }

  return response.data.paymentLink;
}

/**
 * Delete payment link
 * DELETE /api/payment-links/:id
 */
export async function deletePaymentLink(id: string): Promise<void> {
  const response = await api.delete(`/payment-links/${id}`);

  if (response.status !== "success") {
    throw new Error(response.message || "Failed to delete payment link");
  }
}

/**
 * Disable payment link
 * POST /api/payment-links/:id/disable
 */
export async function disablePaymentLink(id: string): Promise<PaymentLink> {
  const response = await api.post<{ paymentLink: PaymentLink }>(
    `/payment-links/${id}/disable`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to disable payment link");
  }

  return response.data.paymentLink;
}

/**
 * Enable payment link
 * POST /api/payment-links/:id/enable
 */
export async function enablePaymentLink(id: string): Promise<PaymentLink> {
  const response = await api.post<{ paymentLink: PaymentLink }>(
    `/payment-links/${id}/enable`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to enable payment link");
  }

  return response.data.paymentLink;
}

/**
 * Get payment link statistics
 * GET /api/payment-links/stats
 */
export async function getPaymentLinkStats(): Promise<PaymentLinkStats> {
  const response = await api.get<{ stats: PaymentLinkStats }>(
    "/payment-links/stats"
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment link stats");
  }

  return response.data.stats;
}

/**
 * Generate QR code for payment link
 * GET /api/payment-links/:id/qr
 */
export async function getPaymentLinkQR(id: string): Promise<string> {
  const response = await api.get<{ qrCode: string }>(`/payment-links/${id}/qr`);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to generate QR code");
  }

  return response.data.qrCode;
}
