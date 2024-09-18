// import React from 'react'

// const UserAccount = ({userId}) => {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Profile Section */}
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <div className="flex items-center">
//           <img
//             className="w-24 h-24 rounded-full border-2 border-gray-200 mr-4"
//             src="https://via.placeholder.com/150" // Replace with user's avatar URL
//             alt="User Avatar"
//           />
//           <div>
//             <h2 className="text-2xl font-bold" style={{fontFamily: "LeagueSpartanBold, sans-serif"}}>John Doe</h2>
//             <p className="text-gray-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>johndoe@example.com</p>
//             <p className="text-gray-500" style={{fontFamily: "LeagueSpartan, sans-serif"}}>919972635675</p>
//           </div>
//         </div>
//       </div>

//       {/* Account Information Section */}
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanBold, sans-serif"}}>Account Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold" >Full Name:</span> John Doe</p>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Email:</span> johndoe@example.com</p>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Phone:</span> +123 456 7890</p>
//           </div>
//           <div>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Address:</span> 123 Main Street, City, Country</p>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Date of Birth:</span> January 1, 1990</p>
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}><span className="font-semibold">Gender:</span> Male</p>
//           </div>
//         </div>
//       </div>

//       {/* Activity Logs Section */}
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h3 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Recent Activity</h3>
//         <ul className="divide-y divide-gray-200">
//           <li className="py-2">
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Logged in from IP: 192.168.1.1</p>
//             <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>2 hours ago</p>
//           </li>
//           <li className="py-2">
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Changed password</p>
//             <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>1 day ago</p>
//           </li>
//           <li className="py-2">
//             <p className="text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Updated profile information</p>
//             <p className="text-gray-500 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>3 days ago</p>
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }
// export default UserAccount


"use client";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore configuration

const UserAccount = ({ userId }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    whatsapp: '',
    businessName: '',
    country:'',
    businessCategory:'',
    lastLoginIP: '',
    loginHistory: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Reference the document for the specific userId
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Set the fetched data to state
          setUserData({
            username: userDoc.data().username || 'N/A',
            email: userDoc.data().email || 'N/A',
            whatsapp: userDoc.data().whatsapp || 'N/A',
            businessName: userDoc.data().businessName || 'N/A',
            country: userDoc.data().country || 'N/A',
            businessCategory: userDoc.data().businessCategory || 'N/A',
            lastLoginIP: userDoc.data().lastLoginIP || 'N/A',
            loginHistory: userDoc.data().loginHistory || [],
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get the first letter of the username
  const firstLetter = userData.username.charAt(0).toUpperCase();

  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <div
            className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold mr-4"
          >
            {firstLetter}
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'LeagueSpartanBold, sans-serif' }}>
              {userData.username}
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              {userData.email}
            </p>
            <p className="text-gray-500" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              {userData.whatsapp}
            </p>
          </div>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'LeagueSpartanBold, sans-serif' }}>
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              <span className="font-semibold">Business Name:</span> {userData.businessName}
            </p>
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              <span className="font-semibold">Business Category:</span> {userData.businessCategory}
            </p>
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              <span className="font-semibold">Country:</span> {userData.country}
            </p>
          </div>
        </div>
      </div>

      {/* Activity Logs Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
          Recent Activity
        </h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              {userData.lastLoginIP}
            </p>
          </li>
          <li className="py-2">
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              Changed password
            </p>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              1 day ago
            </p>
          </li>
          <li className="py-2">
            <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              Updated profile information
            </p>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
              3 days ago
            </p>
          </li>
        </ul>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Login History</h3>
        <ul>
          {userData.loginHistory.map((entry, index) => (
            <li key={index} className="mb-2">
              <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
                <span className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>IP Address:</span> {entry.ip}
              </p>
              <p className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
                <span className="text-gray-700" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>Timestamp:</span> {new Date(entry.timestamp.toDate()).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserAccount;
