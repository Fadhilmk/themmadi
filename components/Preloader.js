// // Preloader.jsx
// import React, { useEffect } from 'react';
// import './Preloader.css'; // Import the custom CSS for animations

// const Preloader = () => {
//   useEffect(() => {
//     const preloader = document.getElementById('preloader');
//     window.addEventListener('load', () => {
//       preloader.classList.add('opacity-0');
//       setTimeout(() => {
//         preloader.style.display = 'none';
//       }, 500); // Adjust the timing as needed
//     });
//   }, []);

//   return (
//     <div id="preloader" className="fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500">
//       <div className="loader-cube">
//         <div className="cube-face cube-face-front"></div>
//         <div className="cube-face cube-face-back"></div>
//         <div className="cube-face cube-face-left"></div>
//         <div className="cube-face cube-face-right"></div>
//         <div className="cube-face cube-face-top"></div>
//         <div className="cube-face cube-face-bottom"></div>
//       </div>
//     </div>
//   );
// };

// export default Preloader;

import React, { useEffect } from 'react';
import './Preloader.css'; // Import the custom CSS for animations

const Preloader = () => {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
      preloader.classList.add('opacity-0');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500); // Adjust the timing as needed
    });
  }, []);

  return (
    <div id="preloader" className="fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500">
      <video
        className="w-full h-full max-w-xs max-h-xs md:max-w-md md:max-h-md lg:max-w-lg lg:max-h-lg"
        src="/ogMadiy.mp4"  // Replace with the actual video path
        autoPlay
        muted
        loop
        playsInline  // Ensure it works well on mobile
      />
    </div>
  );
};

export default Preloader;
