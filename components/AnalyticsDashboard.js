// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CategoryTypeCards from "./CategoryTypeCards";
// const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
// const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

// const toIST = (date) => {
//   const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//   return new Date(date.getTime() + offset).toISOString().slice(0, 16);
// };

// const getLastMonthDateTime = () => {
//   const now = new Date();
//   const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//   return toIST(lastMonth);
// };

// const getCurrentDateTime = () => {
//   const now = new Date();
//   return toIST(now);
// };

// const AnalyticsDashboard = () => {
//   // State for Message Analytics
//   const [messageStartDate, setMessageStartDate] = useState(getLastMonthDateTime());
//   const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
//   const [messageGranularity, setMessageGranularity] = useState("DAY");
//   const [messageData, setMessageData] = useState([]);

//   // State for Conversation Analytics
//   const [conversationStartDate, setConversationStartDate] = useState(getLastMonthDateTime());
//   const [conversationEndDate, setConversationEndDate] = useState(getCurrentDateTime());
//   const [conversationGranularity, setConversationGranularity] = useState("DAILY");
//   const [conversationData, setConversationData] = useState([]);
//   const [categoryTotals, setCategoryTotals] = useState({});
//   const [typeTotals, setTypeTotals] = useState({});
//   const [conversationDirections, setConversationDirections] = useState({});

//   const fetchMessageAnalyticsData = async () => {
//     try {
//       const startTime = new Date(messageStartDate).getTime() / 1000;
//       const endTime = new Date(messageEndDate).getTime() / 1000;

//       const messageResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
//             access_token: accessToken,
//           },
//         }
//       );
//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching message analytics data:", error.response);
//     }
//   };

//   const fetchConversationAnalyticsData = async () => {
//     try {
//       const startTime = new Date(conversationStartDate).getTime() / 1000;
//       const endTime = new Date(conversationEndDate).getTime() / 1000;

//       const conversationResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
//             access_token: accessToken,
//           },
//         }
//       );
//       const dataPoints =
//         conversationResponse.data.conversation_analytics.data[0].data_points;
//       setConversationData(dataPoints);

//       // Calculate category totals
//       const categoryTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_category] =
//           (acc[dp.conversation_category] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate type totals
//       const typeTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_type] =
//           (acc[dp.conversation_type] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate conversation direction totals
//       const directionTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_direction] =
//           (acc[dp.conversation_direction] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       setCategoryTotals(categoryTotals);
//       setTypeTotals(typeTotals);
//       setConversationDirections(directionTotals);
//     } catch (error) {
//       console.error(
//         "Error fetching conversation analytics data:",
//         error.response
//       );
//     }
//   };

//   useEffect(() => {
//     fetchMessageAnalyticsData();
//   }, [messageStartDate, messageEndDate, messageGranularity]);

//   useEffect(() => {
//     fetchConversationAnalyticsData();
//   }, [conversationStartDate, conversationEndDate, conversationGranularity]);

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
//   const totalConversations = conversationData.reduce(
//     (sum, dp) => sum + dp.conversation,
//     0
//   );
//   const totalCost = conversationData
//     .reduce((sum, dp) => sum + dp.cost, 0)
//     .toFixed(2);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Conversation Analytics Card */}
//         <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Conversation Analytics</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-sm">Start Date:</label>
//               <input
//                 type="datetime-local"
//                 value={conversationStartDate}
//                 onChange={(e) => setConversationStartDate(e.target.value)}
//                 className="text-black p-2 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm">End Date:</label>
//               <input
//                 type="datetime-local"
//                 value={conversationEndDate}
//                 onChange={(e) => setConversationEndDate(e.target.value)}
//                 className="text-black p-2 rounded w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchConversationAnalyticsData}
//               className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-green-200 transition duration-300"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setConversationStartDate(getLastMonthDateTime());
//                 setConversationEndDate(getCurrentDateTime());
//               }}
//               className="bg-gray-200 text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold">Total Conversations:</p>
//               <p className="text-3xl font-bold text-shadow-sm">{totalConversations}</p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold">Total Cost:</p>
//               <p className="text-3xl font-bold text-yellow-300 text-shadow-sm">
//                 ${totalCost}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Message Analytics Card with Modern UI */}
//         <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Message Analytics</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 text-sm">Start Date:</label>
//               <input
//                 type="datetime-local"
//                 value={messageStartDate}
//                 onChange={(e) => setMessageStartDate(e.target.value)}
//                 className="text-black p-2 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm">End Date:</label>
//               <input
//                 type="datetime-local"
//                 value={messageEndDate}
//                 onChange={(e) => setMessageEndDate(e.target.value)}
//                 className="text-black p-2 rounded w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchMessageAnalyticsData}
//               className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-200 transition duration-300"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setMessageStartDate(getLastMonthDateTime());
//                 setMessageEndDate(getCurrentDateTime());
//               }}
//               className="bg-gray-200 text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold">Total Messages Sent:</p>
//               <p className="text-3xl font-bold text-shadow-sm">{totalSent}</p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold">Total Messages Delivered:</p>
//               <p className="text-3xl font-bold text-shadow-sm">
//                 {totalDelivered}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pass data to CategoryTypeCards component */}
//       <CategoryTypeCards
//         categoryTotals={categoryTotals}
//         typeTotals={typeTotals}
//         conversationDirections={conversationDirections}
//         totalConversations={totalConversations}
//         totalCost={totalCost}
//         totalSent={totalSent}
//         totalDelivered={totalDelivered}
//       />
//     </div>
//   );
// };

// export default AnalyticsDashboard;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CategoryTypeCards from "./CategoryTypeCards";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/firebaseConfig";
// const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
// const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

// const toIST = (date) => {
//   const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//   return new Date(date.getTime() + offset).toISOString().slice(0, 16);
// };

// const getLastMonthDateTime = () => {
//   const now = new Date();
//   const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//   return toIST(lastMonth);
// };

// const getCurrentDateTime = () => {
//   const now = new Date();
//   return toIST(now);
// };

// const AnalyticsDashboard = () => {
//   // State for Message Analytics
//   const [messageStartDate, setMessageStartDate] = useState(getLastMonthDateTime());
//   const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
//   const [messageGranularity, setMessageGranularity] = useState("DAY");
//   const [messageData, setMessageData] = useState([]);

//   // State for Conversation Analytics
//   const [conversationStartDate, setConversationStartDate] = useState(getLastMonthDateTime());
//   const [conversationEndDate, setConversationEndDate] = useState(getCurrentDateTime());
//   const [conversationGranularity, setConversationGranularity] = useState("DAILY");
//   const [conversationData, setConversationData] = useState([]);
//   const [categoryTotals, setCategoryTotals] = useState({});
//   const [typeTotals, setTypeTotals] = useState({});
//   const [conversationDirections, setConversationDirections] = useState({});

//   const fetchMessageAnalyticsData = async () => {
//     try {
//       const startTime = new Date(messageStartDate).getTime() / 1000;
//       const endTime = new Date(messageEndDate).getTime() / 1000;

//       const messageResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
//             access_token: accessToken,
//           },
//         }
//       );
//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching message analytics data:", error.response);
//     }
//   };

//   const fetchConversationAnalyticsData = async () => {
//     try {
//       const startTime = new Date(conversationStartDate).getTime() / 1000;
//       const endTime = new Date(conversationEndDate).getTime() / 1000;

//       const conversationResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
//             access_token: accessToken,
//           },
//         }
//       );
//       const dataPoints =
//         conversationResponse.data.conversation_analytics.data[0].data_points;
//       setConversationData(dataPoints);

//       // Calculate category totals
//       const categoryTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_category] =
//           (acc[dp.conversation_category] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate type totals
//       const typeTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_type] =
//           (acc[dp.conversation_type] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate conversation direction totals
//       const directionTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_direction] =
//           (acc[dp.conversation_direction] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       setCategoryTotals(categoryTotals);
//       setTypeTotals(typeTotals);
//       setConversationDirections(directionTotals);
//     } catch (error) {
//       console.error(
//         "Error fetching conversation analytics data:",
//         error.response
//       );
//     }
//   };

//   useEffect(() => {
//     fetchMessageAnalyticsData();
//   }, [messageStartDate, messageEndDate, messageGranularity]);

//   useEffect(() => {
//     fetchConversationAnalyticsData();
//   }, [conversationStartDate, conversationEndDate, conversationGranularity]);

//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
//   const totalConversations = conversationData.reduce(
//     (sum, dp) => sum + dp.conversation,
//     0
//   );
//   const totalCost = conversationData
//     .reduce((sum, dp) => sum + dp.cost, 0)
//     .toFixed(2);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center pb-2" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:30}}>WhatsApp Analytics Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Conversation Analytics Card */}
//         <div className="bg-gradient-to-r from-blue-300 via-cyan-500 to-blue-500 p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Conversation Analytics</h2>
//           <div className="grid grid-cols-2 gap-4 pt-6">
//             <div>
//               <label className="block mb-1 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Start Date:</label>
//               <input
//                 type="datetime-local"
//                 value={conversationStartDate}
//                 onChange={(e) => setConversationStartDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>End Date:</label>
//               <input
//                 type="datetime-local"
//                 value={conversationEndDate}
//                 onChange={(e) => setConversationEndDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchConversationAnalyticsData}
//               className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setConversationStartDate(getLastMonthDateTime());
//                 setConversationEndDate(getCurrentDateTime());
//               }}
//               className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Conversations:</p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{totalConversations}</p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Cost:</p>
//               <p className="text-3xl font-bold text-yellow-300 text-shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//                 ${totalCost}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Message Analytics Card with Modern UI */}
//         <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Message Analytics</h2>
//           <div className="grid grid-cols-2 pt-6 gap-4">
//             <div>
//               <label className="block mb-1 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Start Date:</label>
//               <input
//                 type="datetime-local"
//                 value={messageStartDate}
//                 onChange={(e) => setMessageStartDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>End Date:</label>
//               <input
//                 type="datetime-local"
//                 value={messageEndDate}
//                 onChange={(e) => setMessageEndDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchMessageAnalyticsData}
//               className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setMessageStartDate(getLastMonthDateTime());
//                 setMessageEndDate(getCurrentDateTime());
//               }}
//               className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Messages Sent:</p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{totalSent}</p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Messages Delivered:</p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//                 {totalDelivered}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pass data to CategoryTypeCards component */}
//       <CategoryTypeCards
//         categoryTotals={categoryTotals}
//         typeTotals={typeTotals}
//         conversationDirections={conversationDirections}
//         totalConversations={totalConversations}
//         totalCost={totalCost}
//         totalSent={totalSent}
//         totalDelivered={totalDelivered}
//       />
//     </div>
//   );
// };

// export default AnalyticsDashboard;
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CategoryTypeCards from "./CategoryTypeCards";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "@/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import CryptoJS from "crypto-js";

// // Utility functions to convert dates to IST
// const toIST = (date) => {
//   const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//   return new Date(date.getTime() + offset).toISOString().slice(0, 16);
// };

// const getLastMonthDateTime = () => {
//   const now = new Date();
//   const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//   return toIST(lastMonth);
// };

// const getCurrentDateTime = () => {
//   const now = new Date();
//   return toIST(now);
// };

// // Decrypt encrypted data using a key
// const decryptData = (cipherText) => {
//   const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//   const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

// const AnalyticsDashboard = () => {
//   // State variables
//   const [messageStartDate, setMessageStartDate] = useState(getLastMonthDateTime());
//   const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
//   const [messageGranularity, setMessageGranularity] = useState("DAY");
//   const [messageData, setMessageData] = useState([]);

//   const [conversationStartDate, setConversationStartDate] = useState(getLastMonthDateTime());
//   const [conversationEndDate, setConversationEndDate] = useState(getCurrentDateTime());
//   const [conversationGranularity, setConversationGranularity] = useState("DAILY");
//   const [conversationData, setConversationData] = useState([]);
//   const [categoryTotals, setCategoryTotals] = useState({});
//   const [typeTotals, setTypeTotals] = useState({});
//   const [conversationDirections, setConversationDirections] = useState({});

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalErrorDetails, setModalErrorDetails] = useState(""); // For detailed API error response
//   // Default to .env values for trial users
//   const [whatsappBusinessAccountId, setWhatsappBusinessAccountId] = useState(process.env.NEXT_PUBLIC_BUSSINESS_ID);
//   const [accessToken, setAccessToken] = useState(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
//   const [isTrial, setIsTrial] = useState(true); // Assume trial by default

//   const [isCredentialsReady, setIsCredentialsReady] = useState(false); // Ensure credentials are ready before fetching data

//   // Function to check account type and set credentials
//   const checkAccountTypeAndSetCredentials = async (userId) => {
//     try {
//       const userDocRef = doc(db, "users", userId);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const isTrialAccount = userDoc.data().isTrial;
//         setIsTrial(isTrialAccount);

//         if (!isTrialAccount) {
//           // Real account, fetch encrypted credentials from Firebase
//           console.log("Real account detected. Fetching credentials from Firebase.");
//           const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
//           const connectionDoc = await getDoc(connectionDocRef);
//           if (connectionDoc.exists()) {
//             const encryptedData = connectionDoc.data().data;
//             const decryptedData = decryptData(encryptedData);
//             setWhatsappBusinessAccountId(decryptedData.businessPhoneNumberId || process.env.NEXT_PUBLIC_BUSSINESS_ID);
//             setAccessToken(decryptedData.accessToken || process.env.NEXT_PUBLIC_ACCESS_TOKEN);
//             console.log("Credentials from Firebase applied:", decryptedData);
//           }
//         } else {
//           // Trial account, use credentials from .env
//           console.log("Trial account detected. Using credentials from .env.");
//         }
//       }
//     } catch (error) {
//       console.error("Error checking account type or fetching credentials:", error);
//     } finally {
//       // Mark credentials as ready
//       setIsCredentialsReady(true);
//     }
//   };

//   // Show error modal
//   const handleError = (errorMessage, errorDetails = "") => {
//     setModalMessage(errorMessage);
//     setModalErrorDetails(errorDetails); // Show detailed API response in modal
//     setShowModal(true);
//   };

//   // Close error modal
//   const closeModal = () => {
//     setShowModal(false);
//   };

//   // Fetch Message Analytics Data
//   const fetchMessageAnalyticsData = async () => {
//     try {
//       const startTime = new Date(messageStartDate).getTime() / 1000;
//       const endTime = new Date(messageEndDate).getTime() / 1000;

//       const messageResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
//             access_token: accessToken,
//           },
//         }
//       );
//       // Set the new message data
//       setMessageData(messageResponse.data.analytics.data_points);
//     } catch (error) {
//       console.error("Error fetching message analytics data:", error.response);
//       setMessageData([]); // Clear data on error
//       handleError(
//         "Error fetching message analytics data. Please try again later.",
//         error.response ? `${error.response.status}: ${error.response.statusText} - ${error.response.data.error.message}` : "No response from the server."
//       );
//     }
//   };

//   // Fetch Conversation Analytics Data
//   const fetchConversationAnalyticsData = async () => {
//     try {
//       const startTime = new Date(conversationStartDate).getTime() / 1000;
//       const endTime = new Date(conversationEndDate).getTime() / 1000;

//       const conversationResponse = await axios.get(
//         `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
//         {
//           params: {
//             fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
//             access_token: accessToken,
//           },
//         }
//       );
//       const dataPoints = conversationResponse.data.conversation_analytics.data[0].data_points;

//       // Calculate category totals
//       const categoryTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_category] = (acc[dp.conversation_category] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate type totals
//       const typeTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_type] = (acc[dp.conversation_type] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Calculate conversation direction totals
//       const directionTotals = dataPoints.reduce((acc, dp) => {
//         acc[dp.conversation_direction] = (acc[dp.conversation_direction] || 0) + dp.conversation;
//         return acc;
//       }, {});

//       // Update the state
//       setConversationData(dataPoints);
//       setCategoryTotals(categoryTotals);
//       setTypeTotals(typeTotals);
//       setConversationDirections(directionTotals);
//     } catch (error) {
//       console.error("Error fetching conversation analytics data:", error.response);
//       // Clear the data in case of an error
//       setConversationData([]);
//       setCategoryTotals({});
//       setTypeTotals({});
//       setConversationDirections({});
//       handleError(
//         "Error fetching message analytics data. Please try again later.",
//         error.response ? `${error.response.status}: ${error.response.statusText} - ${error.response.data.error.message}` : "No response from the server."
//       );
//     }
//   };

//   // Initial Effect: Check Account Type and Credentials
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log(`User logged in: ${user.uid}`);
//         checkAccountTypeAndSetCredentials(user.uid);
//       } else {
//         console.log("No user logged in.");
//       }
//     });
//   }, []);

//   // Fetch Data once credentials are ready
//   useEffect(() => {
//     if (isCredentialsReady) {
//       fetchMessageAnalyticsData();
//       fetchConversationAnalyticsData();
//     }
//   }, [isCredentialsReady, messageStartDate, messageEndDate, conversationStartDate, conversationEndDate, whatsappBusinessAccountId, accessToken]);

//   // Total calculations
//   const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
//   const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
//   const totalConversations = conversationData.reduce((sum, dp) => sum + dp.conversation, 0);
//   const totalCost = conversationData.reduce((sum, dp) => sum + dp.cost, 0).toFixed(2);

//   return (
//     <div className="container mx-auto p-6">
//       {/* Modal for showing error */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-black bg-opacity-50 absolute inset-0"></div>
//           <div className="bg-white rounded-lg p-6 z-10 max-w-lg mx-auto">
//             <h2 className="text-2xl font-semibold mb-4">Error</h2>
//             <p className="mb-4">{modalMessage}</p>
//             {modalErrorDetails && (
//               <p className="mb-4 text-sm text-red-600">
//                 <strong>Details:</strong> {modalErrorDetails}
//               </p>
//             )}
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <h1 className="text-3xl font-bold mb-6 text-center pb-2" style={{ fontFamily: "LeagueSpartanBold, sans-serif", fontSize: 30 }}>
//         WhatsApp Analytics Dashboard
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Conversation Analytics Card */}
//         <div className="bg-gradient-to-r from-blue-300 via-cyan-500 to-blue-500 p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//             Conversation Analytics
//           </h2>
//           <div className="grid grid-cols-2 gap-4 pt-6">
//             <div>
//               <label className="block mb-1 text-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Start Date:
//               </label>
//               <input
//                 type="datetime-local"
//                 value={conversationStartDate}
//                 onChange={(e) => setConversationStartDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 End Date:
//               </label>
//               <input
//                 type="datetime-local"
//                 value={conversationEndDate}
//                 onChange={(e) => setConversationEndDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchConversationAnalyticsData}
//               className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
//               style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setConversationStartDate(getLastMonthDateTime());
//                 setConversationEndDate(getCurrentDateTime());
//               }}
//               className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//               style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Total Conversations:
//               </p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 {totalConversations}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Total Cost:
//               </p>
//               <p className="text-3xl font-bold text-yellow-300 text-shadow-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 ${totalCost}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Message Analytics Card with Modern UI */}
//         <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//             Message Analytics
//           </h2>
//           <div className="grid grid-cols-2 pt-6 gap-4">
//             <div>
//               <label className="block mb-1 text-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Start Date:
//               </label>
//               <input
//                 type="datetime-local"
//                 value={messageStartDate}
//                 onChange={(e) => setMessageStartDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 End Date:
//               </label>
//               <input
//                 type="datetime-local"
//                 value={messageEndDate}
//                 onChange={(e) => setMessageEndDate(e.target.value)}
//                 className="text-black p-2 rounded-lg w-full"
//               />
//             </div>
//           </div>
//           <div className="flex space-x-2 mt-4">
//             <button
//               onClick={fetchMessageAnalyticsData}
//               className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
//               style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={() => {
//                 setMessageStartDate(getLastMonthDateTime());
//                 setMessageEndDate(getCurrentDateTime());
//               }}
//               className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
//               style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//             >
//               Set to Current
//             </button>
//           </div>
//           <div className="mt-6">
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Total Messages Sent:
//               </p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 {totalSent}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p className="text-lg font-bold" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 Total Messages Delivered:
//               </p>
//               <p className="text-3xl font-bold text-shadow-sm" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//                 {totalDelivered}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pass data to CategoryTypeCards component */}
//       <CategoryTypeCards
//         categoryTotals={categoryTotals}
//         typeTotals={typeTotals}
//         conversationDirections={conversationDirections}
//         totalConversations={totalConversations}
//         totalCost={totalCost}
//         totalSent={totalSent}
//         totalDelivered={totalDelivered}
//       />
//     </div>
//   );
// };

// export default AnalyticsDashboard;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryTypeCards from "./CategoryTypeCards";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Use this for redirecting
import CryptoJS from "crypto-js";

// Utility functions to convert dates to IST
const toIST = (date) => {
  const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(date.getTime() + offset).toISOString().slice(0, 16);
};

const getLastMonthDateTime = () => {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  return toIST(lastMonth);
};

const getCurrentDateTime = () => {
  const now = new Date();
  return toIST(now);
};

// Decrypt encrypted data using a key
const decryptData = (cipherText) => {
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const AnalyticsDashboard = () => {
  // Router for navigation
  const router = useRouter();

  // State variables
  const [messageStartDate, setMessageStartDate] = useState(
    getLastMonthDateTime()
  );
  const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
  const [messageGranularity, setMessageGranularity] = useState("DAY");
  const [messageData, setMessageData] = useState([]);

  const [conversationStartDate, setConversationStartDate] = useState(
    getLastMonthDateTime()
  );
  const [conversationEndDate, setConversationEndDate] = useState(
    getCurrentDateTime()
  );
  const [conversationGranularity, setConversationGranularity] =
    useState("DAILY");
  const [conversationData, setConversationData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [typeTotals, setTypeTotals] = useState({});
  const [conversationDirections, setConversationDirections] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState(""); // Default currency symbol
  const [businessName, setBusinessName] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalErrorDetails, setModalErrorDetails] = useState(""); // For detailed API error response
  // State for credentials and trial check
  const [whatsappBusinessAccountId, setWhatsappBusinessAccountId] =
    useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isTrial, setIsTrial] = useState(true); // Assume trial by default

  const [isCredentialsReady, setIsCredentialsReady] = useState(false); // Ensure credentials are ready before fetching data

  const [isConversationInfoModalOpen, setIsConversationInfoModalOpen] =
    useState(false);

  // Modal state for Message Analytics Info
  const [isMessageInfoModalOpen, setIsMessageInfoModalOpen] = useState(false);

  // Function to check account type and set credentials
  const checkAccountTypeAndSetCredentials = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const isTrialAccount = userDoc.data().isTrial;
        setIsTrial(isTrialAccount);

        if (!isTrialAccount) {
          // Real account, fetch encrypted credentials from Firebase
          console.log(
            "Real account detected. Fetching credentials from Firebase."
          );
          const connectionDocRef = doc(
            db,
            "users",
            userId,
            "documents",
            "connectionData"
          );
          const connectionDoc = await getDoc(connectionDocRef);
          if (connectionDoc.exists()) {
            const encryptedData = connectionDoc.data().data;
            const decryptedData = decryptData(encryptedData);
            setWhatsappBusinessAccountId(decryptedData.businessPhoneNumberId);
            setAccessToken(decryptedData.accessToken);
            console.log("Credentials from Firebase applied:", decryptedData);
            setIsCredentialsReady(true); // Credentials are ready
          } else {
            // If the real account has no connection data, redirect to connection page
            router.push(`/dashboard/${userId}/connection`);
          }
        } else {
          // Trial account, use credentials from .env
          console.log("Trial account detected. Using credentials from .env.");
          setWhatsappBusinessAccountId(process.env.NEXT_PUBLIC_BUSSINESS_ID);
          setAccessToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
          setIsCredentialsReady(true); // Credentials are ready for trial accounts
        }
      }
    } catch (error) {
      console.error(
        "Error checking account type or fetching credentials:",
        error
      );
      setIsCredentialsReady(false);
      handleError(
        "Error checking account details. Please try again later.",
        error.message
      );
    }
  };

  // Show error modal
  const handleError = (errorMessage, errorDetails = "") => {
    setModalMessage(errorMessage);
    setModalErrorDetails(errorDetails); // Show detailed API response in modal
    setShowModal(true);
  };

  // Close error modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch currency data and set currency symbol
const fetchCurrencyData = async () => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${whatsappBusinessAccountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Use correct header for access token
        },
        params: {
          fields: "currency,name", // Only request the currency field
        },
      }
    );

    const currency = response.data.currency;
    const name= response.data.name;
    console.log(currency);
    

    // Set the currency symbol based on the response
    if (currency === "USD") {
      setCurrencySymbol("$");
    } else if (currency === "INR") {
      setCurrencySymbol("₹");
      console.log(currencySymbol)
    } else {
      setCurrencySymbol(currency); // Default to currency code if symbol is unknown
    }

    setBusinessName(name);

  } catch (error) {
    console.error("Error fetching currency data:", error.response);
  }
};


  // Fetch Message Analytics Data
  const fetchMessageAnalyticsData = async () => {
    try {
      const startTime = new Date(messageStartDate).getTime() / 1000;
      const endTime = new Date(messageEndDate).getTime() / 1000;

      const messageResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
            access_token: accessToken,
          },
        }
      );
      // Set the new message data
      setMessageData(messageResponse.data.analytics.data_points);
    } catch (error) {
      console.error("Error fetching message analytics data:", error.response);
      setMessageData([]); // Clear data on error
      handleError(
        "Error fetching message analytics data. Please try again later.",
        error.response
          ? `${error.response.status}: ${error.response.statusText} - ${error.response.data.error.message}`
          : "No response from the server."
      );
    }
  };

  // Fetch Conversation Analytics Data
  const fetchConversationAnalyticsData = async () => {
    try {
      const startTime = new Date(conversationStartDate).getTime() / 1000;
      const endTime = new Date(conversationEndDate).getTime() / 1000;

      const conversationResponse = await axios.get(
        `https://graph.facebook.com/v21.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
            access_token: accessToken,
          },
        }
      );
      const dataPoints =
        conversationResponse.data.conversation_analytics.data[0].data_points;

      // Calculate category totals
      const categoryTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_category] =
          (acc[dp.conversation_category] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate type totals
      const typeTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_type] =
          (acc[dp.conversation_type] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate conversation direction totals
      const directionTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_direction] =
          (acc[dp.conversation_direction] || 0) + dp.conversation;
        return acc;
      }, {});

      // Update the state
      setConversationData(dataPoints);
      setCategoryTotals(categoryTotals);
      setTypeTotals(typeTotals);
      setConversationDirections(directionTotals);
    } catch (error) {
      console.error(
        "Error fetching conversation analytics data:",
        error.response
      );
      // Clear the data in case of an error
      setConversationData([]);
      setCategoryTotals({});
      setTypeTotals({});
      setConversationDirections({});
      handleError(
        "Error fetching conversation analytics data. Please try again later.",
        error.response
          ? `${error.response.status}: ${error.response.statusText} - ${error.response.data.error.message}`
          : "No response from the server."
      );
    }
  };

  // Initial Effect: Check Account Type and Credentials
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User logged in: ${user.uid}`);
        checkAccountTypeAndSetCredentials(user.uid);
      } else {
        console.log("No user logged in.");
      }
    });
  }, []);

  // Fetch Data once credentials are ready
  useEffect(() => {
    if (isCredentialsReady) {
      fetchMessageAnalyticsData();
      fetchCurrencyData();
      fetchConversationAnalyticsData();  
    }
  }, [
    isCredentialsReady,
    messageStartDate,
    messageEndDate,
    conversationStartDate,
    conversationEndDate,
    whatsappBusinessAccountId,
    accessToken,
  ]);

  // Total calculations
  const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
  const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
  const totalConversations = conversationData.reduce(
    (sum, dp) => sum + dp.conversation,
    0
  );
  const totalCost = conversationData
    .reduce((sum, dp) => sum + dp.cost, 0)
    .toFixed(2);

  // Function to open Conversation Analytics Info Modal
  const handleOpenConversationInfoModal = () => {
    setIsConversationInfoModalOpen(true);
  };

  // Function to close Conversation Analytics Info Modal
  const handleCloseConversationInfoModal = () => {
    setIsConversationInfoModalOpen(false);
  };

  // Function to open Message Analytics Info Modal
  const handleOpenMessageInfoModal = () => {
    setIsMessageInfoModalOpen(true);
  };

  // Function to close Message Analytics Info Modal
  const handleCloseMessageInfoModal = () => {
    setIsMessageInfoModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Modal for showing error */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-6 z-10 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p className="mb-4">{modalMessage}</p>
            {modalErrorDetails && (
              <p className="mb-4 text-sm text-red-600">
                <strong>Details:</strong> {modalErrorDetails}
              </p>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1
        className="text-3xl font-bold mb-6 text-center pb-2"
        style={{ fontFamily: "LeagueSpartanBold, sans-serif", fontSize: 30 }}
      >
        <strong className="text-blue-500">{businessName}</strong> Analytics Dashboard 
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conversation Analytics Card */}
        <div className="bg-gradient-to-r from-blue-300 via-cyan-500 to-blue-500 p-6 rounded-2xl shadow-md">
          <h2
            className="text-2xl font-semibold mb-4 flex text-center"
            style={{ fontFamily: "LeagueSpartan, sans-serif" }}
          >
            Conversation Analytics
            <button
              onClick={handleOpenConversationInfoModal}
              className="ml-2 mt-1 text-white hover:text-blue-700 focus:outline-none"
              aria-label="Template Analytics Information"
            >
              <span className="material-icons">help_outline</span>
            </button>
          </h2>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div>
              <label
                className="block mb-1 text-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Start Date:
              </label>
              <input
                type="datetime-local"
                value={conversationStartDate}
                onChange={(e) => setConversationStartDate(e.target.value)}
                className="text-black p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                End Date:
              </label>
              <input
                type="datetime-local"
                value={conversationEndDate}
                onChange={(e) => setConversationEndDate(e.target.value)}
                className="text-black p-2 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={fetchConversationAnalyticsData}
              className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setConversationStartDate(getLastMonthDateTime());
                setConversationEndDate(getCurrentDateTime());
              }}
              className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Set to Current
            </button>
          </div>
          <div className="mt-6">
            <div className="mb-4">
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Total Conversations:
              </p>
              <p
                className="text-3xl font-bold text-shadow-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                {totalConversations}
              </p>
            </div>
            <div className="mb-4">
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Total Cost:
              </p>
              <p
                className="text-3xl font-bold text-yellow-300 text-shadow-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                {currencySymbol} {totalCost}
              </p>
              <p style={{ fontFamily: "LeagueSpartan, sans-serif" }} className="pt-2">For Payment <a href="https://business.facebook.com/billing_hub/accounts/details/business_id=" className="text-white underline pl-1"> Click here</a></p>
            </div>
          </div>

          {isConversationInfoModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 pt-9 pb-9">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto ">
                <h3 className="text-xl font-bold mb-4">
                  Conversation Analytics Information
                </h3>

                <p className="mb-2">
                  The Conversation Analytics provides cost and conversation
                  information for a specific WhatsApp Business Account (WABA).
                </p>
                <p className="mb-2">
                  Given a time range, you can obtain conversation and cost
                  information associated with your WABA. If desired, you can
                  filter and break down your results for more detailed insights.
                </p>
                <p className="mb-2">
                  Analytics data is approximate and may differ from what’s shown
                  on invoices due to minor variations in data processing.
                </p>
                <p className="mb-2">
                  <strong>Note:</strong> 1 conversation equals 24 hours.
                </p>

                {/* Conversation Categories */}
                <h4 className="text-lg font-semibold mb-2">
                  Conversation Categories
                </h4>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <strong>Marketing:</strong> Goals range from generating
                    awareness to driving sales. Examples include product
                    announcements, promotions, and cart reminders.
                  </li>
                  <li>
                    <strong>Utility:</strong> Follows up on user actions.
                    Examples include order updates, delivery tracking, or
                    account alerts.
                  </li>
                  <li>
                    <strong>Authentication:</strong> Sends one-time passcodes
                    for verifying user identity.
                  </li>
                  <li>
                    <strong>Service:</strong> Resolves customer inquiries opened
                    with non-template messages.
                  </li>
                </ul>

                {/* Opening Conversations */}
                <h4 className="text-lg font-semibold mb-2">
                  Opening Conversations
                </h4>
                <p className="mb-2">
                  Conversations are opened when you send a message under certain
                  conditions. Here&apos;s how different categories work:
                </p>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Marketing, Utility, and Authentication conversations are
                    opened when an approved template is sent, lasting 24 hours.
                  </li>
                  <li>
                    Service conversations are opened when a non-template message
                    is sent, also lasting 24 hours.
                  </li>
                </ul>

                {/* Free Entry Point Conversations */}
                <h4 className="text-lg font-semibold mb-2">
                  Free Entry Point Conversations
                </h4>
                <p className="mb-2">
                  These are triggered when a customer messages you via Click to
                  WhatsApp Ad or Facebook CTA and you respond within 24 hours.
                  It lasts 72 hours.
                </p>

                {/* Rates */}
                <h4 className="text-lg font-semibold mb-2">Rates</h4>
                <p className="mb-2">
                  Rates vary based on conversation category and country/region.
                  Check the rate card for specific details.
                </p>

                {/* Rate Cards Section */}
                <h4 className="text-lg font-semibold mb-2">Rate Cards</h4>
                <p className="mb-2">
                  These rate cards represent the current rates on our platform.
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461319948_481132811590294_6041648812712871532_n.csv?_nc_cat=109&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=AD0fi8ouNisQ7kNvgG1D1RN&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYB0TzZb5PrpPwbjyaLQbklMAXa8YcjgCLPQfGapYEJ4pg&oe=67119BFD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in USD
                  </a>
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461619190_452267231168943_5995671648136818146_n.csv?_nc_cat=104&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=Yip-9Kr3UasQ7kNvgGbWSVg&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYBXG4H1mvj5lS_VtHJhdcPwaJkg5ljtcCu7NTJjQH826A&oe=6711A6B9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in INR
                  </a>
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461692953_1195150554905962_5556612969153086332_n.csv?_nc_cat=107&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=lFd2sGSVBrYQ7kNvgEdjhLe&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYDeJFT-K3AAYviY39M-s9jt3flPhX9ccWGDsoLv06bCRQ&oe=6711B164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in IDR
                  </a>
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461505544_921549799817214_3043844970179674970_n.csv?_nc_cat=111&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=dksTrw3AmOoQ7kNvgGQkKiG&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYD8ACyRZeforYirSqYUy4JmaAgpLzjK3EKhxJEZlncyWQ&oe=6711A174"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in EUR
                  </a>
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461647208_1957085948078616_3142675182361642327_n.csv?_nc_cat=104&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=3nXr9HPiME0Q7kNvgE-RQwF&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYCjLFz3BYVbrnRzDOmqGQ0XitDtUL65niucYcZMBJIC0w&oe=6711C326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in GBP
                  </a>
                </p>
                <p className="mb-2">
                  <a
                    href="https://scontent.fccj9-1.fna.fbcdn.net/v/t39.8562-6/461678834_1070023201368501_1036350478274806250_n.csv?_nc_cat=104&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=z3H0GiCOI6gQ7kNvgGe-fAD&_nc_zt=14&_nc_ht=scontent.fccj9-1.fna&_nc_gid=AMUo9qIM0bIhp-nBeH3qnJq&oh=00_AYBPbXFFEKZyw_P1Rv7-9zCKM8bydUtjQojCNx-x8Crmg&oe=6711C05C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Rates in MYR
                  </a>
                </p>

                {/* New Information Section */}
                <h4 className="text-lg font-semibold mb-2">
                  Authentication-International Rates
                </h4>
                <p className="mb-2">
                  Starting from June 1, 2024, we are introducing
                  authentication-international rates. These rates may apply to
                  your account if you’re operating cross-border authentication
                  services. For more information, visit{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Authentication-International Rates
                  </a>
                  .
                </p>

                <h4 className="text-lg font-semibold mb-2">
                  Updates to Rate Cards
                </h4>
                <p className="mb-2">
                  We are constantly updating our rate cards to keep up with
                  changing trends and demands. Below are the key updates:
                </p>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <strong>Utility Conversation Rates:</strong> Effective
                    August 1, 2024, we have reduced rates to remain competitive
                    with alternative platforms. This change encourages
                    businesses to utilize WhatsApp for end-to-end post-purchase
                    customer journeys.
                  </li>
                  <li>
                    <strong>Marketing Conversation Rates:</strong> Effective
                    October 1, 2024, we adjusted marketing conversation rates in
                    several markets as part of more frequent updates. This
                    ensures that our pricing reflects the demand and value
                    marketing messages deliver.
                  </li>
                </ul>

                <h4 className="text-lg font-semibold mb-2">Billing</h4>
                <p className="mb-2">
                  Billing and billing-related actions are managed through Meta
                  Business Suite. For more detailed information about billing on
                  your WhatsApp Business Account, visit{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    About Billing For Your WhatsApp Business Account
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn more about billing
                  </a>
                  .
                </p>

                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    onClick={handleCloseConversationInfoModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Analytics Card with Modern UI */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  p-6 rounded-2xl shadow-lg">
          <h2
            className="text-2xl font-semibold mb-4 flex text-center"
            style={{ fontFamily: "LeagueSpartan, sans-serif" }}
          >
            Message Analytics
            <button
              onClick={handleOpenMessageInfoModal}
              className="ml-2 mt-1 text-white hover:text-blue-700 focus:outline-none"
              aria-label="Template Analytics Information"
            >
              <span className="material-icons">help_outline</span>
            </button>
          </h2>
          <div className="grid grid-cols-2 pt-6 gap-4">
            <div>
              <label
                className="block mb-1 text-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Start Date:
              </label>
              <input
                type="datetime-local"
                value={messageStartDate}
                onChange={(e) => setMessageStartDate(e.target.value)}
                className="text-black p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                End Date:
              </label>
              <input
                type="datetime-local"
                value={messageEndDate}
                onChange={(e) => setMessageEndDate(e.target.value)}
                className="text-black p-2 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={fetchMessageAnalyticsData}
              className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setMessageStartDate(getLastMonthDateTime());
                setMessageEndDate(getCurrentDateTime());
              }}
              className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Set to Current
            </button>
          </div>
          <div className="mt-6">
            <div className="mb-4">
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Total Messages Sent:
              </p>
              <p
                className="text-3xl font-bold text-shadow-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                {totalSent}
              </p>
            </div>
            <div className="mb-4">
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                Total Messages Delivered:
              </p>
              <p
                className="text-3xl font-bold text-shadow-sm"
                style={{ fontFamily: "LeagueSpartan, sans-serif" }}
              >
                {totalDelivered}
              </p>
            </div>
          </div>

          {/* Modal for Conversation Analytics Info */}
          {/* Modal for Message Analytics Info */}
          {isMessageInfoModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <h3 className="text-xl font-bold mb-4">
                  Message Analytics Information
                </h3>
                <p className="mb-2">
                  The Analytics field provides the number and type of messages
                  sent and delivered by the phone numbers associated with a
                  specific WhatsApp Business Account (WABA).
                </p>
                <p className="mb-2">
                  You can view the total number of messages sent and delivered
                  within a particular time frame.
                </p>
                <p className="mb-2">
                  By default, it displays data from the last month. You can
                  adjust the start and end dates for filtering to customize the
                  analytics data you view.
                </p>
                <p className="mb-2">
                  There may be some variations in the data, as it takes some
                  time to generate analytics after messages are sent.
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                  onClick={handleCloseMessageInfoModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pass data to CategoryTypeCards component */}
      <CategoryTypeCards
        categoryTotals={categoryTotals}
        typeTotals={typeTotals}
        conversationDirections={conversationDirections}
        totalConversations={totalConversations}
        totalCost={totalCost}
        totalSent={totalSent}
        currency={currencySymbol}
        totalDelivered={totalDelivered}
      />
    </div>
  );
};



export default AnalyticsDashboard;
