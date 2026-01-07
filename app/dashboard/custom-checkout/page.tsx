"use client"

import { useState, useEffect } from "react"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createPaymentIntent, confirmPayment, type PaymentRequest } from "@/lib/api/payments"

interface CustomCheckoutProps {
  amount: number
  currency: string
  customerData: {
    email: string
    name: string
    phone?: string
  }
  paymentLinkId?: string
  shortCode?: string
  metadata?: Record<string, any>
  onSuccess: () => void
  onError: (error: string) => void
}

// This component handles the payment form
function CheckoutForm({ 
  amount, 
  currency, 
  customerData, 
  paymentLinkId,
  shortCode,
  metadata,
  onSuccess, 
  onError 
}: CustomCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setErrorMessage(null)

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          receipt_email: customerData.email,
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm with backend
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          paymentLinkId,
          shortCode,
          customerData,
        })

        onSuccess()
      } else {
        throw new Error('Payment was not completed')
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      const message = error.message || 'Payment failed. Please try again.'
      setErrorMessage(message)
      onError(message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Element */}
      <div className="border rounded-lg p-4">
        <PaymentElement 
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || processing}
      >
        {processing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Pay {currency} {amount.toLocaleString()}
          </>
        )}
      </Button>

      {/* Security Notice */}
      <p className="text-xs text-center text-muted-foreground">
        Your payment information is encrypted and secure
      </p>
    </form>
  )
}

// Main component that wraps with Stripe Elements provider
export default function CustomCheckout(props: CustomCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [publishableKey, setPublishableKey] = useState<string | null>(null)
  const [stripePromise, setStripePromise] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializePayment()
  }, [])

  async function initializePayment() {
    try {
      setLoading(true)
      setError(null)

      // Create payment intent
      const paymentIntent = await createPaymentIntent({
        amount: props.amount,
        currency: props.currency,
        paymentMethod: 'card',
        customerData: props.customerData,
        paymentLinkId: props.paymentLinkId,
        shortCode: props.shortCode,
        metadata: props.metadata,
      })

      setClientSecret(paymentIntent.clientSecret)
      setPublishableKey(paymentIntent.publishableKey)

      // Initialize Stripe
      const stripe = await loadStripe(paymentIntent.publishableKey)
      setStripePromise(stripe)
    } catch (err: any) {
      console.error('Failed to initialize payment:', err)
      setError(err.message || 'Failed to initialize payment')
      props.onError(err.message || 'Failed to initialize payment')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Setting up secure payment...</p>
      </div>
    )
  }

  if (error || !clientSecret || !stripePromise) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error || 'Failed to initialize payment. Please try again.'}
        </AlertDescription>
      </Alert>
    )
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#22c55e',
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} />
    </Elements>
  )
}