// "use client"
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth} from "../firebaseConfig"
// const Signup = () => {

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     verifyToken: "",
//     phoneNumberId: "",
//     accessToken: "",
//   });
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form); // Log the form data before sending it

//     // Fix: Call Firebase functions on the client-side (explained later)
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );
//       // Signed up
//       const user = userCredential.user;
//       // ... (handle successful signup)
//       router.push("/login");
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // .. (handle signup errors)
//       console.error("Fetch Error:", error); // Log the fetch error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Signup</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       {/* Other input fields... */}
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default Signup;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig"; // Ensure db is exported from firebaseConfig

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     verifyToken: "",
//     phoneNumberId: "",
//     accessToken: "",
//   });
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form); // Log the form data before sending it

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       // User signed up successfully
//       const user = userCredential.user;

//       // Store the email in Firestore under the "users" collection
//       await setDoc(doc(db, "users", user.uid), {
//         email: form.email,
//         isTrial:false,
//         createdAt: new Date(),
//       });

//       // Redirect to login page after successful signup
//       router.push("/login");
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // Handle signup errors
//       console.error("Signup Error:", error); // Log the error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Signup</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       {/* Other input fields... */}
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default Signup;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig"; // Ensure db is exported from firebaseConfig

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "", // Added username
//   });
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form); // Log the form data before sending it

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       // User signed up successfully
//       const user = userCredential.user;

//       // Store user information in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: form.email,
//         username: form.username, // Save username
//         isTrial: false,
//         createdAt: new Date(),
//       });

//       // Redirect to login page after successful signup
//       router.push("/login");
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // Handle signup errors
//       console.error("Signup Error:", error); // Log the error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Signup</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Username</label>
//         <input
//           type="text"
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default Signup;
// "use client"
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig"; // Ensure db is exported from firebaseConfig

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "", // Added username
//   });
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form); // Log the form data before sending it

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       // User signed up successfully
//       const user = userCredential.user;

//       // Send email verification
//       await sendEmailVerification(user);
//       console.log("Email verification sent!");

//       // Store user information in Firestore (optional after verification)
//       // await setDoc(doc(db, "users", user.uid), {
//       //   email: form.email,
//       //   username: form.username, // Save username
//       //   isTrial: false,
//       //   createdAt: new Date(),
//       // });

//       // Inform user about verification and optionally redirect
//       alert(
//         "A verification link has been sent to your email address. Please check your inbox and click the link to complete signup."
//       );

//       // Optionally clear the form
//       setForm({ email: "", password: "", username: "" });
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // Handle signup errors
//       console.error("Signup Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Signup</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700">Username</label>
//         <input
//           type="text"
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default Signup;

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     username: "",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       const user = userCredential.user;
//       await sendEmailVerification(user);
//       console.log("Email verification sent!");

//       // Show success modal
//       setModalContent({
//         title: "Verification Email Sent",
//         message: `A verification link has been sent to ${form.email}. Please check your inbox and click the link to complete signup.`,
//       });
//       setShowModal(true);

//       setForm({ email: "", password: "", username: "" });
//     } catch (error) {
//       console.error("Signup Error:", error);

//       // Show error modal
//       setModalContent({
//         title: "Signup Error",
//         message: error.message || "An error occurred during signup. Please try again.",
//       });
//       setShowModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     if (modalContent.title === "Verification Email Sent") {
//       router.push("/login"); // Redirect to login page only on success
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-500">Create Account</h1>

//         <div className="space-y-4">
//           {/* Username Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username</label>
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
//             <label className="block text-sm font-medium text-gray-700">Email</label>
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

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
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
//           Sign Up
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-green-500 hover:text-green-600 font-semibold">
//             Login
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

// export default Signup;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth,db } from "../firebaseConfig";


const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);
      console.log("Email verification sent!");

      // Store user information in Firestore (optional after verification)
      await setDoc(doc(db, "users", user.uid), {
        email: form.email,
        username: form.username, // Save username
        isTrial: false,
        createdAt: new Date(),
      });
      // Show success modal
      setModalContent({
        title: "Verification Email Sent",
        message: `A verification link has been sent to ${form.email}. Please check your inbox and click the link to complete signup.`,
      });
      setShowModal(true);

      setForm({ email: "", password: "", username: "" });
    } catch (error) {
      console.error("Signup Error:", error);

      // Show error modal
      setModalContent({
        title: "Signup Error",
        message:
          error.message || "An error occurred during signup. Please try again.",
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalContent.title === "Verification Email Sent") {
      router.push("/login"); // Redirect to login page only on success
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
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
          Sign Up
        </button>

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

      {/* Modal Popup */}
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