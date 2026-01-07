"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setError("No session ID provided");
      setLoading(false);
    }
  }, [sessionId]);

  async function verifyPayment(sessionId: string) {
    try {
      // In production, verify the session with your backend
      // For now, simulate verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock payment details
      setPaymentDetails({
        amount: 100,
        currency: 'USD',
        status: 'succeeded',
        customerEmail: 'customer@example.com',
      });
    } catch (err: any) {
      setError(err.message || "Failed to verify payment");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Payment Verification Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {error || "Unable to verify payment status."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground mb-4">
            Your payment has been processed successfully.
          </p>
          <div className="p-4 bg-muted rounded-lg mb-4">
            <p className="text-sm text-muted-foreground">Amount Paid</p>
            <p className="text-2xl font-bold">
              {paymentDetails.currency} {paymentDetails.amount.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to {paymentDetails.customerEmail}
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}