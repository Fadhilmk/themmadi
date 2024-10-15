// "use client";
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, useParams } from 'next/navigation';
// import { HiMenu } from 'react-icons/hi';
// import { IoClose } from 'react-icons/io5';

// const DashboardLayout = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const router = useRouter();
//     const { userId } = useParams();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         router.push('/login');
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Sidebar */}
//             <div className={`bg-white text-blue-600 w-64 fixed top-0 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50 shadow-lg`}>
//                 <div className="p-4 border-b flex justify-between items-center">
//                     <h2 className="text-xl font-bold">Dashboard</h2>
//                     <IoClose onClick={toggleSidebar} className="md:hidden text-blue-600 text-2xl cursor-pointer" />
//                 </div>
//                 <nav className="flex-1 p-4">
//                     <ul>
//                         <li className="mb-4">
//                             <Link href={`/dashboard/${userId}/inbox`} className="flex items-center space-x-2">
//                                 <span>📥</span> {/* Inbox Icon */}
//                                 <span>Inbox</span>
//                             </Link>
//                         </li>
//                         <li className="mb-4">
//                             <Link href={`/dashboard/${userId}/templates`} className="flex items-center space-x-2">
//                                 <span>📄</span> {/* Templates Icon */}
//                                 <span>Templates</span>
//                             </Link>
//                         </li>
//                         <li className="mb-4">
//                             <Link href={`/dashboard/${userId}/import`} className="flex items-center space-x-2">
//                                 <span>📂</span> {/* Import Icon */}
//                                 <span>Import Numbers</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//                 <div className="p-4 border-t mt-auto">
//                     <button onClick={handleLogout} className="bg-red-500 text-white w-full p-2 rounded">Logout</button>
//                 </div>
//             </div>

//             {/* Header */}
//             <div className="flex-1 flex flex-col">
//                 <div className="w-full bg-white text-blue-600 shadow-md p-4 fixed top-0 md:ml-64 z-40 flex items-center justify-between">
//                     <h1 className="text-xl font-bold">Dashboard Header</h1>
//                     <div className="md:hidden">
//                         <HiMenu onClick={toggleSidebar} className="text-blue-600 text-3xl cursor-pointer" />
//                     </div>
//                 </div>

//                 {/* Main Content Area */}
//                 <main className="flex-1 p-6 pt-20 md:ml-64 overflow-y-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter, useParams } from "next/navigation";
// import { HiMenu } from "react-icons/hi"; // Still use react-icons for HiMenu
// import { IoClose } from "react-icons/io5"; // Still use react-icons for IoClose
// import { FaUser } from "react-icons/fa"; // FontAwesome icon for user
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Ensure db is exported from firebaseConfig

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const router = useRouter();
//   const { userId, section } = useParams(); // Get the current section from params

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     // Fetch username from Firebase
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   return (
//     <div className="flex h-screen overflow-hidden font-sans">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-blue-500 w-64 fixed top-0 h-full transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-lg flex flex-col`}
//       >
//         <div className="p-4 border-b flex items-center space-x-3">
//           <FaUser className="text-3xl" /> {/* FontAwesome user icon */}
//           <h2 className="text-2xl font-semibold truncate">{username}</h2>{" "}
//           {/* Add truncate class */}
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
//           />
//         </div>
//         <nav className="flex-1 p-4">
//           <ul className="space-y-4">
//             <li>
//               <Link
//                 href={`/dashboard/${userId}`}
//                 className={`block pl-4 pr-4 pt-3 pb-3 rounded-lg transition-transform ${
//                   section === "Dashboard"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-blue-500 hover:bg-blue-100"
//                 }`}
//               >
//                 <i className="fa-solid fa-inbox text-xl mr-3"></i>{" "}
//                 {/* FontAwesome inbox icon */}
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={`/dashboard/${userId}/inbox`}
//                 className={`block pl-4 pr-4 pt-3 pb-3 rounded-lg transition-transform ${
//                   section === "inbox"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-blue-500 hover:bg-blue-100"
//                 }`}
//               >
//                 <i className="fa-solid fa-inbox text-xl mr-3"></i>{" "}
//                 {/* FontAwesome inbox icon */}
//                 Inbox
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={`/dashboard/${userId}/templates`}
//                 className={`block p-4 rounded-lg transition-transform ${
//                   section === "templates"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-blue-500 hover:bg-blue-100"
//                 }`}
//               >
//                 <i className="fa-solid fa-file-alt text-xl mr-3"></i>{" "}
//                 {/* FontAwesome file icon */}
//                 Templates
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={`/dashboard/${userId}/contacts`}
//                 className={`block p-4 rounded-lg transition-transform ${
//                   section === "import"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-blue-500 hover:bg-blue-100"
//                 }`}
//               >
//                 <i className="fa-solid fa-file-import text-xl mr-3"></i>{" "}
//                 {/* FontAwesome import icon */}
//                 Contacts
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={`/dashboard/${userId}/contacts`}
//                 className={`block p-4 rounded-lg transition-transform ${
//                   section === "connection"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-blue-500 hover:bg-blue-100"
//                 }`}
//               >
//                 <i className="fa-solid fa-file-import text-xl mr-3"></i>{" "}
//                 {/* FontAwesome import icon */}
//                 Connection
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-4 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-blue-600 shadow-md p-4 fixed top-0 md:ml-64 z-40 flex items-center justify-between">
//           <h1 className="text-2xl font-semibold">Dashboard Header</h1>
//           <div className="md:hidden">
//             <HiMenu
//               onClick={toggleSidebar}
//               className="text-blue-600 text-3xl cursor-pointer"
//             />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-20 md:ml-64 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
// import { doc, getDoc } from "firebase/firestore";
// import { auth,db } from "../firebaseConfig";
// import Cookies from 'js-cookie';

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const [activeSection, setActiveSection] = useState(""); // State for active link
//   const router = useRouter();
//   const { userId, section } = useParams();

//   useEffect(() => {
//     // Redirect to Dashboard if no section is provided
//     if (!section) {
//       router.push(`/dashboard/${userId}`);
//     } else {
//       setActiveSection(section);
//     }
//   }, [section, userId, router]);

//   const handleLogout = async () => {
//     try {
//       // Sign out the user from Firebase
//       await auth.signOut();

//       // Remove cookies
//       Cookies.remove("token");
//       Cookies.remove("userId");

//       // Redirect to login page
//       router.push("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleLinkClick = (section) => {
//     setActiveSection(section);
//     router.push(`/dashboard/${userId}/${section}`);
//   };

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-blue-500 w-72 fixed top-0 h-full transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
//       >
//         <div className="p-6 border-b flex items-center space-x-4">
//           <FaUserCircle className="text-4xl" />
//           <h2 className="text-2xl font-semibold truncate">{username}</h2>
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
//           />
//         </div>
//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             {[
//               { href: `dashboard/`, label: "Dashboard", icon: "fa-tachometer-alt" },
//               { href: `dashboard/${userId}/inbox`, label: "Inbox", icon: "fa-inbox" },
//               { href: `dashboard/${userId}/templates`, label: "Templates", icon: "fa-file-alt" },
//               { href: `dashboard/${userId}/contacts`, label: "Contacts", icon: "fa-address-book" },
//               { href: `dashboard/${userId}/connection`, label: "Connection", icon: "fa-link" },
//             ].map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => handleLinkClick(item.href.split('/').pop())} // Set active section on click
//                   className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
//                     activeSection === item.href.split('/').pop()
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-blue-500 hover:bg-blue-100"
//                   } flex items-center w-full text-left`}
//                 >
//                   <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-6 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-blue-600 shadow-md p-6 fixed top-0 md:ml-72 z-40 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <HiMenu
//                 onClick={toggleSidebar}
//                 className="text-blue-600 text-3xl cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Account Icon */}
//             <FaUserCircle className="text-3xl cursor-pointer" />
//             {/* Settings Icon */}
//             <FiSettings className="text-3xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// up up up up

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { FaUserCircle } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const router = useRouter();
//   const { userId, section } = useParams();

//   // Determine the active section based on the current path
//   const getActiveSection = () => {
//     const currentPath = router.asPath || ""; // Fallback to an empty string if asPath is undefined

//     if (currentPath === `/dashboard/${userId}` || currentPath === `/dashboard/${userId}/`) {
//       return "dashboard";
//     } else if (currentPath.includes(`/dashboard/${userId}/inbox`)) {
//       return "inbox";
//     } else if (currentPath.includes(`/dashboard/${userId}/templates`)) {
//       return "templates";
//     } else if (currentPath.includes(`/dashboard/${userId}/contacts`)) {
//       return "contacts";
//     } else if (currentPath.includes(`/dashboard/${userId}/connection`)) {
//       return "connection";
//     }
//     return "";
//   };

//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [router.asPath]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     router.push("/login");
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleLinkClick = (section) => {
//     setActiveSection(section);
//     if (section === "dashboard") {
//       router.push(`/dashboard/${userId}`);
//     } else {
//       router.push(`/dashboard/${userId}/${section}`);
//     }
//   };

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-blue-500 w-72 fixed top-0 h-full transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
//       >
//         <div className="p-6 border-b flex items-center space-x-4">
//           <FaUserCircle className="text-4xl" />
//           <h2 className="text-2xl font-semibold truncate">{username}</h2>
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
//           />
//         </div>
//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             {[
//               { section: "dashboard", label: "Dashboard", icon: "fa-tachometer-alt" },
//               { section: "inbox", label: "Inbox", icon: "fa-inbox" },
//               { section: "templates", label: "Templates", icon: "fa-file-alt" },
//               { section: "contacts", label: "Contacts", icon: "fa-address-book" },
//               { section: "connection", label: "Connection", icon: "fa-link" },
//             ].map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => handleLinkClick(item.section)} // Set active section on click
//                   className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
//                     activeSection === item.section
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-blue-500 hover:bg-blue-100"
//                   } flex items-center w-full text-left`}
//                 >
//                   <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-6 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-blue-600 shadow-md p-6 fixed top-0 md:ml-72 z-40 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <HiMenu
//                 onClick={toggleSidebar}
//                 className="text-blue-600 text-3xl cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Account Icon */}
//             <FaUserCircle className="text-3xl cursor-pointer" />
//             {/* Settings Icon */}
//             <FiSettings className="text-3xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { FaUserCircle } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const router = useRouter();
//   const { userId, section } = useParams();

//   // Determine the active section based on the current path
//   const getActiveSection = () => {
//     const currentPath = router.asPath || ""; // Fallback to an empty string if asPath is undefined

//     if (currentPath.includes("/inbox")) {
//       return "inbox";
//     } else if (currentPath.includes("/templates")) {
//       return "templates";
//     } else if (currentPath.includes("/contacts")) {
//       return "contacts";
//     } else if (currentPath.includes("/connection")) {
//       return "connection";
//     }
//     return "dashboard";
//   };

//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [router.asPath]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     router.push("/login");
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleLinkClick = (section) => {
//     setActiveSection(section);
//     router.push(`/dashboard/${userId}/${section}`);
//   };

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-blue-500 w-72 fixed top-0 h-full transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
//       >
//         <div className="p-6 border-b flex items-center space-x-4">
//           <FaUserCircle className="text-4xl" />
//           <h2 className="text-2xl font-semibold truncate">{username}</h2>
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
//           />
//         </div>
//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             {[
//               { section: "dashboard", label: "Dashboard", icon: "fa-tachometer-alt" },
//               { section: "inbox", label: "Inbox", icon: "fa-inbox" },
//               { section: "templates", label: "Templates", icon: "fa-file-alt" },
//               { section: "contacts", label: "Contacts", icon: "fa-address-book" },
//               { section: "connection", label: "Connection", icon: "fa-link" },
//             ].map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => handleLinkClick(item.section)}
//                   className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
//                     activeSection === item.section
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-blue-500 hover:bg-blue-100"
//                   } flex items-center w-full text-left`}
//                 >
//                   <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-6 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-blue-600 shadow-md p-6 fixed top-0 md:ml-72 z-40 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <HiMenu
//                 onClick={toggleSidebar}
//                 className="text-blue-600 text-3xl cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Account Icon */}
//             <FaUserCircle className="text-3xl cursor-pointer" />
//             {/* Settings Icon */}
//             <FiSettings className="text-3xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig";
// import Cookies from "js-cookie";
// import { onAuthStateChanged } from "firebase/auth";

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const [activeSection, setActiveSection] = useState(""); // State for active link
//   const router = useRouter();
//   const { userId, section } = useParams();

//   // Check if user is authenticated
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // Redirect to login if not authenticated
//         router.push("/login");
//       }
//     });
//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     // Redirect to Dashboard if no section is provided
//     if (!section) {
//       router.push(`/dashboard/${userId}`);
//     } else {
//       setActiveSection(section);
//     }
//   }, [section, userId, router]);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();

//       // Remove cookies
//       Cookies.remove("token", { secure: true, sameSite: "Strict" });
//       Cookies.remove("userId", { secure: true, sameSite: "Strict" });

//       // Redirect to login page
//       router.push("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleLinkClick = (section) => {
//     setActiveSection(section);
//     router.push(`/dashboard/${userId}/${section}`);
//   };

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-blue-500 w-72 fixed top-0 h-full transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
//       >
//         <div className="p-6 border-b flex items-center space-x-4">
//           <FaUserCircle className="text-4xl" />
//           <h2 className="text-2xl font-semibold truncate">{username}</h2>
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
//           />
//         </div>
//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             {[
//               { href: `dashboard/`, label: "Dashboard", icon: "fa-tachometer-alt" },
//               { href: `dashboard/${userId}/inbox`, label: "Inbox", icon: "fa-inbox" },
//               { href: `dashboard/${userId}/templates`, label: "Templates", icon: "fa-file-alt" },
//               { href: `dashboard/${userId}/contacts`, label: "Contacts", icon: "fa-address-book" },
//               { href: `dashboard/${userId}/connection`, label: "Connection", icon: "fa-link" },
//             ].map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => handleLinkClick(item.href.split("/").pop())}
//                   className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
//                     activeSection === item.href.split("/").pop()
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-blue-500 hover:bg-blue-100"
//                   } flex items-center w-full text-left`}
//                 >
//                   <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-6 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-blue-600 shadow-md p-6 fixed top-0 md:ml-72 z-40 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <HiMenu
//                 onClick={toggleSidebar}
//                 className="text-blue-600 text-3xl cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <FaUserCircle className="text-3xl cursor-pointer" />
//             <FiSettings className="text-3xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";
// import { HiMenu } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
// import { FiSettings, FiMessageSquare } from "react-icons/fi";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig";
// import Cookies from "js-cookie";
// import { onAuthStateChanged } from "firebase/auth";

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const [activeSection, setActiveSection] = useState(""); // State for active link
//   const router = useRouter();
//   const { userId, section } = useParams();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     // Check for mobile view
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Check if user is authenticated
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // Redirect to login if not authenticated
//         router.push("/login");
//       }
//     });
//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     // Redirect to Dashboard if no section is provided
//     if (!section) {
//       router.push(`/dashboard/${userId}`);
//     } else {
//       setActiveSection(section);
//     }
//   }, [section, userId, router]);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();

//       // Remove cookies
//       Cookies.remove("token", { secure: true, sameSite: "Strict" });
//       Cookies.remove("userId", { secure: true, sameSite: "Strict" });

//       // Redirect to login page
//       router.push("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (isSidebarOpen && !e.target.closest(".sidebar")) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleLinkClick = (section) => {
//     setActiveSection(section);
//     router.push(`/dashboard/${userId}/${section}`);
//   };

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().username || "User");
//         } else {
//           console.error("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isSidebarOpen, userId]);

//   const handleOpenNotificationModel = () =>{
//     setIsNotificationOpen(true)
//   }
//   const handleCloseNotificationModel = () =>{
//     setIsNotificationOpen(false)
//   }

//   return (
//     <div>
//       {isNotificationOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ zIndex: 60 }}>
//         <div
//           className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-4 sm:mx-0"
//           style={isMobile ? {} : { position: "absolute", left: "50%", transform: "translateX(-50%)" }} // Center the modal
//         >
//           <div className="flex justify-end absolute p-2 "style={isMobile ? {top:25, right:15}:{top:0, right:0}}>
//             <IoClose
//               onClick={handleCloseNotificationModel}
//               className="text-black text-3xl cursor-pointer"
//             />
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-center mb-6" style={{ fontFamily: "LeagueSpartanbold, sans-serif" }}>Notification</h2>

//           {/* Container for cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 p-2">
//             {/* Card 1 */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Card 1</h3>
//               <p className="text-sm text-gray-600">This is a description for Card 1. It contains some brief information.</p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Card 2</h3>
//               <p className="text-sm text-gray-600">This is a description for Card 2. It contains some brief information.</p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Card 3</h3>
//               <p className="text-sm text-gray-600">This is a description for Card 3. It contains some brief information.</p>
//             </div>

//             {/* Card 4 */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Card 4</h3>
//               <p className="text-sm text-gray-600">This is a description for Card 4. It contains some brief information.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       )}

//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`sidebar bg-white text-black w-72 fixed top-0 h-full transition-transform duration-300 ease-in-out transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
//       >
//       <div className="p-5 border-b flex items-center justify-between">
//         {/* Left Section */}
//         <div className="flex items-center overflow-hidden">
//           <FaUserCircle className="text-4xl" />
//           <h2 className="text-2xl font-semibold truncate ml-4">{username}</h2>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center">
//           <IoClose
//             onClick={toggleSidebar}
//             className="md:hidden text-black text-3xl cursor-pointer"
//           />
//         </div>
//       </div>

//         <nav className="flex-1 p-6">
//           <ul className="space-y-4">
//             {[
//               { href: `dashboard/`, label: "Dashboard", icon: "fa-tachometer-alt" },
//               { href: `dashboard/${userId}/inbox`, label: "Inbox", icon: "fa-inbox" },
//               { href: `dashboard/${userId}/templates`, label: "Templates", icon: "fa-file-alt" },
//               { href: `dashboard/${userId}/contacts`, label: "Contacts", icon: "fa-address-book" },
//               { href: `dashboard/${userId}/connection`, label: "Connection", icon: "fa-link" },
//             ].map((item) => (
//               <li key={item.label}>
//                 <button
//                   onClick={() => {
//                     handleLinkClick(item.href.split("/").pop())
//                     toggleSidebar()
//                   }
//                   }
//                   className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
//                     activeSection === item.href.split("/").pop()
//                       ? "bg-black text-white"
//                       : "bg-white text-white-500 hover:bg-gray-200"
//                   } flex items-center w-full text-left`}
//                   style={{fontFamily: "LeagueSpartan, sans-serif"}}
//                 >
//                   <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Logout Button at Bottom */}
//         <div className="p-6 border-t mt-auto">
//           <button
//             onClick={handleLogout}
//             className="bg-black text-white w-full p-3 rounded-lg hover:bg-gray-800 transition"
//             style={{fontFamily: "LeagueSpartan, sans-serif"}}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex-1 flex flex-col">
//         <div className="w-full bg-white text-black shadow-md p-6 fixed top-0 z-40 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <HiMenu
//                 onClick={toggleSidebar}
//                 className="text-blue-600 text-3xl cursor-pointer"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={handleOpenNotificationModel}>
//               <FiMessageSquare className="text-3xl cursor-pointer" />
//             </button>
//             <button
//               onClick={() => {
//               handleLinkClick('user_account')}}>
//               <FaUserCircle className="text-3xl cursor-pointer" />
//             </button>
//             <button
//               onClick={() => {
//               handleLinkClick('settings')}}>
//               <FiSettings className="text-3xl cursor-pointer" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default DashboardLayout;

"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Cookies from "js-cookie";
import { onAuthStateChanged } from "firebase/auth";
import NotificationModal from "./NotificationModal"; // Import the NotificationModal component
import { IoClose } from "react-icons/io5";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [unreadCount, setUnreadCount] = useState(0); // Unread notifications count
  const [username, setUsername] = useState("");
  const [activeSection, setActiveSection] = useState(""); // State for active link
  const [isMobile, setIsMobile] = useState(false);
  const [isTrial, setIsTrial] = useState(false); // Track if user is on trial
  const router = useRouter();
  const { userId, section } = useParams();
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  // Function to close the sidebar when clicking outside
  const handleClickOutside = (e) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Set the active section on route change
  useEffect(() => {
    let activeSidebarItem = pathname.split("/")[3];
    // activeSidebarItem is undefined when its dashboard page
    if (activeSidebarItem !== undefined) {
      setActiveSection(activeSidebarItem);
    } else {
      setActiveSection("");
    }
    // if (!section) {
    //   router.push(`/dashboard/${userId}`);
    // } else {
    //   setActiveSection(`${pathname.split('/')[3]}`);
    // }
  }, [section, userId, router]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username || "User");
          setIsTrial(docSnap.data().isTrial || false); // Check if the user is on a trial
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Fetch the username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username || "User");
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [userId]);

  // Fetch notifications from Firestore
  const fetchNotifications = async () => {
    try {
      const notificationsCollection = collection(
        db,
        `users/${userId}/notifications`
      );
      const notificationsSnapshot = await getDocs(notificationsCollection);
      const notificationsList = notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notificationsList);

      // Count unread notifications
      const unreadNotifications = notificationsList.filter(
        (notification) => !notification.isRead
      );
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark individual notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const notificationDoc = doc(
        db,
        `users/${userId}/notifications/${notificationId}`
      );
      await updateDoc(notificationDoc, { isRead: true });
      fetchNotifications(); // Refresh notifications after marking as read
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Open notifications modal
  const handleOpenNotificationModel = async () => {
    await fetchNotifications();
    setIsNotificationOpen(true);
  };

  // Close notifications modal
  const handleCloseNotificationModel = () => {
    setIsNotificationOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Cookies.remove("token", { secure: true, sameSite: "Strict" });
      Cookies.remove("userId", { secure: true, sameSite: "Strict" });
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = (section) => {
    setActiveSection(section);
    router.push(`/dashboard/${userId}/${section}`);
  };

  // Fetch notifications and unread count on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      {/* Render the Notification Modal */}
      {isNotificationOpen && (
        <NotificationModal
          isMobile={isMobile}
          notifications={notifications}
          handleCloseNotificationModel={handleCloseNotificationModel}
          markNotificationAsRead={markNotificationAsRead}
        />
      )}

      {/* Sidebar layout */}
      <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`sidebar bg-white text-black w-72 fixed top-0 h-full transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
        >
          <div className="p-5 border-b flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center overflow-hidden">
              <FaUserCircle className="text-4xl" />
              <h2 className="text-2xl font-semibold truncate ml-4">
                {username}
              </h2>
            </div>
            {/* Right Section */}
            <div className="flex items-center">
              <IoClose
                onClick={toggleSidebar}
                className="md:hidden text-black text-3xl cursor-pointer"
              />
            </div>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {[
                {
                  href: `dashboard/`,
                  label: "Dashboard",
                  icon: "fa-tachometer-alt",
                },
                {
                  href: `dashboard/${userId}/templates`,
                  label: "Templates",
                  icon: "fa-file-alt",
                },
                {
                  href: `dashboard/${userId}/inbox`,
                  label: "Inbox",
                  icon: "fa-inbox",
                },
                {
                  href: `dashboard/${userId}/contacts`,
                  label: "Contacts",
                  icon: "fa-address-book",
                },
                {
                  href: `dashboard/${userId}/connection`,
                  label: "Connection",
                  icon: "fa-link",
                },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      handleLinkClick(item.href.split("/").pop());
                      toggleSidebar();
                    }}
                    className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
                      activeSection === item.href.split("/").pop()
                        ? "bg-black text-white"
                        : "bg-white text-white-500 hover:bg-gray-200"
                    } flex items-center w-full text-left`}
                    style={{ fontFamily: "LeagueSpartan, sans-serif" }}
                  >
                    <i className={`fa-solid ${item.icon} text-xl mr-3`}></i>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button at Bottom */}
          <div className="p-6 border-t mt-auto">
            <button
              onClick={handleLogout}
              className="bg-black text-white w-full p-3 rounded-lg hover:bg-gray-800 transition"
              style={{ fontFamily: "LeagueSpartan, sans-serif" }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex-1 flex flex-col">
          <div className="w-full bg-white text-black shadow-md p-6 fixed top-0 z-40 flex items-center justify-between">
            <div className="flex items-center">
              <div className="md:hidden">
                <HiMenu
                  onClick={toggleSidebar}
                  className="text-black text-3xl cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleOpenNotificationModel}
                className="relative"
              >
                <FiMessageSquare className="text-3xl cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button onClick={() => handleLinkClick("user_account")}>
                <FaUserCircle className="text-3xl cursor-pointer" />
              </button>
              <button onClick={() => handleLinkClick("settings")}>
                <FiSettings className="text-3xl cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
