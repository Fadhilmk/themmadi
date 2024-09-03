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
      <div id="contact" className="relative min-h-screen flex flex-col justify-center bg-black">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 style={{fontFamily:'initial'}} className="text-4xl text-center text-blue-500 font-bold mb-16 mt-8 md:mt-0">CONTACT US</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            {/* Left Section: Company Info */}
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 flex flex-col justify-center items-center md:items-start">
              <p className='text-center pb-10' style={{color:'white', fontFamily:'cursive', fontSize:40, fontWeight:900}}>Let’s find the right solution for you!</p>

              <h2 style={{fontFamily:'monospace'}} className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
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
            <div className="md:w-1/2 p-8 rounded-lg shadow-lg">
             <form>
                <div className="mb-6 text-white">
                  <input style={{backgroundColor:'black', borderWidth:1, borderColor:'#2c7ffe', borderRadius:20, width:265}} type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="First Name" />
                  <input
                    style={{ backgroundColor: 'black', borderWidth: 1, borderColor: '#2c8ffa', borderRadius: 20, width: 265 }}
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 ml-0 md:ml-2 mt-6 md:md-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Last Name"
                  />
                </div>
                <div className="mb-6 text-white">
                   <input style={{backgroundColor:'black', borderWidth:1, borderColor:'#2c8ffa', borderRadius:20}} type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" />
                </div>
                <div className="mb-6 text-white">
                   <input style={{backgroundColor:'black', borderWidth:1, borderColor:'#2c8ffa', borderRadius:20}} type="phone" id="phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Phone" />
                </div>
                <div className="mb-6 text-white">
                   <textarea style={{backgroundColor:'black', borderWidth:1, borderColor:'#2c8ffa', borderRadius:20, color:'white'}} id="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Message"></textarea>
                </div>
                <button style={{width:150, borderRadius:20}} type="submit" className="btn-contact w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition duration-300">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default ContactUs;
