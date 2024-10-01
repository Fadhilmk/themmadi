
const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Page Title */}
        <h1
          className="text-4xl font-extrabold text-center text-blue-600"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          Shipping Policy
        </h1>

        {/* Section 1: Digital Product Delivery */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            1. Digital Product Delivery
          </h2>
          <p className="text-gray-600">
            For our core services and digital products (e.g., software
            subscriptions, digital downloads, licenses), no physical shipping is
            required. Upon successful purchase, you will receive access to your
            digital product through your registered account, along with a
            confirmation email containing any necessary instructions.
          </p>
        </div>

        {/* Section 2: Physical Product Shipping */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            2. Physical Product Shipping
          </h2>

          <h3 className="text-xl font-semibold text-gray-700">
            a. Order Processing Time
          </h3>
          <p className="text-gray-600">
            All orders for physical products are processed within 2-3 business
            days after payment confirmation. Orders are not processed or shipped
            on weekends or public holidays. If there is a significant delay in
            shipping your order, we will notify you via email.
          </p>

          <h3 className="text-xl font-semibold text-gray-700">
            b. Shipping Methods &amp; Costs
          </h3>
          <p className="text-gray-600">
            Shipping costs are calculated at checkout based on the delivery
            location, weight, and size of the order. We offer a range of
            shipping methods, including standard and expedited options,
            depending on your location.
          </p>

          <h3 className="text-xl font-semibold text-gray-700">
            c. Delivery Time
          </h3>
          <p className="text-gray-600">
            Delivery times vary depending on your location and the shipping
            method selected. Estimated delivery times will be provided during
            checkout. Please note that these are estimates, and delivery times
            may be subject to delays due to factors beyond our control, such as
            courier delays, weather conditions, or customs processing.
          </p>

          <h3 className="text-xl font-semibold text-gray-700">
            d. International Shipping
          </h3>
          <p className="text-gray-600">
            MaaDiy ships internationally, though certain locations may have
            shipping restrictions. Customs, Duties, and Taxes: International
            orders may be subject to import duties and taxes, which are imposed
            once the shipment reaches your destination. These charges are the
            responsibility of the recipient, and MaaDiy has no control over
            these charges.
          </p>
        </div>

        {/* Section 3: Order Tracking */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">3. Order Tracking</h2>
          <p className="text-gray-600">
            Once your order is shipped, you will receive a shipping confirmation
            email containing a tracking number and carrier information. You can
            use this information to track your package until it reaches your
            destination.
          </p>
        </div>

        {/* Section 4: Damaged, Lost, or Stolen Packages */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            4. Damaged, Lost, or Stolen Packages
          </h2>
          <p className="text-gray-600">
            If your package is damaged during shipping, please contact us
            immediately with photos and a description of the damage, and we will
            work to resolve the issue. If a shipment is lost or stolen, please
            reach out to us for assistance.
          </p>
        </div>

        {/* Section 5: Non-Delivery or Wrong Address */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            5. Non-Delivery or Wrong Address
          </h2>
          <p className="text-gray-600">
            It is the customer&apos;s responsibility to ensure that the shipping
            address is correct. MaaDiy is not responsible for packages delivered
            to an incorrect or outdated address provided by the customer.
          </p>
        </div>

        {/* Section 6: Cancellations & Changes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            6. Cancellations &amp; Changes
          </h2>
          <p className="text-gray-600">
            Orders for physical products can only be canceled or modified within
            24 hours of placing the order. After this period, we may not be able
            to accommodate changes as the shipping process may have begun.
          </p>
        </div>

        {/* Section 7: Contact Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            7. Contact Information
          </h2>
          <p className="text-gray-600">
            If you have any questions or concerns about your shipment, or if you
            need assistance with tracking or other shipping-related issues,
            please contact us at:{" "}
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

export default ShippingPolicy;
