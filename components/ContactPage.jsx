"use client";
import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Import your firebase config
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Set loading state while processing

    try {
      // Add form data to the Firestore 'support' collection
      await addDoc(collection(db, "support"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      setIsSubmitted(true); // Show success message
      setFormData({ name: "", email: "", message: "" }); // Clear the form
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Page Title */}
        <h1
          className="text-4xl font-extrabold text-center text-blue-600"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          Contact Us
        </h1>

        {/* Contact Information */}
        <div className="space-y-4 text-center">
          <p className="text-lg text-gray-700">
            We&apos;d love to hear from you! If you have any questions, feedback, or need assistance, feel free to reach out to us.
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Email: <a href="mailto:TherahmanEffect@gmail.com" className="text-blue-500 underline">TherahmanEffect@gmail.com</a>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Phone: <a href="tel:9061631681" className="text-blue-500 underline">9061631681</a>
          </p>
        </div>

        {/* Contact Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Your Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className={`w-full p-3 text-gray-700 rounded-lg focus:ring-2 ${
                  errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Your Message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-xl text-green-600 font-semibold">
              Thank you for your message! We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
