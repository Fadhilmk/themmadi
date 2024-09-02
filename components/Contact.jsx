'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('SUCCESS')
  };

  return (
    <>
      <div className="my-8">
        <hr className="border-t border-gray-300" />
      </div>
      <div id="contact" className="relative">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-center text-blue-500 font-bold mb-16">CONTACT US</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            {/* Left Section: Company Info */}
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 flex flex-col justify-center items-center md:items-start">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We would love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Email:</strong> example@example.com
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Phone:</strong> +123 456 7890
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Address:</strong> 123 Main Street, Anytown, USA
              </p>
            </div>
            {/* Right Section: Contact Form */}
            <div className="md:w-1/2 p-8 rounded-lg shadow-lg" style={{backgroundColor:'#2c8ffa'}}>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Contact Form</h2>
            <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                  <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea id="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 border">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default ContactUs;
