
const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Page Title */}
        <h1
          className="text-4xl font-extrabold text-center text-blue-600"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          Cancellation and Refund Policy
        </h1>

        {/* Section 1: Cancellation Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            1. Cancellation Policy
          </h2>

          <h3 className="text-xl font-semibold text-gray-700">
            a. Subscription Services (SaaS)
          </h3>
          <p className="text-gray-600">
            <strong>Monthly Subscriptions:</strong> You may cancel your
            subscription at any time. Once canceled, you will retain access to
            the service until the end of the current billing period. No prorated
            refunds will be issued for partial months of service.
          </p>
          <p className="text-gray-600">
            <strong>Annual Subscriptions:</strong> Annual subscriptions can be
            canceled at any time, but you will retain access until the end of
            the current annual billing cycle. We do not offer prorated refunds
            for annual subscriptions.
          </p>

          <h3 className="text-xl font-semibold text-gray-700">
            b. One-Time Purchases
          </h3>
          <p className="text-gray-600">
            For any one-time purchases (e.g., software licenses, add-ons),
            cancellations are allowed within 24 hours of purchase if the product
            or service has not been used. After this period, cancellations will
            not be accepted unless exceptional circumstances are presented.
          </p>

          <h3 className="text-xl font-semibold text-gray-700">
            c. Physical Products
          </h3>
          <p className="text-gray-600">
            Orders for physical goods (e.g., merchandise, hardware bundles) can
            only be canceled within 24 hours of placing the order. After 24
            hours, we may not be able to accommodate cancellations as the order
            may have already been processed for shipping.
          </p>
        </div>

        {/* Section 2: Refund Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">2. Refund Policy</h2>

          <h3 className="text-xl font-semibold text-gray-700">
            a. Digital Products and Services
          </h3>
          <p className="text-gray-600">
            Due to the nature of digital products, we do not offer refunds on
            software subscriptions, licenses, or services once they have been
            accessed or delivered, except in the following cases:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Technical Issues:</strong> If you encounter technical
              difficulties with our software that we are unable to resolve, you
              may be eligible for a partial or full refund, depending on the
              nature of the issue.
            </li>
            <li>
              <strong>Incorrect Billing:</strong> If there is a billing error on
              our end (e.g., duplicate charges), we will promptly correct the
              error and issue a refund.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700">
            b. Physical Products
          </h3>
          <p className="text-gray-600">
            Refunds for physical goods are available under the following
            conditions:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Defective or Damaged Products:</strong> If you receive a
              product that is defective or damaged upon arrival, please contact
              us within 14 days of receiving the product with proof (e.g.,
              photos) of the issue. We will offer a replacement or refund,
              depending on availability.
            </li>
            <li>
              <strong>Non-Refundable Products:</strong> Certain items, such as
              personalized merchandise, are non-refundable unless they arrive
              defective or damaged.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700">
            c. Refund Processing
          </h3>
          <p className="text-gray-600">
            Refunds, if approved, will be processed within 5-7 business days and
            will be credited back to your original method of payment. Please
            note that it may take additional time for your financial institution
            to post the refund to your account.
          </p>
        </div>

        {/* Section 3: How to Request a Cancellation or Refund */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            3. How to Request a Cancellation or Refund
          </h2>
          <p className="text-gray-600">
            To request a cancellation or refund, please follow these steps:
          </p>
          <ul className="list-decimal list-inside text-gray-600 space-y-2">
            <li>
              Contact our support team via email at{" "}
              <a
                href="mailto:TherahmanEffect@gmail.com"
                className="text-blue-500 underline"
              >
                TherahmanEffect@gmail.com
              </a>{" "}
              or through our{" "}
              <a href="#" className="text-blue-500 underline">
                customer support portal
              </a>
              .
            </li>
            <li>
              Provide the necessary information, including your account details,
              order number, and a brief description of the issue or reason for
              cancellation/refund.
            </li>
            <li>
              Our team will review your request and respond within 2 business
              days.
            </li>
          </ul>
        </div>

        {/* Section 4: Non-Refundable Situations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            4. Non-Refundable Situations
          </h2>
          <p className="text-gray-600">
            We do not provide refunds in the following situations:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Change of mind:</strong> Once a subscription or digital
              product has been accessed or used, refunds will not be issued for
              change-of-mind requests.
            </li>
            <li>
              <strong>Failure to use the service:</strong> We do not provide
              refunds for unused services or products unless technical issues
              prevent access.
            </li>
            <li>
              <strong>Promotional/Discounted Products:</strong> Items purchased
              at a discount or as part of a promotion are non-refundable unless
              otherwise stated.
            </li>
          </ul>
        </div>

        {/* Section 5: Changes to this Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            5. Changes to this Policy
          </h2>
          <p className="text-gray-600">
            MaaDiy reserves the right to modify this Cancellation and Refund
            Policy at any time. Any updates will be posted on this page, and
            significant changes will be communicated via email or platform
            notifications.
          </p>
        </div>

        {/* Section 6: Contact Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            6. Contact Information
          </h2>
          <p className="text-gray-600">
            If you have any questions or need further assistance regarding
            cancellations or refunds, please reach out to us at:{" "}
            <a
              href="mailto:TherahmanEffect@gmail.com"
              className="text-blue-500 underline"
            >
              TherahmanEffect@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
