
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


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cookies from 'js-cookie';  // Import js-cookie
import { auth, db } from "../firebaseConfig"; // Ensure db is exported from firebaseConfig
import withNoAuth from "./withNoAuth";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "", // Added username
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: form.email,
        username: form.username, // Save username
        isTrial: false,
        createdAt: new Date(),
      });

      // Get the token and store it in cookies
      const token = await user.getIdToken();
      Cookies.set("token", token, { secure: true, sameSite: 'Strict' });
      Cookies.set("userId", user.uid, { secure: true, sameSite: 'Strict' });

      // Redirect to dashboard
      router.push(`/dashboard/${user.uid}`);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Signup</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Signup
      </button>
    </form>
  );
};

export default withNoAuth(Signup);