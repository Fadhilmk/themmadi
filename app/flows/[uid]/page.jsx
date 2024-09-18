"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const Flows = ({ params }) => {
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    country: "",
    businessCategory: "",
  });
  const [loading, setLoading] = useState(true); // Loading state to handle async checks
  const router = useRouter();
  const { uid } = params; // Get the UID from the URL params

  useEffect(() => {
    const checkBusinessDetails = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().hasFilledBusinessDetails) {
          // If the user has already filled their business details, redirect to dashboard
          router.push(`/dashboard/${uid}`);
        } else {
          // If the user hasn't filled the form, allow them to proceed
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking business details: ", error);
      }
    };

    checkBusinessDetails();
  }, [uid, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  const handleNext = async () => {
    try {
      // Save business details to Firestore inside the "users" collection
      await setDoc(doc(db, "users", uid), {
        businessName: businessDetails.businessName,
        country: businessDetails.country,
        businessCategory: businessDetails.businessCategory,
        hasFilledBusinessDetails: true, // Add the flag
      });

      // Redirect to dashboard
      router.push(`/dashboard/${uid}`);
    } catch (error) {
      console.error("Error saving business details: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking Firestore
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          Set Up Your Business
        </h1>

        <div className="space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={businessDetails.businessName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={businessDetails.country}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your country"
              required
            />
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Category
            </label>
            <select
              name="businessCategory"
              value={businessDetails.businessCategory}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select your business category
              </option>
              <option value="Retail">Retail</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Flows;
