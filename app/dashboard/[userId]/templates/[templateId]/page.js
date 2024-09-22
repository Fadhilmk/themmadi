// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig.js
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
// import Preloader from '../../../../../components/Preloader';
// import Popup from "@/components/Popup";
// const convertToUnixTimestamp = (date) => {
//   return Math.floor(date.getTime() / 1000);
// };

// const getCurrentISTTime = () => {
//   const currentISTTime = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return currentISTTime;
// };

// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v20.0/${id}?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch template details");
//   }
//   return response.json();
// };

// const fetchTemplateAnalytics = async (templateId, startDate, endDate) => {
//   try {
//     const response = await fetch(
//       `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_BUSSINESS_ID}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch template analytics");
//     }

//     const data = await response.json();
//     return data.data[0]; // Assuming you want to use the first data point
//   } catch (error) {
//     console.error("Error fetching template analytics:", error);
//     return null;
//   }
// };
// const TemplateDetailsPage = () => {
//   const router = useRouter();
//   const { templateId,userId } = useParams();
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [headerParameters, setHeaderParameters] = useState([]);
//   const [bodyParameters, setBodyParameters] = useState([]);
//   const [location, setLocation] = useState({
//     latitude: "37.7749", // Random latitude for demo
//     longitude: "-122.4194", // Random longitude for demo
//     name: "Random Place",
//     address: "123 Random Street, San Francisco, CA",
//   });
//   const [document, setDocument] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [image, setImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [phoneNumbers, setPhoneNumbers] = useState([]);
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [isAllSelected, setIsAllSelected] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [popup, setPopup] = useState({
//     isVisible: false,
//     message: "",
//     type: "",
//   });
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     const currentISTTime = getCurrentISTTime();
//     const oneMonthAgoIST = new Date(currentISTTime);
//     oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

//     setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
//     setEndDate(convertToUnixTimestamp(currentISTTime));
//   }, []);

//   useEffect(() => {
//     if (templateId && startDate && endDate) {
//       fetchTemplateDetails(templateId)
//         .then((data) => setTemplateDetails(data))
//         .catch((error) =>
//           setError("Error fetching template details: " + error.message)
//         );

//       fetchTemplateAnalytics(templateId, startDate, endDate)
//         .then((data) => setAnalyticsData(data))
//         .catch((error) =>
//           console.error("Error fetching analytics data:", error)
//         );

//       const fetchCampaigns = async () => {
//         const q = query(
//           collection(db, "users",userId ,"campaigns"),
//           where("templateId", "==", templateId)
//         );
//         const querySnapshot = await getDocs(q);
//         const campaignsData = [];
//         querySnapshot.forEach((doc) => {
//           campaignsData.push(doc.data());
//         });
//         setCampaigns(campaignsData);
//       };

//       fetchCampaigns();
//     }
//   }, [templateId, startDate, endDate]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     const selectedDate = new Date(value);
//     const unixTimestamp = convertToUnixTimestamp(selectedDate);

//     if (name === "startDate") {
//       setStartDate(unixTimestamp);
//     } else if (name === "endDate") {
//       setEndDate(unixTimestamp);
//     }
//   };

//   const fetchPhoneNumbers = async () => {
//     const querySnapshot = await getDocs(collection(db,"users",userId, "phoneNumbers")); // Adjust the collection name as needed
//     const numbers = [];
//     querySnapshot.forEach((doc) => {
//       numbers.push({ id: doc.id, ...doc.data() });
//     });
//     setPhoneNumbers(numbers);
//   };

//   const renderAnalyticsTable = (analyticsData) => {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-amber-600">
//                   <span className="material-icons mr-1">calendar_today</span>{" "}
//                   Date
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-blue-600">
//                   <span className="material-icons mr-1">send</span> Sent
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-green-500">
//                   <span className="material-icons mr-1">done_all</span>{" "}
//                   Delivered
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-teal-500">
//                   <span className="material-icons mr-1">attach_money</span>{" "}
//                   Total Cost
//                 </span>
//               </th>
//               {analyticsData.data_points.some(
//                 (point) => point.clicked?.length > 0
//               ) && (
//                 <>
//                   <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                     <span className="inline-flex items-center text-red-600">
//                       <span className="material-icons mr-1">text_fields</span>{" "}
//                       Button Content
//                     </span>
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                     <span className="inline-flex items-center text-orange-600">
//                       <span className="material-icons mr-1">mouse</span> Click
//                       Count
//                     </span>
//                   </th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {analyticsData.data_points
//               .filter((point) => point.sent > 0 || point.delivered > 0)
//               .map((point, index) => {
//                 // Calculate total cost
//                 const totalCost = point.cost.reduce(
//                   (sum, cost) => sum + (cost.value || 0),
//                   0
//                 );

//                 return (
//                   <tr key={index} className="border-t border-gray-300">
//                     <td className="px-4 py-2 text-sm">
//                       {new Date(point.start * 1000).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 text-sm">{point.sent}</td>
//                     <td className="px-4 py-2 text-sm">{point.delivered}</td>
//                     <td className="px-4 py-2 text-sm">
//                       ${totalCost.toFixed(2)}
//                     </td>
//                     {point.clicked?.length > 0 ? (
//                       point.clicked.map((click, clickIndex) => (
//                         <React.Fragment key={clickIndex}>
//                           <td className="px-4 py-2 text-sm">
//                             {click.button_content}
//                           </td>
//                           <td className="px-4 py-2 text-sm">{click.count}</td>
//                         </React.Fragment>
//                       ))
//                     ) : (
//                       <>
//                         <td className="px-4 py-2 text-sm" colSpan={2}>
//                           No Click Data
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case "HEADER":
//         if (component.format === "TEXT") {
//           return (
//             <div className="p-2 bg-white">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (
//           component.format === "IMAGE" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const imageUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <img
//                 src={imageUrl}
//                 alt="Header Image"
//                 className="w-full h-auto rounded"
//               />
//             </div>
//           );
//         } else if (
//           component.format === "VIDEO" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const videoUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <video controls className="w-full h-auto rounded">
//                 <source src={videoUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         } else if (component.format === "LOCATION") {
//           return (
//             <div className="p-2 bg-white">
//               <div>
//                 <strong>Location:</strong>
//               </div>
//               <div className="mt-2">
//                 <p>Latitude: {location.latitude}</p>
//                 <p>Longitude: {location.longitude}</p>
//                 <p>Name: {location.name}</p>
//                 <p>Address: {location.address}</p>
//               </div>
//             </div>
//           );
//         } else if (
//           component.format === "DOCUMENT" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const documentUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <a
//                 href={documentUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 underline"
//               >
//                 View Document
//               </a>
//             </div>
//           );
//         }
//         break;
//       case "BODY":
//         return (
//           <div className="p-2 bg-white">
//             <p>{component.text}</p>
//           </div>
//         );
//       case "FOOTER":
//         return (
//           <div className="p-2 bg-white text-sm text-gray-600">
//             {component.text}
//           </div>
//         );
//       case "BUTTONS":
//         return (
//           <div className="flex flex-wrap space-x-2 p-2 bg-white">
//             {component.buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md mb-2"
//               >
//                 {button.text}
//               </button>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleHeaderParameterChange = (index, value) => {
//     setHeaderParameters((prev) => {
//       const updatedParameters = [...prev];
//       updatedParameters[index] = value;
//       return updatedParameters;
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleBodyParameterChange = (index, value) => {
//     setBodyParameters((prev) => ({
//       ...prev,
//       [index]: value,
//     }));
//   };

//   const handleLocationChange = (field, value) => {
//     setLocation((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDocumentChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   const handleVideoChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleUpload = async (file, fileType) => {
//     if (!file) return "";

//     const fileRef = ref(storage, `${fileType}/${file.name}`);
//     await uploadBytes(fileRef, file);
//     const url = await getDownloadURL(fileRef);
//     return url;
//   };

//   const handleSendMessage = async () => {
//     const numbersToSend =
//       selectedNumbers.length > 0 ? selectedNumbers : [phoneNumber];
//     if (!numbersToSend.length || !templateDetails) return;

//     try {
//       const documentUrl = document
//         ? await handleUpload(document, "documents")
//         : "";
//       const videoUrl = video ? await handleUpload(video, "videos") : "";
//       const imageUrl = image ? await handleUpload(image, "images") : "";

//       const headerComponent = templateDetails.components.find(
//         (component) => component.type === "HEADER"
//       );

//       let headerParametersFormatted = [];

//       if (headerComponent?.format === "IMAGE" && imageUrl) {
//         headerParametersFormatted = [
//           {
//             type: "image",
//             image: {
//               link: imageUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "VIDEO" && videoUrl) {
//         headerParametersFormatted = [
//           {
//             type: "video",
//             video: {
//               link: videoUrl,
//             },
//           },
//         ];
//       }

//       const bodyComponent = templateDetails.components.find(
//         (component) => component.type === "BODY"
//       );

//       const bodyParametersFormatted =
//         bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
//           type: "text",
//           text: bodyParameters[index] || text,
//         })) || [];

//       const components = [
//         headerParametersFormatted.length > 0 && {
//           type: "header",
//           parameters: headerParametersFormatted,
//         },
//         {
//           type: "body",
//           parameters: bodyParametersFormatted,
//         },
//       ].filter(Boolean);

//       for (let i = 0; i < numbersToSend.length; i++) {
//         const phoneNumber = numbersToSend[i];

//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               messaging_product: "whatsapp",
//               to: phoneNumber,
//               type: "template",
//               template: {
//                 name: templateDetails.name,
//                 language: {
//                   code: templateDetails.language || "en_US",
//                 },
//                 components,
//               },
//             }),
//           }
//         );

//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(
//             `Failed to send message: ${data.error?.message || response.statusText}`
//           );
//         }
//       }

//       await addDoc(collection(db,"users",userId, "campaigns"), {
//         templateId: templateId,
//         templateName: templateDetails.name,
//         messageSentCount: numbersToSend.length,
//         messageSentDate: new Date(),
//       });

//       setPopup({
//         isVisible: true,
//         message: "Messages sent successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setPopup({
//         isVisible: true,
//         message: `Error sending message: ${error.message}`,
//         type: "error",
//       });
//     }
//   };

//   const closePopup = () => {
//     setPopup({ isVisible: false, message: "", type: "" });
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//     fetchPhoneNumbers(); // Fetch phone numbers when modal is opened
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleNumberSelection = (number) => {
//     setSelectedNumbers((prev) =>
//       prev.includes(number)
//         ? prev.filter((n) => n !== number)
//         : [...prev, number]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedNumbers([]);
//     } else {
//       setSelectedNumbers(phoneNumbers.map((number) => number.phone));
//     }
//     setIsAllSelected(!isAllSelected);
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!templateDetails) {
//     return <Preloader />;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header Section */}
//       <div className="bg-blue-500 p-4 rounded-lg shadow-md text-white">
//         <h1 className="text-2xl font-bold mb-2 text-white">
//           {templateDetails.name}
//         </h1>
//         <p>
//           <strong>Category:</strong> {templateDetails.category}
//         </p>
//         <p>
//           <strong>Status:</strong> {templateDetails.status}
//         </p>
//         <p>
//           <strong>Language:</strong> {templateDetails.language}
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 space-y-6 lg:space-y-0">
//         {/* Template Details Section - Now on the Right */}
//         <div
//           className="lg:w-1/5 bg-white p-4 rounded-lg shadow-md"
//           style={{
//             backgroundImage:
//               'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h2 className="text-xl font-bold mb-4">Template Details</h2>
//           <div
//             className="p-1"
//             style={{
//               background: "white",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {templateDetails.components.map((component, index) => (
//               <div key={index}>{renderComponent(component)}</div>
//             ))}
//           </div>
//         </div>

//         {/* Send Message Section - Now on the Left */}
//         <div className="lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">
//             Send Message With This Template
//           </h2>
//           <div className="mt-4">
//             <label className="block font-semibold mb-2">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               placeholder="If You have Only One Number to sent input Here!! Else Select Phone Number Button Below"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="border border-gray-300 p-2 rounded w-full mb-2 text black"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 mt-2"
//               onClick={openModal}
//             >
//               Select Phone Number
//             </button>
//           </div>

//           {/* Render input fields for HEADER parameters if applicable */}
//           {templateDetails?.components.map(
//             (component, index) =>
//               component.type === "HEADER" && (
//                 <>
//                   {component.format === "TEXT" &&
//                     component.text.includes("{{") && (
//                       <div key={index} className="mb-4">
//                         <label className="block font-medium mb-1">
//                           Header Parameter
//                         </label>
//                         {Array.isArray(component.example?.header_text) ? (
//                           component.example.header_text.map(
//                             (text, paramIndex) => (
//                               <input
//                                 key={paramIndex}
//                                 type="text"
//                                 value={headerParameters[paramIndex] || ""}
//                                 onChange={(e) =>
//                                   handleHeaderParameterChange(
//                                     paramIndex,
//                                     e.target.value
//                                   )
//                                 }
//                                 className="w-full p-2 rounded border text-black"
//                               />
//                             )
//                           )
//                         ) : (
//                           <input
//                             type="text"
//                             value={
//                               headerParameters[0] ||
//                               component.example?.header_text ||
//                               ""
//                             }
//                             onChange={(e) =>
//                               handleHeaderParameterChange(0, e.target.value)
//                             }
//                             className="w-full p-2 rounded border text-black"
//                           />
//                         )}
//                       </div>
//                     )}

//                   {component.format === "IMAGE" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Image
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}

//                   {component.format === "VIDEO" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Video
//                       </label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}
//                 </>
//               )
//           )}

//           {/* Render input fields for BODY parameters */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "BODY" &&
//               component.example?.body_text?.[0]?.map((text, paramIndex) => (
//                 <div key={paramIndex} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Parameter {paramIndex + 1}
//                   </label>
//                   <input
//                     type="text"
//                     value={bodyParameters[paramIndex] || ""}
//                     onChange={(e) =>
//                       handleBodyParameterChange(paramIndex, e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               ))
//           )}

//           {/* Render input fields for LOCATION header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "LOCATION" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">Latitude</label>
//                   <input
//                     type="text"
//                     value={location.latitude}
//                     onChange={(e) =>
//                       handleLocationChange("latitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">
//                     Longitude
//                   </label>
//                   <input
//                     type="text"
//                     value={location.longitude}
//                     onChange={(e) =>
//                       handleLocationChange("longitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Name</label>
//                   <input
//                     type="text"
//                     value={location.name}
//                     onChange={(e) =>
//                       handleLocationChange("name", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Address</label>
//                   <input
//                     type="text"
//                     value={location.address}
//                     onChange={(e) =>
//                       handleLocationChange("address", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               )
//           )}

//           {/* Render input fields for DOCUMENT header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "DOCUMENT" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Upload Document
//                   </label>
//                   <input
//                     type="file"
//                     onChange={handleDocumentChange}
//                     className="w-full p-2 rounded border"
//                   />
//                 </div>
//               )
//           )}

//           <button
//             onClick={handleSendMessage}
//             className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//           >
//             Send Message
//           </button>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg">
//                 <h2 className="text-xl font-bold mb-4">Select Phone Numbers</h2>

//                 {/* Set a fixed height and make it scrollable */}
//                 <div className="max-h-64 overflow-y-auto">
//                   <table className="min-w-full bg-white">
//                     <thead>
//                       <tr>
//                         <th className="w-1/12 border border-gray-300 p-2">
//                           <input
//                             type="checkbox"
//                             checked={isAllSelected}
//                             onChange={toggleSelectAll}
//                           />
//                         </th>
//                         <th className="border border-gray-300 p-2">
//                           Phone Number
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {phoneNumbers.map((number) => (
//                         <tr key={number.id}>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="checkbox"
//                               checked={selectedNumbers.includes(number.phone)}
//                               onChange={() =>
//                                 toggleNumberSelection(number.phone)
//                               }
//                             />
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             {number.phone}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                   <button
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                     onClick={closeModal}
//                   >
//                     Add Numbers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-6 space-y-6">
//         {/* Your existing JSX code */}

//         {popup.isVisible && (
//           <Popup
//             message={popup.message}
//             type={popup.type}
//             onClose={closePopup}
//           />
//         )}
//       </div>
//       <div className="container mx-auto p-4">
//         <h2 className="text-xl font-bold mb-4">Template Analytics</h2>
//         <div className="mb-4">
//           <label htmlFor="startDate" className="mr-2">
//             Start Date:
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             value={new Date(startDate * 1000).toISOString().split("T")[0]}
//             onChange={handleDateChange}
//             className="border px-2 py-1 rounded"
//           />
//           <label htmlFor="endDate" className="ml-4 mr-2">
//             End Date:
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={new Date(endDate * 1000).toISOString().split("T")[0]}
//             onChange={handleDateChange}
//             className="border px-2 py-1 rounded"
//           />
//         </div>
//         {analyticsData ? (
//           renderAnalyticsTable(analyticsData)
//         ) : (
//           <p>Loading analytics data...</p>
//         )}
//       </div>

//       <footer className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Campaign History</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//             <thead className="bg-gray-100 border-b border-gray-300">
//               <tr>
//                 <th className="p-3 text-left text-gray-700">Template Name</th>
//                 <th className="p-3 text-left text-gray-700">
//                   Message Sent Count
//                 </th>
//                 <th className="p-3 text-left text-gray-700">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {campaigns.map((campaign, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="p-3 text-gray-900">{campaign.templateName}</td>
//                   <td className="p-3 text-gray-900">
//                     {campaign.messageSentCount}
//                   </td>
//                   <td className="p-3 text-gray-900">
//                     {new Date(
//                       campaign.messageSentDate.seconds * 1000
//                     ).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TemplateDetailsPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig.js
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
// import Preloader from "../../../../../components/Preloader";
// import Popup from "@/components/Popup";
// const convertToUnixTimestamp = (date) => {
//   return Math.floor(date.getTime() / 1000);
// };

// const getCurrentISTTime = () => {
//   const currentISTTime = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return currentISTTime;
// };

// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v20.0/${id}?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch template details");
//   }
//   return response.json();
// };

// const fetchTemplateAnalytics = async (templateId, startDate, endDate) => {
//   try {
//     const response = await fetch(
//       `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_BUSSINESS_ID}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch template analytics");
//     }

//     const data = await response.json();
//     return data.data[0]; // Assuming you want to use the first data point
//   } catch (error) {
//     console.error("Error fetching template analytics:", error);
//     return null;
//   }
// };
// const TemplateDetailsPage = () => {
//   const router = useRouter();
//   const { templateId, userId } = useParams();
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [headerParameters, setHeaderParameters] = useState([]);
//   const [bodyParameters, setBodyParameters] = useState([]);
//   const [location, setLocation] = useState({
//     latitude: "37.7749", // Random latitude for demo
//     longitude: "-122.4194", // Random longitude for demo
//     name: "Random Place",
//     address: "123 Random Street, San Francisco, CA",
//   });
//   const [document, setDocument] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [image, setImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [phoneNumbers, setPhoneNumbers] = useState([]);
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [isAllSelected, setIsAllSelected] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [popup, setPopup] = useState({
//     isVisible: false,
//     message: "",
//     type: "",
//   });
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     const currentISTTime = getCurrentISTTime();
//     const oneMonthAgoIST = new Date(currentISTTime);
//     oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

//     setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
//     setEndDate(convertToUnixTimestamp(currentISTTime));
//   }, []);

//   useEffect(() => {
//     if (templateId && startDate && endDate) {
//       fetchTemplateDetails(templateId)
//         .then((data) => setTemplateDetails(data))
//         .catch((error) =>
//           setError("Error fetching template details: " + error.message)
//         );

//       fetchTemplateAnalytics(templateId, startDate, endDate)
//         .then((data) => setAnalyticsData(data))
//         .catch((error) =>
//           console.error("Error fetching analytics data:", error)
//         );

//       const fetchCampaigns = async () => {
//         const q = query(
//           collection(db, "users", userId, "campaigns"),
//           where("templateId", "==", templateId)
//         );
//         const querySnapshot = await getDocs(q);
//         const campaignsData = [];
//         querySnapshot.forEach((doc) => {
//           campaignsData.push(doc.data());
//         });
//         setCampaigns(campaignsData);
//       };

//       fetchCampaigns();
//     }
//   }, [templateId, startDate, endDate]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     const selectedDate = new Date(value);
//     const unixTimestamp = convertToUnixTimestamp(selectedDate);

//     if (name === "startDate") {
//       setStartDate(unixTimestamp);
//     } else if (name === "endDate") {
//       setEndDate(unixTimestamp);
//     }
//   };

//   const fetchPhoneNumbers = async () => {
//     const querySnapshot = await getDocs(
//       collection(db, "users", userId, "phoneNumbers")
//     ); // Adjust the collection name as needed
//     const numbers = [];
//     querySnapshot.forEach((doc) => {
//       numbers.push({ id: doc.id, ...doc.data() });
//     });
//     setPhoneNumbers(numbers);
//   };

//   const renderAnalyticsTable = (analyticsData) => {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-amber-600">
//                   <span className="material-icons mr-1">calendar_today</span>{" "}
//                   Date
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-blue-600">
//                   <span className="material-icons mr-1">send</span> Sent
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-green-500">
//                   <span className="material-icons mr-1">done_all</span>{" "}
//                   Delivered
//                 </span>
//               </th>
//               <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                 <span className="inline-flex items-center text-teal-500">
//                   <span className="material-icons mr-1">attach_money</span>{" "}
//                   Total Cost
//                 </span>
//               </th>
//               {analyticsData.data_points.some(
//                 (point) => point.clicked?.length > 0
//               ) && (
//                 <>
//                   <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                     <span className="inline-flex items-center text-red-600">
//                       <span className="material-icons mr-1">text_fields</span>{" "}
//                       Button Content
//                     </span>
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
//                     <span className="inline-flex items-center text-orange-600">
//                       <span className="material-icons mr-1">mouse</span> Click
//                       Count
//                     </span>
//                   </th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {analyticsData.data_points
//               .filter((point) => point.sent > 0 || point.delivered > 0)
//               .map((point, index) => {
//                 // Calculate total cost
//                 const totalCost = point.cost.reduce(
//                   (sum, cost) => sum + (cost.value || 0),
//                   0
//                 );

//                 return (
//                   <tr key={index} className="border-t border-gray-300">
//                     <td className="px-4 py-2 text-sm">
//                       {new Date(point.start * 1000).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2 text-sm">{point.sent}</td>
//                     <td className="px-4 py-2 text-sm">{point.delivered}</td>
//                     <td className="px-4 py-2 text-sm">
//                       ${totalCost.toFixed(2)}
//                     </td>
//                     {point.clicked?.length > 0 ? (
//                       point.clicked.map((click, clickIndex) => (
//                         <React.Fragment key={clickIndex}>
//                           <td className="px-4 py-2 text-sm">
//                             {click.button_content}
//                           </td>
//                           <td className="px-4 py-2 text-sm">{click.count}</td>
//                         </React.Fragment>
//                       ))
//                     ) : (
//                       <>
//                         <td className="px-4 py-2 text-sm" colSpan={2}>
//                           No Click Data
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case "HEADER":
//         if (component.format === "TEXT") {
//           return (
//             <div className="p-2 bg-white">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (
//           component.format === "IMAGE" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const imageUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <img
//                 src={imageUrl}
//                 alt="Header Image"
//                 className="w-full h-auto rounded"
//               />
//             </div>
//           );
//         } else if (
//           component.format === "VIDEO" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const videoUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <video controls className="w-full h-auto rounded">
//                 <source src={videoUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         } else if (component.format === "LOCATION") {
//           return (
//             <div className="p-2 bg-white">
//               <div>
//                 <strong>Location:</strong>
//               </div>
//               <div className="mt-2">
//                 <p>Latitude: {location.latitude}</p>
//                 <p>Longitude: {location.longitude}</p>
//                 <p>Name: {location.name}</p>
//                 <p>Address: {location.address}</p>
//               </div>
//             </div>
//           );
//         } else if (
//           component.format === "DOCUMENT" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const documentUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <a
//                 href={documentUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 underline"
//               >
//                 View Document
//               </a>
//             </div>
//           );
//         }
//         break;
//       case "BODY":
//         return (
//           <div className="p-2 bg-white">
//             <p>{component.text}</p>
//           </div>
//         );
//       case "FOOTER":
//         return (
//           <div className="p-2 bg-white text-sm text-gray-600">
//             {component.text}
//           </div>
//         );
//       case "BUTTONS":
//         return (
//           <div className="flex flex-wrap space-x-2 p-2 bg-white">
//             {component.buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md mb-2"
//               >
//                 {button.text}
//               </button>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleHeaderParameterChange = (index, value) => {
//     setHeaderParameters((prev) => {
//       const updatedParameters = [...prev];
//       updatedParameters[index] = value;
//       return updatedParameters;
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleBodyParameterChange = (index, value) => {
//     setBodyParameters((prev) => ({
//       ...prev,
//       [index]: value,
//     }));
//   };

//   const handleLocationChange = (field, value) => {
//     setLocation((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDocumentChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   const handleVideoChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleUpload = async (file, fileType) => {
//     if (!file) return "";

//     const fileRef = ref(storage, `${fileType}/${file.name}`);
//     await uploadBytes(fileRef, file);
//     const url = await getDownloadURL(fileRef);
//     return url;
//   };

//   const handleSendMessage = async () => {
//     const numbersToSend =
//       selectedNumbers.length > 0 ? selectedNumbers : [phoneNumber];
//     if (!numbersToSend.length || !templateDetails) return;

//     try {
//       const documentUrl = document
//         ? await handleUpload(document, "documents")
//         : "";
//       const videoUrl = video ? await handleUpload(video, "videos") : "";
//       const imageUrl = image ? await handleUpload(image, "images") : "";

//       const headerComponent = templateDetails.components.find(
//         (component) => component.type === "HEADER"
//       );

//       let headerParametersFormatted = [];

//       if (headerComponent?.format === "IMAGE" && imageUrl) {
//         headerParametersFormatted = [
//           {
//             type: "image",
//             image: {
//               link: imageUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "VIDEO" && videoUrl) {
//         headerParametersFormatted = [
//           {
//             type: "video",
//             video: {
//               link: videoUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "DOCUMENT" && documentUrl) {
//         headerParametersFormatted = [
//           {
//             type: "document",
//             document: {
//               link: documentUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "LOCATION" && location) {
//         headerParametersFormatted = [
//           {
//             type: "location",
//             location: {
//               latitude: location.latitude,
//               longitude: location.longitude,
//               name: location.name,
//               address: location.address,
//             },
//           },
//         ];
//       } else if (
//         headerComponent?.format === "TEXT" &&
//         headerComponent.example?.header_text?.[0]
//       ) {
//         headerParametersFormatted = headerComponent.example.header_text.map(
//           (text) => ({
//             type: "text",
//             text: text,
//           })
//         );
//       }

//       const bodyComponent = templateDetails.components.find(
//         (component) => component.type === "BODY"
//       );

//       const bodyParametersFormatted =
//         bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
//           type: "text",
//           text: bodyParameters[index] || text,
//         })) || [];

//       const components = [
//         headerParametersFormatted.length > 0 && {
//           type: "header",
//           parameters: headerParametersFormatted,
//         },
//         {
//           type: "body",
//           parameters: bodyParametersFormatted,
//         },
//       ].filter(Boolean);

//       for (let i = 0; i < numbersToSend.length; i++) {
//         const phoneNumber = numbersToSend[i];

//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               messaging_product: "whatsapp",
//               to: phoneNumber,
//               type: "template",
//               template: {
//                 name: templateDetails.name,
//                 language: {
//                   code: templateDetails.language || "en_US",
//                 },
//                 components,
//               },
//             }),
//           }
//         );

//         const data = await response.json();
//         if (!response.ok) {
//           console.error("Full API Response:", data);
//           throw new Error(
//             `Failed to send message: ${
//               data.error?.message || response.statusText
//             }`
//           );
//         }
//       }

//       await addDoc(collection(db, "users", userId, "campaigns"), {
//         templateId: templateId,
//         templateName: templateDetails.name,
//         messageSentCount: numbersToSend.length,
//         messageSentDate: new Date(),
//       });

//       setPopup({
//         isVisible: true,
//         message: "Messages sent successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Error sending message:", error.message);
//       console.error("Detailed Error:", error); // This will log the full error object including the stack trace
//       setPopup({
//         isVisible: true,
//         message: `Error sending message: ${error.message}`,
//         type: "error",
//       });
//     }
//   };

//   const closePopup = () => {
//     setPopup({ isVisible: false, message: "", type: "" });
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//     fetchPhoneNumbers(); // Fetch phone numbers when modal is opened
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleNumberSelection = (number) => {
//     setSelectedNumbers((prev) =>
//       prev.includes(number)
//         ? prev.filter((n) => n !== number)
//         : [...prev, number]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedNumbers([]);
//     } else {
//       setSelectedNumbers(phoneNumbers.map((number) => number.phone));
//     }
//     setIsAllSelected(!isAllSelected);
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!templateDetails) {
//     return <Preloader />;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header Section */}
//       <div className="bg-blue-500 p-4 rounded-lg shadow-md text-white">
//         <h1 className="text-2xl font-bold mb-2 text-white">
//           {templateDetails.name}
//         </h1>
//         <p>
//           <strong>Category:</strong> {templateDetails.category}
//         </p>
//         <p>
//           <strong>Status:</strong> {templateDetails.status}
//         </p>
//         <p>
//           <strong>Language:</strong> {templateDetails.language}
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 space-y-6 lg:space-y-0">
//         {/* Template Details Section - Now on the Right */}
//         <div
//           className="lg:w-1/5 bg-white p-4 rounded-lg shadow-md"
//           style={{
//             backgroundImage:
//               'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h2 className="text-xl font-bold mb-4">Template Details</h2>
//           <div
//             className="p-1"
//             style={{
//               background: "white",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {templateDetails.components.map((component, index) => (
//               <div key={index}>{renderComponent(component)}</div>
//             ))}
//           </div>
//         </div>

//         {/* Send Message Section - Now on the Left */}
//         <div className="lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">
//             Send Message With This Template
//           </h2>
//           <div className="mt-4">
//             <label className="block font-semibold mb-2">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               placeholder="If You have Only One Number to sent input Here!! Else Select Phone Number Button Below"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="border border-gray-300 p-2 rounded w-full mb-2 text black"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 mt-2"
//               onClick={openModal}
//             >
//               Select Phone Number
//             </button>
//           </div>

//           {/* Render input fields for HEADER parameters if applicable */}
//           {templateDetails?.components.map(
//             (component, index) =>
//               component.type === "HEADER" && (
//                 <>
//                   {component.format === "TEXT" &&
//                     component.text.includes("{{") && (
//                       <div key={index} className="mb-4">
//                         <label className="block font-medium mb-1">
//                           Header Parameter
//                         </label>
//                         {Array.isArray(component.example?.header_text) ? (
//                           component.example.header_text.map(
//                             (text, paramIndex) => (
//                               <input
//                                 key={paramIndex}
//                                 type="text"
//                                 value={headerParameters[paramIndex] || ""}
//                                 onChange={(e) =>
//                                   handleHeaderParameterChange(
//                                     paramIndex,
//                                     e.target.value
//                                   )
//                                 }
//                                 className="w-full p-2 rounded border text-black"
//                               />
//                             )
//                           )
//                         ) : (
//                           <input
//                             type="text"
//                             value={
//                               headerParameters[0] ||
//                               component.example?.header_text ||
//                               ""
//                             }
//                             onChange={(e) =>
//                               handleHeaderParameterChange(0, e.target.value)
//                             }
//                             className="w-full p-2 rounded border text-black"
//                           />
//                         )}
//                       </div>
//                     )}

//                   {component.format === "IMAGE" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Image
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}

//                   {component.format === "VIDEO" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Video
//                       </label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}
//                 </>
//               )
//           )}

//           {/* Render input fields for BODY parameters */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "BODY" &&
//               component.example?.body_text?.[0]?.map((text, paramIndex) => (
//                 <div key={paramIndex} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Parameter {paramIndex + 1}
//                   </label>
//                   <input
//                     type="text"
//                     value={bodyParameters[paramIndex] || ""}
//                     onChange={(e) =>
//                       handleBodyParameterChange(paramIndex, e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               ))
//           )}

//           {/* Render input fields for LOCATION header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "LOCATION" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">Latitude</label>
//                   <input
//                     type="text"
//                     value={location.latitude}
//                     onChange={(e) =>
//                       handleLocationChange("latitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">
//                     Longitude
//                   </label>
//                   <input
//                     type="text"
//                     value={location.longitude}
//                     onChange={(e) =>
//                       handleLocationChange("longitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Name</label>
//                   <input
//                     type="text"
//                     value={location.name}
//                     onChange={(e) =>
//                       handleLocationChange("name", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Address</label>
//                   <input
//                     type="text"
//                     value={location.address}
//                     onChange={(e) =>
//                       handleLocationChange("address", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               )
//           )}

//           {/* Render input fields for DOCUMENT header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "DOCUMENT" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Upload Document
//                   </label>
//                   <input
//                     type="file"
//                     onChange={handleDocumentChange}
//                     className="w-full p-2 rounded border"
//                   />
//                 </div>
//               )
//           )}

//           <button
//             onClick={handleSendMessage}
//             className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//           >
//             Send Message
//           </button>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg">
//                 <h2 className="text-xl font-bold mb-4">Select Phone Numbers</h2>

//                 {/* Set a fixed height and make it scrollable */}
//                 <div className="max-h-64 overflow-y-auto">
//                   <table className="min-w-full bg-white">
//                     <thead>
//                       <tr>
//                         <th className="w-1/12 border border-gray-300 p-2">
//                           <input
//                             type="checkbox"
//                             checked={isAllSelected}
//                             onChange={toggleSelectAll}
//                           />
//                         </th>
//                         <th className="border border-gray-300 p-2">
//                           Phone Number
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {phoneNumbers.map((number) => (
//                         <tr key={number.id}>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="checkbox"
//                               checked={selectedNumbers.includes(number.phone)}
//                               onChange={() =>
//                                 toggleNumberSelection(number.phone)
//                               }
//                             />
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             {number.phone}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                   <button
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                     onClick={closeModal}
//                   >
//                     Add Numbers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-6 space-y-6">
//         {/* Your existing JSX code */}

//         {popup.isVisible && (
//           <Popup
//             message={popup.message}
//             type={popup.type}
//             onClose={closePopup}
//           />
//         )}
//       </div>
//       <div className="container mx-auto p-4">
//         <h2 className="text-xl font-bold mb-4">Template Analytics</h2>
//         <div className="mb-4">
//           <label htmlFor="startDate" className="mr-2">
//             Start Date:
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             value={new Date(startDate * 1000).toISOString().split("T")[0]}
//             onChange={handleDateChange}
//             className="border px-2 py-1 rounded"
//           />
//           <label htmlFor="endDate" className="ml-4 mr-2">
//             End Date:
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={new Date(endDate * 1000).toISOString().split("T")[0]}
//             onChange={handleDateChange}
//             className="border px-2 py-1 rounded"
//           />
//         </div>
//         {analyticsData ? (
//           renderAnalyticsTable(analyticsData)
//         ) : (
//           <p>Loading analytics data...</p>
//         )}
//       </div>

//       <footer className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Campaign History</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//             <thead className="bg-gray-100 border-b border-gray-300">
//               <tr>
//                 <th className="p-3 text-left text-gray-700">Template Name</th>
//                 <th className="p-3 text-left text-gray-700">
//                   Message Sent Count
//                 </th>
//                 <th className="p-3 text-left text-gray-700">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {campaigns.map((campaign, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="p-3 text-gray-900">{campaign.templateName}</td>
//                   <td className="p-3 text-gray-900">
//                     {campaign.messageSentCount}
//                   </td>
//                   <td className="p-3 text-gray-900">
//                     {new Date(
//                       campaign.messageSentDate.seconds * 1000
//                     ).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TemplateDetailsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig.js
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
// import Preloader from "../../../../../components/Preloader";
// import Popup from "@/components/Popup";
// const convertToUnixTimestamp = (date) => {
//   return Math.floor(date.getTime() / 1000);
// };

// const getCurrentISTTime = () => {
//   const currentISTTime = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return currentISTTime;
// };

// const fetchTemplateDetails = async (id) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v20.0/${id}?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch template details");
//   }
//   return response.json();
// };

// const fetchTemplateAnalytics = async (templateId, startDate, endDate) => {
//   try {
//     const response = await fetch(
//       `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_BUSSINESS_ID}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch template analytics");
//     }

//     const data = await response.json();
//     return data.data[0]; // Assuming you want to use the first data point
//   } catch (error) {
//     console.error("Error fetching template analytics:", error);
//     return null;
//   }
// };

// const TemplateDetailsPage = () => {
//   const router = useRouter();
//   const [isMobile, setIsMobile] = useState(false);
//   const { templateId, userId } = useParams();
//   const [templateDetails, setTemplateDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [headerParameters, setHeaderParameters] = useState([]);
//   const [bodyParameters, setBodyParameters] = useState([]);
//   const [location, setLocation] = useState({
//     latitude: "37.7749", // Random latitude for demo
//     longitude: "-122.4194", // Random longitude for demo
//     name: "Random Place",
//     address: "123 Random Street, San Francisco, CA",
//   });
//   const [document, setDocument] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [image, setImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [phoneNumbers, setPhoneNumbers] = useState([]);
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [isAllSelected, setIsAllSelected] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [popup, setPopup] = useState({
//     isVisible: false,
//     message: "",
//     type: "",
//   });
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     const currentISTTime = getCurrentISTTime();
//     const oneMonthAgoIST = new Date(currentISTTime);
//     oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

//     setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
//     setEndDate(convertToUnixTimestamp(currentISTTime));
//   }, []);

//   useEffect(() => {
//     if (templateId && startDate && endDate) {
//       fetchTemplateDetails(templateId)
//         .then((data) => setTemplateDetails(data))
//         .catch((error) =>
//           setError("Error fetching template details: " + error.message)
//         );

//       fetchTemplateAnalytics(templateId, startDate, endDate)
//         .then((data) => setAnalyticsData(data))
//         .catch((error) =>
//           console.error("Error fetching analytics data:", error)
//         );

//       const fetchCampaigns = async () => {
//         const q = query(
//           collection(db, "users", userId, "campaigns"),
//           where("templateId", "==", templateId)
//         );
//         const querySnapshot = await getDocs(q);
//         const campaignsData = [];
//         querySnapshot.forEach((doc) => {
//           campaignsData.push(doc.data());
//         });
//         setCampaigns(campaignsData);
//       };

//       fetchCampaigns();
//     }
//   }, [templateId, startDate, endDate]);

//   useEffect(() => {
//     // Check for mobile view
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     const selectedDate = new Date(value);
//     const unixTimestamp = convertToUnixTimestamp(selectedDate);

//     if (name === "startDate") {
//       setStartDate(unixTimestamp);
//     } else if (name === "endDate") {
//       setEndDate(unixTimestamp);
//     }
//   };

//   const fetchPhoneNumbers = async () => {
//     const querySnapshot = await getDocs(
//       collection(db, "users", userId, "phoneNumbers")
//     ); // Adjust the collection name as needed
//     const numbers = [];
//     querySnapshot.forEach((doc) => {
//       numbers.push({ id: doc.id, ...doc.data() });
//     });
//     setPhoneNumbers(numbers);
//   };

//   const renderAnalyticsTable = (analyticsData) => {
//     return (
//       <div className="overflow-x-auto" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
//         <table className="table-auto overflow-scroll w-full text-center border border-gray-300" style={{ tableLayout: 'auto' }}>
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th
//                 className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                 style={{ fontSize: isMobile?'1.5vw':'1.2vw' }}
//               >
//                 <span className="inline-flex items-center text-amber-600">
//                   <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>calendar_today</span> Date
//                 </span>
//               </th>
//               <th
//                 className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                 style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
//               >
//                 <span className="inline-flex items-center text-blue-600">
//                   <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>send</span> Sent
//                 </span>
//               </th>
//               <th
//                 className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                 style={{ fontSize: isMobile?'1.5vw':'1.2vw'  }}
//               >
//                 <span className="inline-flex items-center text-green-500">
//                   <span className="material-icons mr-1" style={{ fontSize:isMobile?'1.5vw':'1.2vw'   }}>done_all</span> Delivered
//                 </span>
//               </th>
//               <th
//                 className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                 style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
//               >
//                 <span className="inline-flex items-center text-teal-500">
//                   <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>attach_money</span> Total Cost
//                 </span>
//               </th>
//               {analyticsData.data_points.some((point) => point.clicked?.length > 0) && (
//                 <>
//                   <th
//                     className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                     style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
//                   >
//                     <span className="inline-flex items-center text-red-600">
//                       <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>text_fields</span> Button Content
//                     </span>
//                   </th>
//                   <th
//                     className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
//                     style={{ fontSize:isMobile?'1.5vw':'1.2vw'   }}
//                   >
//                     <span className="inline-flex items-center text-orange-600">
//                       <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' }}>mouse</span> Click Count
//                     </span>
//                   </th>
//                 </>
//               )}
//             </tr>
//           </thead>

//           <tbody className="text-gray-700 bg-white">
//             {analyticsData.data_points
//               .filter((point) => point.sent > 0 || point.delivered > 0)
//               .map((point, index) => {
//                 // Calculate total cost
//                 const totalCost = point.cost.reduce((sum, cost) => sum + (cost.value || 0), 0);

//                 return (
//                   <tr key={index} className="border-t border-gray-300">
//                     <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
//                       {new Date(point.start * 1000).toLocaleDateString()}
//                     </td>
//                     <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{point.sent}</td>
//                     <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{point.delivered}</td>
//                     <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
//                       ${totalCost.toFixed(2)}
//                     </td>
//                     {point.clicked?.length > 0 ? (
//                       point.clicked.map((click, clickIndex) => (
//                         <React.Fragment key={clickIndex}>
//                           <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
//                             {click.button_content}
//                           </td>
//                           <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{click.count}</td>
//                         </React.Fragment>
//                       ))
//                     ) : (
//                       <>
//                         <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }} colSpan={2}>
//                           No Click Data
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderComponent = (component) => {
//     switch (component.type) {
//       case "HEADER":
//         if (component.format === "TEXT") {
//           return (
//             <div className="p-2 bg-white">
//               <strong>{component.text}</strong>
//             </div>
//           );
//         } else if (
//           component.format === "IMAGE" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const imageUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <img
//                 src={imageUrl}
//                 alt="Header Image"
//                 className="w-full h-auto rounded"
//               />
//             </div>
//           );
//         } else if (
//           component.format === "VIDEO" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const videoUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <video controls className="w-full h-auto rounded">
//                 <source src={videoUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         } else if (component.format === "LOCATION") {
//           return (
//             <div className="p-2 bg-white">
//               <div>
//                 <strong>Location:</strong>
//               </div>
//               <div className="mt-2">
//                 <p>Latitude: {location.latitude}</p>
//                 <p>Longitude: {location.longitude}</p>
//                 <p>Name: {location.name}</p>
//                 <p>Address: {location.address}</p>
//               </div>
//             </div>
//           );
//         } else if (
//           component.format === "DOCUMENT" &&
//           component.example?.header_handle?.[0]
//         ) {
//           const documentUrl = component.example.header_handle[0];
//           return (
//             <div className="p-2 bg-white">
//               <a
//                 href={documentUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 underline"
//               >
//                 View Document
//               </a>
//             </div>
//           );
//         }
//         break;
//       case "BODY":
//         return (
//           <div className="p-2 bg-white">
//             <p>{component.text}</p>
//           </div>
//         );
//       case "FOOTER":
//         return (
//           <div className="p-2 bg-white text-sm text-gray-600">
//             {component.text}
//           </div>
//         );
//       case "BUTTONS":
//         return (
//           <div className="flex flex-wrap space-x-2 p-2 bg-white">
//             {component.buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md mb-2"
//               >
//                 {button.text}
//               </button>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleHeaderParameterChange = (index, value) => {
//     setHeaderParameters((prev) => {
//       const updatedParameters = [...prev];
//       updatedParameters[index] = value;
//       return updatedParameters;
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleBodyParameterChange = (index, value) => {
//     setBodyParameters((prev) => ({
//       ...prev,
//       [index]: value,
//     }));
//   };

//   const handleLocationChange = (field, value) => {
//     setLocation((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleDocumentChange = (e) => {
//     setDocument(e.target.files[0]);
//   };

//   const handleVideoChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleUpload = async (file, fileType) => {
//     if (!file) return "";

//     const fileRef = ref(storage, `${fileType}/${file.name}`);
//     await uploadBytes(fileRef, file);
//     const url = await getDownloadURL(fileRef);
//     return url;
//   };

//   const handleSendMessage = async () => {
//     const numbersToSend =
//       selectedNumbers.length > 0 ? selectedNumbers : [phoneNumber];
//     if (!numbersToSend.length || !templateDetails) return;

//     try {
//       const documentUrl = document
//         ? await handleUpload(document, "documents")
//         : "";
//       const videoUrl = video ? await handleUpload(video, "videos") : "";
//       const imageUrl = image ? await handleUpload(image, "images") : "";

//       const headerComponent = templateDetails.components.find(
//         (component) => component.type === "HEADER"
//       );

//       let headerParametersFormatted = [];

//       if (headerComponent?.format === "IMAGE" && imageUrl) {
//         headerParametersFormatted = [
//           {
//             type: "image",
//             image: {
//               link: imageUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "VIDEO" && videoUrl) {
//         headerParametersFormatted = [
//           {
//             type: "video",
//             video: {
//               link: videoUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "DOCUMENT" && documentUrl) {
//         headerParametersFormatted = [
//           {
//             type: "document",
//             document: {
//               link: documentUrl,
//             },
//           },
//         ];
//       } else if (headerComponent?.format === "LOCATION" && location) {
//         headerParametersFormatted = [
//           {
//             type: "location",
//             location: {
//               latitude: location.latitude,
//               longitude: location.longitude,
//               name: location.name,
//               address: location.address,
//             },
//           },
//         ];
//       } else if (
//         headerComponent?.format === "TEXT" &&
//         headerComponent.example?.header_text?.[0]
//       ) {
//         headerParametersFormatted = headerComponent.example.header_text.map(
//           (text) => ({
//             type: "text",
//             text: text,
//           })
//         );
//       }

//       const bodyComponent = templateDetails.components.find(
//         (component) => component.type === "BODY"
//       );

//       const bodyParametersFormatted =
//         bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
//           type: "text",
//           text: bodyParameters[index] || text,
//         })) || [];

//       const components = [
//         headerParametersFormatted.length > 0 && {
//           type: "header",
//           parameters: headerParametersFormatted,
//         },
//         {
//           type: "body",
//           parameters: bodyParametersFormatted,
//         },
//       ].filter(Boolean);

//       for (let i = 0; i < numbersToSend.length; i++) {
//         const phoneNumber = numbersToSend[i];

//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               messaging_product: "whatsapp",
//               to: phoneNumber,
//               type: "template",
//               template: {
//                 name: templateDetails.name,
//                 language: {
//                   code: templateDetails.language || "en_US",
//                 },
//                 components,
//               },
//             }),
//           }
//         );

//         const data = await response.json();
//         if (!response.ok) {
//           console.error("Full API Response:", data);
//           throw new Error(
//             `Failed to send message: ${
//               data.error?.message || response.statusText
//             }`
//           );
//         }
//       }

//       await addDoc(collection(db, "users", userId, "campaigns"), {
//         templateId: templateId,
//         templateName: templateDetails.name,
//         messageSentCount: numbersToSend.length,
//         messageSentDate: new Date(),
//       });

//       setPopup({
//         isVisible: true,
//         message: "Messages sent successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Error sending message:", error.message);
//       console.error("Detailed Error:", error); // This will log the full error object including the stack trace
//       setPopup({
//         isVisible: true,
//         message: `Error sending message: ${error.message}`,
//         type: "error",
//       });
//     }
//   };

//   const closePopup = () => {
//     setPopup({ isVisible: false, message: "", type: "" });
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//     fetchPhoneNumbers(); // Fetch phone numbers when modal is opened
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleNumberSelection = (number) => {
//     setSelectedNumbers((prev) =>
//       prev.includes(number)
//         ? prev.filter((n) => n !== number)
//         : [...prev, number]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedNumbers([]);
//     } else {
//       setSelectedNumbers(phoneNumbers.map((number) => number.phone));
//     }
//     setIsAllSelected(!isAllSelected);
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!templateDetails) {
//     return <Preloader />;
//   }

//   return (
//     <div className="space-y-6" style={{width:'100%' ,fontFamily: "LeagueSpartan, sans-serif", padding: isMobile? 15 : 20}}>
//       {/* Header Section */}
//       <div className="bg-blue-500 p-4 rounded-lg shadow-md text-white">
//         <h1 className="text-2xl font-bold mb-2 text-white">
//           {templateDetails.name}
//         </h1>
//         <p>
//           <strong>Category:</strong> {templateDetails.category}
//         </p>
//         <p>
//           <strong>Status:</strong> {templateDetails.status}
//         </p>
//         <p>
//           <strong>Language:</strong> {templateDetails.language}
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 space-y-6 lg:space-y-0" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//         {/* Template Details Section - Now on the Right */}
//         <div className="lg:w-2/5 bg-white p-4 rounded-lg shadow-md"
//           style={{
//             backgroundImage:
//               'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h2 className="text-xl font-bold mb-4 text-center">Template Details</h2>
//           <div
//             className="p-1"
//             style={{
//               background: "white",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {templateDetails.components.map((component, index) => (
//               <div key={index}>{renderComponent(component)}</div>
//             ))}
//           </div>
//         </div>

//         {/* Send Message Section - Now on the Left */}
//         <div className="lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4 text-center">
//             Send Message With This Template
//           </h2>
//           <div className="mt-8">
//             <label className="block font-semibold mb-2">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               placeholder="If You have Only One Number to sent input Here!! Else Select Phone Number Button Below"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="border border-gray-300 p-2 rounded w-full mb-2 text black"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 mt-2"
//               onClick={openModal}
//             >
//               Select Phone Number
//             </button>
//           </div>

//           {/* Render input fields for HEADER parameters if applicable */}
//           {templateDetails?.components.map(
//             (component, index) =>
//               component.type === "HEADER" && (
//                 <>
//                   {component.format === "TEXT" &&
//                     component.text.includes("{{") && (
//                       <div key={index} className="mb-4">
//                         <label className="block font-medium mb-1">
//                           Header Parameter
//                         </label>
//                         {Array.isArray(component.example?.header_text) ? (
//                           component.example.header_text.map(
//                             (text, paramIndex) => (
//                               <input
//                                 key={paramIndex}
//                                 type="text"
//                                 value={headerParameters[paramIndex] || ""}
//                                 onChange={(e) =>
//                                   handleHeaderParameterChange(
//                                     paramIndex,
//                                     e.target.value
//                                   )
//                                 }
//                                 className="w-full p-2 rounded border text-black"
//                               />
//                             )
//                           )
//                         ) : (
//                           <input
//                             type="text"
//                             value={
//                               headerParameters[0] ||
//                               component.example?.header_text ||
//                               ""
//                             }
//                             onChange={(e) =>
//                               handleHeaderParameterChange(0, e.target.value)
//                             }
//                             className="w-full p-2 rounded border text-black"
//                           />
//                         )}
//                       </div>
//                     )}

//                   {component.format === "IMAGE" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Image
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}

//                   {component.format === "VIDEO" && (
//                     <div key={index} className="mb-4">
//                       <label className="block font-medium mb-1">
//                         Upload Video
//                       </label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="w-full p-2 rounded border"
//                       />
//                     </div>
//                   )}
//                 </>
//               )
//           )}

//           {/* Render input fields for BODY parameters */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "BODY" &&
//               component.example?.body_text?.[0]?.map((text, paramIndex) => (
//                 <div key={paramIndex} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Parameter {paramIndex + 1}
//                   </label>
//                   <input
//                     type="text"
//                     value={bodyParameters[paramIndex] || ""}
//                     onChange={(e) =>
//                       handleBodyParameterChange(paramIndex, e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               ))
//           )}

//           {/* Render input fields for LOCATION header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "LOCATION" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">Latitude</label>
//                   <input
//                     type="text"
//                     value={location.latitude}
//                     onChange={(e) =>
//                       handleLocationChange("latitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">
//                     Longitude
//                   </label>
//                   <input
//                     type="text"
//                     value={location.longitude}
//                     onChange={(e) =>
//                       handleLocationChange("longitude", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Name</label>
//                   <input
//                     type="text"
//                     value={location.name}
//                     onChange={(e) =>
//                       handleLocationChange("name", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                   <label className="block font-medium mb-1 mt-2">Address</label>
//                   <input
//                     type="text"
//                     value={location.address}
//                     onChange={(e) =>
//                       handleLocationChange("address", e.target.value)
//                     }
//                     className="w-full p-2 rounded border text-black"
//                   />
//                 </div>
//               )
//           )}

//           {/* Render input fields for DOCUMENT header if applicable */}
//           {templateDetails.components.map(
//             (component, index) =>
//               component.type === "HEADER" &&
//               component.format === "DOCUMENT" && (
//                 <div key={index} className="mb-4">
//                   <label className="block font-medium mb-1">
//                     Upload Document
//                   </label>
//                   <input
//                     type="file"
//                     onChange={handleDocumentChange}
//                     className="w-full p-2 rounded border"
//                   />
//                 </div>
//               )
//           )}

//           <button
//             onClick={handleSendMessage}
//             className="mt-4 bg-green-500 w-full text-white px-4 py-2 rounded-md hover:bg-green-600"
//           >
//             Send Message
//           </button>

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              
//               <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg" style={isMobile ? {} : { position: "absolute", left: "60%", transform: "translateX(-50%)" }}>
//                 <h2 className="text-xl font-bold mb-4">Select Phone Numbers</h2>

//                 {/* Set a fixed height and make it scrollable */}
//                 <div className="max-h-64 overflow-y-auto">
//                   <table className="min-w-full bg-white">
//                     <thead>
//                       <tr>
//                         <th className="w-1/12 border border-gray-300 p-2">
//                           <input
//                             type="checkbox"
//                             checked={isAllSelected}
//                             onChange={toggleSelectAll}
//                           />
//                         </th>
//                         <th className="border border-gray-300 p-2">
//                           Phone Number
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {phoneNumbers.map((number) => (
//                         <tr key={number.id}>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="checkbox"
//                               checked={selectedNumbers.includes(number.phone)}
//                               onChange={() =>
//                                 toggleNumberSelection(number.phone)
//                               }
//                             />
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             {number.phone}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                   <button
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                     onClick={closeModal}
//                   >
//                     Add Numbers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-6 space-y-6">
//         {/* Your existing JSX code */}

//         {popup.isVisible && (
//           <Popup
//             message={popup.message}
//             type={popup.type}
//             onClose={closePopup}
//           />
//         )}
//       </div>
//       <div className="container mx-auto">
//         <h2 className="text-xl font-bold mb-4">Template Analytics</h2>
//         <div className="mb-4" style={{display:isMobile ? 'block' : 'flex'}}>
//           <div>
//             <label htmlFor="startDate" className="mr-2">
//               Start Date:
//             </label>
//             <input
//               type="date"
//               id="startDate"
//               name="startDate"
//               value={new Date(startDate * 1000).toISOString().split("T")[0]}
//               onChange={handleDateChange}
//               className="border px-2 py-1 rounded"
//             />
//           </div>
//           <div className="ml-0 mb:ml-8">
//             <label htmlFor="endDate" className="ml-2 mr-2">
//               End Date:
//             </label>
//             <input
//               type="date"
//               id="endDate"
//               name="endDate"
//               value={new Date(endDate * 1000).toISOString().split("T")[0]}
//               onChange={handleDateChange}
//               className="border px-2 py-1 rounded"
//             />
//           </div>

//         </div>
//         {analyticsData ? (
//           renderAnalyticsTable(analyticsData)
//         ) : (
//           <p>Loading analytics data...</p>
//         )}
//       </div>

//       <footer className="mt-8">
//         <h2 className="text-lg font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Campaign History</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//           <thead className="bg-gray-100 border-b border-gray-300" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               <tr>
//                 <th className="p-3 text-left text-gray-700 text-center">Template Name</th>
//                 <th className="p-3 text-left text-gray-700 text-center">
//                   Message Sent Count
//                 </th>
//                 <th className="p-3 text-left text-gray-700 text-center">Date</th>
//               </tr>
//             </thead>
//             <tbody style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//               {campaigns.map((campaign, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>{campaign.templateName}</td>
//                   <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>
//                     {campaign.messageSentCount}
//                   </td>
//                   <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>
//                     {new Date(
//                       campaign.messageSentDate.seconds * 1000
//                     ).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TemplateDetailsPage;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import Preloader from "../../../../../components/Preloader";
import Popup from "@/components/Popup";
import CryptoJS from 'crypto-js';
const convertToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

const getCurrentISTTime = () => {
  const currentISTTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return currentISTTime;
};

const fetchTemplateDetails = async (id, accessToken) => {
  const response = await fetch(
    `https://graph.facebook.com/v20.0/${id}?access_token=${accessToken}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch template details");
  }
  return response.json();
};

const fetchTemplateAnalytics = async (templateId, startDate, endDate, accessToken, businessPhoneNumberId) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${businessPhoneNumberId}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch template analytics");
    }

    const data = await response.json();
    return data.data[0]; // Assuming you want to use the first data point
  } catch (error) {
    console.error("Error fetching template analytics:", error);
    return null;
  }
};

const decryptData = (cipherText) => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

const TemplateDetailsPage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { templateId, userId } = useParams();
  const [templateDetails, setTemplateDetails] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [headerParameters, setHeaderParameters] = useState([]);
  const [bodyParameters, setBodyParameters] = useState([]);
  const [location, setLocation] = useState({
    latitude: "37.7749", // Random latitude for demo
    longitude: "-122.4194", // Random longitude for demo
    name: "Random Place",
    address: "123 Random Street, San Francisco, CA",
  });
  const [document, setDocument] = useState(null);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isTrial, setIsTrial] = useState(false); // Store whether the user is trial
  const [sentMessagesCount, setSentMessagesCount] = useState(0); // Track number of sent messages
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [accessToken, setAccessToken] = useState(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState(process.env.NEXT_PUBLIC_BUSSINESS_ID);
  const [phoneNumberId, setPhoneNumberId] = useState(process.env.NEXT_PUBLIC_PHONE_NUMBER_ID);
  const [popup, setPopup] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const trialMessageLimit = 5;

  useEffect(() => {
    const fetchAccountStatus = async () => {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsTrial(userData.isTrial || false);
        setSentMessagesCount(userData.sentMessagesCount || 0);

        // If it's a real account, fetch encrypted connection data
        if (!userData.isTrial) {
          const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
          const connectionDoc = await getDoc(connectionDocRef);

          if (connectionDoc.exists()) {
            const decryptedData = decryptData(connectionDoc.data().data);
            if (decryptedData) {
              setAccessToken(decryptedData.accessToken);
              setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId);
              setPhoneNumberId(decryptedData.phoneNumberId);
            } else {
              setError("Failed to decrypt connection data.");
            }
          }
        }

        // Check if the trial user has hit the message limit
        if (userData.isTrial && userData.sentMessagesCount >= trialMessageLimit) {
          setIsLimitReached(true);
        }
      }
    };

    fetchAccountStatus();
  }, [userId]);

  useEffect(() => {
    const currentISTTime = getCurrentISTTime();
    const oneMonthAgoIST = new Date(currentISTTime);
    oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

    setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
    setEndDate(convertToUnixTimestamp(currentISTTime));
  }, []);

  useEffect(() => {
    if (templateId && startDate && endDate && accessToken && businessPhoneNumberId) {
      fetchTemplateDetails(templateId, accessToken)
        .then((data) => setTemplateDetails(data))
        .catch((error) =>
          setError("Error fetching template details: " + error.message)
        );

      fetchTemplateAnalytics(templateId, startDate, endDate, accessToken, businessPhoneNumberId)
        .then((data) => setAnalyticsData(data))
        .catch((error) => console.error("Error fetching analytics data:", error));

      const fetchCampaigns = async () => {
        const q = query(
          collection(db, "users", userId, "campaigns"),
          where("templateId", "==", templateId)
        );
        const querySnapshot = await getDocs(q);
        const campaignsData = [];
        querySnapshot.forEach((doc) => {
          campaignsData.push(doc.data());
        });
        setCampaigns(campaignsData);
      };

      fetchCampaigns();
    }
  }, [templateId, startDate, endDate, accessToken, businessPhoneNumberId]);

  useEffect(() => {
    // Check for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const selectedDate = new Date(value);
    const unixTimestamp = convertToUnixTimestamp(selectedDate);

    if (name === "startDate") {
      setStartDate(unixTimestamp);
    } else if (name === "endDate") {
      setEndDate(unixTimestamp);
    }
  };

  const fetchPhoneNumbers = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "phoneNumbers")
    ); // Adjust the collection name as needed
    const numbers = [];
    querySnapshot.forEach((doc) => {
      numbers.push({ id: doc.id, ...doc.data() });
    });
    setPhoneNumbers(numbers);
  };

  const renderAnalyticsTable = (analyticsData) => {
    return (
      <div className="overflow-x-auto" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
        <table className="table-auto overflow-scroll w-full text-center border border-gray-300" style={{ tableLayout: 'auto' }}>
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile?'1.5vw':'1.2vw' }}
              >
                <span className="inline-flex items-center text-amber-600">
                  <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>calendar_today</span> Date
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
              >
                <span className="inline-flex items-center text-blue-600">
                  <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>send</span> Sent
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile?'1.5vw':'1.2vw'  }}
              >
                <span className="inline-flex items-center text-green-500">
                  <span className="material-icons mr-1" style={{ fontSize:isMobile?'1.5vw':'1.2vw'   }}>done_all</span> Delivered
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
              >
                <span className="inline-flex items-center text-teal-500">
                  <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>attach_money</span> Total Cost
                </span>
              </th>
              {analyticsData.data_points.some((point) => point.clicked?.length > 0) && (
                <>
                  <th
                    className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                    style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}
                  >
                    <span className="inline-flex items-center text-red-600">
                      <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw'   }}>text_fields</span> Button Content
                    </span>
                  </th>
                  <th
                    className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                    style={{ fontSize:isMobile?'1.5vw':'1.2vw'   }}
                  >
                    <span className="inline-flex items-center text-orange-600">
                      <span className="material-icons mr-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' }}>mouse</span> Click Count
                    </span>
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="text-gray-700 bg-white">
            {analyticsData.data_points
              .filter((point) => point.sent > 0 || point.delivered > 0)
              .map((point, index) => {
                // Calculate total cost
                const totalCost = point.cost.reduce((sum, cost) => sum + (cost.value || 0), 0);

                return (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
                      {new Date(point.start * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{point.sent}</td>
                    <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{point.delivered}</td>
                    <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
                      ${totalCost.toFixed(2)}
                    </td>
                    {point.clicked?.length > 0 ? (
                      point.clicked.map((click, clickIndex) => (
                        <React.Fragment key={clickIndex}>
                          <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>
                            {click.button_content}
                          </td>
                          <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }}>{click.count}</td>
                        </React.Fragment>
                      ))
                    ) : (
                      <>
                        <td className="px-2 py-1" style={{ fontSize: isMobile?'1.5vw':'1.2vw' , wordWrap: 'break-word' }} colSpan={2}>
                          No Click Data
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderComponent = (component) => {
    switch (component.type) {
      case "HEADER":
        if (component.format === "TEXT") {
          return (
            <div className="p-2 bg-white">
              <strong>{component.text}</strong>
            </div>
          );
        } else if (
          component.format === "IMAGE" &&
          component.example?.header_handle?.[0]
        ) {
          const imageUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white">
              <img
                src={imageUrl}
                alt="Header Image"
                className="w-full h-auto rounded"
              />
            </div>
          );
        } else if (
          component.format === "VIDEO" &&
          component.example?.header_handle?.[0]
        ) {
          const videoUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white">
              <video controls className="w-full h-auto rounded">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else if (component.format === "LOCATION") {
          return (
            <div className="p-2 bg-white">
              <div>
                <strong>Location:</strong>
              </div>
              <div className="mt-2">
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                <p>Name: {location.name}</p>
                <p>Address: {location.address}</p>
              </div>
            </div>
          );
        } else if (
          component.format === "DOCUMENT" &&
          component.example?.header_handle?.[0]
        ) {
          const documentUrl = component.example.header_handle[0];
          return (
            <div className="p-2 bg-white">
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          );
        }
        break;
      case "BODY":
        return (
          <div className="p-2 bg-white">
            <p>{component.text}</p>
          </div>
        );
      case "FOOTER":
        return (
          <div className="p-2 bg-white text-sm text-gray-600">
            {component.text}
          </div>
        );
      case "BUTTONS":
        return (
          <div className="flex flex-wrap space-x-2 p-2 bg-white">
            {component.buttons.map((button, index) => (
              <button
                key={index}
                className="bg-gray-300 text-blue-500 font-bold px-4 py-2 rounded-md mb-2"
              >
                {button.text}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleHeaderParameterChange = (index, value) => {
    setHeaderParameters((prev) => {
      const updatedParameters = [...prev];
      updatedParameters[index] = value;
      return updatedParameters;
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBodyParameterChange = (index, value) => {
    setBodyParameters((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async (file, fileType) => {
    if (!file) return "";

    const fileRef = ref(storage, `${fileType}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleSendMessage = async () => {
    const numbersToSend =
      selectedNumbers.length > 0 ? selectedNumbers : [phoneNumber];
    if (!numbersToSend.length || !templateDetails) return;
  
    let allowedNumbersToSend = numbersToSend;
  
    // Limit the number of messages for trial users
    if (isTrial) {
      const remainingMessages = trialMessageLimit - sentMessagesCount;
      if (remainingMessages <= 0) {
        setPopup({
          isVisible: true,
          message: `Trial users can only send ${trialMessageLimit} messages.`,
          type: "error",
        });
        return;
      }
  
      allowedNumbersToSend = numbersToSend.slice(0, remainingMessages);
    }
  
    try {
      const sentNumbers = []; // Track successfully sent numbers
  
      const documentUrl = document
        ? await handleUpload(document, "documents")
        : "";
      const videoUrl = video ? await handleUpload(video, "videos") : "";
      const imageUrl = image ? await handleUpload(image, "images") : "";
  
      const headerComponent = templateDetails.components.find(
        (component) => component.type === "HEADER"
      );
  
      let headerParametersFormatted = [];
  
      if (headerComponent?.format === "IMAGE" && imageUrl) {
        headerParametersFormatted = [
          {
            type: "image",
            image: {
              link: imageUrl,
            },
          },
        ];
      } else if (headerComponent?.format === "VIDEO" && videoUrl) {
        headerParametersFormatted = [
          {
            type: "video",
            video: {
              link: videoUrl,
            },
          },
        ];
      } else if (headerComponent?.format === "DOCUMENT" && documentUrl) {
        headerParametersFormatted = [
          {
            type: "document",
            document: {
              link: documentUrl,
            },
          },
        ];
      } else if (headerComponent?.format === "LOCATION" && location) {
        headerParametersFormatted = [
          {
            type: "location",
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
              name: location.name,
              address: location.address,
            },
          },
        ];
      } else if (
        headerComponent?.format === "TEXT" &&
        headerComponent.example?.header_text?.[0]
      ) {
        headerParametersFormatted = headerComponent.example.header_text.map(
          (text) => ({
            type: "text",
            text: text,
          })
        );
      }
  
      const bodyComponent = templateDetails.components.find(
        (component) => component.type === "BODY"
      );
  
      const bodyParametersFormatted =
        bodyComponent?.example?.body_text?.[0]?.map((text, index) => ({
          type: "text",
          text: bodyParameters[index] || text,
        })) || [];
  
      const components = [
        headerParametersFormatted.length > 0 && {
          type: "header",
          parameters: headerParametersFormatted,
        },
        {
          type: "body",
          parameters: bodyParametersFormatted,
        },
      ].filter(Boolean);
  
      // Iterate through the allowed numbers only
      for (let i = 0; i < allowedNumbersToSend.length; i++) {
        const phoneNumber = allowedNumbersToSend[i];
  
        const response = await fetch(
          `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: phoneNumber,
              type: "template",
              template: {
                name: templateDetails.name,
                language: {
                  code: templateDetails.language || "en_US",
                },
                components,
              },
            }),
          }
        );
  
        const data = await response.json();
        if (!response.ok) {
          console.error("Full API Response:", data);
          throw new Error(
            `Failed to send message: ${
              data.error?.message || response.statusText
            }`
          );
        }
  
        // Track the successfully sent number
        sentNumbers.push(phoneNumber);
      }
  
      // Update the sent message count in Firestore
      const newMessageCount = sentMessagesCount + allowedNumbersToSend.length;
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { sentMessagesCount: newMessageCount });
  
      // Log the campaign data in Firestore
      await addDoc(collection(db, "users", userId, "campaigns"), {
        templateId: templateId,
        templateName: templateDetails.name,
        messageSentCount: allowedNumbersToSend.length,
        messageSentDate: new Date(),
      });
  
      const totalMessagesSent = newMessageCount;
      // Display the sent numbers in the popup
      setPopup({
        isVisible: true,
        message: `Total messages sent: ${totalMessagesSent}`,
        type: "success",
      });
  
      setSentMessagesCount(newMessageCount); // Update local state
      if (isTrial && newMessageCount >= trialMessageLimit) {
        setIsLimitReached(true); // Block further messages if limit is reached
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      console.error("Detailed Error:", error); // This will log the full error object including the stack trace
      setPopup({
        isVisible: true,
        message: `Error sending message: ${error.message}`,
        type: "error",
      });
    }
  };
  
  const closePopup = () => {
    setPopup({ isVisible: false, message: "", type: "" });
  };
  const openModal = () => {
    setIsModalOpen(true);
    fetchPhoneNumbers(); // Fetch phone numbers when modal is opened
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleNumberSelection = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNumbers([]);
    } else {
      setSelectedNumbers(phoneNumbers.map((number) => number.phone));
    }
    setIsAllSelected(!isAllSelected);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!templateDetails) {
    return <Preloader />;
  }

  return (
    <div className="space-y-6" style={{width:'100%' ,fontFamily: "LeagueSpartan, sans-serif", padding: isMobile? 15 : 20}}>
      {/* Header Section */}
      <div className="bg-blue-500 p-4 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold mb-2 text-white">
          {templateDetails.name}
        </h1>
        <p>
          <strong>Category:</strong> {templateDetails.category}
        </p>
        <p>
          <strong>Status:</strong> {templateDetails.status}
        </p>
        <p>
          <strong>Language:</strong> {templateDetails.language}
        </p>

        {isTrial ? (
        <p
          className="mb-4 text-white text-lg"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          5 Trial Message : {sentMessagesCount} Used
        </p>
      ) : (
        <p
          className="mb-4 text-green-500"
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          You Can Sent Unlimitted Message But Dont Sent Bulk Message At the Begining
        </p>
      )}

      </div>

      <div className="flex flex-col lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 space-y-6 lg:space-y-0" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
        {/* Template Details Section - Now on the Right */}
        <div className="lg:w-2/5 bg-white p-4 rounded-lg shadow-md"
          style={{
            backgroundImage:
              'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Template Details</h2>
          <div
            className="p-1"
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {templateDetails.components.map((component, index) => (
              <div key={index}>{renderComponent(component)}</div>
            ))}
          </div>
        </div>

        {/* Send Message Section - Now on the Left */}
        <div className="lg:w-4/5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Send Message With This Template
          </h2>
          <div className="mt-8">
            <label className="block font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              placeholder="If You have Only One Number to sent input Here!! Else Select Phone Number Button Below"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-2 text black"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 mt-2"
              onClick={openModal}
            >
              Select Phone Number
            </button>
          </div>

          {/* Render input fields for HEADER parameters if applicable */}
          {templateDetails?.components.map(
            (component, index) =>
              component.type === "HEADER" && (
                <>
                  {component.format === "TEXT" &&
                    component.text.includes("{{") && (
                      <div key={index} className="mb-4">
                        <label className="block font-medium mb-1">
                          Header Parameter
                        </label>
                        {Array.isArray(component.example?.header_text) ? (
                          component.example.header_text.map(
                            (text, paramIndex) => (
                              <input
                                key={paramIndex}
                                type="text"
                                value={headerParameters[paramIndex] || ""}
                                onChange={(e) =>
                                  handleHeaderParameterChange(
                                    paramIndex,
                                    e.target.value
                                  )
                                }
                                className="w-full p-2 rounded border text-black"
                              />
                            )
                          )
                        ) : (
                          <input
                            type="text"
                            value={
                              headerParameters[0] ||
                              component.example?.header_text ||
                              ""
                            }
                            onChange={(e) =>
                              handleHeaderParameterChange(0, e.target.value)
                            }
                            className="w-full p-2 rounded border text-black"
                          />
                        )}
                      </div>
                    )}

                  {component.format === "IMAGE" && (
                    <div key={index} className="mb-4">
                      <label className="block font-medium mb-1">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 rounded border"
                      />
                    </div>
                  )}

                  {component.format === "VIDEO" && (
                    <div key={index} className="mb-4">
                      <label className="block font-medium mb-1">
                        Upload Video
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="w-full p-2 rounded border"
                      />
                    </div>
                  )}
                </>
              )
          )}

          {/* Render input fields for BODY parameters */}
          {templateDetails.components.map(
            (component, index) =>
              component.type === "BODY" &&
              component.example?.body_text?.[0]?.map((text, paramIndex) => (
                <div key={paramIndex} className="mb-4">
                  <label className="block font-medium mb-1">
                    Parameter {paramIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={bodyParameters[paramIndex] || ""}
                    onChange={(e) =>
                      handleBodyParameterChange(paramIndex, e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                </div>
              ))
          )}

          {/* Render input fields for LOCATION header if applicable */}
          {templateDetails.components.map(
            (component, index) =>
              component.type === "HEADER" &&
              component.format === "LOCATION" && (
                <div key={index} className="mb-4">
                  <label className="block font-medium mb-1">Latitude</label>
                  <input
                    type="text"
                    value={location.latitude}
                    onChange={(e) =>
                      handleLocationChange("latitude", e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                  <label className="block font-medium mb-1 mt-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={location.longitude}
                    onChange={(e) =>
                      handleLocationChange("longitude", e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                  <label className="block font-medium mb-1 mt-2">Name</label>
                  <input
                    type="text"
                    value={location.name}
                    onChange={(e) =>
                      handleLocationChange("name", e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                  <label className="block font-medium mb-1 mt-2">Address</label>
                  <input
                    type="text"
                    value={location.address}
                    onChange={(e) =>
                      handleLocationChange("address", e.target.value)
                    }
                    className="w-full p-2 rounded border text-black"
                  />
                </div>
              )
          )}

          {/* Render input fields for DOCUMENT header if applicable */}
          {templateDetails.components.map(
            (component, index) =>
              component.type === "HEADER" &&
              component.format === "DOCUMENT" && (
                <div key={index} className="mb-4">
                  <label className="block font-medium mb-1">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    onChange={handleDocumentChange}
                    className="w-full p-2 rounded border"
                  />
                </div>
              )
          )}

          <button
            onClick={handleSendMessage}
            className="mt-4 bg-green-500 w-full text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Send Message
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              
              <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg" style={isMobile ? {} : { position: "absolute", left: "60%", transform: "translateX(-50%)" }}>
                <h2 className="text-xl font-bold mb-4">Select Phone Numbers</h2>

                {/* Set a fixed height and make it scrollable */}
                <div className="max-h-64 overflow-y-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="w-1/12 border border-gray-300 p-2">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="border border-gray-300 p-2">
                          Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {phoneNumbers.map((number) => (
                        <tr key={number.id}>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="checkbox"
                              checked={selectedNumbers.includes(number.phone)}
                              onChange={() =>
                                toggleNumberSelection(number.phone)
                              }
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            {number.phone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={closeModal}
                  >
                    Add Numbers
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Your existing JSX code */}

        {popup.isVisible && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={closePopup}
          />
        )}
      </div>
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">Template Analytics</h2>
        <div className="mb-4" style={{display:isMobile ? 'block' : 'flex'}}>
          <div>
            <label htmlFor="startDate" className="mr-2">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={new Date(startDate * 1000).toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="border px-2 py-1 rounded"
            />
          </div>
          <div className="ml-0 mb:ml-8">
            <label htmlFor="endDate" className="ml-2 mr-2">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={new Date(endDate * 1000).toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="border px-2 py-1 rounded"
            />
          </div>

        </div>
        {analyticsData ? (
          renderAnalyticsTable(analyticsData)
        ) : (
          <p>Loading analytics data...</p>
        )}
      </div>

      <footer className="mt-8">
        <h2 className="text-lg font-semibold mb-4" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Campaign History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-300" style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              <tr>
                <th className="p-3 text-left text-gray-700 text-center">Template Name</th>
                <th className="p-3 text-left text-gray-700 text-center">
                  Message Sent Count
                </th>
                <th className="p-3 text-left text-gray-700 text-center">Date</th>
              </tr>
            </thead>
            <tbody style={{fontFamily: "LeagueSpartan, sans-serif"}}>
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>{campaign.templateName}</td>
                  <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>
                    {campaign.messageSentCount}
                  </td>
                  <td className="p-3 text-gray-900 text-center" style={{fontSize: isMobile? '2.4vw':'1.2vw'}}>
                    {new Date(
                      campaign.messageSentDate.seconds * 1000
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
};

export default TemplateDetailsPage;