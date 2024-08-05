"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Inbox() {
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const numbers = new Set();
            snapshot.forEach((doc) => {
                const data = doc.data();
                numbers.add(data.userPhoneNumber);
            });
            setPhoneNumbers(Array.from(numbers));
        }, (error) => {
            console.error("Error fetching phone numbers:", error);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="flex justify-center items-center my-6">
                <div className="relative w-11/12 md:w-10/12 lg:w-10/12 xl:w-11/12 h-20 rounded-full flex items-center justify-center shadow-xl px-6 md:px-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-60 rounded-full"></div>
                    <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-full shadow-2xl"></div>
                    <h1 className="relative text-4xl font-bold text-white z-10">THE MADi Inbox</h1>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-semibold mb-8">Messages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {phoneNumbers.length > 0 ? (
                            phoneNumbers.map((number) => (
                                <Link key={number} href={`/app/${number}`} className="group bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                                {number.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-xl font-medium text-gray-800">{number}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">Click to view messages</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-600">No phone numbers available.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
