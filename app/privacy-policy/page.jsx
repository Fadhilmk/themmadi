// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";

// export default function PrivacyPolicy() {
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-8">
//         <h1 className="text-4xl font-bold mb-6 text-blue-500">Privacy Policy</h1>
//         <p className="mb-4">*Effective Date: [Insert Date]*</p>
        
//         <p className="mb-4">
//           At MaaDiy (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;), we respect your privacy and are committed to protecting the personal information of both our users (business owners) and their customers. This Privacy Policy outlines how we collect, use, share, and protect the information collected on our marketing platform, where business owners can send direct messages to their customers&apos; phones and track analytics like open rates, click-through rates, and more.
//         </p>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">1. Information We Collect</h2>

//         <h3 className="text-xl font-bold mb-2">a. For Business Owners</h3>
//         <div className="mb-4">
//           When you sign up for our platform, we may collect:
//           <ul className="list-disc pl-8 mt-2">
//             <li><strong>Personal Information</strong>: Name, email address, business details, phone number, and payment information.</li>
//             <li><strong>Account Data</strong>: Login credentials, user preferences, and any other details related to your account.</li>
//             <li><strong>Communication Data</strong>: Messages you send to your customers via our platform.</li>
//           </ul>
//         </div>

//         <h3 className="text-xl font-bold mb-2">b. For Customers of Business Owners</h3>
//         <div className="mb-4">
//           We may collect information provided by business owners about their customers:
//           <ul className="list-disc pl-8 mt-2">
//             <li><strong>Customer Contact Information</strong>: Phone numbers or any other contact details necessary to send direct messages.</li>
//             <li><strong>Interaction Data</strong>: Information about whether the customer received, opened, clicked, or responded to a message.</li>
//           </ul>
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">2. How We Use the Information</h2>
//         <div className="mb-4">
//           We may use the information collected for the following purposes:
//           <ul className="list-disc pl-8 mt-2">
//             <li>To provide business owners with messaging services and analytics (open rates, click-through rates, etc.).</li>
//             <li>To ensure the delivery of messages to the intended customers.</li>
//             <li>To offer insights and reporting on the performance of marketing campaigns.</li>
//             <li>To improve our platform and develop new features.</li>
//             <li>To communicate with users regarding updates, support, and other administrative purposes.</li>
//           </ul>
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">3. Sharing of Information</h2>
//         <div className="mb-4">
//           We do <strong>not</strong> sell or share personal information with third parties for marketing purposes. We may share information only:
//           <ul className="list-disc pl-8 mt-2">
//             <li>With service providers who assist in delivering our platform&apos;s services (e.g., hosting, payment processing), under strict confidentiality agreements.</li>
//             <li>To comply with legal obligations, protect our rights, or respond to legal claims.</li>
//           </ul>
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">4. Data Security</h2>
//         <p className="mb-4">
//           We implement appropriate technical and organizational measures to protect the personal information we collect from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
//         </p>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">5. User Rights</h2>
//         <div className="mb-4">
//           As a business owner using our platform, you have the right to:
//           <ul className="list-disc pl-8 mt-2">
//             <li>Access and update your personal information in your account settings.</li>
//             <li>Request deletion of your account and associated data (subject to legal obligations).</li>
//             <li>Opt-out of marketing communications from us at any time.</li>
//           </ul>
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">6. Customer Data Protection</h2>
//         <p className="mb-4">
//           Business owners are responsible for ensuring that their customers&apos; personal information is collected and used in accordance with applicable data protection laws. MaaDiy only processes customer data on behalf of the business owners for the purposes of delivering our services.
//         </p>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">7. Cookies and Tracking Technologies</h2>
//         <p className="mb-4">
//           We may use cookies and similar technologies to improve user experience, analyze platform usage, and offer personalized content. Users can control cookie settings through their browser.
//         </p>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">8. Changes to this Privacy Policy</h2>
//         <p className="mb-4">
//           We reserve the right to update this Privacy Policy at any time. If we make significant changes, we will notify you through our platform or via email.
//         </p>

//         <h2 className="text-2xl font-bold mb-4 text-blue-500">9. Contact Us</h2>
//         <p className="mb-4">
//           If you have any questions or concerns about this Privacy Policy, please contact us at:
//         </p>
//         <p className="mb-4"><strong>Email</strong>: TherahmanEffect@gmail.com</p>
//       </div>
//       <Footer />
//     </div>
//   );
// }


import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Privacy Policy</h1>
        <p className="mb-4"><em>Effective Date: [Insert Date]</em></p>

        {/* Introduction */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">I. Introduction</h2>
        <p className="mb-4">
          At MaaDiy (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;), we operate [Your Website/Platform] and are committed to protecting the privacy and personal data of our users. This Privacy Policy outlines how we collect, use, share, and protect your data. By using our platform, you agree to the terms outlined in this policy.
        </p>
        
        {/* Data Collection */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">II. Data Collection</h2>
        <h3 className="text-xl font-bold mb-2">1. Types of Data Collected</h3>
        <p className="mb-4">
          We may collect the following types of data from users and their customers:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Personal Information: Name, email address, phone number, and business details.</li>
          <li>Account Information: Login credentials, user preferences, and account settings.</li>
          <li>Communication Data: Messages sent to customers, including message analytics (open rates, click-through rates).</li>
          <li>Technical Data: IP addresses, browser type, and device information collected via cookies or other tracking technologies.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">2. Methods of Data Collection</h3>
        <p className="mb-4">
          Data is collected through various methods, including:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Forms filled out by users during account creation and message composition.</li>
          <li>Cookies and tracking technologies that monitor platform usage and interactions.</li>
          <li>Direct interactions via our platform, such as sending messages and analytics tracking.</li>
        </ul>

        {/* Data Use */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">III. Data Use</h2>
        <h3 className="text-xl font-bold mb-2">1. How We Use Data</h3>
        <p className="mb-4">
          The data we collect is used to:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Provide and improve our services, such as message delivery and analytics reporting.</li>
          <li>Ensure compliance with messaging regulations and data protection standards.</li>
          <li>Offer personalized services and platform improvements based on user feedback and usage data.</li>
          <li>Communicate with users regarding updates, support, and administrative matters.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">2. Data Sharing</h3>
        <p className="mb-4">
          We do <strong>not</strong> sell or share personal data with third parties for marketing purposes. We may share data with:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Service providers that assist in delivering our platform&apos;s services, such as hosting, payment processing, and analytics, under strict confidentiality agreements.</li>
          <li>Legal authorities when required to comply with legal obligations or protect our rights.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">3. Data Retention</h3>
        <p className="mb-4">
          We retain personal data for as long as necessary to provide services or comply with legal obligations. Upon termination of services, data is deleted or anonymized in accordance with legal and operational requirements.
        </p>

        {/* Data Protection */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">IV. Data Protection</h2>
        <h3 className="text-xl font-bold mb-2">1. Security Measures</h3>
        <p className="mb-4">
          We implement robust security measures, including encryption, access control, and regular security audits, to safeguard personal data against unauthorized access, alteration, or disclosure.
        </p>

        <h3 className="text-xl font-bold mb-2">2. Data Breach Notifications</h3>
        <p className="mb-4">
          In the event of a data breach, we will notify affected users promptly and follow applicable laws regarding breach notifications.
        </p>

        <h3 className="text-xl font-bold mb-2">3. Compliance with Data Protection Laws</h3>
        <p className="mb-4">
          We comply with relevant data protection regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
        </p>

        {/* User Rights */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">V. User Rights</h2>
        <p className="mb-4">
          Users have the following rights regarding their personal data:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Right to access, correct, or delete personal data through account settings or by contacting us.</li>
          <li>Right to opt-out of non-essential data collection and communications.</li>
          <li>Right to request a copy of the data we hold about you.</li>
        </ul>

        {/* Cookies and Tracking */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">VI. Cookies and Tracking Technologies</h2>
        <h3 className="text-xl font-bold mb-2">1. Types of Cookies Used</h3>
        <p className="mb-4">
          We use session cookies, persistent cookies, and other tracking technologies to enhance user experience and monitor platform usage. Users can control cookie preferences through their browser settings.
        </p>

        <h3 className="text-xl font-bold mb-2">2. Purpose of Cookies</h3>
        <p className="mb-4">
          Cookies are used for authentication, personalization, and analytics. They help improve platform functionality and tailor services to user preferences.
        </p>

        {/* Third-Party Services */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">VII. Third-Party Services</h2>
        <p className="mb-4">
          We integrate with third-party services, such as social media platforms and payment processors, which may collect user data. We encourage users to review the privacy policies of these third parties to understand how they handle personal data.
        </p>

        {/* Changes to Policy */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">VIII. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy to reflect changes in our practices or legal requirements. Significant changes will be communicated via email or through our platform. The effective date of the current policy is listed at the top.
        </p>

        {/* Contact Information */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">IX. Contact Information</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4"><strong>Email</strong>: TherahmanEffect@gmail.com</p>

        {/* Governing Law */}
        <h2 className="text-2xl font-bold mb-4 text-blue-500">X. Governing Law</h2>
        <p className="mb-4">
          This Privacy Policy is governed by the laws of [Your Jurisdiction], and any disputes arising from it will be resolved in accordance with the dispute resolution procedures outlined herein.
        </p>
      </div>
      <Footer />
    </div>
  );
}
