import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-white py-2 md:py-4" style={{ backgroundColor: '#2c8ffa' }}>
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {/* Logo and Company Info */}
          <div className='border-b md:border-none'>
            <div className="flex flex-col md:flex-row items-center md:justify-between space-x-4 md:space-y-0 md:space-x-4 text-center md:text-left">
              <Image
                src="/4.png"
                alt="Logo"
                width={90}
                height={90}
                className="object-contain"
              />
              <div className="md:text-left">
                <h2 className="text-lg font-bold text-lg">MaaDiy</h2>
                <label className="text-sm font-normal" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
                  Empowering your business with cutting-edge solutions.
                </label>
              </div>
            </div>
      
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-between p-4 pt-6">
              <div className="flex space-x-3">
                {/* WhatsApp */}
                <a href="https://wa.me/7593970511" target="_blank" rel="noopener noreferrer">
                  <Image src="/whatsapp.png" alt="WhatsApp" width={25} height={25} className="object-contain" />
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/the.maadiy?igsh=aTA2OHVzbmJ0end2" target="_blank" rel="noopener noreferrer">
                  <Image src="/instagram24.png" alt="Instagram" width={25} height={25} className="object-contain" />
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61565378703285" target="_blank" rel="noopener noreferrer">
                  <Image src="/facebook.png" alt="Facebook" width={25} height={25} className="object-contain" />
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/channel/UCr9BooZmN_xsauO-lLz_nLw" target="_blank" rel="noopener noreferrer">
                  <Image src="/youtube.png" alt="YouTube" width={25} height={25} className="object-contain" />
                </a>
                {/* Email */}
                <a href="mailto:therahmaneffect@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/gmail.png" alt="Email" width={25} height={25} className="object-contain" />
                </a>
                {/* Phone */}
                <a href="tel:+919567565069" target="_blank" rel="noopener noreferrer">
                  <Image src="/phone-call.png" alt="Phone" width={25} height={25} className="object-contain" />
                </a>
              </div>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex text-lg flex-col items-center space-y-3 md:items-start text-center md:text-left border-b md:border-none pb-4 md:pb-0 ml-0 md:ml-16">
            <a href="/about" className="hover:underline text-lg" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>About Us</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Services</a>
            <a href="/pricing" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Pricing</a>
            <a href="/#features" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Features</a>
          </div>

          {/* Secondary Navigation Links */}
          <div className="flex text-lg flex-col items-center md:items-start space-y-3 text-center md:text-left border-b md:border-none pb-4 md:pb-0 md:pb-0 ml-0 md:ml-16">
            <a href="/blog" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Blog</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Product Overview</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Book a Demo</a>
            <a href="/shipping-policy" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Shipping Policy</a>
          </div>
                    
          {/* Third Navigation Links */}
          <div className="flex text-lg flex-col items-center md:items-start space-y-3 text-center md:text-left border-b md:border-none pb-4 md:pb-0 md:pb-0 ml-0 md:ml-16">
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Contact</a>
            <a href="/terms-and-conditions" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Terms & Conditions</a>
            <a href="/signup" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Sign Up</a>
            <a href="/cancellations-refunds" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Cancellations and Refunds</a>
          </div>
          {/* Third Navigation Links */}
          <div className="flex text-lg flex-col items-center md:items-start space-y-3 text-center md:text-left border-b md:border-none pb-4 md:pb-0 md:pb-0 ml-0 md:ml-16">
          <a href="/privacy-policy" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Privacy Policy</a>
          <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Help Center</a>
          <a href="/#features" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Features</a>
          <a href="/contact-us" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Contact Us</a>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-3 md:mt-8 text-center text-sm">
          <p style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
            &copy; {new Date().getFullYear()} MaaDiy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;