// import React from "react";
// import { CheckIcon } from "@heroicons/react/24/solid"; // Correct import for Heroicons v2

// export default function PricingCard() {
//   return (
//     <div id="card" className="flex flex-col items-center min-h-screen bg-blue-100 py-10 px-4">
//       {/* Pricing Heading */}
//       <h1 className="text-4xl font-bold bg-blue-200 text-blue-600 py-4 px-8 rounded-lg mb-8 shadow-md">
//         PRICING
//       </h1>

//       {/* Pricing Card */}
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg md:p-10">
//         <h2 className="text-5xl font-extrabold text-blue-500 text-center mb-6">
//           $3
//           <span className="text-lg font-medium text-gray-600"> / month</span>
//         </h2>
//         <p className="text-gray-700 text-center mb-10">
//           Best plan for growing businesses looking to scale.
//         </p>

//         <ul className="space-y-6 text-gray-700">
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Up to 70% Open rate</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>40-50% Conversion rate</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Up to 5000 Contacts</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Bulk contacts upload via Excel sheet</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Manage conversations on our platform</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Analyze campaigns for better ROI</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Reach customers almost anywhere</span>
//           </li>
//         </ul>

//         {/* Get Started Button */}
//         <div className="text-center mt-10">
//           <a
//             href="#"
//             className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition duration-300 inline-block"
//             style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//           >
//             Get Started
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Use Next.js router
// import { auth } from "../firebaseConfig"; // Adjust the path to your Firebase config
// import { CheckIcon } from "@heroicons/react/24/solid"; // Correct import for Heroicons v2

// export default function PricingCard() {
//   const [user, setUser] = useState(null); // User state to check if logged in
//   const router = useRouter(); // Router hook for navigation

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleGetStartedClick = () => {
//     if (user) {
//       // If user is logged in, redirect to checkout page
//       router.push("/checkout");
//     } else {
//       // If user is not logged in, redirect to login page
//       router.push("/login");
//     }
//   };

//   return (
//     <div id="card" className="flex flex-col items-center min-h-screen bg-blue-100 py-10 px-4">
//       {/* Pricing Heading */}
//       <h1 className="text-4xl font-bold bg-blue-200 text-blue-600 py-4 px-8 rounded-lg mb-8 shadow-md">
//         PRICING
//       </h1>

//       {/* Pricing Card */}
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg md:p-10">
//         <h2 className="text-5xl font-extrabold text-blue-500 text-center mb-6">
//           $3
//           <span className="text-lg font-medium text-gray-600"> / month</span>
//         </h2>
//         <p className="text-gray-700 text-center mb-10">
//           Best plan for growing businesses looking to scale.
//         </p>

//         <ul className="space-y-6 text-gray-700">
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Up to 70% Open rate</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>40-50% Conversion rate</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Up to 5000 Contacts</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Bulk contacts upload via Excel sheet</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Manage conversations on our platform</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Analyze campaigns for better ROI</span>
//           </li>
//           <li className="flex items-center space-x-3">
//             <CheckIcon className="w-6 h-6 text-blue-500" />
//             <span>Reach customers almost anywhere</span>
//           </li>
//         </ul>

//         {/* Get Started Button */}
//         <div className="text-center mt-10">
//           <button
//             onClick={handleGetStartedClick}
//             className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition duration-300"
//             style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//           >
//             Access Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { auth, db } from "../firebaseConfig"; // Import Firebase config and Firestore
import { CheckIcon } from "@heroicons/react/24/solid"; // Correct import for Heroicons v2
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods

export default function PricingCard() {
  const [user, setUser] = useState(null); // User state to check if logged in
  const [isTrial, setIsTrial] = useState(true); // State to track if the user is on a trial
  const [loading, setLoading] = useState(true); // State for loading user data
  const router = useRouter(); // Router hook for navigation

  // Fetch user data and check if the user is on a trial account or real account
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check if the user is on a trial or real account
          if (userData.isTrial === false) {
            setIsTrial(false); // User is on a real account (subscribed)
          } else {
            setIsTrial(true); // User is on a trial account
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Data loading complete
    });

    return () => unsubscribe();
  }, []);

  // Handler for the "Access Now" button click
  const handleAccessNowClick = () => {
    if (user) {
      // If user is on trial, go to checkout
      if (isTrial) {
        router.push("/checkout");
      }
    } else {
      // If user is not logged in, redirect to login page
      router.push("/login");
    }
  };

  // Handler for the "Subscribed Go To Dashboard" button click
  const handleGoToDashboardClick = () => {
    if (user) {
      // Redirect the user to their dashboard based on their userId
      router.push(`/dashboard/${user.uid}`);
    }
  };

  // Render logic based on loading state
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>; // Show loading state
  }

  return (
    <div id="card" className="flex flex-col items-center min-h-screen bg-blue-100 py-10 px-4">
      {/* Pricing Heading */}
      <h1 className="text-4xl font-bold bg-blue-200 text-blue-600 py-4 px-8 rounded-lg mb-8 shadow-md">
        PRICING
      </h1>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg md:p-10">
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

        {/* Conditional Button Logic */}
        <div className="text-center mt-10">
          {isTrial ? (
            <button
              onClick={handleAccessNowClick}
              className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Access Now
            </button>
          ) : (
            <button
              onClick={handleGoToDashboardClick}
              className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Subscribed Go To Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
