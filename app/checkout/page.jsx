"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig"; // Adjust path accordingly
import { FaCreditCard, FaBuilding, FaGlobe } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list'; // External library for countries

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessCategory: "",
    country: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [countryOptions, setCountryOptions] = useState([]);
  const router = useRouter();

  // Fetch country list on component load
  useEffect(() => {
    const countries = countryList().getData();
    setCountryOptions(countries);
  }, []);

  // Check authentication on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle phone input change
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({ ...prevData, contactNumber: value }));
    setErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required.";
    if (!formData.businessCategory.trim()) newErrors.businessCategory = "Business category is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
      // Proceed to payment
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-600" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
          Checkout
        </h2>
        <p className="text-lg text-gray-600 text-center">Please fill in your business details to proceed</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <div className="mt-1 flex items-center border rounded-lg shadow-sm">
              <FaBuilding className="text-gray-400 ml-3" />
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className={`w-full p-3 pl-10 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.businessName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Your Business Name"
              />
            </div>
            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
          </div>

          {/* Business Category */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Business Category</label>
            <div className="mt-1 flex items-center border rounded-lg shadow-sm">
              <FaCreditCard className="text-gray-400 ml-3" />
              <input
                type="text"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleInputChange}
                className={`w-full p-3 pl-10 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.businessCategory ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="E.g., Retail, SaaS, Marketing"
              />
            </div>
            {errors.businessCategory && <p className="text-red-500 text-sm mt-1">{errors.businessCategory}</p>}
          </div>

          {/* Country */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 ${
                errors.country ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="" disabled>Select your country</option>
              {countryOptions.map((country) => (
                <option key={country.value} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          {/* Contact Number with Country Code Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <div className="mt-1">
              <PhoneInput
                country={'us'} // Set default country or allow detection
                value={formData.contactNumber}
                onChange={handlePhoneChange}
                inputClass={`w-full p-3 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.contactNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                specialLabel={""} // Remove label from PhoneInput
              />
            </div>
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
