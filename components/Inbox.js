// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db } from '../firebaseConfig';
// import { collection, onSnapshot, query, where, writeBatch, getDocs, doc } from 'firebase/firestore';

// export default function Inbox({ userId }) {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);
//     const [activeTab, setActiveTab] = useState('received');
//     const [conversations, setConversations] = useState([]);
//     const [hasReceivedMessages, setHasReceivedMessages] = useState(false);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 // Get the user's document reference
//                 console.log(userId)
//                 const userDocRef = doc(db, 'users', userId);

//                 // Subscribe to the messages subcollection of the user
//                 const unsubscribe = onSnapshot(collection(userDocRef, 'messages'), (snapshot) => {
//                     const receivedNumbers = new Map();
//                     const conversationNumbers = new Map();
//                     let hasReceived = false;

//                     snapshot.forEach((doc) => {
//                         const data = doc.data();
//                         const userPhoneNumber = data.userPhoneNumber;
//                         const isReceived = data.received;
//                         const timestamp = data.timestamp?.seconds ? data.timestamp.seconds * 1000 : Date.now(); // Get timestamp

//                         if (isReceived) {
//                             hasReceived = true;
//                             if (!receivedNumbers.has(userPhoneNumber)) {
//                                 receivedNumbers.set(userPhoneNumber, { count: 0 });
//                             }
//                             receivedNumbers.get(userPhoneNumber).count += 1;
//                         } else {
//                             if (!conversationNumbers.has(userPhoneNumber)) {
//                                 conversationNumbers.set(userPhoneNumber, { count: 0, timestamp });
//                             } else {
//                                 // Update to the latest timestamp
//                                 conversationNumbers.get(userPhoneNumber).timestamp = Math.max(conversationNumbers.get(userPhoneNumber).timestamp, timestamp);
//                             }
//                             conversationNumbers.get(userPhoneNumber).count += 1;
//                         }
//                     });

//                     setHasReceivedMessages(hasReceived);
//                     setPhoneNumbers(Array.from(receivedNumbers.entries()));

//                     // Sort conversations by latest timestamp (newest first)
//                     const sortedConversations = Array.from(conversationNumbers.entries()).sort(
//                         (a, b) => b[1].timestamp - a[1].timestamp
//                     );
//                     setConversations(sortedConversations);
//                 });

//                 return () => unsubscribe();
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };

//         fetchMessages();
//     }, [userId]);

//     const handleCardClick = async (number) => {
//         try {
//             const userDocRef = doc(db, 'users', userId);

//             const messagesQuery = query(
//                 collection(userDocRef, 'messages'),
//                 where('userPhoneNumber', '==', number),
//                 where('received', '==', true)
//             );
//             const querySnapshot = await getDocs(messagesQuery);
//             const batch = writeBatch(db);

//             querySnapshot.forEach((doc) => {
//                 batch.update(doc.ref, { received: false });
//             });

//             await batch.commit();

//             // Move the number from received to conversations list
//             setConversations(prev => {
//                 const updatedConversations = [...prev, [number, {
//                     count: (prev.find(([num]) => num === number)?.[1].count || 0) + querySnapshot.size,
//                     timestamp: Date.now()
//                 }]];
//                 // Sort updated conversations by timestamp (newest first)
//                 return updatedConversations.sort((a, b) => b[1].timestamp - a[1].timestamp);
//             });

//             setPhoneNumbers(prev => prev.filter(([num]) => num !== number));
//         } catch (error) {
//             console.error("Error updating message status:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             <header className="relative w-full h-24 bg-blue-500 flex items-center justify-center">
                
//                 <div className="relative z-10 flex items-center justify-center p-4">
//                     <h1 className="text-4xl font-bold text-white">Inbox</h1>
//                 </div>
//             </header>
//             <main className="flex-1 p-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200 mb-4">
//                         <div className="flex border-b border-gray-200">
//                             <button
//                                 onClick={() => setActiveTab('received')}
//                                 className={`flex-1 py-2 text-center relative ${activeTab === 'received' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
//                             >
//                                 <div className="flex items-center justify-center">
//                                     <span>Received Messages</span>
//                                     {hasReceivedMessages && (
//                                         <span className="ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
//                                     )}
//                                 </div>
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('conversations')}
//                                 className={`flex-1 py-2 text-center ${activeTab === 'conversations' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
//                             >
//                                 Conversations
//                             </button>
//                         </div>
//                     </div>

//                     {activeTab === 'received' ? (
//                         <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
//                             {phoneNumbers.length > 0 ? (
//                                 phoneNumbers.map(([number, { count }]) => (
//                                     <Link
//                                         key={number}
//                                         href={`/dashboard/${userId}/inbox/${number}`}
//                                         className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
//                                         onClick={() => handleCardClick(number)}
//                                     >
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
//                                             {number.charAt(0)}
//                                         </div>
//                                         <div className="ml-4 flex-1">
//                                             <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
//                                             <p className="text-gray-600 text-sm">{count} new messages</p>
//                                         </div>
//                                         <div className="flex-shrink-0">
//                                             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
//                                             </svg>
//                                         </div>
//                                     </Link>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600 text-center py-4">No phone numbers available.</p>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
//                             {conversations.length > 0 ? (
//                                 conversations.map(([number, { count }]) => (
//                                     <Link
//                                         key={number}
//                                         href={`/dashboard/${userId}/inbox/${number}`}
//                                         className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
//                                     >
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
//                                             {number.charAt(0)}
//                                         </div>
//                                         <div className="ml-4 flex-1">
//                                             <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
//                                             <p className="text-gray-600 text-sm">View conversation</p>
//                                         </div>
//                                         <div className="flex-shrink-0">
//                                             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
//                                             </svg>
//                                         </div>
//                                     </Link>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600 text-center py-4">No conversations available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }


// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db } from '../firebaseConfig';
// import { collection, onSnapshot, query, where, writeBatch, getDocs, doc } from 'firebase/firestore';

// export default function Inbox({ userId }) {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);
//     const [activeTab, setActiveTab] = useState('received');
//     const [conversations, setConversations] = useState([]);
//     const [hasReceivedMessages, setHasReceivedMessages] = useState(false);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const userDocRef = doc(db, 'users', userId);
//                 const phoneNumbersCollection = collection(userDocRef, 'messages');

//                 const unsubscribe = onSnapshot(phoneNumbersCollection, (snapshot) => {
//                     const receivedNumbers = new Map();
//                     const conversationNumbers = new Map();
//                     let hasReceived = false;

//                     snapshot.forEach((phoneDoc) => {
//                         const phoneData = phoneDoc.data();
//                         const phoneNumber = phoneDoc.id;

//                         // Query the messages for received and conversation
//                         const receivedMessagesRef = collection(phoneDoc.ref, 'messages');
//                         const receivedMessagesQuery = query(receivedMessagesRef, where('received', '==', true));

//                         const conversationMessagesQuery = query(receivedMessagesRef, where('received', '==', false));

//                         // Subscribe to received messages
//                         onSnapshot(receivedMessagesQuery, (receivedSnapshot) => {
//                             let receivedCount = 0;

//                             receivedSnapshot.forEach((msgDoc) => {
//                                 const isReceived = msgDoc.data().received;

//                                 if (isReceived) {
//                                     hasReceived = true;
//                                     receivedCount += 1;

//                                     if (!receivedNumbers.has(phoneNumber)) {
//                                         receivedNumbers.set(phoneNumber, { count: 0 });
//                                     }
//                                     receivedNumbers.get(phoneNumber).count += 1;
//                                 }
//                             });

//                             if (receivedCount > 0) {
//                                 setHasReceivedMessages(hasReceived);
//                                 setPhoneNumbers(Array.from(receivedNumbers.entries()));
//                             }
//                         });

//                         // Subscribe to conversation messages
//                         onSnapshot(conversationMessagesQuery, (conversationSnapshot) => {
//                             let conversationCount = 0;

//                             conversationSnapshot.forEach((msgDoc) => {
//                                 const timestamp = msgDoc.data().timestamp?.seconds ? msgDoc.data().timestamp.seconds * 1000 : Date.now();

//                                 if (!conversationNumbers.has(phoneNumber)) {
//                                     conversationNumbers.set(phoneNumber, { count: 0, timestamp });
//                                 } else {
//                                     // Update to the latest timestamp
//                                     conversationNumbers.get(phoneNumber).timestamp = Math.max(conversationNumbers.get(phoneNumber).timestamp, timestamp);
//                                 }
//                                 conversationNumbers.get(phoneNumber).count += 1;
//                                 conversationCount += 1;
//                             });

//                             if (conversationCount > 0) {
//                                 // Sort conversations by latest timestamp (newest first)
//                                 const sortedConversations = Array.from(conversationNumbers.entries()).sort(
//                                     (a, b) => b[1].timestamp - a[1].timestamp
//                                 );
//                                 setConversations(sortedConversations);
//                             }
//                         });
//                     });
//                 });

//                 return () => unsubscribe();
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };

//         fetchMessages();
//     }, [userId]);

//     const handleCardClick = async (number) => {
//         try {
//             const userDocRef = doc(db, 'users', userId);
//             const phoneDocRef = doc(userDocRef, 'messages', number);

//             const messagesQuery = query(
//                 collection(phoneDocRef, 'messages'),
//                 where('received', '==', true)
//             );
//             const querySnapshot = await getDocs(messagesQuery);
//             const batch = writeBatch(db);

//             querySnapshot.forEach((doc) => {
//                 batch.update(doc.ref, { received: false });
//             });

//             await batch.commit();

//             // Move the number from received to conversations list
//             setConversations(prev => {
//                 const updatedConversations = [...prev, [number, {
//                     count: (prev.find(([num]) => num === number)?.[1].count || 0) + querySnapshot.size,
//                     timestamp: Date.now()
//                 }]];
//                 // Sort updated conversations by timestamp (newest first)
//                 return updatedConversations.sort((a, b) => b[1].timestamp - a[1].timestamp);
//             });

//             setPhoneNumbers(prev => prev.filter(([num]) => num !== number));
//         } catch (error) {
//             console.error("Error updating message status:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             <header className="relative w-full h-24 bg-blue-500 flex items-center justify-center">
//                 <div className="relative z-10 flex items-center justify-center p-4">
//                     <h1 className="text-4xl font-bold text-white">Inbox</h1>
//                 </div>
//             </header>
//             <main className="flex-1 p-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200 mb-4">
//                         <div className="flex border-b border-gray-200">
//                             <button
//                                 onClick={() => setActiveTab('received')}
//                                 className={`flex-1 py-2 text-center relative ${activeTab === 'received' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
//                             >
//                                 <div className="flex items-center justify-center">
//                                     <span>Received Messages</span>
//                                     {hasReceivedMessages && (
//                                         <span className="ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
//                                     )}
//                                 </div>
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('conversations')}
//                                 className={`flex-1 py-2 text-center ${activeTab === 'conversations' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
//                             >
//                                 Conversations
//                             </button>
//                         </div>
//                     </div>

//                     {activeTab === 'received' ? (
//                         <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
//                             {phoneNumbers.length > 0 ? (
//                                 phoneNumbers.map(([number, { count }]) => (
//                                     <Link
//                                         key={number}
//                                         href={`/dashboard/${userId}/inbox/${number}`}
//                                         className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
//                                         onClick={() => handleCardClick(number)}
//                                     >
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
//                                             {number.charAt(0)}
//                                         </div>
//                                         <div className="ml-4 flex-1">
//                                             <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
//                                             <p className="text-gray-600 text-sm">{count} new messages</p>
//                                         </div>
//                                         <div className="flex-shrink-0">
//                                             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
//                                             </svg>
//                                         </div>
//                                     </Link>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600 text-center py-4">No phone numbers available.</p>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
//                             {conversations.length > 0 ? (
//                                 conversations.map(([number, { count }]) => (
//                                     <Link
//                                         key={number}
//                                         href={`/dashboard/${userId}/inbox/${number}`}
//                                         className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
//                                     >
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
//                                             {number.charAt(0)}
//                                         </div>
//                                         <div className="ml-4 flex-1">
//                                             <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
//                                             <p className="text-gray-600 text-sm">View conversation</p>
//                                         </div>
//                                         <div className="flex-shrink-0">
//                                             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
//                                             </svg>
//                                         </div>
//                                     </Link>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600 text-center py-4">No conversations available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, where, writeBatch, getDocs, doc } from 'firebase/firestore';

export default function Inbox({ userId }) {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [activeTab, setActiveTab] = useState('received');
    const [conversations, setConversations] = useState([]);
    const [hasReceivedMessages, setHasReceivedMessages] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userDocRef = doc(db, 'users', userId);
                const phoneNumbersCollection = collection(userDocRef, 'messages');

                const unsubscribe = onSnapshot(phoneNumbersCollection, (snapshot) => {
                    const receivedNumbers = new Map();
                    const conversationNumbers = new Map();
                    let hasReceived = false;

                    snapshot.forEach((phoneDoc) => {
                        const phoneData = phoneDoc.data();
                        const phoneNumber = phoneDoc.id;

                        // Query the messages for received and conversation
                        const receivedMessagesRef = collection(phoneDoc.ref, 'messages');
                        const receivedMessagesQuery = query(receivedMessagesRef, where('received', '==', true));

                        const conversationMessagesQuery = query(receivedMessagesRef, where('received', '==', false));

                        // Subscribe to received messages
                        onSnapshot(receivedMessagesQuery, (receivedSnapshot) => {
                            let receivedCount = 0;

                            receivedSnapshot.forEach((msgDoc) => {
                                const isReceived = msgDoc.data().received;

                                if (isReceived) {
                                    hasReceived = true;
                                    receivedCount += 1;

                                    if (!receivedNumbers.has(phoneNumber)) {
                                        receivedNumbers.set(phoneNumber, { count: 0 });
                                    }
                                    receivedNumbers.get(phoneNumber).count += 1;
                                }
                            });

                            if (receivedCount > 0) {
                                setHasReceivedMessages(hasReceived);
                                setPhoneNumbers(Array.from(receivedNumbers.entries()));
                            }
                        });

                        // Subscribe to conversation messages
                        onSnapshot(conversationMessagesQuery, (conversationSnapshot) => {
                            let conversationCount = 0;

                            conversationSnapshot.forEach((msgDoc) => {
                                const timestamp = msgDoc.data().timestamp?.seconds ? msgDoc.data().timestamp.seconds * 1000 : Date.now();

                                if (!conversationNumbers.has(phoneNumber)) {
                                    conversationNumbers.set(phoneNumber, { count: 0, timestamp });
                                } else {
                                    // Update to the latest timestamp
                                    conversationNumbers.get(phoneNumber).timestamp = Math.max(conversationNumbers.get(phoneNumber).timestamp, timestamp);
                                }
                                conversationNumbers.get(phoneNumber).count += 1;
                                conversationCount += 1;
                            });

                            if (conversationCount > 0) {
                                // Sort conversations by latest timestamp (newest first)
                                const sortedConversations = Array.from(conversationNumbers.entries()).sort(
                                    (a, b) => b[1].timestamp - a[1].timestamp
                                );
                                setConversations(sortedConversations);
                            }
                        });
                    });
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [userId]);

    const handleCardClick = async (number) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const phoneDocRef = doc(userDocRef, 'messages', number);

            const messagesQuery = query(
                collection(phoneDocRef, 'messages'),
                where('received', '==', true)
            );
            const querySnapshot = await getDocs(messagesQuery);
            const batch = writeBatch(db);

            querySnapshot.forEach((doc) => {
                batch.update(doc.ref, { received: false });
            });

            await batch.commit();

            // Move the number from received to conversations list
            setConversations(prev => {
                const updatedConversations = [...prev, [number, {
                    count: (prev.find(([num]) => num === number)?.[1].count || 0) + querySnapshot.size,
                    timestamp: Date.now()
                }]];
                // Sort updated conversations by timestamp (newest first)
                return updatedConversations.sort((a, b) => b[1].timestamp - a[1].timestamp);
            });

            setPhoneNumbers(prev => prev.filter(([num]) => num !== number));
        } catch (error) {
            console.error("Error updating message status:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-6">
            <header className="relative w-full h-24 bg-black flex items-center justify-center rounded-lg">
                <div className="relative z-10 flex items-center justify-center p-4">
                    <h1 className="text-4xl font-bold text-white">Inbox</h1>
                </div>
            </header>
            <main className="flex-1 pt-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200 mb-4">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('received')}
                                className={`flex-1 py-2 text-center rounded-lg ${activeTab === 'received' ? 'bg-black text-white' : 'text-black'}`}
                            >
                                <div className="flex items-center justify-center">
                                    <span>Received Messages</span>
                                    {hasReceivedMessages && (
                                        <span className="ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
                                    )}
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('conversations')}
                                className={`flex-1 py-2 text-center rounded-lg ${activeTab === 'conversations' ? 'bg-black text-white' : 'text-black'}`}
                            >
                                Conversations
                            </button>
                        </div>
                    </div>

                    {activeTab === 'received' ? (
                        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                            {phoneNumbers.length > 0 ? (
                                phoneNumbers.map(([number, { count }]) => (
                                    <Link
                                        key={number}
                                        href={`/dashboard/${userId}/inbox/${number}`}
                                        className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
                                        onClick={() => handleCardClick(number)}
                                    >
                                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                                            {number.charAt(0)}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
                                            <p className="text-gray-600 text-sm">{count} new messages</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center py-4">No phone numbers available.</p>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                            {conversations.length > 0 ? (
                                conversations.map(([number, { count }]) => (
                                    <Link
                                        key={number}
                                        href={`/dashboard/${userId}/inbox/${number}`}
                                        className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                                            {number.charAt(0)}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
                                            <p className="text-gray-600 text-sm">View conversation</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center py-4">No conversations available.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}