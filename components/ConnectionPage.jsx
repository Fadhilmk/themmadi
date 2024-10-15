// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import CryptoJS from "crypto-js";
// import { FaCopy } from "react-icons/fa";

// const ConnectionPage = ({ userId }) => {
//   const [accessToken, setAccessToken] = useState("");
//   const [verifyToken, setVerifyToken] = useState("");
//   const [phoneNumberId, setPhoneNumberId] = useState("");
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
//   const [webhookUrl] = useState(`https://themmadi.onrender.com/api/webhook/${userId}`); // Dynamic URL
//   const router = useRouter();

//   // Encryption function
//   const encryptData = (data) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     console.log('Encryption Key:', secretKey); // Add this line
//     if (!secretKey) {
//       throw new Error('Encryption key is not defined');
//     }
//     return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   };
//   // Decryption function
//   const decryptData = (cipherText) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   };

//   // Load encrypted data from Firebase on component mount
//   useEffect(() => {
//     const loadEncryptedData = async () => {
//       try {
//         const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//           const encryptedData = docSnap.data().data;
//           const decryptedData = decryptData(encryptedData);

//           setAccessToken(decryptedData.accessToken || "");
//           setVerifyToken(decryptedData.verifyToken || "");
//           setPhoneNumberId(decryptedData.phoneNumberId || "");
//           setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
//         } else {
//           console.error("No encrypted data found!");
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };

//     loadEncryptedData();
//   }, [userId]);

//   const handleSave = async () => {
//     const encryptedData = encryptData({
//       accessToken,
//       verifyToken,
//       phoneNumberId,
//       businessPhoneNumberId,
//     });

//     try {
//       const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//       await setDoc(userDocRef, { data: encryptedData });

//       // Optionally redirect or show success message
//       router.push("/dashboard"); // Redirect to another page if needed
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(webhookUrl).then(
//       () => alert("Webhook URL copied to clipboard!"),
//       (err) => console.error("Failed to copy: ", err)
//     );
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Connection Settings</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Access Token</label>
//           <input
//             type="text"
//             value={accessToken}
//             onChange={(e) => setAccessToken(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Verify Token</label>
//           <input
//             type="text"
//             value={verifyToken}
//             onChange={(e) => setVerifyToken(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
//           <input
//             type="text"
//             value={phoneNumberId}
//             onChange={(e) => setPhoneNumberId(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Business Phone Number ID</label>
//           <input
//             type="text"
//             value={businessPhoneNumberId}
//             onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4 relative flex items-center">
//           <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
//           <input
//             type="text"
//             value={webhookUrl}
//             readOnly
//             className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
//           />
//           <FaCopy
//             onClick={copyToClipboard}
//             className="absolute right-2 top-4 text-gray-500 cursor-pointer"
//             size={20}
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ConnectionPage;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import CryptoJS from "crypto-js";
// import { FaCopy } from "react-icons/fa";

// const ConnectionPage = ({ userId }) => {
//   const [accessToken, setAccessToken] = useState("");
//   const [verifyToken, setVerifyToken] = useState("");
//   const [phoneNumberId, setPhoneNumberId] = useState("");
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
//   const [webhookUrl] = useState(`https://themmadi.onrender.com/api/webhook/${userId}`); // Dynamic URL
//   const router = useRouter();

//   // Encryption function
//   const encryptData = (data) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     console.log('Encryption Key:', secretKey); // Add this line
//     if (!secretKey) {
//       throw new Error('Encryption key is not defined');
//     }
//     return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   };
//   // Decryption function
//   const decryptData = (cipherText) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   };

//   // Load encrypted data from Firebase on component mount
//   useEffect(() => {
//     const loadEncryptedData = async () => {
//       try {
//         const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//           const encryptedData = docSnap.data().data;
//           const decryptedData = decryptData(encryptedData);

//           setAccessToken(decryptedData.accessToken || "");
//           setVerifyToken(decryptedData.verifyToken || "");
//           setPhoneNumberId(decryptedData.phoneNumberId || "");
//           setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
//         } else {
//           console.error("No encrypted data found!");
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };

//     loadEncryptedData();
//   }, [userId]);

//   const handleSave = async () => {
//     const encryptedData = encryptData({
//       accessToken,
//       verifyToken,
//       phoneNumberId,
//       businessPhoneNumberId,
//     });

//     try {
//       const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//       await setDoc(userDocRef, { data: encryptedData });

//       // Optionally redirect or show success message
//       router.push("/dashboard"); // Redirect to another page if needed
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(webhookUrl).then(
//       () => alert("Webhook URL copied to clipboard!"),
//       (err) => console.error("Failed to copy: ", err)
//     );
//   };

//   return (
//     <div className="p-6 m-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:25}}>Connection Settings</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Access Token</label>
//           <input
//             type="text"
//             value={accessToken}
//             onChange={(e) => setAccessToken(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Verify Token</label>
//           <input
//             type="text"
//             value={verifyToken}
//             onChange={(e) => setVerifyToken(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Phone Number ID</label>
//           <input
//             type="text"
//             value={phoneNumberId}
//             onChange={(e) => setPhoneNumberId(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Business Phone Number ID</label>
//           <input
//             type="text"
//             value={businessPhoneNumberId}
//             onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4 relative items-center">
//           <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Webhook URL</label>
//           <input
//             type="text"
//             value={webhookUrl}
//             readOnly
//             className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
//             style={{fontFamily: "LeagueSpartan, sans-serif"}}
//           />
//           <FaCopy
//             onClick={copyToClipboard}
//             className="absolute right-2 top-8 text-gray-500 cursor-pointer"
//             size={20}
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleSave}
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//           style={{fontFamily: "LeagueSpartan, sans-serif"}}
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ConnectionPage;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import CryptoJS from "crypto-js";
// import { FaCopy, FaLock } from "react-icons/fa";

// const ConnectionPage = ({ userId }) => {
//   const [accessToken, setAccessToken] = useState("");
//   const [verifyToken, setVerifyToken] = useState("");
//   const [phoneNumberId, setPhoneNumberId] = useState("");
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
//   const [isTrial, setIsTrial] = useState(true); // Assume trial by default
//   const [webhookUrl] = useState(`https://maadiy.com//api/webhook/${userId}`); // Dynamic URL
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // To show loading while fetching data

//   // Encryption function
//   const encryptData = (data) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     if (!secretKey) {
//       throw new Error('Encryption key is not defined');
//     }
//     return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   };

//   // Decryption function
//   const decryptData = (cipherText) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   };

//   // Load user account data and connection data from Firebase
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         // Fetch the isTrial status of the user
//         const userDocRef = doc(db, "users", userId);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           setIsTrial(userDoc.data().isTrial || false); // Set the trial status
//         } else {
//           console.error("User document not found!");
//         }

//         // Only fetch connection data if the account is not a trial account
//         if (!userDoc.data().isTrial) {
//           const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
//           const connectionDoc = await getDoc(connectionDocRef);

//           if (connectionDoc.exists()) {
//             const encryptedData = connectionDoc.data().data;
//             const decryptedData = decryptData(encryptedData);

//             setAccessToken(decryptedData.accessToken || "");
//             setVerifyToken(decryptedData.verifyToken || "");
//             setPhoneNumberId(decryptedData.phoneNumberId || "");
//             setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
//           } else {
//             console.error("No encrypted connection data found!");
//           }
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setLoading(false); // Data loaded, hide the loader
//       }
//     };

//     loadUserData();
//   }, [userId]);

//   const handleSave = async () => {
//     const encryptedData = encryptData({
//       accessToken,
//       verifyToken,
//       phoneNumberId,
//       businessPhoneNumberId,
//     });

//     try {
//       const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//       await setDoc(userDocRef, { data: encryptedData });

//       // Optionally redirect or show success message
//       // router.push("/dashboard"); // Redirect to another page if needed

//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(webhookUrl).then(
//       () => alert("Webhook URL copied to clipboard!"),
//       (err) => console.error("Failed to copy: ", err)
//     );
//   };

//   // Show loading spinner while data is being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 m-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:25}}>
//         Connection Settings
//       </h2>

//       {/* Render this form only if the account is not in trial */}
//       {!isTrial ? (
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Access Token
//             </label>
//             <input
//               type="text"
//               value={accessToken}
//               onChange={(e) => setAccessToken(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Verify Token
//             </label>
//             <input
//               type="text"
//               value={verifyToken}
//               onChange={(e) => setVerifyToken(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Phone Number ID
//             </label>
//             <input
//               type="text"
//               value={phoneNumberId}
//               onChange={(e) => setPhoneNumberId(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Business Phone Number ID
//             </label>
//             <input
//               type="text"
//               value={businessPhoneNumberId}
//               onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4 relative items-center">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Webhook URL
//             </label>
//             <input
//               type="text"
//               value={webhookUrl}
//               readOnly
//               className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             />
//             <FaCopy
//               onClick={copyToClipboard}
//               className="absolute right-2 top-8 text-gray-500 cursor-pointer"
//               size={20}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleSave}
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//             style={{fontFamily: "LeagueSpartan, sans-serif"}}
//           >
//             Save
//           </button>
//         </form>
//       ) : (
//         // Display masked fields and a message for trial accounts
//         <div className="text-gray-500" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//           <p>This is a trial account. Upgrade to access connection settings.</p>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Access Token</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Verify Token</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Bussiness Phone Number ID</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConnectionPage;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import CryptoJS from "crypto-js";
// import { FaCopy, FaLock } from "react-icons/fa";

// const ConnectionPage = ({ userId }) => {
//   const [accessToken, setAccessToken] = useState("");
//   const [verifyToken, setVerifyToken] = useState("");
//   const [phoneNumberId, setPhoneNumberId] = useState("");
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
//   const [isTrial, setIsTrial] = useState(true); // Assume trial by default
//   const [webhookUrl] = useState(`https://maadiy.com//api/webhook/${userId}`); // Dynamic URL
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // To show loading while fetching data

//   // Encryption function
//   const encryptData = (data) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     if (!secretKey) {
//       throw new Error('Encryption key is not defined');
//     }
//     return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//   };

//   // Decryption function
//   const decryptData = (cipherText) => {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   };

//   // Load user account data and connection data from Firebase
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         // Fetch the isTrial status of the user
//         const userDocRef = doc(db, "users", userId);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           setIsTrial(userDoc.data().isTrial || false); // Set the trial status
//         } else {
//           console.error("User document not found!");
//         }

//         // Only fetch connection data if the account is not a trial account
//         if (!userDoc.data().isTrial) {
//           const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
//           const connectionDoc = await getDoc(connectionDocRef);

//           if (connectionDoc.exists()) {
//             const encryptedData = connectionDoc.data().data;
//             const decryptedData = decryptData(encryptedData);

//             setAccessToken(decryptedData.accessToken || "");
//             setVerifyToken(decryptedData.verifyToken || "");
//             setPhoneNumberId(decryptedData.phoneNumberId || "");
//             setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
//           } else {
//             console.error("No encrypted connection data found!");
//           }
//         }
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setLoading(false); // Data loaded, hide the loader
//       }
//     };

//     loadUserData();
//   }, [userId]);

//   const handleSave = async () => {
//     const encryptedData = encryptData({
//       accessToken,
//       verifyToken,
//       phoneNumberId,
//       businessPhoneNumberId,
//     });

//     try {
//       const userDocRef = doc(db, "users", userId, "documents", "connectionData");
//       await setDoc(userDocRef, { data: encryptedData });

//       // Optionally redirect or show success message
//       // router.push("/dashboard"); // Redirect to another page if needed

//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(webhookUrl).then(
//       () => alert("Webhook URL copied to clipboard!"),
//       (err) => console.error("Failed to copy: ", err)
//     );
//   };

//   // Show loading spinner while data is being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 m-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:25}}>
//         Connection Settings
//       </h2>

//       {/* Render this form only if the account is not in trial */}
//       {!isTrial ? (
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Access Token
//             </label>
//             <input
//               type="text"
//               value={accessToken}
//               onChange={(e) => setAccessToken(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Verify Token
//             </label>
//             <input
//               type="text"
//               value={verifyToken}
//               onChange={(e) => setVerifyToken(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Phone Number ID
//             </label>
//             <input
//               type="text"
//               value={phoneNumberId}
//               onChange={(e) => setPhoneNumberId(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Business Phone Number ID
//             </label>
//             <input
//               type="text"
//               value={businessPhoneNumberId}
//               onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4 relative items-center">
//             <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               Webhook URL
//             </label>
//             <input
//               type="text"
//               value={webhookUrl}
//               readOnly
//               className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
//               style={{fontFamily: "LeagueSpartan, sans-serif"}}
//             />
//             <FaCopy
//               onClick={copyToClipboard}
//               className="absolute right-2 top-8 text-gray-500 cursor-pointer"
//               size={20}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleSave}
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//             style={{fontFamily: "LeagueSpartan, sans-serif"}}
//           >
//             Save
//           </button>
//         </form>
//       ) : (
//         // Display masked fields and a message for trial accounts
//         <div className="text-gray-500" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//           <p>This is a trial account. Upgrade to access connection settings.</p>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Access Token</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Verify Token</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Bussiness Phone Number ID</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value="***************"
//                 disabled
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
//               />
//               <FaLock className="absolute right-3 top-3 text-gray-500" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConnectionPage;

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { FaCopy, FaLock } from "react-icons/fa";

const ConnectionPage = ({ userId }) => {
  const [accessToken, setAccessToken] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
  const [isTrial, setIsTrial] = useState(true); // Assume trial by default
  const [webhookUrl] = useState(`https://maadiy.com/api/webhook/${userId}`); // Dynamic URL
  const [showModal, setShowModal] = useState(false);
  const verifyToken = "maadiy"; // Permanent token
  const [successMessage, setSuccessMessage] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // To show loading while fetching data

  // Encryption function
  const encryptData = (data) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    if (!secretKey) {
      throw new Error("Encryption key is not defined");
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  // Decryption function
  const decryptData = (cipherText) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  // Load user account data and connection data from Firebase
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Fetch the isTrial status of the user
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setIsTrial(userDoc.data().isTrial || false); // Set the trial status
        } else {
          console.error("User document not found!");
        }

        // Only fetch connection data if the account is not a trial account
        if (!userDoc.data().isTrial) {
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

            setAccessToken(decryptedData.accessToken || "");
            setPhoneNumberId(decryptedData.phoneNumberId || "");
            setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");

            setInitialData({
              accessToken: decryptedData.accessToken || "",
              phoneNumberId: decryptedData.phoneNumberId || "",
              businessPhoneNumberId: decryptedData.businessPhoneNumberId || "",
            });

            // Initially, disable the Save button
            setSaveButtonDisabled(true);

          } else {
            console.error("No encrypted connection data found!");
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // Data loaded, hide the loader
      }
    };

    loadUserData();
  }, [userId]);

  useEffect(() => {
    if (
      accessToken !== initialData.accessToken ||
      phoneNumberId !== initialData.phoneNumberId ||
      businessPhoneNumberId !== initialData.businessPhoneNumberId
    ) {
      setSaveButtonDisabled(false); // Enable the Save button if any data has changed
    } else {
      setSaveButtonDisabled(true); // Disable the Save button if no data has changed
    }
  }, [accessToken, phoneNumberId, businessPhoneNumberId, initialData]);

  const handleSave = async () => {
    const encryptedData = encryptData({
      accessToken,
      verifyToken,
      phoneNumberId,
      businessPhoneNumberId,
    });

    try {
      const userDocRef = doc(
        db,
        "users",
        userId,
        "documents",
        "connectionData"
      );
      await setDoc(userDocRef, { data: encryptedData });

      setInitialData({ accessToken, phoneNumberId, businessPhoneNumberId });
      // Optionally redirect or show success message
      // router.push("/dashboard"); // Redirect to another page if needed
      setSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(
      () => alert("Copied to clipboard!"),
      (err) => console.error("Failed to copy: ", err)
    );
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 m-6 bg-white rounded-lg shadow-md">
      <h2
        className="text-xl font-semibold mb-4 flex"
        style={{ fontFamily: "LeagueSpartanBold, sans-serif", fontSize: 25 }}
      >
        Connection Settings
        <button
          onClick={() => setShowModal(true)} // Open modal on click
          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="Template Analytics Information"
        >
          <span className="material-icons">help_outline</span>
        </button>
      </h2>
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4 overflow-hidden">
            <h3
              className="text-lg font-bold mb-4"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Information
            </h3>
            <div
              className="space-y-4 max-h-[70vh] overflow-y-auto p-6"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              <p>
                <strong>Access Token</strong>: An access token is a temporary or
                permanent authorization code granted by a user or system to
                access protected resources, APIs, or services.
              </p>
              <p>
                <strong>Types:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>
                  Temporary Access Token: Valid for a short period (e.g., hours,
                  days).
                </li>
                <li>
                  Permanent Access Token: Valid indefinitely, until revoked.
                </li>
              </ul>
              <p>
                <strong>Creation:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>
                  User grants permission through OAuth 2.0 authorization flow.
                </li>
                <li>
                  System generates access token upon successful authorization.
                </li>
                <li>
                  Access token is stored securely (e.g., encrypted database).
                </li>
              </ul>
              <p>
                <strong>Uses:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Authenticate API requests.</li>
                <li>Authorize access to protected resources.</li>
                <li>Validate user identity.</li>
              </ul>

              <p>
                <strong>Phone Number ID</strong>: A unique identifier assigned
                to a phone number registered with a messaging platform (e.g.,
                WhatsApp).
              </p>
              <p>
                <strong>Format:</strong> your_business_phone_number_id
              </p>
              <p>
                <strong>Uses:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Identify business phone numbers.</li>
                <li>Route messages to correct business phone numbers.</li>
                <li>Verify phone number ownership.</li>
              </ul>

              <p>
                <strong>Business Phone Number ID</strong>: A unique identifier
                assigned to a business phone number registered with a messaging
                platform (e.g., WhatsApp).
              </p>
              <p>
                <strong>Format:</strong> your_business_phone_number_id
              </p>
              <p>
                <strong>Uses:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Identify business phone numbers.</li>
                <li>Route messages to correct business phone numbers.</li>
                <li>Verify business phone number ownership.</li>
              </ul>

              <p>
                <strong>Webhook URL & Verify Token</strong>: A webhook URL is an
                endpoint that receives notifications (e.g., messages, events)
                from a messaging platform.
              </p>
              <p>
                <strong>Verification Process:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>
                  Messaging platform sends a verification request to the webhook
                  URL.
                </li>
                <li>Your system responds with the verification token.</li>
                <li>
                  The messaging platform verifies the token and establishes the
                  webhook connection.
                </li>
              </ul>
              <p>
                <strong>Uses:</strong>
              </p>
              <ul className="list-disc list-inside">
                <li>Receive real-time notifications.</li>
                <li>Verify notification authenticity.</li>
                <li>Process incoming messages or events.</li>
                <li>
                  Automate message processing, integrate with CRM or database,
                  and trigger custom workflows.
                </li>
              </ul>

              <a
                href="https://developers.facebook.com/apps/your-app-id/whatsapp-business/wa-dev-console/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Take Datas From Meta
              </a>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Render this form only if the account is not in trial */}
      {!isTrial ? (
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Access Token
            </label>
            <input
              type="text"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Verify Token
            </label>
            <input
              type="text"
              value={verifyToken} // Permanent token
              readOnly
              className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            />
            <FaCopy
              onClick={() => copyToClipboard(verifyToken)}
              className="absolute right-2 top-8 text-gray-500 cursor-pointer"
              size={20}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Phone Number ID
            </label>
            <input
              type="text"
              value={phoneNumberId}
              onChange={(e) => setPhoneNumberId(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Business Phone Number ID
            </label>
            <input
              type="text"
              value={businessPhoneNumberId}
              onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Webhook URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              readOnly
              className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            />
            <FaCopy
              onClick={() => copyToClipboard(webhookUrl)}
              className="absolute right-2 top-8 text-gray-500 cursor-pointer"
              size={20}
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveButtonDisabled} // Disable if no changes
            className={`${
              saveButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded-lg transition`}
          >
            Save
          </button>
          {/* Success popup */}
          {successMessage && (
            <div className="fixed bottom-10 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg">
              Data Updated Successfully
            </div>
          )}
        </form>
      ) : (
        // Display masked fields and a message for trial accounts
        <div
          className="text-gray-500"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          <p>This is a trial account. Upgrade to access connection settings.</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Access Token
            </label>
            <div className="relative">
              <input
                type="text"
                value="***************"
                disabled
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
              <FaLock className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Verify Token
            </label>
            <div className="relative">
              <input
                type="text"
                value="***************"
                disabled
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
              <FaLock className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number ID
            </label>
            <div className="relative">
              <input
                type="text"
                value="***************"
                disabled
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
              <FaLock className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Business Phone Number ID
            </label>
            <div className="relative">
              <input
                type="text"
                value="***************"
                disabled
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
              <FaLock className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionPage;
