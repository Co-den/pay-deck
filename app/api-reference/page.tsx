"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Copy, Check } from "lucide-react";

const apiEndpoints = [
  {
    title: "Create Payment",
    method: "POST",
    endpoint: "/v1/transactions",
    description: "Create a new payment transaction",
    requestBody: JSON.stringify(
      {
        amount: 9999,
        currency: "NGN",
        customer_id: "cust_12345",
        payment_method: "card",
        description: "Order #12345",
      },
      null,
      2
    ),
    response: JSON.stringify(
      {
        id: "txn_abc123",
        amount: 9999,
        currency: "NGN",
        status: "succeeded",
        created_at: "2026-01-16T10:30:00Z",
      },
      null,
      2
    ),
  },
  {
    title: "Retrieve Transaction",
    method: "GET",
    endpoint: "/v1/transactions/{id}",
    description: "Get details of a specific transaction",
    requestBody: "",
    response: JSON.stringify(
      {
        id: "txn_abc123",
        amount: 9999,
        currency: "NGN",
        status: "succeeded",
        customer_id: "cust_12345",
        payment_method: "card",
        created_at: "2026-01-16T10:30:00Z",
        updated_at: "2026-01-16T10:30:15Z",
      },
      null,
      2
    ),
  },
  {
    title: "List Transactions",
    method: "GET",
    endpoint: "/v1/transactions?limit=10&offset=0",
    description: "Get a list of transactions with pagination",
    requestBody: "",
    response: JSON.stringify(
      {
        data: [
          {
            id: "txn_abc123",
            amount: 9999,
            currency: "NGN",
            status: "succeeded",
            created_at: "2026-01-16T10:30:00Z",
          },
        ],
        total: 1,
        limit: 10,
        offset: 0,
      },
      null,
      2
    ),
  },
  {
    title: "Process Refund",
    method: "POST",
    endpoint: "/v1/transactions/{id}/refund",
    description: "Refund a completed transaction",
    requestBody: JSON.stringify(
      {
        amount: 9999,
        reason: "customer_request",
      },
      null,
      2
    ),
    response: JSON.stringify(
      {
        id: "rfn_xyz789",
        transaction_id: "txn_abc123",
        amount: 9999,
        status: "succeeded",
        created_at: "2026-01-16T10:35:00Z",
      },
      null,
      2
    ),
  },
  {
    title: "Create Customer",
    method: "POST",
    endpoint: "/v1/customers",
    description: "Create a new customer record",
    requestBody: JSON.stringify(
      {
        email: "john@example.com",
        name: "John Doe",
        phone: "+234 xxx xxx xxxx",
        metadata: {
          tier: "gold",
        },
      },
      null,
      2
    ),
    response: JSON.stringify(
      {
        id: "cust_12345",
        email: "john@example.com",
        name: "John Doe",
        phone: "+234 xxx xxx xxxx",
        created_at: "2026-01-16T10:25:00Z",
      },
      null,
      2
    ),
  },
  {
    title: "Get Customer",
    method: "GET",
    endpoint: "/v1/customers/{id}",
    description: "Retrieve customer details",
    requestBody: "",
    response: JSON.stringify(
      {
        id: "cust_12345",
        email: "john@example.com",
        name: "John Doe",
        phone: "+234 xxx xxx xxxx",
        created_at: "2026-01-16T10:25:00Z",
        updated_at: "2026-01-16T10:30:00Z",
      },
      null,
      2
    ),
  },
];

interface CodeBlockProps {
  code: string;
  label: string;
}

function CodeBlock({ code, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded text-sm text-slate-300 hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default function APIReferencePage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const endpoint = apiEndpoints[selectedEndpoint];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              API Reference
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Complete documentation for the PayDeck REST API
            </p>
            <code className="bg-muted px-4 py-2 rounded text-sm">
              https://api.paydeck.io/v1
            </code>
          </div>

          {/* Authentication Info */}
          <div className="bg-card border border-border rounded-lg p-6 mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p className="text-muted-foreground mb-4">
              All API requests require authentication using your API key.
              Include your API key in the Authorization header:
            </p>
            <CodeBlock
              code="Authorization: Bearer YOUR_API_KEY"
              label="Authorization Header"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Endpoint List */}
            <div className="lg:col-span-3">
              <div className="sticky top-20 space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-4">
                  ENDPOINTS
                </h3>
                {apiEndpoints.map((ep, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEndpoint(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                      selectedEndpoint === index
                        ? "bg-purple-600 text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <div className="font-bold mb-1">{ep.method}</div>
                    <div className="text-xs opacity-75 truncate">
                      {ep.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint Details */}
            <div className="lg:col-span-9 space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded font-bold text-sm ${
                      endpoint.method === "POST"
                        ? "bg-blue-500/20 text-blue-400"
                        : endpoint.method === "GET"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="bg-muted px-3 py-1 rounded text-sm font-mono flex-1">
                    {endpoint.endpoint}
                  </code>
                </div>
                <h2 className="text-3xl font-bold mb-2">{endpoint.title}</h2>
                <p className="text-muted-foreground text-lg">
                  {endpoint.description}
                </p>
              </div>

              {/* Request Body */}
              {endpoint.requestBody && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Request Body</h3>
                  <CodeBlock code={endpoint.requestBody} label="JSON" />
                </div>
              )}

              {/* Response */}
              <div>
                <h3 className="text-xl font-bold mb-4">Response</h3>
                <CodeBlock code={endpoint.response} label="JSON" />
              </div>

              {/* Example cURL */}
              <div>
                <h3 className="text-xl font-bold mb-4">Example Request</h3>
                <CodeBlock
                  code={`curl -X ${endpoint.method} https://api.paydeck.io${
                    endpoint.endpoint
                  } \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"${
    endpoint.requestBody
      ? ` \\
  -d '${endpoint.requestBody.replace(/\n/g, " ")}'`
      : ""
  }`}
                  label="cURL"
                />
              </div>

              {/* SDK Examples */}
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our SDKs and libraries for easier integration in
                  your preferred language.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded text-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-muted rounded text-sm">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-muted rounded text-sm">
                    PHP
                  </span>
                  <span className="px-3 py-1 bg-muted rounded text-sm">
                    Ruby
                  </span>
                  <span className="px-3 py-1 bg-muted rounded text-sm">Go</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
