// "use client";

// import { useParams } from 'next/navigation';
// import Inbox from "@/components/Inbox";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import Preloader from '@/components/Preloader';

// const InboxPage = () => {
//     const { userId } = useParams(); // useParams to get dynamic route parameters

//     if (!userId) return <Preloader />;

//     return (
//         <ProtectedRoute>
//             <Inbox userId={userId} />
//         </ProtectedRoute>
//     );
// };

// export default InboxPage;

"use client";

import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Inbox from "@/components/Inbox";
import ProtectedRoute from "@/components/ProtectedRoute";
import Preloader from '@/components/Preloader';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const InboxPage = () => {
    const { userId } = useParams();
    const [isTrial, setIsTrial] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const checkTrialStatus = async () => {
            if (!userId) return;

            try {
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsTrial(userData.isTrial || false);
                    if (userData.isTrial) {
                        setShowModal(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching trial status:", error);
            }
        };

        checkTrialStatus();
    }, [userId]);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleUpgradeClick = () => {
        router.push("/checkout"); // Redirect to the checkout page when "Upgrade" is clicked
      };

    if (!userId) return <Preloader />;

    return (
        <ProtectedRoute>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h2 className="text-xl font-bold mb-4">Trial Account Restriction</h2>
                        <p className="mb-4">You are currently using a trial account. To access this feature including message sending, please upgrade your plan.</p>
                        <div className="flex justify-between">
                            <button 
                                onClick={handleUpgradeClick} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Upgrade
                            </button>
                            <button 
                                onClick={handleCloseModal} 
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Inbox userId={userId} />
        </ProtectedRoute>
    );
};

export default InboxPage;
