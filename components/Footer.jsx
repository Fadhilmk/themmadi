import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-white p-4 pt-8" style={{ backgroundColor: '#2c8ffa' }}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-4">
        {/* Logo and Company Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 text-center md:text-left">
          <Image
            src="/4.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold">MaaDiy</h2>
            <p
              className="text-sm max-w-xs"
              style={{ fontFamily: 'LeagueSpartan, sans-serif' }}
            >
              Empowering your business with cutting-edge solutions.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 items-center">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/services" className="hover:underline">
            Services
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 md:space-x-8 justify-center">
          <a href="https://www.facebook.com/profile.php?id=61565378703285" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.png" alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="https://www.instagram.com/the.maadiy?igsh=aTA2OHVzbmJ0end2" target="_blank" rel="noopener noreferrer">
            <img src="/social.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.youtube.com/channel/UCr9BooZmN_xsauO-lLz_nLw" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center text-sm">
        <p style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
          &copy; {new Date().getFullYear()} MaaDiy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
