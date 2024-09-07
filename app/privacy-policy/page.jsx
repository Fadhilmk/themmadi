import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Privacy Policy</h1>
        <p className="mb-4">*Effective Date: [Insert Date]*</p>
        
        <p className="mb-4">
          At MaaDiy (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;), we respect your privacy and are committed to protecting the personal information of both our users (business owners) and their customers. This Privacy Policy outlines how we collect, use, share, and protect the information collected on our marketing platform, where business owners can send direct messages to their customers&apos; phones and track analytics like open rates, click-through rates, and more.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">1. Information We Collect</h2>

        <h3 className="text-xl font-bold mb-2">a. For Business Owners</h3>
        <div className="mb-4">
          When you sign up for our platform, we may collect:
          <ul className="list-disc pl-8 mt-2">
            <li><strong>Personal Information</strong>: Name, email address, business details, phone number, and payment information.</li>
            <li><strong>Account Data</strong>: Login credentials, user preferences, and any other details related to your account.</li>
            <li><strong>Communication Data</strong>: Messages you send to your customers via our platform.</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold mb-2">b. For Customers of Business Owners</h3>
        <div className="mb-4">
          We may collect information provided by business owners about their customers:
          <ul className="list-disc pl-8 mt-2">
            <li><strong>Customer Contact Information</strong>: Phone numbers or any other contact details necessary to send direct messages.</li>
            <li><strong>Interaction Data</strong>: Information about whether the customer received, opened, clicked, or responded to a message.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">2. How We Use the Information</h2>
        <div className="mb-4">
          We may use the information collected for the following purposes:
          <ul className="list-disc pl-8 mt-2">
            <li>To provide business owners with messaging services and analytics (open rates, click-through rates, etc.).</li>
            <li>To ensure the delivery of messages to the intended customers.</li>
            <li>To offer insights and reporting on the performance of marketing campaigns.</li>
            <li>To improve our platform and develop new features.</li>
            <li>To communicate with users regarding updates, support, and other administrative purposes.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">3. Sharing of Information</h2>
        <div className="mb-4">
          We do <strong>not</strong> sell or share personal information with third parties for marketing purposes. We may share information only:
          <ul className="list-disc pl-8 mt-2">
            <li>With service providers who assist in delivering our platform&apos;s services (e.g., hosting, payment processing), under strict confidentiality agreements.</li>
            <li>To comply with legal obligations, protect our rights, or respond to legal claims.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect the personal information we collect from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">5. User Rights</h2>
        <div className="mb-4">
          As a business owner using our platform, you have the right to:
          <ul className="list-disc pl-8 mt-2">
            <li>Access and update your personal information in your account settings.</li>
            <li>Request deletion of your account and associated data (subject to legal obligations).</li>
            <li>Opt-out of marketing communications from us at any time.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">6. Customer Data Protection</h2>
        <p className="mb-4">
          Business owners are responsible for ensuring that their customers&apos; personal information is collected and used in accordance with applicable data protection laws. MaaDiy only processes customer data on behalf of the business owners for the purposes of delivering our services.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">7. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We may use cookies and similar technologies to improve user experience, analyze platform usage, and offer personalized content. Users can control cookie settings through their browser.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">8. Changes to this Privacy Policy</h2>
        <p className="mb-4">
          We reserve the right to update this Privacy Policy at any time. If we make significant changes, we will notify you through our platform or via email.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-blue-500">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4"><strong>Email</strong>: TherahmanEffect@gmail.com</p>
      </div>
      <Footer />
    </div>
  );
}