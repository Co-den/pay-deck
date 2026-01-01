// lib/api/apiKeys.ts
/**
 * API Keys Service
 * Handles all API key operations matching the backend controller structure
 */

import { api, type ApiResponse } from "./client";

/**
 * API Key interface matching backend model
 */
export interface ApiKey {
  id: string;
  _id?: string;
  name: string;
  keyPrefix: string;
  type: "test" | "live";
  permissions: string[];
  isActive: boolean;
  usageCount: number;
  lastUsed: string | null;
  expiresAt: string | null;
  ipWhitelist: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Create API Key Request
 */
export interface CreateApiKeyRequest {
  name: string;
  type: "test" | "live";
  permissions?: string[];
  expiresIn?: number;
}

/**
 * Create API Key Response from backend
 */
export interface CreateApiKeyResponse {
  key: string;
  apiKey: {
    id: string;
    name: string;
    keyPrefix: string;
    type: "test" | "live";
    permissions: string[];
    expiresAt: string | null;
    createdAt: string;
  };
}

/**
 * Update API Key Request
 */
export interface UpdateApiKeyRequest {
  name?: string;
  permissions?: string[];
  isActive?: boolean;
  ipWhitelist?: string[];
}

/**
 * Create new API key
 * POST /api/keys
 */
export async function createApiKey(
  data: CreateApiKeyRequest
): Promise<CreateApiKeyResponse> {
  const response = await api.post<CreateApiKeyResponse>("/keys", data);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to create API key");
  }

  return response.data;
}

/**
 * Get all API keys for the authenticated merchant
 * GET /api/keys
 */
export async function getApiKeys(): Promise<ApiKey[]> {
  const response = await api.get<{ apiKeys: ApiKey[] }>("/keys");

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch API keys");
  }

  return response.data.apiKeys;
}

/**
 * Get single API key by ID
 * GET /api/keys/:id
 */
export async function getApiKey(id: string): Promise<ApiKey> {
  const response = await api.get<{ apiKey: ApiKey }>(`/keys/${id}`);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to fetch API key");
  }

  return response.data.apiKey;
}

/**
 * Update API key
 * PUT /api/keys/:id
 */
export async function updateApiKey(
  id: string,
  data: UpdateApiKeyRequest
): Promise<ApiKey> {
  const response = await api.put<{ apiKey: ApiKey }>(`/keys/${id}`, data);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to update API key");
  }

  return response.data.apiKey;
}

/**
 * Delete API key
 * DELETE /api/keys/:id
 */
export async function deleteApiKey(id: string): Promise<void> {
  const response = await api.delete(`/keys/${id}`);

  if (response.status !== "success") {
    throw new Error(response.message || "Failed to delete API key");
  }
}

/**
 * Rotate API key (generates new key, invalidates old one)
 * POST /api/keys/:id/rotate
 */
export async function rotateApiKey(id: string): Promise<CreateApiKeyResponse> {
  const response = await api.post<CreateApiKeyResponse>(`/keys/${id}/rotate`);

  if (response.status !== "success" || !response.data) {
    throw new Error(response.message || "Failed to rotate API key");
  }

  return response.data;
}
