

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig";

// const PHONE_NUMBER_ID = "405411442646087"; 
// const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "",
//     whatsapp: "",
//   });
//   const [otp, setOtp] = useState(""); // OTP input
//   const [generatedOtp, setGeneratedOtp] = useState(""); // OTP generated
//   const [timer, setTimer] = useState(300); // 5 minute timer
//   const [showOtpField, setShowOtpField] = useState(false); // Show OTP input field
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const generateOtp = () => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//     setGeneratedOtp(otp);
//     return otp;
//   };

//   const sendOtpToWhatsApp = async (otp) => {
//     const whatsappNumber = `+${form.whatsapp}`;
//     const url = `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;
//     const message = `Your verification code is ${otp}. It will expire in 5 minutes.`;
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           messaging_product: "whatsapp",
//           to: whatsappNumber,
//           type: "text",
//           text: { body: message },
//         }),
//       });
  
//       const data = await response.json();
//       console.log("Response from WhatsApp API:", data);
  
//       if (!response.ok) {
//         throw new Error(data.error.message || "Failed to send OTP via WhatsApp");
//       }
  
//       console.log("OTP sent via WhatsApp");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setModalContent({
//         title: "OTP Error",
//         message: error.message || "Failed to send OTP. Please try again.",
//       });
//       setShowModal(true);
//     }
//   };
  
//   const checkIfExists = async () => {
//     const usersRef = collection(db, "users");
//     const emailQuery = query(usersRef, where("email", "==", form.email));
//     const whatsappQuery = query(usersRef, where("whatsapp", "==", form.whatsapp));

//     const emailSnapshot = await getDocs(emailQuery);
//     const whatsappSnapshot = await getDocs(whatsappQuery);

//     if (!emailSnapshot.empty) {
//       throw new Error("Email already exists.");
//     }
//     if (!whatsappSnapshot.empty) {
//       throw new Error("WhatsApp number already exists.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await checkIfExists();

//       const otp = generateOtp();
//       sendOtpToWhatsApp(otp);
//       setShowOtpField(true);
//     } catch (error) {
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   const verifyOtpAndSignup = async () => {
//     if (otp !== generatedOtp) {
//       setModalContent({
//         title: "OTP Error",
//         message: "Invalid OTP. Please try again.",
//       });
//       setShowModal(true);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         email: form.email,
//         username: form.username,
//         whatsapp: form.whatsapp,
//         isTrial: false,
//         createdAt: new Date(),
//       });

//       setModalContent({
//         title: "Signup Success",
//         message: "Your account has been created successfully.",
//       });
//       setShowModal(true);
//     } catch (error) {
//       console.error("Signup Error:", error);
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   const closeModal = () => {
//     setShowModal(false);
//     if (modalContent.title === "Signup Success") {
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500 px-4 lg:px-0">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">
//           Create Account
//         </h1>

//         <div className="space-y-4">
//           {/* Username Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Your username"
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           {/* WhatsApp Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               WhatsApp Number
//             </label>
//             <input
//               type="tel"
//               name="whatsapp"
//               value={form.whatsapp}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="WhatsApp number with country code"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//         >
//           Send OTP
//         </button>

//         {showOtpField && (
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Enter OTP
//             </label>
//             <input
//               type="text"
//               name="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter the OTP sent to WhatsApp"
//               required
//             />

//             <button
//               type="button"
//               onClick={verifyOtpAndSignup}
//               className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//             >
//               Verify and Sign Up
//             </button>

//             {timer > 0 ? (
//               <p className="text-sm text-gray-600 mt-2">
//                 You can resend OTP in {timer} seconds.
//               </p>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => {
//                   const newOtp = generateOtp();
//                   sendOtpToWhatsApp(newOtp);
//                   setTimer(300); // Reset timer to 5 minutes
//                 }}
//                 className="mt-2 text-blue-500 hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         )}

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-green-500 hover:text-green-600 font-semibold"
//           >
//             Login
//           </a>
//         </p>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               {modalContent.title}
//             </h2>
//             <p className="text-gray-600">{modalContent.message}</p>
//             <button
//               onClick={closeModal}
//               className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-300 w-full"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// import Cookies from "js-cookie"; // Import js-cookie to store user token
// import { auth, db } from "../firebaseConfig";

// const PHONE_NUMBER_ID = "405411442646087";
// const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "",
//     whatsapp: "",
//   });
//   const [otp, setOtp] = useState(""); // OTP input
//   const [generatedOtp, setGeneratedOtp] = useState(""); // OTP generated
//   const [timer, setTimer] = useState(300); // 5 minute timer
//   const [showOtpField, setShowOtpField] = useState(false); // Show OTP input field
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const generateOtp = () => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//     setGeneratedOtp(otp);
//     return otp;
//   };

//   const sendOtpToWhatsApp = async (otp) => {
//     const whatsappNumber = `+${form.whatsapp}`;
//     const url = `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;
//     const message = `Your verification code is ${otp}. It will expire in 5 minutes.`;
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           messaging_product: "whatsapp",
//           to: whatsappNumber,
//           type: "text",
//           text: { body: message },
//         }),
//       });
  
//       const data = await response.json();
//       console.log("Response from WhatsApp API:", data);
  
//       if (!response.ok) {
//         throw new Error(data.error.message || "Failed to send OTP via WhatsApp");
//       }
  
//       console.log("OTP sent via WhatsApp");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setModalContent({
//         title: "OTP Error",
//         message: error.message || "Failed to send OTP. Please try again.",
//       });
//       setShowModal(true);
//     }
//   };

//   const checkIfExists = async () => {
//     const usersRef = collection(db, "users");
//     const emailQuery = query(usersRef, where("email", "==", form.email));
//     const whatsappQuery = query(usersRef, where("whatsapp", "==", form.whatsapp));

//     const emailSnapshot = await getDocs(emailQuery);
//     const whatsappSnapshot = await getDocs(whatsappQuery);

//     if (!emailSnapshot.empty) {
//       throw new Error("Email already exists.");
//     }
//     if (!whatsappSnapshot.empty) {
//       throw new Error("WhatsApp number already exists.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await checkIfExists();

//       const otp = generateOtp();
//       sendOtpToWhatsApp(otp);
//       setShowOtpField(true);
//     } catch (error) {
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   const verifyOtpAndSignup = async () => {
//     if (otp !== generatedOtp) {
//       setModalContent({
//         title: "OTP Error",
//         message: "Invalid OTP. Please try again.",
//       });
//       setShowModal(true);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       const user = userCredential.user;

//       // Save user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: form.email,
//         username: form.username,
//         whatsapp: form.whatsapp,
//         isTrial: false,
//         createdAt: new Date(),
//       });

//       // Get the token and store it in cookies
//       const token = await user.getIdToken();
//       Cookies.set("token", token, { secure: true, sameSite: "None" });
//       Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

//       // Show success modal
//       setModalContent({
//         title: "Signup Success",
//         message: "Your account has been created successfully.",
//       });
//       setShowModal(true);

//       // Redirect to "flows" page to collect business details
//       router.push(`/flows/${user.uid}`);
//     } catch (error) {
//       console.error("Signup Error:", error);
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   const closeModal = () => {
//     setShowModal(false);
//     if (modalContent.title === "Signup Success") {
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500 px-4 lg:px-0">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">
//           Create Account
//         </h1>

//         <div className="space-y-4">
//           {/* Username Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Your username"
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           {/* WhatsApp Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               WhatsApp Number
//             </label>
//             <input
//               type="tel"
//               name="whatsapp"
//               value={form.whatsapp}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="WhatsApp number with country code"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//         >
//           Send OTP
//         </button>

//         {showOtpField && (
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Enter OTP
//             </label>
//             <input
//               type="text"
//               name="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter the OTP sent to WhatsApp"
//               required
//             />

//             <button
//               type="button"
//               onClick={verifyOtpAndSignup}
//               className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//             >
//               Verify and Sign Up
//             </button>

//             {timer > 0 ? (
//               <p className="text-sm text-gray-600 mt-2">
//                 You can resend OTP in {timer} seconds.
//               </p>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => {
//                   const newOtp = generateOtp();
//                   sendOtpToWhatsApp(newOtp);
//                   setTimer(300); // Reset timer to 5 minutes
//                 }}
//                 className="mt-2 text-blue-500 hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         )}

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-green-500 hover:text-green-600 font-semibold"
//           >
//             Login
//           </a>
//         </p>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               {modalContent.title}
//             </h2>
//             <p className="text-gray-600">{modalContent.message}</p>
//             <button
//               onClick={closeModal}
//               className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-300 w-full"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// import Cookies from "js-cookie"; // Import js-cookie to store user token
// import { auth, db } from "../firebaseConfig";

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "",
//     whatsapp: "",
//   });
//   const [otp, setOtp] = useState(""); // OTP input
//   const [generatedOtp, setGeneratedOtp] = useState(""); // OTP generated
//   const [timer, setTimer] = useState(300); // 5 minute timer
//   const [showOtpField, setShowOtpField] = useState(false); // Show OTP input field
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const generateOtp = () => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//     setGeneratedOtp(otp);
//     return otp;
//   };

//   const sendOtpToWhatsApp = async (otp) => {
//     const whatsappNumber = `+${form.whatsapp}`;
//     const url = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`;
  
//     const payload = {
//       messaging_product: "whatsapp",
//       to: whatsappNumber,
//       type: "template",
//       template: {
//         name: "maadiy_verfication", // Your approved template name
//         language: {
//           code: "en", // Language code
//         },
//         components: [
//           {
//             type: "body", // Body component with parameters
//             parameters: [
//               {
//                 type: "text",
//                 text: otp, // Passing the OTP to the template
//               },
//             ],
//           },
//           {
//             type: "button",
//             sub_type: "url", // URL button type
//             index: "0",
//             parameters: [
//               {
//                 type: "text",
//                 text: otp, // Passing the OTP to the URL in the button
//               },
//             ],
//           },
//         ],
//       },
//     };
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify(payload),
//       });
  
//       const data = await response.json();
//       console.log("Response from WhatsApp API:", data);
  
//       if (!response.ok) {
//         throw new Error(data.error.message || "Failed to send OTP via WhatsApp");
//       }
  
//       console.log("OTP sent via WhatsApp");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setModalContent({
//         title: "OTP Error",
//         message: error.message || "Failed to send OTP. Please try again.",
//       });
//       setShowModal(true);
//     }
//   };
  

//   const checkIfExists = async () => {
//     const usersRef = collection(db, "users");
//     const emailQuery = query(usersRef, where("email", "==", form.email));
//     const whatsappQuery = query(usersRef, where("whatsapp", "==", form.whatsapp));

//     const emailSnapshot = await getDocs(emailQuery);
//     const whatsappSnapshot = await getDocs(whatsappQuery);

//     if (!emailSnapshot.empty) {
//       throw new Error("Email already exists.");
//     }
//     if (!whatsappSnapshot.empty) {
//       throw new Error("WhatsApp number already exists.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await checkIfExists();

//       const otp = generateOtp();
//       sendOtpToWhatsApp(otp);
//       setShowOtpField(true);
//     } catch (error) {
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   const verifyOtpAndSignup = async () => {
//     if (otp !== generatedOtp) {
//       setModalContent({
//         title: "OTP Error",
//         message: "Invalid OTP. Please try again.",
//       });
//       setShowModal(true);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       const user = userCredential.user;

//       // Save user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: form.email,
//         username: form.username,
//         whatsapp: form.whatsapp,
//         isTrial: false,
//         createdAt: new Date(),
//       });

//       // Get the token and store it in cookies
//       const token = await user.getIdToken();
//       Cookies.set("token", token, { secure: true, sameSite: "None" });
//       Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

//       // Show success modal
//       setModalContent({
//         title: "Signup Success",
//         message: "Your account has been created successfully.",
//       });
//       setShowModal(true);

//       // Redirect to "flows" page to collect business details
//       router.push(`/flows/${user.uid}`);
//     } catch (error) {
//       console.error("Signup Error:", error);
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup.",
//       });
//       setShowModal(true);
//     }
//   };

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   const closeModal = () => {
//     setShowModal(false);
//     if (modalContent.title === "Signup Success") {
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500 px-4 lg:px-0">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">
//           Create Account
//         </h1>

//         <div className="space-y-4">
//           {/* Username Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Your username"
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           {/* WhatsApp Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               WhatsApp Number
//             </label>
//             <input
//               type="tel"
//               name="whatsapp"
//               value={form.whatsapp}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="WhatsApp number with country code"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//         >
//           Send OTP
//         </button>

//         {showOtpField && (
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Enter OTP
//             </label>
//             <input
//               type="text"
//               name="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter the OTP sent to WhatsApp"
//               required
//             />

//             <button
//               type="button"
//               onClick={verifyOtpAndSignup}
//               className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
//             >
//               Verify and Sign Up
//             </button>

//             {timer > 0 ? (
//               <p className="text-sm text-gray-600 mt-2">
//                 You can resend OTP in {timer} seconds.
//               </p>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => {
//                   const newOtp = generateOtp();
//                   sendOtpToWhatsApp(newOtp);
//                   setTimer(300); // Reset timer to 5 minutes
//                 }}
//                 className="mt-2 text-blue-500 hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         )}

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-green-500 hover:text-green-600 font-semibold"
//           >
//             Login
//           </a>
//         </p>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               {modalContent.title}
//             </h2>
//             <p className="text-gray-600">{modalContent.message}</p>
//             <button
//               onClick={closeModal}
//               className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-300 w-full"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;


"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import Cookies from "js-cookie"; // Import js-cookie to store user token
import { auth, db } from "../firebaseConfig";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    whatsapp: "",
  });
  const [otp, setOtp] = useState(""); // OTP input
  const [generatedOtp, setGeneratedOtp] = useState(""); // OTP generated
  const [timer, setTimer] = useState(300); // 5 minute timer
  const [showOtpField, setShowOtpField] = useState(false); // Show OTP input field
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otp);
    return otp;
  };

  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  const sendOtpToWhatsApp = async (otp) => {
    const whatsappNumber = `+${form.whatsapp}`;
    const url = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`;
  
    const payload = {
      messaging_product: "whatsapp",
      to: whatsappNumber,
      type: "template",
      template: {
        name: "maadiy_verfication", // Your approved template name
        language: {
          code: "en", // Language code
        },
        components: [
          {
            type: "body", // Body component with parameters
            parameters: [
              {
                type: "text",
                text: otp, // Passing the OTP to the template
              },
            ],
          },
          {
            type: "button",
            sub_type: "url", // URL button type
            index: "0",
            parameters: [
              {
                type: "text",
                text: otp, // Passing the OTP to the URL in the button
              },
            ],
          },
        ],
      },
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("Response from WhatsApp API:", data);
  
      if (!response.ok) {
        throw new Error(data.error.message || "Failed to send OTP via WhatsApp");
      }
  
      console.log("OTP sent via WhatsApp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setModalContent({
        title: "OTP Error",
        message: error.message || "Failed to send OTP. Please try again.",
      });
      setShowModal(true);
    }
  };

  const checkIfExists = async () => {
    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", form.email));
    const whatsappQuery = query(usersRef, where("whatsapp", "==", form.whatsapp));

    const emailSnapshot = await getDocs(emailQuery);
    const whatsappSnapshot = await getDocs(whatsappQuery);

    if (!emailSnapshot.empty) {
      throw new Error("Email already exists.");
    }
    if (!whatsappSnapshot.empty) {
      throw new Error("WhatsApp number already exists.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkIfExists();

      const otp = generateOtp();
      sendOtpToWhatsApp(otp);
      setShowOtpField(true);
    } catch (error) {
      setModalContent({
        title: "Signup Error",
        message: error.message || "An error occurred during signup.",
      });
      setShowModal(true);
    }
  };

  const verifyOtpAndSignup = async () => {
    if (otp !== generatedOtp) {
      setModalContent({
        title: "OTP Error",
        message: "Invalid OTP. Please try again.",
      });
      setShowModal(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      const ipAddress = await getIpAddress();

    // Save user info and login history in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: form.email,
      username: form.username,
      whatsapp: form.whatsapp,
      isTrial: true,
      createdAt: new Date(),
      loginHistory: [
        {
          timestamp: new Date(),
          ip: ipAddress,
        },
      ],
      lastLogin: new Date(),
      lastLoginIP: ipAddress,
    });


    await setDoc(doc(db, "users", user.uid, "notifications", "welcome"), {
      message: "Welcome to MaaDiy!",
      timestamp: new Date(),
      isRead: false,
    });

      // Get the token and store it in cookies
      const token = await user.getIdToken();
      Cookies.set("token", token, { secure: true, sameSite: "None" });
      Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

      // Redirect directly to dashboard
      router.push(`/dashboard/${user.uid}`);
    } catch (error) {
      console.error("Signup Error:", error);
      setModalContent({
        title: "Signup Error",
        message: error.message || "An error occurred during signup.",
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const closeModal = () => {
    setShowModal(false);
    if (modalContent.title === "Signup Success") {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-blue-500 px-4 md:px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Create Account
        </h1>

        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Your username"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* WhatsApp Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="WhatsApp number with country code"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
        >
          Send OTP
        </button>

        {showOtpField && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter the OTP sent to WhatsApp"
              required
            />

            <button
              type="button"
              onClick={verifyOtpAndSignup}
              className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
            >
              Verify and Sign Up
            </button>

            {timer > 0 ? (
              <p className="text-sm text-gray-600 mt-2">
                You can resend OTP in {timer} seconds.
              </p>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const newOtp = generateOtp();
                  sendOtpToWhatsApp(newOtp);
                  setTimer(300); // Reset timer to 5 minutes
                }}
                className="mt-2 text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-500 hover:text-green-600 font-semibold"
          >
            Login
          </a>
        </p>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {modalContent.title}
            </h2>
            <p className="text-gray-600">{modalContent.message}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-300 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
