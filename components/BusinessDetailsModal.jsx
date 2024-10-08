// "use client";
// import { useState, useEffect } from "react";

// export default function BusinessDetailsModal({ onSubmit }) {
//     const [businessDetails, setBusinessDetails] = useState({
//         businessName: "",
//         country: "",
//         businessCategory: "",
//     });

//     const [isFormValid, setIsFormValid] = useState(false);

//     // Validate form fields to enable/disable submit button
//     useEffect(() => {
//         const isValid = 
//             businessDetails.businessName.trim() !== "" && 
//             businessDetails.country.trim() !== "" && 
//             businessDetails.businessCategory.trim() !== "";
//         setIsFormValid(isValid); // Update the state based on form validation
//     }, [businessDetails]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBusinessDetails({ ...businessDetails, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormValid) {
//             // Pass business details to parent component
//             onSubmit(businessDetails);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6 relative">
//                 <h1 className="text-3xl font-bold text-center text-blue-500">Business Details</h1>

//                 <div className="space-y-4">
//                     {/* Business Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Business Name</label>
//                         <input
//                             type="text"
//                             name="businessName"
//                             value={businessDetails.businessName}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter business name"
//                             required
//                         />
//                     </div>

//                     {/* Country */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Country</label>
//                         <input
//                             type="text"
//                             name="country"
//                             value={businessDetails.country}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter country"
//                             required
//                         />
//                     </div>

//                     {/* Business Category */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Business Category</label>
//                         <select
//                             name="businessCategory"
//                             value={businessDetails.businessCategory}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="" disabled>Select your business category</option>
//                             <option value="Retail">Retail</option>
//                             <option value="E-commerce">E-commerce</option>
//                             <option value="Healthcare">Healthcare</option>
//                             <option value="Technology">Technology</option>
//                             <option value="Education">Education</option>
//                             <option value="Others">Others</option>
//                         </select>
//                     </div>
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition-colors duration-300 ${
//                         isFormValid ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                     disabled={!isFormValid} // Disable button if the form is not valid
//                 >
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Importing close icon

export default function BusinessDetailsModal({ onSubmit, onClose }) {
    const [businessDetails, setBusinessDetails] = useState({
        businessName: "",
        country: "",
        businessCategory: "",
        businessDescription: "", // Field to store additional business description
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Validate form fields to enable/disable submit button
    useEffect(() => {
        const isValid =
            businessDetails.businessName.trim().length > 2 &&
            businessDetails.country.trim() !== "" &&
            businessDetails.businessCategory.trim() !== "" &&
            businessDetails.businessDescription.trim() !== ""; // Ensure description is filled in for any category
        
        setIsFormValid(isValid); // Update the state based on form validation
    }, [businessDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessDetails({ ...businessDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            // Store form submission state to prevent showing the form again
            localStorage.setItem("businessFormFilled", "true");
            onSubmit(businessDetails); // Pass business details to parent component
        }
    };

    const handleClose = () => {
        // Store the state to prevent showing the form again after closing
        localStorage.setItem("businessFormFilled", "true");
        onClose(); // Call parent's onClose function to hide the modal
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6 relative">
                {/* Close Button (Icon) */}
                <XMarkIcon
                    className="w-6 h-6 text-gray-400 absolute top-4 right-4 cursor-pointer"
                    onClick={handleClose}
                />

                <h1 className="text-3xl font-bold text-center text-blue-500">Business Details</h1>

                <div className="space-y-4">
                    {/* Business Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Name</label>
                        <input
                            type="text"
                            name="businessName"
                            value={businessDetails.businessName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter business name (min 3 characters)"
                            required
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={businessDetails.country}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter country"
                            required
                        />
                    </div>

                    {/* Business Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Category</label>
                        <select
                            name="businessCategory"
                            value={businessDetails.businessCategory}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="" disabled>Select your business category</option>
                            <option value="Retail">Retail</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Technology">Technology</option>
                            <option value="Education">Education</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Business Description (Textarea for all categories) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Describe Your Business</label>
                        <textarea
                            name="businessDescription"
                            value={businessDetails.businessDescription}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tell us more about your business"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition-colors duration-300 ${
                        isFormValid ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid} // Disable button if the form is not valid
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
