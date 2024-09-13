import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; // Correct import for Heroicons v2

export default function PricingCard() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 py-10 px-4">
      {/* Pricing Heading */}
      <h1 className="text-2xl md:text-4xl  font-bold bg-blue-200 text-blue-600 py-4 px-8 rounded-lg mb-8 shadow-md">
        PRICING
      </h1>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full md:p-10">
        <h2 className="text-5xl font-extrabold text-blue-500 text-center mb-6">
          $3
          <span className="text-lg font-medium text-gray-600"> / month</span>
        </h2>
        <p className="text-gray-700 text-center mb-10">
          Best plan for growing businesses looking to scale.
        </p>

        <ul className="space-y-6 text-gray-700">
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Up to 70% Open rate</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>40-50% Conversion rate</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Up to 5000 Contacts</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Bulk contacts upload via Excel sheet</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Manage conversations on our platform</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Analyze campaigns for better ROI</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckIcon className="w-6 h-6 text-blue-500" />
            <span>Reach customers almost anywhere</span>
          </li>
        </ul>

        {/* Get Started Button */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="bg-blue-500 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-600 transition duration-300 inline-block"
            style={{ fontFamily: "LeagueSpartan, sans-serif" }}
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}