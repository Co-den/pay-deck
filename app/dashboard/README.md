# PayDeck Merchant Dashboard

Complete, production-ready merchant dashboard for the PayDeck payment gateway. This is the merchant-facing interface that allows business owners to manage transactions, payment links, API keys, webhooks, and all payment operations.

## 🎯 What's Included

### Core Pages

1. **Dashboard** - Real-time analytics and overview
2. **Transactions** - View, search, filter, and manage all transactions
3. **Payment Links** - Create and manage shareable payment links
4. **Reports** - Detailed analytics with charts and insights
5. **API Keys** - Manage API keys with permissions
6. **Webhooks** - Configure and monitor webhook endpoints
7. **Payment Methods** - Configure card processing, wallets, crypto, bank transfers
8. **Settings** - Business profile, notifications, security, billing, account

### Customer-Facing Pages

9. **Checkout Page** - Beautiful hosted checkout with multiple payment methods

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Your PayDeck project already set up (if not, this is a standalone dashboard)

### Installation

1. **Copy the dashboard files to your Next.js project:**

```bash
# Create dashboard directory
mkdir -p app/dashboard

# Copy all page files
cp dashboard-page.tsx app/dashboard/page.tsx
cp transactions-page.tsx app/dashboard/transactions/page.tsx
cp payment-links-page.tsx app/dashboard/payment-links/page.tsx
cp reports-page.tsx app/dashboard/reports/page.tsx
cp api-keys-page.tsx app/dashboard/api-keys/page.tsx
cp webhooks-page.tsx app/dashboard/webhooks/page.tsx
cp payment-methods-page.tsx app/dashboard/payment-methods/page.tsx
cp settings-page.tsx app/dashboard/settings/page.tsx

# Copy layout
cp layout.tsx app/dashboard/layout.tsx

# Copy checkout (public-facing)
mkdir -p app/checkout
cp checkout-page.tsx app/checkout/[linkId]/page.tsx
```

2. **Install required dependencies:**

```bash
npm install @radix-ui/react-avatar \
  @radix-ui/react-dialog \
  @radix-ui/react-label \
  @radix-ui/react-radio-group \
  @radix-ui/react-select \
  @radix-ui/react-switch \
  @radix-ui/react-tabs
```

3. **Make sure you have shadcn/ui components:**

If you don't have shadcn/ui set up yet:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label textarea select switch dialog tabs badge avatar
```

4. **Start your development server:**

```bash
npm run dev
```

5. **Access the dashboard:**

```
http://localhost:3000/dashboard
```

## 📁 File Structure

```
app/
├── dashboard/
│   ├── layout.tsx                 # Dashboard layout with sidebar
│   ├── page.tsx                   # Main dashboard (analytics)
│   ├── transactions/
│   │   └── page.tsx              # Transactions list
│   ├── payment-links/
│   │   └── page.tsx              # Payment links management
│   ├── reports/
│   │   └── page.tsx              # Reports and analytics
│   ├── api-keys/
│   │   └── page.tsx              # API keys management
│   ├── webhooks/
│   │   └── page.tsx              # Webhooks management
│   ├── payment-methods/
│   │   └── page.tsx              # Payment methods config
│   └── settings/
│       └── page.tsx              # Settings (all tabs)
└── checkout/
    └── [linkId]/
        └── page.tsx              # Customer checkout page
```

## 🔌 Connecting to Your Backend

Currently, all pages use mock data for demonstration. To connect to your real PayDeck backend:

### 1. Create API Service

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function fetchTransactions(params?: any) {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  })
  return response.json()
}

// Add more API functions...
```

### 2. Update Pages to Use Real Data

```typescript
// Example: app/dashboard/transactions/page.tsx
import { fetchTransactions } from '@/lib/api'

export default async function TransactionsPage() {
  const transactions = await fetchTransactions()
  
  // ... rest of component
}
```

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

## 🎨 Features

### Dashboard (Main Page)
- Real-time revenue stats
- Transaction counts and trends
- Success rate monitoring
- Average order value
- Revenue chart (last 14 days)
- Payment methods breakdown
- Recent transactions list
- Quick access to create payment links

### Transactions Page
- Complete transaction list
- Search by customer, email, or transaction ID
- Filter by status (success, pending, failed, refunded)
- Transaction detail modal
- Process refunds
- Send receipts
- Export to CSV

### Payment Links Page
- Create new payment links
- Set amount, currency, description
- Configure expiration
- Track link performance (uses, revenue, success rate)
- Copy link, generate QR code
- Preview checkout page

### Checkout Page (Customer-Facing)
- Beautiful, responsive design
- Multiple payment methods:
  - Credit/Debit cards
  - Apple Pay / Google Pay
  - Bank transfers
  - Cryptocurrency
- Order summary
- Secure badges
- Success/failure screens

### API Keys Page
- Generate new API keys (test and live)
- Set permissions (read, write, refund, webhook)
- View usage statistics
- Rotate keys
- Show/hide full key
- Copy to clipboard

### Webhooks Page
- Add webhook endpoints
- Subscribe to events
- Test webhook delivery
- View delivery logs
- Monitor success rates
- View response times

### Payment Methods Page
- Enable/disable payment methods
- Configure Stripe integration
- Set up digital wallets
- Connect crypto providers
- Configure bank transfers
- View processing fees

### Settings Page
**Business Profile Tab:**
- Business information
- Contact details
- Bank account for payouts
- Payout schedule

**Notifications Tab:**
- Email preferences
- Event notifications
- Summary reports

**Security Tab:**
- Change password
- Two-factor authentication
- Login history

**Billing Tab:**
- Current plan details
- Payment method
- Billing history
- Usage statistics

**Account Tab:**
- Personal information
- Delete account

### Reports Page
- Revenue trends with charts
- Transaction analytics
- Customer metrics
- Payment method breakdown
- Top products/services
- Geographic distribution
- Export capabilities
- Date range filters

## 🎨 Customization

### Branding

Update colors in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      // ... customize colors
    },
  },
}
```

### Logo

Replace the "P" logo in the layout:

```tsx
// app/dashboard/layout.tsx
<div className="w-8 h-8 rounded-lg bg-green-500">
  <Image src="/logo.png" alt="Logo" />
</div>
```

## 🔐 Authentication

To add authentication:

### 1. Install NextAuth

```bash
npm install next-auth
```

### 2. Protect Dashboard Routes

```typescript
// app/dashboard/layout.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // ... rest of layout
}
```

### 3. Add Login Page

```typescript
// app/login/page.tsx
// Add your login form
```

## 📊 Mock Data vs Real Data

Currently using mock data for demonstration. Here's how to identify what needs to be connected:

**Look for comments like:**
```typescript
// Mock data - in production, fetch from API
const transactions = [...]
```

**Replace with:**
```typescript
const transactions = await fetchTransactions()
```

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

### Environment Variables

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_STRIPE_KEY`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`

## 🧪 Testing

### Test Cards (Stripe)

```
Success: 4242 4242 4242 4242
Declined: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
```

### Test API Keys

Use test mode keys for development:
```
pk_test_...  # Test publishable key
sk_test_...  # Test secret key
```

## 📝 Next Steps

### Essential Integrations

1. **Connect to Backend**
   - Replace mock data with real API calls
   - Set up authentication
   - Configure environment variables

2. **Payment Provider Setup**
   - Stripe integration for cards
   - Coinbase Commerce for crypto
   - Plaid for bank transfers

3. **Email Service**
   - SendGrid or AWS SES
   - Receipt templates
   - Notification emails

4. **Analytics**
   - Google Analytics
   - Mixpanel or Amplitude
   - Custom event tracking

### Optional Enhancements

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced filtering
- [ ] Bulk actions
- [ ] Custom reports builder
- [ ] Team member access
- [ ] Role-based permissions
- [ ] Audit logs
- [ ] Customer portal
- [ ] Mobile app

## 🆘 Support

### Common Issues

**Issue: Components not found**
```bash
npx shadcn-ui@latest add [component-name]
```

**Issue: Styles not loading**
```bash
# Make sure Tailwind is configured
npm install -D tailwindcss postcss autoprefixer
```

**Issue: Icons not showing**
```bash
npm install lucide-react
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [PayDeck API Docs](./API_DOCS.md)

## 🎯 Production Checklist

Before going live:

- [ ] Replace all mock data with real API calls
- [ ] Add authentication (NextAuth or similar)
- [ ] Set up environment variables
- [ ] Configure payment providers
- [ ] Test all payment flows
- [ ] Enable 2FA
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure analytics
- [ ] Test on mobile devices
- [ ] Security audit
- [ ] Load testing
- [ ] Backup strategy
- [ ] SSL certificates
- [ ] Error tracking
- [ ] Rate limiting
- [ ] GDPR compliance

## 🎨 Screenshots

### Dashboard
Clean, modern interface with real-time stats and charts

### Transactions
Powerful filtering and search with detailed transaction views

### Payment Links
Easy-to-create payment links with QR codes and analytics

### Checkout
Beautiful customer-facing checkout with multiple payment methods

## 🤝 Contributing

This dashboard is designed to work with the PayDeck backend. To contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - feel free to use this in your projects!

## 🙏 Credits

Built with:
- [Next.js 14](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Ready to accept payments? Let's go! 🚀**
