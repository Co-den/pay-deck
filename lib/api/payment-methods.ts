// lib/api/paymentMethods.ts
/**
 * Payment Methods Service
 * Handles payment method configuration and management
 */

import { api, type ApiResponse } from "./client";

/**
 * Payment Method Configuration
 */
export interface PaymentMethod {
  id: string;
  _id?: string;
  name: string;
  type: "card" | "bank_transfer" | "ussd" | "mobile_money" | "crypto";
  provider: string;
  description: string;
  enabled: boolean;
  isActive: boolean;
  setupComplete: boolean;
  configuration: {
    publicKey?: string;
    secretKey?: string;
    merchantId?: string;
    apiKey?: string;
    webhookUrl?: string;
    testMode?: boolean;
    [key: string]: any;
  };
  fees: {
    percentage: number;
    fixedAmount?: number;
    cap?: number;
  };
  limits: {
    min: number;
    max: number;
  };
  supportedCurrencies: string[];
  supportedCountries: string[];
  settlementPeriod: string;
  features: string[];
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payment Method Stats
 */
export interface PaymentMethodStats {
  totalMethods: number;
  activeMethods: number;
  transactionsLast30Days: {
    [methodId: string]: {
      count: number;
      volume: number;
      successRate: number;
    };
  };
  averageFee: number;
}

/**
 * Update Payment Method Request
 */
export interface UpdatePaymentMethodRequest {
  enabled?: boolean;
  configuration?: Record<string, any>;
  fees?: {
    percentage?: number;
    fixedAmount?: number;
    cap?: number;
  };
  limits?: {
    min?: number;
    max?: number;
  };
}

/**
 * Get all payment methods for merchant
 * GET /api/payment-methods
 */
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const response = await api.get<{ paymentMethods: PaymentMethod[] }>(
    "/payment-methods"
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment methods");
  }

  return response.data.paymentMethods;
}

/**
 * Get single payment method
 * GET /api/payment-methods/:id
 */
export async function getPaymentMethod(id: string): Promise<PaymentMethod> {
  const response = await api.get<{ paymentMethod: PaymentMethod }>(
    `/payment-methods/${id}`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment method");
  }

  return response.data.paymentMethod;
}

/**
 * Update payment method configuration
 * PUT /api/payment-methods/:id
 */
export async function updatePaymentMethod(
  id: string,
  data: UpdatePaymentMethodRequest
): Promise<PaymentMethod> {
  const response = await api.put<{ paymentMethod: PaymentMethod }>(
    `/payment-methods/${id}`,
    data
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to update payment method");
  }

  return response.data.paymentMethod;
}

/**
 * Enable payment method
 * POST /api/payment-methods/:id/enable
 */
export async function enablePaymentMethod(id: string): Promise<PaymentMethod> {
  const response = await api.post<{ paymentMethod: PaymentMethod }>(
    `/payment-methods/${id}/enable`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to enable payment method");
  }

  return response.data.paymentMethod;
}

/**
 * Disable payment method
 * POST /api/payment-methods/:id/disable
 */
export async function disablePaymentMethod(id: string): Promise<PaymentMethod> {
  const response = await api.post<{ paymentMethod: PaymentMethod }>(
    `/payment-methods/${id}/disable`
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to disable payment method");
  }

  return response.data.paymentMethod;
}

/**
 * Test payment method configuration
 * POST /api/payment-methods/:id/test
 */
export async function testPaymentMethod(id: string): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  const response = await api.post<{
    success: boolean;
    message: string;
    details?: any;
  }>(`/payment-methods/${id}/test`);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to test payment method");
  }

  return response.data;
}

/**
 * Get payment method statistics
 * GET /api/payment-methods/stats
 */
export async function getPaymentMethodStats(): Promise<PaymentMethodStats> {
  const response = await api.get<{ stats: PaymentMethodStats }>(
    "/payment-methods/stats"
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch payment method stats");
  }

  return response.data.stats;
}

/**
 * Initialize default payment methods for merchant
 * POST /api/payment-methods/initialize
 */
export async function initializePaymentMethods(): Promise<PaymentMethod[]> {
  const response = await api.post<{ paymentMethods: PaymentMethod[] }>(
    "/payment-methods/initialize"
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to initialize payment methods");
  }

  return response.data.paymentMethods;
}
