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

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password).then(async(user)=>{
        console.log(user);
        localStorage.setItem("token", await user.user.getIdToken()); // Store token
        router.push(`/dashboard/${user.uid}`);
      })
      
    } catch (error) {
      console.error("Error logging in:", error);

      // Show error modal
      setModalContent({
        title: "Login Error",
        message: error.message || "Login failed. Please check your credentials and try again.",
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-500">Login</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 hover:text-green-600 font-semibold">
            Sign Up
          </a>
        </p>
      </form>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{modalContent.title}</h2>
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
