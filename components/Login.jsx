// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user)
//         router.push(`/dashboard/${user.uid}`)
//         alert(user.uid)
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });

//     // if (res.ok) {
//     //   const data = await res.json();
//     //   localStorage.setItem("token", data.token);
//     //   router.push("/dashboard");
//     // }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Login</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;
// "use client"
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       localStorage.setItem("token", await user.getIdToken()); // Store token
//       console.log(user);
//       router.push(`/dashboard/${user.uid}`);
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("Login failed. Please check your credentials and try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Login</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password).then(async(user)=>{
//         console.log(user);
//         localStorage.setItem("token", await user.user.getIdToken()); // Store token
//         router.push(`/dashboard/${user.uid}`);
//       })

//     } catch (error) {
//       console.error("Error logging in:", error);

//       // Show error modal
//       setModalContent({
//         title: "Login Error",
//         message: error.message || "Login failed. Please check your credentials and try again.",
//       });
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6">
//         <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-green-500 hover:text-green-600 font-semibold">
//             Sign Up
//           </a>
//         </p>
//       </form>

//       {/* Modal Popup */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">{modalContent.title}</h2>
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

// export default Login;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setModalContent({
//         title: "Missing Credentials",
//         message: "Please enter both email and password.",
//       });
//       setShowModal(true);
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Fetch and store token in cookies
//       const token = await user.getIdToken();
//       if (token) {
//         document.cookie = `token=${token}; path=/; max-age=3600; secure; SameSite=Strict`;
//         document.cookie = `userId=${user.uid}; path=/; max-age=3600; secure; SameSite=Strict`;
//       } else {
//         throw new Error("Unable to retrieve token");
//       }

//       console.log(user);
//       router.push(`/dashboard/${user.uid}`);
//     } catch (error) {
//       console.error("Error logging in:", error);

//       // Set error message
//       let errorMessage =
//         "Login failed. Please check your credentials and try again.";
//       if (error.code === "auth/wrong-password") {
//         errorMessage = "Incorrect password. Please try again.";
//       } else if (error.code === "auth/user-not-found") {
//         errorMessage = "No account found with this email.";
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       // Show error modal
//       setModalContent({
//         title: "Login Error",
//         message: errorMessage,
//       });
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Dont have an account?{" "}
//           <a
//             href="/signup"
//             className="text-green-500 hover:text-green-600 font-semibold"
//           >
//             Sign Up
//           </a>
//         </p>
//       </form>

//       {/* Modal Popup */}
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

// export default Login;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Cookies from "js-cookie"; // Import js-cookie
// import { auth } from "../firebaseConfig";
// import withNoAuth from "./withNoAuth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setModalContent({
//         title: "Missing Credentials",
//         message: "Please enter both email and password.",
//       });
//       setShowModal(true);
//       return;
//     }
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Get the token and store it in cookies
//       const token = await user.getIdToken();
//       Cookies.set("token", token, { secure: true, sameSite: "None" });
//       Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

//       // Redirect to the dashboard
//       router.push(`/dashboard/${user.uid}`);
//     } catch (error) {
//       console.error("Error logging in:", error);
//       // Set error message
//       let errorMessage =
//         "Login failed. Please check your credentials and try again.";
//       if (error.code === "auth/wrong-password") {
//         errorMessage = "Incorrect password. Please try again.";
//       } else if (error.code === "auth/user-not-found") {
//         errorMessage = "No account found with this email.";
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       // Show error modal
//       setModalContent({
//         title: "Login Error",
//         message: errorMessage,
//       });
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Dont have an account?{" "}
//           <a
//             href="/signup"
//             className="text-green-500 hover:text-green-600 font-semibold"
//           >
//             Sign Up
//           </a>
//         </p>
//       </form>

//       {/* Modal Popup */}
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

// export default Login;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
// import Cookies from "js-cookie"; // Import js-cookie
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setModalContent({
//         title: "Missing Credentials",
//         message: "Please enter both email and password.",
//       });
//       setShowModal(true);
//       return;
//     }
//     try {
//       // Set Firebase session persistence
//       await setPersistence(auth, browserSessionPersistence);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Get the token and store it in cookies
//       const token = await user.getIdToken();
//       Cookies.set("token", token, { secure: true, sameSite: "None" });
//       Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

//       // Redirect to the dashboard
//       router.push(`/dashboard/${user.uid}`);
//     } catch (error) {
//       console.error("Error logging in:", error);
//       let errorMessage = "Login failed. Please check your credentials and try again.";
//       if (error.code === "auth/wrong-password") {
//         errorMessage = "Incorrect password. Please try again.";
//       } else if (error.code === "auth/user-not-found") {
//         errorMessage = "No account found with this email.";
//       }

//       setModalContent({
//         title: "Login Error",
//         message: errorMessage,
//       });
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//           Login
//         </button>
//       </form>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">{modalContent.title}</h2>
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

// export default Login;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie"; // Import js-cookie
import { auth,db } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Forgot password modal state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(""); // Email input for password reset

  const router = useRouter();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setModalContent({
        title: "Missing Credentials",
        message: "Please enter both email and password.",
      });
      setShowModal(true);
      return;
    }
    try {
      // Set Firebase session persistence
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the IP address
      const ipAddress = await getIpAddress();

      // Save login history to Firebase
    const loginHistoryRef = doc(db, "users", user.uid);
    await setDoc(
      loginHistoryRef,
      {
        loginHistory: [
          {
            timestamp: new Date(),
            ip: ipAddress,
          },
        ],
        lastLogin: new Date(),
        lastLoginIP: ipAddress,
      },
      { merge: true } // Use merge to avoid overwriting existing data
    );

      // Get the token and store it in cookies
      const token = await user.getIdToken();
      Cookies.set("token", token, { secure: true, sameSite: "None" });
      Cookies.set("userId", user.uid, { secure: true, sameSite: "None" });

      // Redirect to the dashboard
      router.push(`/dashboard/${user.uid}`);
    } catch (error) {
      console.error("Error logging in:", error);
      let errorMessage =
        "Login failed. Please check your credentials and try again.";
      if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      }

      setModalContent({
        title: "Login Error",
        message: errorMessage,
      });
      setShowModal(true);
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setModalContent({
        title: "Missing Email",
        message: "Please enter your email to reset your password.",
      });
      setShowModal(true);
      return;
    }

    try {
      // Firebase will throw an error if the user is not found
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setModalContent({
        title: "Reset Email Sent",
        message: "A password reset link has been sent to your email.",
      });
      setShowForgotPasswordModal(false); // Close the modal
      setShowModal(true); // Show success message
    } catch (error) {
      console.error("Error sending password reset email:", error);

      // Check for "auth/user-not-found" error and display a specific message
      let errorMessage =
        error.code === "auth/user-not-found"
          ? "Invalid email. No account found with this email."
          : error.message ||
            "An error occurred while sending the password reset email.";

      setModalContent({
        title: "Error",
        message: errorMessage,
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 px-4 md:px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
              required
            />
            <p
              onClick={() => setShowForgotPasswordModal(true)} // Show password reset modal
              className="text-right text-sm text-blue-500 hover:underline cursor-pointer mt-2"
            >
              Forgot Password?
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-green-500 hover:text-green-600 font-semibold"
          >
            Sign Up
          </a>
        </p>
      </form>

      {/* Modal for Forgot Password */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Reset Password
            </h2>
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleForgotPassword}
              className="mt-4 w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setShowForgotPasswordModal(false)} // Close modal
              className="mt-2 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* General Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
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

export default Login;
