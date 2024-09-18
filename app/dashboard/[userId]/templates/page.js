// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Preloader from '@/components/Preloader';

// const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
// const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// const TemplatesPage = () => {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [category, setCategory] = useState('All');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const router = useRouter();

//   const fetchTemplates = async () => {
//     console.log('Fetching templates...');
//     try {
//       const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Cache-Control': 'no-store',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch templates');
//       }
//       const data = await response.json();
//       console.log('Fetched templates:', data.data);
//       setTemplates(data.data);
//       setFilteredTemplates(data.data); // Initialize with all templates
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log('useEffect triggered');
//     fetchTemplates();

//     // Check for mobile view
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

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
//     router.push(`/templates/${id}`);
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
//               {/* Replace location with actual location details if available */}
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

//   if (error) return <div>Failed to load templates.</div>;
//   if (loading) return <Preloader />;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Fixed Category Bar */}
//       <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between bg-blue-500 text-white p-2 fixed top-0 left-0 w-full z-10`}>
//         <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-5`}>
//           <button
//             className={`text-lg font-semibold ${category === 'All' ? 'underline' : ''}`}
//             onClick={() => handleCategoryClick('All')}
//           >
//             All
//           </button>
//           {isMobile && (
//             <select
//               className="ml-2 bg-blue-600 text-white p-1 rounded"
//               value={category}
//               onChange={(e) => handleCategoryClick(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Marketing">Marketing</option>
//               <option value="Utility">Utility</option>
//               <option value="Authentication">Authentication</option>
//             </select>
//           )}
//           {!isMobile && (
//             ['Marketing', 'Utility', 'Authentication'].map((cat) => (
//               <button
//                 key={cat}
//                 className={`text-lg font-semibold ${category === cat ? 'underline' : ''}`}
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
//       </div>

//       <div className="pt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTemplates.map(template => (
//           <div
//             key={template.id}
//             className="template-card w-full lg:w-80 mx-auto rounded-lg shadow hover:shadow-md p-4 bg-white cursor-pointer"
//             style={{
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
//               transition: "box-shadow 0.3s ease-in-out",
//             }}
//             onClick={() => handleTemplateClick(template.id)}
//             onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.1)"}
//             onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)"}
//           >
//             <div
//               className="w-full bg-white p-4 rounded-lg shadow-md"
//               style={{
//                 backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
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
//                 className="p-1"
//                 style={{
//                   background: "white",
//                   borderRadius: "10px",
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


// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Preloader from '@/components/Preloader';
// import { useParams } from "next/navigation";
// const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
// const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

// const TemplatesPage = () => {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [category, setCategory] = useState('All');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMobile, setIsMobile] = useState(false);
//   const router = useRouter();
//   const { userId } = useParams();

//   const fetchTemplates = async () => {
//     console.log('Fetching templates...');
//     try {
//       const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Cache-Control': 'no-store',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch templates');
//       }
//       const data = await response.json();
//       console.log('Fetched templates:', data.data);
//       setTemplates(data.data);
//       setFilteredTemplates(data.data); // Initialize with all templates
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log('useEffect triggered');
//     fetchTemplates();

//     // Check for mobile view
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

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
//               {/* Replace location with actual location details if available */}
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

//   if (error) return <div>Failed to load templates.</div>;
//   if (loading) return <Preloader />;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Fixed Category Bar */}
//       <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between bg-blue-500 text-white p-2 fixed top-0 left-0 w-full z-10`}>
//         <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-5`}>
//           <button
//             className={`text-lg font-semibold ${category === 'All' ? 'underline' : ''}`}
//             onClick={() => handleCategoryClick('All')}
//           >
//             All
//           </button>
//           {isMobile && (
//             <select
//               className="ml-2 bg-blue-600 text-white p-1 rounded"
//               value={category}
//               onChange={(e) => handleCategoryClick(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Marketing">Marketing</option>
//               <option value="Utility">Utility</option>
//               <option value="Authentication">Authentication</option>
//             </select>
//           )}
//           {!isMobile && (
//             ['Marketing', 'Utility', 'Authentication'].map((cat) => (
//               <button
//                 key={cat}
//                 className={`text-lg font-semibold ${category === cat ? 'underline' : ''}`}
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
//       </div>

//       <div className="pt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTemplates.map(template => (
//           <div
//             key={template.id}
//             className="template-card w-full lg:w-70 mx-auto rounded-lg shadow hover:shadow-md p-4 bg-white cursor-pointer"
//             style={{
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
//               transition: "box-shadow 0.3s ease-in-out",
//             }}
//             onClick={() => handleTemplateClick(template.id)}
//             onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.1)"}
//             onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)"}
//           >
//             <div
//               className="w-full bg-white p-4 rounded-lg shadow-md"
//               style={{
//                 backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
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
//                 className="p-1"
//                 style={{
//                   background: "white",
//                   borderRadius: "10px",
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
import { useRouter } from 'next/navigation';
import Preloader from '@/components/Preloader';
import { useParams } from "next/navigation";
const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [category, setCategory] = useState('All');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { userId } = useParams();

  const fetchTemplates = async () => {
    console.log('Fetching templates...');
    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      console.log('Fetched templates:', data.data);
      setTemplates(data.data);
      setFilteredTemplates(data.data); // Initialize with all templates
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered');
    fetchTemplates();

    // Check for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredTemplates(
      templates.filter(template =>
        template.name.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, templates]);

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
              {/* Replace location with actual location details if available */}
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

  if (error) return <div>Failed to load templates.</div>;
  if (loading) return <Preloader />;

  return (
    <div className='p-6' style={{fontFamily: "LeagueSpartan, sans-serif"}}>
      {/* Fixed Category Bar */}
      <div className={`flex ${isMobile ? 'flex-row' : 'flex-row'} justify-between bg-blue-500 rounded-lg text-white p-6 w-full z-10 sticky top-1`}>
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-5 ${isMobile ? 'ml-0':'ml-6'}`}>
          {!isMobile && (
            <button
            className={`text-lg font-semibold ${category === 'All' ? 'underline' : ''}`}
            onClick={() => handleCategoryClick('All')}
            >
            All
            </button>
          )}
          {!isMobile && (
            ['Marketing', 'Utility', 'Authentication'].map((cat) => (
              <button
                key={cat}
                className={`text-lg font-semibold ml-8 ${category === cat ? 'underline' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))
          )}
        </div>
        <input
          type="text"
          placeholder="Search templates..."
          className={`mt-2 ${isMobile ? 'w-full' : 'w-1/3'} p-2 rounded text-black`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isMobile && (
          <select
            className="ml-2 mt-2  bg-blue-600 text-white p-1 rounded w-14 h-10"
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
                minHeight:450
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