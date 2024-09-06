"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { FaCopy } from "react-icons/fa";

const ConnectionPage = ({ userId }) => {
  const [accessToken, setAccessToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState("");
  const [webhookUrl] = useState(`https://themmadi.onrender.com/api/webhook/${userId}`); // Dynamic URL
  const router = useRouter();

  // Encryption function
  const encryptData = (data) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // Ensure you set this in your environment variables
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

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
      router.push("/dashboard"); // Redirect to another page if needed
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="text-xl font-semibold mb-4">Connection Settings</h2>
      <form>
        <div className="mb-4">
          <label style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="block text-sm font-medium text-gray-700">Access Token</label>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="block text-sm font-medium text-gray-700">Verify Token</label>
          <input
            type="text"
            value={verifyToken}
            onChange={(e) => setVerifyToken(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="block text-sm font-medium text-gray-700">Phone Number ID</label>
          <input
            type="text"
            value={phoneNumberId}
            onChange={(e) => setPhoneNumberId(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="block text-sm font-medium text-gray-700">Business Phone Number ID</label>
          <input
            type="text"
            value={businessPhoneNumberId}
            onChange={(e) => setBusinessPhoneNumberId(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4 relative flex items-center">
          <label style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="block text-sm font-medium text-gray-700">Webhook URL</label>
          <input
            type="text"
            value={webhookUrl}
            readOnly
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed pr-12"
          />
          <FaCopy
            onClick={copyToClipboard}
            className="absolute right-2 top-4 text-gray-500 cursor-pointer"
            size={20}
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ConnectionPage;
