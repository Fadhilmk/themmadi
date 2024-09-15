// "use client";
// import { useEffect, useRef, useState } from "react";
// import { db } from "../../../../../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";
// import './page.css';
// const PHONE_NUMBER_ID = "405411442646087";
// const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

// export default function Inbox({ params }) {
//   const {userId} = params;
//   const { phoneNumber } = params;
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userName, setUserName] = useState("User");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     console.log(userName)
//     const fetchDetails = async () => {
//       try {
//         const userDocRef = collection(db, "users", userId, "messages");
//         const userQuery = query(
//           userDocRef,
//           where("userPhoneNumber", "==", phoneNumber)
//         );
  
//         const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
//           if (!snapshot.empty) {
//             const userData = snapshot.docs[0].data();
//             setUserName(userData.userName || "User");
//           } else {
//             console.warn("User not found");
//           }
//         });
  
//         const unsubscribeMessages = onSnapshot(userQuery, (snapshot) => {
//           const msgs = [];
//           snapshot.forEach((doc) => {
//             const data = doc.data();
//             const timestamp = data.sentAt || data.timestamp;
//             const date = timestamp
//               ? timestamp.seconds
//                 ? new Date(timestamp.seconds * 1000)
//                 : new Date(parseInt(timestamp) * 1000)
//               : new Date();
  
//             msgs.push({
//               id: doc.id,
//               ...data,
//               sentAt: date,
//             });
//           });
  
//           msgs.sort((a, b) => a.sentAt - b.sentAt);
//           setMessages(msgs);
//         });
  
//         return () => {
//           unsubscribeUser();
//           unsubscribeMessages();
//         };
//       } catch (error) {
//         console.error("Error fetching details:", error);
//       }
//     };
  
//     fetchDetails();
//   }, [userId, phoneNumber]);
  
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       try {
//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//             body: JSON.stringify({
//               messaging_product: "whatsapp",
//               to: phoneNumber,
//               type: "text",
//               text: { body: newMessage },
//             }),
//           }
//         );
  
//         if (!response.ok) {
//           throw new Error("Failed to send message");
//         }
  
//         const docRef = await addDoc(collection(db, "users", userId, "messages"), {
//           userPhoneNumber: phoneNumber,
//           messageBody: newMessage,
//           sentAt: new Date(),
//           read: true,
//         });
  
//         setNewMessage("");
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             id: docRef.id,
//             userPhoneNumber: phoneNumber,
//             messageBody: newMessage,
//             read: true,
//             sentAt: new Date(),
//           },
//         ]);
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };
  

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "Unknown time";

//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     };
//     return timestamp.toLocaleString([], options);
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div
//       className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url('/walpaper2.jpg')` }}
//     >
//       <header className="bg-blue-500 text-white p-4 flex items-center z-10">
//         <button
//           onClick={handleBack}
//           className="flex items-center justify-center mr-4 p-1"
//         >
//           <svg
//             className="w-6 h-6 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             ></path>
//           </svg>
//         </button>
//         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//           <span className="text-xl text-gray-700">{userName.charAt(0)}</span>
//         </div>
//         <h1 className="text-2xl font-bold ml-4">{userName}</h1>
//       </header>
//       <main className="flex-1 p-4 overflow-auto">
//         <ul className="inbox">
//           {messages.map((msg) => (
//             <li
//               key={msg.id}
//               className={`inbox mb-2 p-2 max-w-xs ${
//                 msg.read
//                   ? "bg-green-400 self-end text-left text-white"
//                   : "bg-gray-400 self-start text-left text-white"
//               }`}
//             >
//               <p>{msg.messageBody}</p>
//               <span className="text-gray-200 text-sm">
//                 {formatTimestamp(msg.sentAt)}
//               </span>
//             </li>
//           ))}
//           <div ref={messagesEndRef} />
//         </ul>
//       </main>
//       <footer className="bg-white p-4 border-t border-gray-300 flex items-center">
//         <textarea
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="w-full p-1 pl-5 pt-4 border border-gray-300 rounded-full mb-2 resize-none"
//           placeholder="Message"
//           style={{ paddingRight: "48px" }}
//         ></textarea>
//         <button
//           onClick={handleSendMessage}
//           className="bg-green-500 text-white pt-3 pb-2 pl-3 pr-3 rounded-full ml-2"
//         >
//           <span className="material-icons-round">send</span>
//         </button>
//       </footer>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useRef, useState } from "react";
// import { db } from "../../../../../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
//   doc,
//   getDoc,
//   updateDoc,
//   getDocs
// } from "firebase/firestore";
// import './page.css'; // Ensure this file exists with the correct styles

// const PHONE_NUMBER_ID = "405411442646087";
// const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

// export default function Inbox({ params }) {
//   const { userId, phoneNumber } = params;
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userName, setUserName] = useState("User");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         // Fetch User Details
//         const userRef = doc(db, "users", userId);
//         const userSnapshot = await getDoc(userRef);
//         if (userSnapshot.exists()) {
//           setUserName(userSnapshot.data().userName || "User");
//         } else {
//           console.warn("User document not found");
//         }

//         // Fetch Messages and Update if Necessary
//         const userDocRef = collection(db, "users", userId, "messages");
//         const userQuery = query(userDocRef, where("userPhoneNumber", "==", phoneNumber));

//         const unsubscribe = onSnapshot(userQuery, async (snapshot) => {
//           const msgs = [];
//           const updates = [];
          
//           snapshot.forEach((doc) => {
//             const data = doc.data();
//             const timestamp = data.sentAt || data.timestamp;
//             const date = timestamp
//               ? timestamp.seconds
//                 ? new Date(timestamp.seconds * 1000)
//                 : new Date(parseInt(timestamp) * 1000)
//               : new Date();

//             msgs.push({
//               id: doc.id,
//               ...data,
//               sentAt: date,
//             });

//             // Check if userName needs to be updated
//             if (!data.userName && phoneNumber) {
//               updates.push(updateDoc(doc.ref, { userName }));
//             }
//           });

//           // Update messages and userName in Firestore
//           msgs.sort((a, b) => a.sentAt - b.sentAt);
//           setMessages(msgs);

//           // Perform batch updates for missing userName
//           if (updates.length > 0) {
//             await Promise.all(updates);
//           }
//         });

//         return () => {
//           unsubscribe();
//         };
//       } catch (error) {
//         console.error("Error fetching details:", error);
//       }
//     };

//     fetchDetails();
//   }, [userId, phoneNumber]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       try {
//         const response = await fetch(
//           `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//             body: JSON.stringify({
//               messaging_product: "whatsapp",
//               to: phoneNumber,
//               type: "text",
//               text: { body: newMessage },
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to send message");
//         }

//         const docRef = await addDoc(collection(db, "users", userId, "messages"), {
//           userPhoneNumber: phoneNumber,
//           messageBody: newMessage,
//           sentAt: serverTimestamp(),
//           read: true,
//           userName, // Include userName in the new message
//         });

//         setNewMessage("");
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "Unknown time";

//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     };
//     return timestamp.toLocaleString([], options);
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div
//       className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url('/walpaper2.jpg')` }}
//     >
//       <header className="bg-blue-500 text-white p-4 flex items-center z-10">
//         <button
//           onClick={handleBack}
//           className="flex items-center justify-center mr-4 p-1"
//         >
//           <svg
//             className="w-6 h-6 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             ></path>
//           </svg>
//         </button>
//         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//           <span className="text-xl text-gray-700">{userName.charAt(0)}</span>
//         </div>
//         <h1 className="text-2xl font-bold ml-4">{userName}</h1>
//       </header>
//       <main className="flex-1 p-4 overflow-auto">
//         <ul className="inbox">
//           {messages.map((msg) => (
//             <li
//               key={msg.id}
//               className={`message mb-2 p-2 max-w-xs ${
//                 msg.read
//                   ? "sent bg-green-400 text-left text-white"
//                   : "received bg-gray-400 text-left text-white"
//               }`}
//             >
//               <p>{msg.messageBody}</p>
//               <span className="text-gray-200 text-sm">
//                 {formatTimestamp(msg.sentAt)}
//               </span>
//             </li>
//           ))}
//           <div ref={messagesEndRef} />
//         </ul>
//       </main>
//       <footer className="bg-white p-4 border-t border-gray-300 flex items-center">
//         <textarea
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="w-full p-1 pl-5 pt-4 border border-gray-300 rounded-full mb-2 resize-none"
//           placeholder="Message"
//           style={{ paddingRight: "48px" }}
//         ></textarea>
//         <button
//           onClick={handleSendMessage}
//           className="bg-green-500 text-white pt-3 pb-2 pl-3 pr-3 rounded-full ml-2"
//         >
//           <span className="material-icons-round">send</span>
//         </button>
//       </footer>
//     </div>
//   );
// }


"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../../../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import './page.css'; // Ensure this file exists with the correct styles

const PHONE_NUMBER_ID = "405411442646087";
const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

export default function Inbox({ params }) {
  const { userId, phoneNumber } = params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("User");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch Messages
        const messagesRef = collection(db, "users", userId, "messages", phoneNumber, "messages");
        const messagesQuery = query(messagesRef);

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const msgs = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const timestamp = data.sentAt || data.timestamp;
            const date = timestamp
              ? timestamp.seconds
                ? new Date(timestamp.seconds * 1000)
                : new Date(parseInt(timestamp) * 1000)
              : new Date();

            msgs.push({
              id: doc.id,
              ...data,
              sentAt: date,
            });

            // Set userName from the message data
            if (data.userName) {
              setUserName(data.userName);
            }
          });

          msgs.sort((a, b) => a.sentAt - b.sentAt);
          setMessages(msgs);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, phoneNumber]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: phoneNumber,
              type: "text",
              text: { body: newMessage },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        // Add the new message to Firestore
        const messagesRef = collection(db, "users", userId, "messages", phoneNumber, "messages");
        await addDoc(messagesRef, {
          userPhoneNumber: phoneNumber,
          messageBody: newMessage,
          sentAt: serverTimestamp(),
          read: true,
          userName,
        });

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return timestamp.toLocaleString([], options);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      className="flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/walpaper2.jpg')`,height: 'calc(99vh - 4rem)', marginTop: -20, fontFamily: "LeagueSpartan, sans-serif"}}
    >
      <header className="bg-blue-500 text-white p-4 flex items-center z-10">
        <button
          onClick={handleBack}
          className="flex items-center justify-center mr-4 p-1"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xl text-gray-700">{userName.charAt(0)}</span>
        </div>
        <h1 className="text-2xl font-bold ml-4">{userName}</h1>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <ul className="inbox space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className={`mb-2 p-3 max-w-xs ${ msg.read ? "sent bg-green-400 text-left text-white rounded-t-3xl rounded-bl-3xl" : "received rounded-t-3xl rounded-br-3xl bg-gray-400 text-left text-white"  } shadow-md`}>
                <p className="text-base">{msg.messageBody}</p>
              <span className="text-gray-200 text-xs block mt-1">
                {formatTimestamp(msg.sentAt)}
              </span>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </main>
      <footer className="bg-white p-4 border-t border-gray-300 flex items-center">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full pl-5 border border-gray-300 rounded-full resize-none"
          placeholder="Message"
          style={{ paddingRight: "48px" }}
        ></textarea>
        <div>
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white ml-2"
          >
            <span className="material-icons-round ml-1">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
}



