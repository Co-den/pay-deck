// lib/api/payments.ts
/**
 * Payments Service
 * Handles payment processing with custom checkout
 */

import { api, type ApiResponse } from "./client";

/**
 * Payment Request
 */
export interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  customerData: {
    email: string;
    name: string;
    phone?: string;
  };
  paymentLinkId?: string;
  shortCode?: string;
  metadata?: Record<string, any>;
}

/**
 * Payment Intent Response
 */
export interface PaymentIntentResponse {
  clientSecret: string;
  transactionId: string;
  amount: number;
  currency: string;
  publishableKey: string;
}

/**
 * Payment Response
 */
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  redirectUrl?: string;
  message?: string;
  error?: string;
}

/**
 * Create Payment Intent (for card payments)
 * POST /api/payments/create-intent
 */
export async function createPaymentIntent(
  data: PaymentRequest
): Promise<PaymentIntentResponse> {
  const response = await api.post<{ paymentIntent: PaymentIntentResponse }>(
    "/payments/create-intent",
    data
  );

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to create payment intent");
  }

  return response.data.paymentIntent;
}

/**
 * Confirm Payment (after Stripe Elements processed)
 * POST /api/payments/confirm
 */
export async function confirmPayment(data: {
  paymentIntentId: string;
  paymentLinkId?: string;
  shortCode?: string;
  customerData: {
    email: string;
    name: string;
    phone?: string;
  };
}): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>("/payments/confirm", data);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to confirm payment");
  }

  return response.data;
}
