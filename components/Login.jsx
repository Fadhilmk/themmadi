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
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("token", await user.getIdToken()); // Store token
      console.log(user);
      router.push(`/dashboard/${user.uid}`);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
