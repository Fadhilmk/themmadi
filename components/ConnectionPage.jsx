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

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { FaCopy, FaLock } from "react-icons/fa";

const ConnectionPage = ({ userId }) => {
  const [accessToken, setAccessToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
  const [isTrial, setIsTrial] = useState(true); // Assume trial by default
  const [webhookUrl] = useState(`https://maadiy.com//api/webhook/${userId}`); // Dynamic URL
  const router = useRouter();
  const [loading, setLoading] = useState(true); // To show loading while fetching data

  // Encryption function
  const encryptData = (data) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    if (!secretKey) {
      throw new Error('Encryption key is not defined');
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
          const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
          const connectionDoc = await getDoc(connectionDocRef);

          if (connectionDoc.exists()) {
            const encryptedData = connectionDoc.data().data;
            const decryptedData = decryptData(encryptedData);

            setAccessToken(decryptedData.accessToken || "");
            setVerifyToken(decryptedData.verifyToken || "");
            setPhoneNumberId(decryptedData.phoneNumberId || "");
            setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
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

  const handleSave = async () => {
    const encryptedData = encryptData({
      accessToken,
      verifyToken,
      phoneNumberId,
      businessPhoneNumberId,
    });

    try {
      const userDocRef = doc(db, "users", userId, "documents", "connectionData");
      await setDoc(userDocRef, { data: encryptedData });

      // Optionally redirect or show success message
      // router.push("/dashboard"); // Redirect to another page if needed
      
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl).then(
      () => alert("Webhook URL copied to clipboard!"),
      (err) => console.error("Failed to copy: ", err)
    );
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 m-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4" style={{fontFamily: "LeagueSpartanBold, sans-serif", fontSize:25}}>
        Connection Settings
      </h2>

      {/* Render this form only if the account is not in trial */}
      {!isTrial ? (
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Access Token
            </label>
            <input
              type="text"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Verify Token
            </label>
            <input
              type="text"
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
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
            <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Business Phone Number ID
            </label>
            <input
              type="text"
              value={businessPhoneNumberId}
              onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4 relative items-center">
            <label className="block text-sm font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              Webhook URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              readOnly
              className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
              style={{fontFamily: "LeagueSpartan, sans-serif"}}
            />
            <FaCopy
              onClick={copyToClipboard}
              className="absolute right-2 top-8 text-gray-500 cursor-pointer"
              size={20}
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            style={{fontFamily: "LeagueSpartan, sans-serif"}}
          >
            Save
          </button>
        </form>
      ) : (
        // Display masked fields and a message for trial accounts
        <div className="text-gray-500" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
          <p>This is a trial account. Upgrade to access connection settings.</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Access Token</label>
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
            <label className="block text-sm font-medium text-gray-700">Verify Token</label>
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
            <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
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
            <label className="block text-sm font-medium text-gray-700">Bussiness Phone Number ID</label>
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
