"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../../../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useParams } from 'next/navigation';
const PHONE_NUMBER_ID = "405411442646087";
const ACCESS_TOKEN = "EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD";

export default function Inbox({ params }) {
  const { userId } = useParams();
  const { phoneNumber } = params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("User");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log({userId})
    const fetchDetails = async () => {
      try {
        // Fetch the user's name from the 'users' collection
        const userDocRef = doc(db, "users",userId);
        const userSnap = await userDocRef.get();
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.userName || "User");
        } else {
          console.warn("User not found");
        }

        // Fetch the user's messages from the 'messages' subcollection
        const messagesRef = collection(userDocRef, "messages");
        const msgQuery = query(messagesRef, where("userPhoneNumber", "==", phoneNumber));
        const unsubscribeMessages = onSnapshot(msgQuery, (snapshot) => {
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
          });

          msgs.sort((a, b) => a.sentAt - b.sentAt);
          setMessages(msgs);
        });

        return () => {
          unsubscribeMessages();
        };
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [phoneNumber]);
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

        const docRef = await addDoc(collection(db, "messages"), {
          userPhoneNumber: phoneNumber,
          messageBody: newMessage,
          sentAt: new Date(),
          read: true,
        });

        setNewMessage("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: docRef.id,
            userPhoneNumber: phoneNumber,
            messageBody: newMessage,
            read: true,
            sentAt: new Date(),
          },
        ]);
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
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/walpaper2.jpg')` }}
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
        <ul>
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`mb-2 p-2 max-w-xs ${
                msg.read
                  ? "bg-green-400 self-end text-left text-white"
                  : "bg-gray-400 self-start text-left text-white"
              }`}
            >
              <p>{msg.messageBody}</p>
              <span className="text-gray-200 text-sm">
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
          className="w-full p-1 pl-5 pt-4 border border-gray-300 rounded-full mb-2 resize-none"
          placeholder="Message"
          style={{ paddingRight: "48px" }}
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white pt-3 pb-2 pl-3 pr-3 rounded-full ml-2"
        >
          <span className="material-icons-round">send</span>
        </button>
      </footer>
    </div>
  );
}