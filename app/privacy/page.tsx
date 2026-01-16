import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="container max-w-3xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              How we collect, use, and protect your information
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                PayPort ("we", "us", "our") operates the PayPort website and
                service. This page informs you of our policies regarding the
                collection, use, and disclosure of personal data when you use
                our service and the choices you have associated with that data.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                2. Information Collection and Use
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect several different types of information for various
                purposes to provide and improve our service to you.
              </p>
              <h3 className="text-xl font-bold mt-4 mb-3">
                Types of Data Collected:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Personal identification information (name, email address,
                  phone number, etc.)
                </li>
                <li>
                  Business information (business name, RC number, NIN, Tax ID)
                </li>
                <li>
                  Payment information (processed securely through our payment
                  gateway)
                </li>
                <li>Device information (IP address, browser type, etc.)</li>
                <li>Usage data (pages visited, time spent, etc.)</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">3. Use of Data</h2>
              <p className="text-muted-foreground mb-4">
                PayPort uses the collected data for various purposes including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our service</li>
                <li>To process payments and transactions</li>
                <li>
                  To verify business credentials and comply with regulatory
                  requirements
                </li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>
                  To gather analysis or valuable information to improve our
                  service
                </li>
                <li>To monitor the usage of our service</li>
                <li>
                  To detect, prevent and address technical issues and fraudulent
                  activities
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">4. Data Protection</h2>
              <p className="text-muted-foreground mb-4">
                We implement various security measures to maintain the safety of
                your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure SSL/TLS connections for all data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal information</li>
                <li>Two-factor authentication options</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">5. Security of Data</h2>
              <p className="text-muted-foreground">
                The security of your data is important to us, but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy. We
                will retain and use your information to the extent necessary to
                comply with our legal obligations, resolve disputes, and enforce
                our policies.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                8. Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                We may employ third-party companies and individuals to
                facilitate our service, provide service-related services, or
                assist us in analyzing how our service is used. These third
                parties have access to your personal data only to perform these
                tasks on our behalf and are obligated not to disclose or use it
                for any other purpose.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date at the bottom of
                this Privacy Policy. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li>Email: privacy@PayPort.io</li>
                <li>Support: support@PayPort.io</li>
              </ul>
            </div>

            <div className="text-center pt-8 pb-4">
              <p className="text-sm text-muted-foreground">
                Last updated: January 16, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
