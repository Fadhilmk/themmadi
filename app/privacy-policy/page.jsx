import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. It is [Your Company Name]&apos;s policy to respect your privacy regarding any information we may collect from you across our website, [website url], and other sites we own and operate.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Information We Collect</h2>
        <p className="mb-4">
          We only collect information that is necessary for the operation of our services. This includes personal identification information (such as name, email address, phone number, etc.).
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide, operate, and maintain our services. We may use your personal information to contact you with newsletters, marketing or promotional materials, and other information that may interest you.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Security of Your Information</h2>
        <p className="mb-4">
          We value your trust in providing us with your personal information. We strive to use commercially acceptable means of protecting it, but we cannot guarantee its absolute security.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Your Consent</h2>
        <p className="mb-4">
          By using our website, you consent to our Privacy Policy.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Changes to This Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
        <p className="mb-4">
          This policy is effective as of [Date].
        </p>
        <p className="mb-4">
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at [Your Contact Information].
        </p>
      </div>
      <Footer />
    </div>
  );
}
