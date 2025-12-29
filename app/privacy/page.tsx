import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                PayDeck ("we", "us", "our") operates the PayDeck website and service. This page informs you of our
                policies regarding the collection, use, and disclosure of personal data when you use our service and the
                choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Information Collection and Use</h2>
              <p className="text-muted-foreground">
                We collect several different types of information for various purposes to provide and improve our
                service to you.
              </p>
              <h3 className="text-xl font-bold mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Payment information (processed securely through our payment gateway)</li>
                <li>Device information (IP address, browser type, etc.)</li>
                <li>Usage data (pages visited, time spent, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Use of Data</h2>
              <p className="text-muted-foreground">PayDeck uses the collected data for various purposes including:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Security of Data</h2>
              <p className="text-muted-foreground">
                The security of your data is important to us, but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the bottom of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@paydeck.io
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-12">Last updated: December 28, 2024</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
