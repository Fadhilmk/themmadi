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
// import { db } from "../firebaseConfig";

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

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Cookies from 'js-cookie';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [activeSection, setActiveSection] = useState(""); 
  const router = useRouter();
  const { userId, section } = useParams();

  useEffect(() => {
    // Redirect to Dashboard if no section is provided
    if (!section) {
      router.push(`/dashboard/${userId}`);
    } else {
      setActiveSection(section);
    }
  }, [section, userId, router]);

  const handleLogout = async () => {
  try {
    // Sign out the user from Firebase
    await auth.signOut();
    
    // Remove cookies
    Cookies.remove("token");
    Cookies.remove("userId");
    
    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (isSidebarOpen && !e.target.closest(".sidebar")) {
      setIsSidebarOpen(false);
    }
  };

  const handleLinkClick = (section) => {
    setActiveSection(section);
    router.push(`/dashboard/${userId}/${section}`);
  };

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
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen, userId]);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      {/* Sidebar */}
      <div
        className={`sidebar bg-white text-blue-500 w-72 fixed top-0 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50 shadow-2xl flex flex-col`}
      >
        <div className="p-6 border-b flex items-center space-x-4">
          <FaUserCircle className="text-4xl" />
          <h2 className="text-2xl font-semibold truncate">{username}</h2>
          <IoClose
            onClick={toggleSidebar}
            className="md:hidden text-blue-500 text-3xl cursor-pointer ml-auto"
          />
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            {[
              { href: `dashboard/`, label: "Dashboard", icon: "fa-tachometer-alt" },
              { href: `dashboard/${userId}/inbox`, label: "Inbox", icon: "fa-inbox" },
              { href: `dashboard/${userId}/templates`, label: "Templates", icon: "fa-file-alt" },
              { href: `dashboard/${userId}/contacts`, label: "Contacts", icon: "fa-address-book" },
              { href: `dashboard/${userId}/connection`, label: "Connection", icon: "fa-link" },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleLinkClick(item.href.split('/').pop())} 
                  className={`block pl-4 pr-4 py-3 rounded-lg transition-transform ${
                    activeSection === item.href.split('/').pop()
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  } flex items-center w-full text-left`}
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
            className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white text-blue-600 shadow-md p-6 fixed top-0 md:ml-72 z-40 flex items-center justify-between">
          <div className="flex items-center">
            <div className="md:hidden">
              <HiMenu
                onClick={toggleSidebar}
                className="text-blue-600 text-3xl cursor-pointer"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Account Icon */}
            <FaUserCircle className="text-3xl cursor-pointer" />
            {/* Settings Icon */}
            <FiSettings className="text-3xl cursor-pointer" />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 pt-24 md:ml-72 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
