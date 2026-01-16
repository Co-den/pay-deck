"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Code, BookOpen, Zap, Shield } from "lucide-react";

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    items: [
      { title: "Introduction", id: "introduction" },
      { title: "Installation", id: "installation" },
      { title: "Authentication", id: "authentication" },
    ],
  },
  {
    id: "integration",
    title: "Integration",
    icon: Code,
    items: [
      { title: "API Overview", id: "api-overview" },
      { title: "REST API", id: "rest-api" },
      { title: "Webhooks", id: "webhooks" },
      { title: "SDKs", id: "sdks" },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    icon: BookOpen,
    items: [
      { title: "Payment Methods", id: "payment-methods" },
      { title: "Error Handling", id: "error-handling" },
      { title: "Testing", id: "testing" },
      { title: "Deployment", id: "deployment" },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    items: [
      { title: "Best Practices", id: "best-practices" },
      { title: "PCI Compliance", id: "pci-compliance" },
      { title: "Data Protection", id: "data-protection" },
    ],
  },
];

const contentMap: Record<string, { title: string; content: string }> = {
  introduction: {
    title: "Introduction to PayPort",
    content: `PayPort is a modern payment gateway designed for merchants who want to accept payments globally with ease and security. Our platform supports multiple payment methods and provides comprehensive tools for managing transactions.

Key Features:
- Accept payments from 190+ countries
- Support for 25+ payment methods
- Real-time transaction monitoring
- Advanced fraud detection
- Webhook notifications for real-time updates
- Comprehensive API documentation`,
  },
  installation: {
    title: "Installation & Setup",
    content: `Getting started with PayPort is simple:

1. Create your account at PayPort
2. Navigate to your dashboard
3. Generate API keys in Settings > API Keys
4. Use your Live or Test API key depending on your environment
5. Install our SDK: npm install PayPort-sdk
6. Initialize the SDK with your API key

Your test environment is ready to use immediately with our sandbox mode.`,
  },
  authentication: {
    title: "Authentication",
    content: `All API requests require authentication using your API key or OAuth token.

API Key Authentication:
- Include your API key in the Authorization header: Bearer YOUR_API_KEY
- Keep your API key secure and never expose it in client-side code

OAuth:
- Use OAuth for user-specific operations
- Follow the OAuth 2.0 authorization code flow
- Store tokens securely on your server`,
  },
  "api-overview": {
    title: "API Overview",
    content: `PayPort API is built on REST principles and returns JSON responses. All API endpoints support standard HTTP methods (GET, POST, PUT, DELETE).

Base URL: https://api.payport.io/v1

Rate Limits:
- Standard: 1000 requests per minute
- Enterprise: Custom limits

Response Format:
- Successful responses return HTTP 200-299
- Error responses return 4xx or 5xx with error details
- All timestamps are in UTC ISO 8601 format`,
  },
  "rest-api": {
    title: "REST API Reference",
    content: `The PayPort REST API provides endpoints for:

Transactions:
- POST /transactions - Create a payment
- GET /transactions/{id} - Retrieve transaction details
- GET /transactions - List all transactions
- POST /transactions/{id}/refund - Process a refund

Customers:
- POST /customers - Create a customer
- GET /customers/{id} - Retrieve customer
- PUT /customers/{id} - Update customer
- DELETE /customers/{id} - Delete customer

All endpoints require authentication and return JSON.`,
  },
  webhooks: {
    title: "Webhooks",
    content: `Webhooks allow you to receive real-time notifications about events in your PayPort account.

Webhook Events:
- transaction.created
- transaction.completed
- transaction.failed
- transaction.refunded
- customer.created
- customer.deleted

Setup:
1. Navigate to Settings > Webhooks
2. Add your webhook URL
3. Select events to subscribe to
4. Verify webhook signatures using HMAC SHA256

PayPort will retry failed deliveries for up to 3 days.`,
  },
  sdks: {
    title: "SDKs",
    content: `Official SDKs are available for popular languages:

JavaScript/Node.js:
npm install PayPort-sdk

Python:
pip install PayPort

Go:
go get github.com/PayPort/PayPort-go

Ruby:
gem install PayPort

All SDKs handle authentication, serialization, and error handling automatically.`,
  },
  "payment-methods": {
    title: "Payment Methods",
    content: `PayPort supports multiple payment methods globally:

Cards:
- Visa, Mastercard, American Express
- 3D Secure support
- Tokenization for recurring payments

Digital Wallets:
- Apple Pay
- Google Pay
- PayPal

Bank Transfers:
- ACH (US)
- SEPA (EU)
- Local bank transfer methods

Local Methods:
- Regional payment methods for 50+ countries
- Alipay, WeChat Pay, iDEAL, Bancontact, and more`,
  },
  "error-handling": {
    title: "Error Handling",
    content: `All API errors follow a standard format:

{
  "error": {
    "code": "INVALID_AMOUNT",
    "message": "Amount must be greater than 0",
    "type": "validation_error",
    "details": {
      "field": "amount",
      "reason": "minimum_value"
    }
  }
}

Common Error Codes:
- INVALID_AMOUNT: Transaction amount is invalid
- INVALID_CURRENCY: Currency code not supported
- INSUFFICIENT_FUNDS: Customer has insufficient funds
- FRAUD_DETECTED: Transaction flagged by fraud detection`,
  },
  testing: {
    title: "Testing",
    content: `Use test mode to safely develop and test your integration:

Test Card Numbers:
- Visa: 4242 4242 4242 4242
- Mastercard: 5555 5555 5555 4444
- Amex: 3782 822463 10005

Test API:
- Base URL: https://sandbox-api.PayPort.io/v1
- Use your test API key from dashboard

All transactions in test mode are simulated and won't charge actual accounts.`,
  },
  deployment: {
    title: "Deployment",
    content: `Best practices for deploying your PayPort integration:

1. Secure your API keys:
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. Use webhooks:
   - Listen for payment events
   - Don't rely on client-side confirmation

3. Implement retry logic:
   - Handle network timeouts
   - Implement exponential backoff

4. Monitor your integration:
   - Track API response times
   - Monitor error rates
   - Set up alerts for failures`,
  },
  "best-practices": {
    title: "Security Best Practices",
    content: `Ensure your PayPort integration is secure:

1. Use HTTPS everywhere
2. Validate all user inputs
3. Never log sensitive data
4. Use webhooks for confirmations
5. Implement rate limiting
6. Keep your SDK updated
7. Use test mode for development
8. Store API keys securely
9. Monitor suspicious activities
10. Follow PCI DSS guidelines`,
  },
  "pci-compliance": {
    title: "PCI DSS Compliance",
    content: `PayPort is PCI DSS Level 1 compliant, meaning you can accept payments safely.

Your Responsibilities:
- Never transmit raw card data to your servers
- Use our tokenization for recurring payments
- Implement secure communication (HTTPS)
- Monitor and log access to payment data
- Conduct regular security assessments

PayPort handles:
- Card data encryption
- Secure storage and processing
- PCI compliance audits
- Fraud detection and prevention`,
  },
  "data-protection": {
    title: "Data Protection",
    content: `PayPort implements comprehensive data protection measures:

Encryption:
- AES-256 for data at rest
- TLS 1.2+ for data in transit
- Key rotation every 90 days

Access Control:
- Role-based access control (RBAC)
- Multi-factor authentication
- Audit logging

Compliance:
- GDPR compliant
- SOC 2 Type II certified
- ISO 27001 certified`,
  },
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const currentContent = contentMap[activeSection] || contentMap.introduction;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container-centered py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to integrate PayPort into your application
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-8">
                {docSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="w-5 h-5 text-purple-500" />
                        <h3 className="font-semibold text-sm">
                          {section.title}
                        </h3>
                      </div>
                      <nav className="space-y-2">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                              activeSection === item.id
                                ? "bg-purple-500 text-primary-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </nav>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-4">
                  {currentContent.title}
                </h2>
                <div className="text-base leading-relaxed whitespace-pre-wrap text-muted-foreground bg-card p-6 rounded-lg border border-border">
                  {currentContent.content}
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
