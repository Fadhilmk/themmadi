// // components/Footer.jsx
// import React from 'react';
// import Image from 'next/image';

// const Footer = () => {
//   return (
//     <footer className="text-white p-2 pt-8" style={{backgroundColor:'#2c8ffa'}}>
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4">
//         {/* Logo and Company Info */}
//         <div className="flex flex-col md:flex-row items-center justify-center md:items-start space-x-4">
//         <Image
//           src="/nav_logo.jpeg"
//           alt="Logo"
//           width={90}
//           height={90}
//           className="object-contain"
//         />
//         <div className="flex justify-center flex-col md:ml-4">
//           <h2 className="text-lg font-bold">MaaDiy</h2>
//           <p className="text-sm" style={{width:'200px'}}>
//             Empowering your business with cutting-edge solutions.
//           </p>
//         </div>
//       </div>
//         {/* Navigation Links */}
//         <div className="flex space-x-8">
//           <a href="/about" className="hover:underline">
//             About Us
//           </a>
//           <a href="/services" className="hover:underline">
//             Services
//           </a>
//           <a href="/contact" className="hover:underline">
//             Contact
//           </a>
//           <a href="/privacy-policy" className="hover:underline">
//             Privacy Policy
//           </a>
//           <a href="/terms-and-conditions" className="hover:underline">
//           Terms & Conditions
//           </a>
//         </div>

//         {/* Social Media Icons */}
//         <div className="flex space-x-8">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <img src="twitter.png" alt="Twitter" className="w-8 h-8" />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <img src="social.png" alt="Instagram" className="w-8 h-8" />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//             <img src="linkedin.png" alt="LinkedIn" className="w-8 h-8" />
//           </a>
//         </div>
//       </div>
//       {/* Copyright Section */}
//       <div className="mt-4 text-center text-sm">
//         <p>
//           &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Image
              src="/nav_logo.jpeg"
              alt="Logo"
              width={90}
              height={90}
              className="object-contain"
            />
            <div>
              <h2 className="text-lg font-bold">MaaDiy</h2>
              <p className="text-sm">
                Empowering your business with cutting-edge solutions.
              </p>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/services" className="hover:underline">Services</a>
            <a href="/pricing" className="hover:underline">Pricing</a>
            <a href="/blog" className="hover:underline">Blog</a>
            <a href="/product-overview" className="hover:underline">Product Overview</a>
            <a href="/book-demo" className="hover:underline">Book a Demo</a>
          </div>

          {/* Secondary Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a href="/help-center" className="hover:underline">Help Center</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-between mt-8">
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="Twitter" className="w-8 h-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/social.png" alt="Instagram" className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MaaDiy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
