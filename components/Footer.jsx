
// import React from 'react';
// import Image from 'next/image';

// const Footer = () => {
//   return (
// <footer className="text-white py-10" style={{backgroundColor:'#2c8ffa'}}>
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Logo and Company Info */}
//           <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
//             <Image
//               src="/4.png"
//               alt="Logo"
//               width={90}
//               height={90}
//               className="object-contain"
//             />
//             <div>
//               <h2 className="text-lg font-bold">MaaDiy</h2>
//               <p className="text-sm" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
//                 Empowering your business with cutting-edge solutions.
//               </p>
//             </div>
//           </div>

//           {/* Primary Navigation Links */}
//           <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
//             <a href="/about" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>About Us</a>
//             <a href="/services" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Services</a>
//             <a href="/pricing" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Pricing</a>
//             <a href="/blog" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Blog</a>
//             <a href="/product-overview" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Product Overview</a>
//             <a href="/book-demo" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Book a Demo</a>
//           </div>

//           {/* Secondary Navigation Links */}
//           <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
//             <a href="/help-center" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Help Center</a>
//             <a href="/contact" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Contact</a>
//             <a href="/privacy-policy" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Privacy Policy</a>
//             <a href="/terms-and-conditions" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Terms & Conditions</a>
//             <a href="/signup" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Sign Up</a>
//           </div>
//         </div>

//         {/* Social Media Icons */}
//         <div className="flex justify-center md:justify-between mt-8">
//           <div className="flex space-x-4">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//               <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <img src="/instagram24.png" alt="Twitter" className="w-8 h-8" />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//               <img src="/social.png" alt="Instagram" className="w-8 h-8" />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
//             </a>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="mt-8 text-center text-sm">
//           <p style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
//             &copy; {new Date().getFullYear()} MaaDiy. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-white py-10" style={{ backgroundColor: '#2c8ffa' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
            <Image
              src="/4.png"
              alt="Logo"
              width={90}
              height={90}
              className="object-contain"
            />
            <div>
              <h2 className="text-lg font-bold">MaaDiy</h2>
              <p className="text-sm" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
                Empowering your business with cutting-edge solutions.
              </p>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
            <a href="/about" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>About Us</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Services</a>
            <a href="/pricing" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Pricing</a>
            <a href="/blog" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Blog</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Product Overview</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Book a Demo</a>
          </div>

          {/* Secondary Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left border-b md:border-none pb-4 md:pb-0">
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Help Center</a>
            <a href="/" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Contact</a>
            <a href="/privacy-policy" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Terms & Conditions</a>
            <a href="/signup" className="hover:underline" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Sign Up</a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-between mt-8">
          <div className="flex space-x-4">
            {/* WhatsApp */}
            <a href="https://wa.me/7593970511" target="_blank" rel="noopener noreferrer">
              <Image src="/whatsapp.png" alt="WhatsApp" width={24} height={24} className="object-contain" />
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/the.maadiy?igsh=aTA2OHVzbmJ0end2" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram24.png" alt="Instagram" width={24} height={24} className="object-contain" />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61565378703285" target="_blank" rel="noopener noreferrer">
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} className="object-contain" />
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UCr9BooZmN_xsauO-lLz_nLw" target="_blank" rel="noopener noreferrer">
              <Image src="/youtube.png" alt="YouTube" width={24} height={24} className="object-contain" />
            </a>
            {/* Email */}
            <a href="mailto:therahmaneffect@gmail.com" target="_blank" rel="noopener noreferrer">
              <Image src="/gmail.png" alt="Email" width={24} height={24} className="object-contain" />
            </a>
            {/* Phone */}
            <a href="tel:+919567565069" target="_blank" rel="noopener noreferrer">
              <Image src="/phone-call.png" alt="Phone" width={24} height={24} className="object-contain" />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm">
          <p style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
            &copy; {new Date().getFullYear()} MaaDiy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
