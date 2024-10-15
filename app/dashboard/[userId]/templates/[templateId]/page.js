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

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path to your firebaseConfig.js
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, getDocs, addDoc, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
// import Preloader from "../../../../../components/Preloader";
// import Popup from "@/components/Popup";
// import CryptoJS from 'crypto-js';
// const convertToUnixTimestamp = (date) => {
//   return Math.floor(date.getTime() / 1000);
// };

// const getCurrentISTTime = () => {
//   const currentISTTime = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return currentISTTime;
// };

// const fetchTemplateDetails = async (id, accessToken) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v20.0/${id}?access_token=${accessToken}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch template details");
//   }
//   return response.json();
// };

// const fetchTemplateAnalytics = async (templateId, startDate, endDate, accessToken, businessPhoneNumberId) => {
//   try {
//     const response = await fetch(
//       `https://graph.facebook.com/v20.0/${businessPhoneNumberId}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch template analytics");
//     }

//     const data = await response.json();
//     console.log(data.data[0])
//     return data.data[0]; // Assuming you want to use the first data point
//   } catch (error) {
//     console.error("Error fetching template analytics:", error);
//     return null;
//   }
// };

// const decryptData = (cipherText) => {
//   try {
//     const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   } catch (error) {
//     console.error("Error decrypting data:", error);
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
//   const [isTrial, setIsTrial] = useState(false); // Store whether the user is trial
//   const [sentMessagesCount, setSentMessagesCount] = useState(0); // Track number of sent messages
//   const [isLimitReached, setIsLimitReached] = useState(false);
//   const [accessToken, setAccessToken] = useState(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState(process.env.NEXT_PUBLIC_BUSSINESS_ID);
//   const [phoneNumberId, setPhoneNumberId] = useState(process.env.NEXT_PUBLIC_PHONE_NUMBER_ID);
//   const [popup, setPopup] = useState({
//     isVisible: false,
//     message: "",
//     type: "",
//   });
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const trialMessageLimit = 5;

//   useEffect(() => {
//     const fetchAccountStatus = async () => {
//       const userDocRef = doc(db, "users", userId);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setIsTrial(userData.isTrial || false);
//         setSentMessagesCount(userData.sentMessagesCount || 0);

//         // If it's a real account, fetch encrypted connection data
//         if (!userData.isTrial) {
//           const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
//           const connectionDoc = await getDoc(connectionDocRef);

//           if (connectionDoc.exists()) {
//             const decryptedData = decryptData(connectionDoc.data().data);
//             if (decryptedData) {
//               setAccessToken(decryptedData.accessToken);
//               setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId);
//               setPhoneNumberId(decryptedData.phoneNumberId);
//             } else {
//               setError("Failed to decrypt connection data.");
//             }
//           }
//         }

//         // Check if the trial user has hit the message limit
//         if (userData.isTrial && userData.sentMessagesCount >= trialMessageLimit) {
//           setIsLimitReached(true);
//         }
//       }
//     };

//     fetchAccountStatus();
//   }, [userId]);

//   useEffect(() => {
//     const currentISTTime = getCurrentISTTime();
//     const oneMonthAgoIST = new Date(currentISTTime);
//     oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

//     setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
//     setEndDate(convertToUnixTimestamp(currentISTTime));
//   }, []);

//   useEffect(() => {
//     if (templateId && startDate && endDate && accessToken && businessPhoneNumberId) {
//       fetchTemplateDetails(templateId, accessToken)
//         .then((data) => setTemplateDetails(data))
//         .catch((error) =>
//           setError("Error fetching template details: " + error.message)
//         );

//       fetchTemplateAnalytics(templateId, startDate, endDate, accessToken, businessPhoneNumberId)
//         .then((data) => setAnalyticsData(data))
//         .catch((error) => console.error("Error fetching analytics data:", error));

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
//   }, [templateId, startDate, endDate, accessToken, businessPhoneNumberId]);

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

//     let allowedNumbersToSend = numbersToSend;

//     // Limit the number of messages for trial users
//     if (isTrial) {
//       const remainingMessages = trialMessageLimit - sentMessagesCount;
//       if (remainingMessages <= 0) {
//         setPopup({
//           isVisible: true,
//           message: `Trial users can only send ${trialMessageLimit} messages.`,
//           type: "error",
//         });
//         return;
//       }

//       allowedNumbersToSend = numbersToSend.slice(0, remainingMessages);
//     }

//     try {
//       const sentNumbers = []; // Track successfully sent numbers

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

//       // Iterate through the allowed numbers only
//       for (let i = 0; i < allowedNumbersToSend.length; i++) {
//         const phoneNumber = allowedNumbersToSend[i];

//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
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

//         // Track the successfully sent number
//         sentNumbers.push(phoneNumber);
//       }

//       // Update the sent message count in Firestore
//       const newMessageCount = sentMessagesCount + allowedNumbersToSend.length;
//       const userDocRef = doc(db, "users", userId);
//       await updateDoc(userDocRef, { sentMessagesCount: newMessageCount });

//       // Log the campaign data in Firestore
//       await addDoc(collection(db, "users", userId, "campaigns"), {
//         templateId: templateId,
//         templateName: templateDetails.name,
//         messageSentCount: allowedNumbersToSend.length,
//         messageSentDate: new Date(),
//       });

//       const totalMessagesSent = newMessageCount;
//       // Display the sent numbers in the popup
//       setPopup({
//         isVisible: true,
//         message: `Total messages sent: ${totalMessagesSent}`,
//         type: "success",
//       });

//       setSentMessagesCount(newMessageCount); // Update local state
//       if (isTrial && newMessageCount >= trialMessageLimit) {
//         setIsLimitReached(true); // Block further messages if limit is reached
//       }
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

//         {isTrial ? (
//         <p
//           className="mb-4 text-white text-lg"
//           style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//         >
//           5 Trial Message : {sentMessagesCount} Used
//         </p>
//       ) : (
//         <p
//           className="mb-4 text-green-500"
//           style={{ fontFamily: "LeagueSpartan, sans-serif" }}
//         >
//           You Can Sent Unlimitted Message But Dont Sent Bulk Message At the Begining
//         </p>
//       )}

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
import { storage, db } from "../../../../../firebaseConfig"; // Adjust the path as needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import Preloader from "../../../../../components/Preloader";
import Popup from "@/components/Popup";
import CryptoJS from "crypto-js";

// Utility Functions
const convertToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

const getCurrentISTTime = () => {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
};

// Decrypt Function
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

// API Functions
const fetchTemplateDetails = async (id, accessToken) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${id}?access_token=${accessToken}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error.message || "Failed to fetch template details"
      );
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

const TemplateDetailsPage = () => {
  const router = useRouter();
  const { templateId, userId } = useParams();

  // State Variables
  const [isMobile, setIsMobile] = useState(false);
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
  const [analyticsErrorData, setAnalyticsErrorData] = useState("");
  const [analyticsErrorMessage, setAnalyticsErrorMessage] = useState(null);
  const [openInfoPopup, setOpenInfoPopup] = useState(false);
  const [openDatePopup, setOpenDatePopup] = useState(false);
  const [openCampaignPopup, setOpenCampaignPopup] = useState(false);
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);
  const [totals, setTotals] = useState({
    sent: 0,
    delivered: 0,
    cost: 0,
    clicked: 0,
    read: 0,
  });
  const [isTrial, setIsTrial] = useState(false); // Store whether the user is trial
  const [sentMessagesCount, setSentMessagesCount] = useState(0); // Track number of sent messages
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [accessToken, setAccessToken] = useState(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN
  );
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState(
    process.env.NEXT_PUBLIC_BUSSINESS_ID
  );
  const [phoneNumberId, setPhoneNumberId] = useState(
    process.env.NEXT_PUBLIC_PHONE_NUMBER_ID
  );
  const [popup, setPopup] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const trialMessageLimit = 5;

  // Fetch User Account Status
  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsTrial(userData.isTrial || false);
          setSentMessagesCount(userData.sentMessagesCount || 0);

          // If it's a real account, fetch encrypted connection data
          if (!userData.isTrial) {
            const connectionDocRef = doc(
              db,
              "users",
              userId,
              "documents",
              "connectionData"
            );
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
          if (
            userData.isTrial &&
            userData.sentMessagesCount >= trialMessageLimit
          ) {
            setIsLimitReached(true);
          }
        } else {
          setError("User account does not exist.");
        }
      } catch (error) {
        console.error("Error fetching account status:", error);
        setError("Error fetching account status: " + error.message);
      }
    };

    if (userId) {
      fetchAccountStatus();
    }
  }, [userId]);

  // Set Default Date Range (Past One Month)
  useEffect(() => {
    const currentISTTime = getCurrentISTTime();
    const oneMonthAgoIST = new Date(currentISTTime);
    oneMonthAgoIST.setMonth(oneMonthAgoIST.getMonth() - 1);

    setStartDate(convertToUnixTimestamp(oneMonthAgoIST));
    setEndDate(convertToUnixTimestamp(currentISTTime));
  }, []);

  // Fetch Template Details and Analytics
  useEffect(() => {
    const fetchData = async () => {
      if (
        templateId &&
        startDate &&
        endDate &&
        accessToken &&
        businessPhoneNumberId
      ) {
        // Fetch Template Details
        try {
          const details = await fetchTemplateDetails(templateId, accessToken);
          setTemplateDetails(details);
        } catch (error) {
          setError("Error fetching template details: " + error.message);
        }

        // Fetch Template Analytics
        try {
          const analytics = await fetchTemplateAnalytics(
            templateId,
            startDate,
            endDate,
            accessToken,
            businessPhoneNumberId
          );

          if (analytics && Array.isArray(analytics) && analytics.length > 0) {
            setAnalyticsData(analytics);
            calculateTotals(analytics);
          } else if (analyticsErrorData || analyticsErrorMessage) {
            // Errors are already handled and displayed
          } else {
          }
        } catch (error) {
          setAnalyticsErrorMessage(
            "Error fetching analytics data: " + error.message
          );
        }

        // Fetch Campaigns
        try {
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
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          setError("Error fetching campaigns: " + error.message);
        }
      }
    };

    fetchData();
  }, [
    templateId,
    startDate,
    endDate,
    accessToken,
    businessPhoneNumberId,
    userId,
  ]);

  // Fetch Template Analytics Function
  const fetchTemplateAnalytics = async (
    templateId,
    startDate,
    endDate,
    accessToken,
    businessPhoneNumberId
  ) => {
    const allDataPoints = [];
    let nextPageURL = `https://graph.facebook.com/v21.0/${businessPhoneNumberId}/template_analytics?start=${startDate}&end=${endDate}&granularity=daily&metric_types=cost,clicked,delivered,read,sent&template_ids=[${templateId}]&limit=100`;

    try {
      while (nextPageURL) {
        const response = await fetch(nextPageURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Detailed error response:", errorData);

          // Extract error message and error_data
          const errorMessage = errorData.error?.message;
          const errorDetails = errorData.error?.error_data;

          setAnalyticsErrorData(errorDetails);
          setAnalyticsErrorMessage(errorMessage);

          // Optionally, you can break the loop if an error occurs
          break;
        }

        const data = await response.json();
        console.log("Fetched Analytics Data:", data); // Log for debugging
        console.log("Template ID:", templateId);

        if (data.data && Array.isArray(data.data)) {
          data.data.forEach((item) => {
            if (Array.isArray(item.data_points)) {
              item.data_points.forEach((point) => {
                // Exclude data points where sent, delivered, and read are all 0
                if (
                  (point.sent && point.sent > 0) ||
                  (point.delivered && point.delivered > 0) ||
                  (point.read && point.read > 0)
                ) {
                  allDataPoints.push(point);
                }
              });
            } else {
              console.warn("Invalid 'data_points' structure in item:", item);
            }
          });
        }

        // Check if there's a next page
        if (data.paging && data.paging.next) {
          nextPageURL = data.paging.next;
        } else {
          nextPageURL = null;
        }
      }

      console.log("All Fetched Data Points:", allDataPoints); // Log all accumulated data points
      return allDataPoints;
    } catch (error) {
      console.error("Error fetching template analytics:", error);
      setAnalyticsErrorMessage(
        "Error fetching analytics data: " + error.message
      );
      return null;
    }
  };

  // Handle Mobile View
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Date Changes
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

  // Fetch Phone Numbers (Unused in Current Code)
  const fetchPhoneNumbers = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "phoneNumbers")
      ); // Adjust the collection name as needed
      const numbers = [];
      querySnapshot.forEach((doc) => {
        numbers.push({ id: doc.id, ...doc.data() });
      });
      setPhoneNumbers(numbers);
    } catch (error) {
      console.error("Error fetching phone numbers:", error);
      setError("Error fetching phone numbers: " + error.message);
    }
  };

  // Calculate Totals from Analytics Data
  const calculateTotals = (dataPoints) => {
    if (!Array.isArray(dataPoints)) {
      console.error("Invalid dataPoints: Expected an array.");
      setTotals({
        sent: 0,
        delivered: 0,
        cost: 0,
        clicked: 0,
        read: 0,
      });
      return;
    }

    const totals = dataPoints.reduce(
      (acc, point) => {
        if (!point) return acc; // Skip if point is undefined or null

        acc.sent += point.sent || 0;
        acc.delivered += point.delivered || 0;
        acc.read += point.read || 0;

        if (Array.isArray(point.cost)) {
          acc.cost += point.cost.reduce((sum, c) => sum + (c.value || 0), 0);
        } else {
          console.warn(`Missing or invalid 'cost' for point:`, point);
        }

        if (Array.isArray(point.clicked) && point.clicked.length > 0) {
          point.clicked.forEach((click) => {
            acc.clicked += click.count || 0;
          });
        }

        return acc;
      },
      { sent: 0, delivered: 0, cost: 0, clicked: 0, read: 0 }
    );

    setTotals(totals);
  };

  // Render Analytics Table
  const renderAnalyticsTable = () => {
    if (analyticsErrorData) {
      return <div className="text-red-500 mb-4">{analyticsErrorData}</div>;
    }

    if (analyticsErrorMessage) {
      return <div className="text-red-500 mb-4">{analyticsErrorMessage}</div>;
    }

    if (!analyticsData || analyticsData.length === 0) {
      return <div className="text-red-500">No Data</div>;
    }

    return (
      <div
        className="overflow-x-auto"
        style={{ fontFamily: "LeagueSpartan, sans-serif" }}
      >
        <table
          className="table-auto w-full text-center border border-gray-300"
          style={{ tableLayout: "auto" }}
        >
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-amber-600">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    calendar_today
                  </span>{" "}
                  Date
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-blue-600">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    send
                  </span>{" "}
                  Sent
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-green-500">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    done_all
                  </span>{" "}
                  Delivered
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-purple-600">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    visibility
                  </span>{" "}
                  Read
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-teal-500">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    attach_money
                  </span>{" "}
                  Total Cost
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-red-600">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    text_fields
                  </span>{" "}
                  Button Content
                </span>
              </th>
              <th
                className="border-b border-gray-300 px-2 py-1 text-left font-semibold text-center"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                <span className="inline-flex items-center text-orange-600">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
                  >
                    mouse
                  </span>{" "}
                  Click Count
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-700 bg-white">
            {analyticsData.map((point, index) => {
              const totalCost = Array.isArray(point.cost)
                ? point.cost.reduce((sum, cost) => sum + (cost.value || 0), 0)
                : 0;

              return (
                <tr key={index} className="border-t border-gray-300">
                  <td
                    className="px-2 py-1"
                    style={{
                      fontSize: isMobile ? "1.5vw" : "1.2vw",
                      wordWrap: "break-word",
                    }}
                  >
                    {new Date(point.start * 1000).toLocaleDateString()}
                  </td>
                  <td
                    className="px-2 py-1"
                    style={{
                      fontSize: isMobile ? "1.5vw" : "1.2vw",
                      wordWrap: "break-word",
                    }}
                  >
                    {point.sent}
                  </td>
                  <td
                    className="px-2 py-1"
                    style={{
                      fontSize: isMobile ? "1.5vw" : "1.2vw",
                      wordWrap: "break-word",
                    }}
                  >
                    {point.delivered}
                  </td>
                  <td
                    className="px-2 py-1"
                    style={{
                      fontSize: isMobile ? "1.5vw" : "1.2vw",
                      wordWrap: "break-word",
                    }}
                  >
                    {point.read}
                  </td>
                  <td
                    className="px-2 py-1"
                    style={{
                      fontSize: isMobile ? "1.5vw" : "1.2vw",
                      wordWrap: "break-word",
                    }}
                  >
                    ${totalCost.toFixed(2)}
                  </td>
                  {Array.isArray(point.clicked) && point.clicked.length > 0 ? (
                    point.clicked.map((click, clickIndex) => (
                      <React.Fragment key={clickIndex}>
                        <td
                          className="px-2 py-1"
                          style={{
                            fontSize: isMobile ? "1.5vw" : "1.2vw",
                            wordWrap: "break-word",
                          }}
                        >
                          {click.button_content}
                        </td>
                        <td
                          className="px-2 py-1"
                          style={{
                            fontSize: isMobile ? "1.5vw" : "1.2vw",
                            wordWrap: "break-word",
                          }}
                        >
                          {click.count}
                        </td>
                      </React.Fragment>
                    ))
                  ) : (
                    <>
                      <td
                        className="px-2 py-1"
                        style={{
                          fontSize: isMobile ? "1.5vw" : "1.2vw",
                          wordWrap: "break-word",
                        }}
                        colSpan={2}
                      >
                        No Click Data
                      </td>
                    </>
                  )}
                </tr>
              );
            })}

            {/* Totals Row */}
            <tr className="border-t border-gray-300 font-semibold">
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                Total
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                {totals.sent}
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                {totals.delivered}
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                {totals.read}
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                ${totals.cost.toFixed(2)}
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                -
              </td>
              <td
                className="px-2 py-1"
                style={{ fontSize: isMobile ? "1.5vw" : "1.2vw" }}
              >
                {totals.clicked}
              </td>
            </tr>
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
        message: `Message Sent Success`,
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

  const handleOpenInfoPopup = () => {
    setOpenInfoPopup(true);
  };

  const handleCloseInfoPopup = () => {
    setOpenInfoPopup(false);
  };

  const handleOpenCampaignPopup = () => {
    setOpenCampaignPopup(true);
  };

  const handleCloseCampaignPopup = () => {
    setOpenCampaignPopup(false);
  };

  const handleOpenDatePopup = () => {
    setOpenDatePopup(true);
  };

  const handleCloseDatePopup = () => {
    setOpenDatePopup(false);
  };

  const handleOpenTemplatePopup = () => {
    setIsTemplatePopupOpen(true);
  };

  // Function to handle closing the popup modal
  const handleCloseTemplatePopup = () => {
    setIsTemplatePopupOpen(false);
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
    <div
      className="space-y-6"
      style={{
        width: "100%",
        fontFamily: "LeagueSpartan, sans-serif",
        padding: isMobile ? 15 : 20,
      }}
    >
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
            className="mb-4 mt-2 text-white text-lg"
            style={{ fontFamily: "LeagueSpartan, sans-serif" }}
          >
            <strong className="text-red-500">{5 - sentMessagesCount}</strong> :
            Demo Messages Left
          </p>
        ) : (
          <p
            className="mb-2 mt-2 text-white text-bold"
            style={{ fontFamily: "LeagueSpartan, sans-serif" }}
          >
            You can send unlimited messages, but please avoid sending bulk
            messages initially. Start by sending messages to 250 different
            conversations first.
          </p>
        )}
      </div>

      <div
        className="flex flex-col lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 space-y-6 lg:space-y-0"
        style={{ fontFamily: "LeagueSpartan, sans-serif" }}
      >
        {/* Template Details Section - Now on the Right */}
        <div
          className="lg:w-2/5 bg-white p-4 rounded-lg shadow-md"
          style={{
            backgroundImage:
              'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Template Details
          </h2>
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
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Send Message With This Template
            <button
              onClick={handleOpenTemplatePopup}
              className="ml-2 mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              aria-label="Template Analytics Information"
            >
              <span className="material-icons">help_outline</span>
            </button>
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
            {/* Show the count of selected numbers */}
            {selectedNumbers.length > 0 && (
              <p className="mt-2 text-red-500 mb-2">
                <strong>{selectedNumbers.length}</strong> phone number selected
                for sending messages.
              </p>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-3 mt-2"
              onClick={openModal}
            >
              Select Phone Number
            </button>
          </div>
          {/* Popup Modal Content */}
          {isTemplatePopupOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <h3 className="text-xl font-bold mb-4">
                  Message Sending Guide
                </h3>
                <p className="mb-2">
                  For sending messages with this template, you need to select a
                  phone number, or if sending to just one number, enter it in
                  the input field above. Make sure to include the country code
                  (without spaces).
                </p>
                <p className="mb-2">
                  If the template contains media such as an image, document, or
                  video, you must upload the file. Otherwise, an error will
                  occur.
                </p>
                <p className="mb-2">
                  After clicking "Send Message," please wait a moment for the
                  response.
                </p>
                <p className="mb-2">
                  After sending the message, it may take a few minutes for the
                  analytics to appear below.
                </p>
                <p className="mb-2">
                  You cannot send messages to your own number. Doing so will
                  result in an error.
                </p>
                <p className="mb-4">
                  If the template contains parameters, they must be filled in.
                  Otherwise, an error will occur.
                </p>
                <p className="mb-4">
                  To create new templates, visit:{" "}
                  <a
                    href="https://business.facebook.com/latest/whatsapp_manager/message_templates"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    WhatsApp Message Templates
                  </a>
                  .
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                  onClick={handleCloseTemplatePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

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
                        Upload Image *
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
                        Upload Video *
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
                    Upload Document *
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
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg"
                style={
                  isMobile
                    ? {}
                    : {
                        position: "absolute",
                        left: "60%",
                        transform: "translateX(-50%)",
                      }
                }
              >
                <h2 className="text-xl font-bold mb-2">Select Phone Numbers</h2>
                {/* Show the count of selected numbers */}
                {selectedNumbers.length > 0 && (
                  <p className="mb-2 text-red-500 mb-2">
                    <strong>{selectedNumbers.length}</strong> phone number
                    selected for sending messages.
                  </p>
                )}

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
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Template Analytics
          {/* Info Icon */}
          <button
            onClick={handleOpenInfoPopup}
            className="ml-2 mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Template Analytics Information"
          >
            <span className="material-icons">help_outline</span>
          </button>
        </h2>
        <div className="mb-4" style={{ display: isMobile ? "block" : "flex" }}>
          <div>
            <label htmlFor="startDate" className="mr-2">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={
                startDate
                  ? new Date(startDate * 1000).toISOString().split("T")[0]
                  : ""
              }
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
              value={
                endDate
                  ? new Date(endDate * 1000).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
              className="border px-2 py-1 rounded"
            />
          </div>
          {/* Info Icon */}
          <button
            onClick={handleOpenDatePopup}
            className="ml-2 mt-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Template Analytics Information"
          >
            <span className="material-icons">help_outline</span>
          </button>
        </div>

        {analyticsData ? (
           renderAnalyticsTable(analyticsData)
        ) : analyticsErrorData ? (
          <p className="text-red-500">{analyticsErrorData}</p>
        ) : analyticsErrorMessage ? (
          <p className="text-red-500">{analyticsErrorMessage}</p>
        ) : (
          <p className="text-red-500">Loading...</p>
        )}

        {/* Date Popup Modal */}
        {openDatePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={handleCloseDatePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close Date Popup"
              >
                <span className="material-icons">close</span>
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Date Range Information
              </h3>
              <p className="mb-4">
                By default, data from the past month is displayed. You can
                adjust the start and end dates to view analytics for a custom
                range. However, the analytics data must be within the last 90
                days.
              </p>
              <h4 className="font-semibold mb-2">Potential Errors</h4>
              <p className="mb-2">
                If you try to fetch data outside of the 90-day period, you may
                encounter the following errors:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Detailed Error:</strong> "Start time must be within
                  the query period of the last 90 days."
                </li>
                <li>
                  <strong>Detailed Error:</strong> "End time must be within the
                  query period of the last 90 days."
                </li>
              </ul>
              <h4 className="font-semibold mb-2">
                Template Insights Permission
              </h4>
              <p className="mb-4">
                If template insights permission is not enabled, the analytics
                will not be accessible. Ensure you have the necessary
                permissions to view the data.
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleCloseDatePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Popup */}
        {openInfoPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={handleCloseInfoPopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close Information Popup"
              >
                <span className="material-icons">close</span>
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Template Analytics Information
              </h3>
              <p className="mb-4">
                Template Analytics provide comprehensive insights into the
                performance of your WhatsApp templates. By analyzing various
                metrics, you can optimize your messaging strategy to enhance
                engagement and effectiveness.
              </p>
              <h4 className="font-semibold mb-2">Date Filtering</h4>
              <p className="mb-4">
                Utilize the date filters to customize the analytics data you
                view. Selecting a specific date range allows you to focus on the
                performance of your templates over a defined period.
              </p>
              <h4 className="font-semibold mb-2">
                Potential Errors and Causes
              </h4>
              <p className="mb-2">
                Several factors can influence the accuracy and reliability of
                your template analytics:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>API Rate Limits:</strong> Exceeding Facebook's API
                  rate limits can result in incomplete data retrieval.
                </li>
                <li>
                  <strong>Incorrect Access Tokens:</strong> Using invalid or
                  expired access tokens may prevent successful data fetching.
                </li>
                <li>
                  <strong>Network Issues:</strong> Connectivity problems can
                  lead to failed API requests or incomplete data.
                </li>
                <li>
                  <strong>Data Processing Delays:</strong> Backend processing
                  delays may cause recent data to be unavailable immediately.
                </li>
              </ul>
              <h4 className="font-semibold mb-2">Understanding Delays</h4>
              <p className="mb-2">
                There can be inherent delays in the reporting metrics, which are
                categorized as follows:
              </p>
              <h5 className="font-semibold mb-1">Delivered &gt; Sent:</h5>
              <ul className="list-disc list-inside mb-4">
                <li>
                  <strong>WhatsApp Caching:</strong> Messages may be cached on
                  devices, showing as delivered before being sent.
                </li>
                <li>
                  <strong>Network Fluctuations:</strong> Messages sent but not
                  yet processed by WhatsApp servers.
                </li>
                <li>
                  <strong>Message Queuing:</strong> WhatsApp may queue messages,
                  showing as delivered before sending.
                </li>
              </ul>
              <h5 className="font-semibold mb-1">Read &gt; Delivered:</h5>
              <ul className="list-disc list-inside mb-4">
                <li>
                  <strong>User Behavior:</strong> Users may read messages
                  without internet connectivity (offline).
                </li>
                <li>
                  <strong>WhatsApp Synchronization:</strong> Devices may sync
                  messages, marking as read before delivery confirmation.
                </li>
                <li>
                  <strong>Message Status Updates:</strong> WhatsApp may update
                  message status (read) before delivery confirmation.
                </li>
              </ul>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleCloseInfoPopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8">
        <h2
          className="text-lg font-semibold mb-4 flex items-center" // Added flex and items-center
          style={{ fontFamily: "LeagueSpartan, sans-serif" }}
        >
          Campaign History
          {/* Info Icon */}
          <button
            onClick={handleOpenCampaignPopup}
            className="ml-2 mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Templates Analytics Information"
          >
            <span className="material-icons">help_outline</span>
          </button>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead
              className="bg-gray-100 border-b border-gray-300"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              <tr>
                <th className="p-3 text-left text-gray-700 text-center">
                  Template Name
                </th>
                <th className="p-3 text-left text-gray-700 text-center">
                  Message Sent Count
                </th>
                <th className="p-3 text-left text-gray-700 text-center">
                  Date
                </th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td
                    className="p-3 text-gray-900 text-center"
                    style={{ fontSize: isMobile ? "2.4vw" : "1.2vw" }}
                  >
                    {campaign.templateName}
                  </td>
                  <td
                    className="p-3 text-gray-900 text-center"
                    style={{ fontSize: isMobile ? "2.4vw" : "1.2vw" }}
                  >
                    {campaign.messageSentCount}
                  </td>
                  <td
                    className="p-3 text-gray-900 text-center"
                    style={{ fontSize: isMobile ? "2.4vw" : "1.2vw" }}
                  >
                    {new Date(
                      campaign.messageSentDate.seconds * 1000
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Info Modal */}
        {openCampaignPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">
                Campaign History Information
              </h3>
              <p className="mb-4">
                The Campaign History section is used to view the number of
                messages sent at specific dates. This information can be helpful
                in situations where template analytics may not be functioning or
                when you want to see the count of messages sent at a given time.
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCloseCampaignPopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default TemplateDetailsPage;
