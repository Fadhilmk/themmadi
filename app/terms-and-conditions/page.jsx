import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsAndConditions() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to [Your Company Name]! These terms and conditions outline the rules and regulations for the use of [Your Company Name]&apos;s Website, located at [website url].
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use [website name] if you do not agree to all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Cookies</h2>
        <p className="mb-4">
          We employ the use of cookies. By accessing [website name], you agreed to use cookies in agreement with [Your Company Name]’s Privacy Policy.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">License</h2>
        <p className="mb-4">
          Unless otherwise stated, [Your Company Name] and/or its licensors own the intellectual property rights for all material on [website name]. All intellectual property rights are reserved. You may access this from [website name] for your own personal use subject to restrictions set in these terms and conditions.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">User Content</h2>
        <p className="mb-4">
          You are responsible for ensuring that your use of the website complies with all applicable laws and regulations. [Your Company Name] does not assume liability for any user-generated content.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall [Your Company Name] be held liable for anything arising out of or in connection with your use of this website. Your use of this website is at your own risk.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Your continued use of our website after any changes to these Terms constitutes acceptance of those changes.
        </p>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at [Your Contact Information].
        </p>
      </div>
      <Footer />
    </div>
  );
}
