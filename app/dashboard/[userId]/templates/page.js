
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { doc, getDoc } from 'firebase/firestore';
// import Preloader from '@/components/Preloader';
// import { useParams } from "next/navigation";
// import CryptoJS from 'crypto-js';
// import { db } from "../../../../firebaseConfig"; // Adjust the path to your firebase config

// // Using environment variables for trial accounts
// const accessTokenFromEnv = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
// const businessPhoneNumberIdFromEnv = process.env.NEXT_PUBLIC_BUSSINESS_ID;

// const TemplatesPage = () => {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [category, setCategory] = useState('All');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTrial, setIsTrial] = useState(true); // Assume trial by default
//   const [accessToken, setAccessToken] = useState(accessTokenFromEnv);
//   const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState(businessPhoneNumberIdFromEnv);

//   const router = useRouter();
//   const { userId } = useParams();

//   // Function to decrypt data
//   const decryptData = (cipherText) => {
//     try {
//       const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
//       const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     } catch (error) {
//       console.error("Decryption failed:", error);
//       return null;
//     }
//   };

//   // Fetch user trial status and connection data for real accounts
//   const fetchUserData = async () => {
//     try {
//       const userDocRef = doc(db, "users", userId);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const isTrialAccount = userDoc.data().isTrial || false;
//         setIsTrial(isTrialAccount);

//         if (!isTrialAccount) {
//           // If not a trial account, fetch connection data from Firebase
//           const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
//           const connectionDoc = await getDoc(connectionDocRef);

//           if (connectionDoc.exists()) {
//             const decryptedData = decryptData(connectionDoc.data().data);
//             if (decryptedData) {
//               setAccessToken(decryptedData.accessToken || "");
//               setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
//             } else {
//               setError("Failed to decrypt connection data");
//               return;
//             }
//           } else {
//             // Redirect to connection setup if no connection data is found
//             router.push(`/dashboard/${userId}/connection`);
//             return;
//           }
//         }
//       } else {
//         setError("User document not found");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError("Error loading user data");
//     }
//   };

//   // Fetch templates from Facebook API
//   const fetchTemplates = async () => {
//     if (!businessPhoneNumberId || !accessToken) {
//       setError("Missing required access token or phone number ID");
//       return;
//     }

//     console.log('Fetching templates with:', businessPhoneNumberId, accessToken);
//     try {
//       const response = await fetch(`https://graph.facebook.com/v20.0/${businessPhoneNumberId}/message_templates`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Cache-Control': 'no-store',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         // throw new Error(`Failed to fetch templates: ${errorData.error.message}`)
//         setError(`Failed to fetch templates: ${errorData.error.message}`);
//         return; // Exit the function early;
//       }

//       const data = await response.json();
//       setTemplates(data.data);
//       setFilteredTemplates(data.data); // Initialize with all templates
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       setError(`Failed to load templates: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData().then(() => {
//       if ((!isTrial && accessToken && businessPhoneNumberId) || (isTrial && accessTokenFromEnv && businessPhoneNumberIdFromEnv)) {
//         fetchTemplates(); // Fetch templates after user data is fetched
//       }
//     });

//     // Check for mobile view
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, [isTrial, accessToken, businessPhoneNumberId]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     setFilteredTemplates(
//       templates.filter(template =>
//         template.name.toLowerCase().includes(lowercasedQuery)
//       )
//     );
//   }, [searchQuery, templates]);

//   const handleCategoryClick = (category) => {
//     setCategory(category);
//     if (category === 'All') {
//       setFilteredTemplates(templates);
//     } else {
//       setFilteredTemplates(
//         templates.filter(template => template.category === category.toUpperCase())
//       );
//     }
//   };

//   const handleTemplateClick = (id) => {
//     router.push(`/dashboard/${userId}/templates/${id}`);
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

//   if (error) return <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-lg">{error}fysssssdd</div>;

  
  
  
//   if (loading) return <Preloader />;

//   return (
//     <div className='p-6' style={{fontFamily: "LeagueSpartan, sans-serif"}}>
//       {/* Fixed Category Bar */}
//       <div className={`flex ${isMobile ? 'flex-row' : 'flex-row'} justify-between bg-black rounded-lg text-white p-6 w-full z-10 sticky top-1`}>
//         <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-5 ${isMobile ? 'ml-0':'ml-6'}`}>
//           {!isMobile && (
//             <button
//             className={`text-lg font-semibold ${category === 'All' ? 'underline' : ''}`}
//             onClick={() => handleCategoryClick('All')}
//             >
//             All
//             </button>
//           )}
//           {!isMobile && (
//             ['Marketing', 'Utility', 'Authentication'].map((cat) => (
//               <button
//                 key={cat}
//                 className={`text-lg font-semibold ml-8 ${category === cat ? 'underline' : ''}`}
//                 onClick={() => handleCategoryClick(cat)}
//               >
//                 {cat}
//               </button>
//             ))
//           )}
//         </div>
//         <input
//           type="text"
//           placeholder="Search templates..."
//           className={`mt-2 ${isMobile ? 'w-full' : 'w-1/3'} p-2 rounded text-black`}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {isMobile && (
//           <select
//             className="ml-2 mt-2  bg-blue-600 text-white p-1 rounded w-14 h-10"
//             value={category}
//             onChange={(e) => handleCategoryClick(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Utility">Utility</option>
//             <option value="Authentication">Authentication</option>
//           </select>
//         )}
//       </div>

//       <div className="pt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTemplates.map(template => (
//           <div
//             key={template.id}
//             className="template-card w-full lg:w-70 mx-auto rounded-lg shadow hover:shadow-md p-2 bg-grey-900 cursor-pointer"
//             style={{
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
//               transition: "box-shadow 0.3s ease-in-out",
//             }}
//             onClick={() => handleTemplateClick(template.id)}
//             onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.1)"}
//             onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)"}
//           >
//             <div
//               className="w-full p-4 rounded-lg shadow-md"
//               style={{
//                 backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 minHeight: 450
//               }}
//             >
//               {/* Template Name */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {template.name}
//                 </h2>
//                 <span
//                   className={`text-xs font-bold px-2 py-1 rounded ${template.status === 'APPROVED' ? 'text-green-600 bg-green-200' :
//                     template.status === 'PENDING' ? 'text-yellow-600 bg-yellow-200' :
//                     template.status === 'REJECTED' ? 'text-red-600 bg-red-200' : ''}`}
//                 >
//                   {template.status === 'APPROVED' ? 'Active' :
//                     template.status === 'PENDING' ? 'Pending' :
//                     template.status === 'REJECTED' ? 'Rejected' : ''}
//                 </span>
//               </div>

//               <div
//                 className="p-1 rounded-lg"
//                 style={{
//                   background: "white",
//                   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 {template.components.map((component, index) => (
//                   <div key={index}>{renderComponent(component)}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TemplatesPage;

"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import Preloader from '@/components/Preloader';
import CryptoJS from 'crypto-js';
import { db } from "../../../../firebaseConfig"; // Adjust the path to your firebase config

// Using environment variables for trial accounts
const accessTokenFromEnv = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const businessPhoneNumberIdFromEnv = process.env.NEXT_PUBLIC_BUSSINESS_ID;

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [category, setCategory] = useState('All');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTrial, setIsTrial] = useState(null); // Null by default to handle loading properly
  const [accessToken, setAccessToken] = useState(null);
  const [businessPhoneNumberId, setBusinessPhoneNumberId] = useState(null);
  const router = useRouter();
  const { userId } = useParams();

  // Function to decrypt data
  const decryptData = (cipherText) => {
    try {
      const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  // Fetch user trial status and connection data for real accounts
  const fetchUserData = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const isTrialAccount = userDoc.data().isTrial || false;
        setIsTrial(isTrialAccount);

        if (!isTrialAccount) {
          // If not a trial account, fetch connection data from Firebase
          const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
          const connectionDoc = await getDoc(connectionDocRef);

          if (connectionDoc.exists()) {
            const decryptedData = decryptData(connectionDoc.data().data);
            if (decryptedData) {
              setAccessToken(decryptedData.accessToken || "");
              setBusinessPhoneNumberId(decryptedData.businessPhoneNumberId || "");
            } else {
              setError("Failed to decrypt connection data");
            }
          } else {
            // Redirect to connection setup if no connection data is found
            router.push(`/dashboard/${userId}/connection`);
            return;
          }
        } else {
          // If it's a trial account, use environment variables
          setAccessToken(accessTokenFromEnv);
          setBusinessPhoneNumberId(businessPhoneNumberIdFromEnv);
        }
      } else {
        setError("User document not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error loading user data");
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  // Fetch templates from Facebook API
  const fetchTemplates = async () => {
    if (!businessPhoneNumberId || !accessToken) {
      setError("Missing required access token or phone number ID");
      return;
    }

    console.log('Fetching templates with:', businessPhoneNumberId, accessToken);
    try {
      const response = await fetch(`https://graph.facebook.com/v21.0/${businessPhoneNumberId}/message_templates`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Failed to fetch templates: ${errorData.error.message}`);
        return;
      }

      const data = await response.json();
      setTemplates(data.data);
      setFilteredTemplates(data.data); // Initialize with all templates
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError(`Failed to load templates: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (isTrial !== null && (accessToken && businessPhoneNumberId)) {
      fetchTemplates();
    }
  }, [isTrial, accessToken, businessPhoneNumberId]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredTemplates(
      templates.filter(template =>
        template.name.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, templates]);

  // Handle mobile view adjustment
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check on component mount
    window.addEventListener("resize", handleResize); // Add event listener for resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
    if (category === 'All') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter(template => template.category === category.toUpperCase())
      );
    }
  };

  const handleTemplateClick = (id) => {
    router.push(`/dashboard/${userId}/templates/${id}`);
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

  if (error) return <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-lg">{error}</div>;

  if (loading) return <Preloader />;

  return (
    <div className='p-6' style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
      {/* Fixed Category Bar */}
      <div className={`flex flex-col md:flex-row justify-between bg-black rounded-lg text-white p-6 w-full z-10 sticky top-1`}>
        <div className="flex flex-col md:flex-row items-center gap-5 md:ml-6">
          <button
            className={`text-lg font-semibold ${category === 'All' ? 'underline' : ''}`}
            onClick={() => handleCategoryClick('All')}
          >
            All
          </button>
          {['Marketing', 'Utility', 'Authentication'].map((cat) => (
            <button
              key={cat}
              className={`text-lg font-semibold ${category === cat ? 'underline' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search templates..."
          className="mt-2 w-full md:w-1/3 p-2 rounded text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isMobile && (
          <select
            className="ml-2 mt-2 bg-blue-600 text-white p-1 rounded w-14 h-10"
            value={category}
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Marketing">Marketing</option>
            <option value="Utility">Utility</option>
            <option value="Authentication">Authentication</option>
          </select>
        )}
      </div>

      <div className="pt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="template-card w-full lg:w-70 mx-auto rounded-lg shadow hover:shadow-md p-2 bg-grey-900 cursor-pointer"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            onClick={() => handleTemplateClick(template.id)}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)"}
          >
            <div
              className="w-full p-4 rounded-lg shadow-md"
              style={{
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 450
              }}
            >
              {/* Template Name */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {template.name}
                </h2>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${template.status === 'APPROVED' ? 'text-green-600 bg-green-200' :
                    template.status === 'PENDING' ? 'text-yellow-600 bg-yellow-200' :
                    template.status === 'REJECTED' ? 'text-red-600 bg-red-200' : ''}`}
                >
                  {template.status === 'APPROVED' ? 'Active' :
                    template.status === 'PENDING' ? 'Pending' :
                    template.status === 'REJECTED' ? 'Rejected' : ''}
                </span>
              </div>

              <div
                className="p-1 rounded-lg"
                style={{
                  background: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {template.components.map((component, index) => (
                  <div key={index}>{renderComponent(component)}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
