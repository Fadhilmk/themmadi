// // "use client";
// // import AnalyticsDashboard from '@/components/AnalyticsDashboard';
// // import { useParams } from 'next/navigation';

// // export default function DashboardPage() {
// //     const { userId } = useParams();
    
// //     return (
// //         <div>
// //             <AnalyticsDashboard />
// //         </div>
// //     );
// // }

// "use client";
// import { useState } from "react";
// import AnalyticsDashboard from '@/components/AnalyticsDashboard';
// import { useParams } from 'next/navigation';
// import TutorialModal from '@/components/TutorialModal'; // Import the TutorialModal component

// export default function DashboardPage() {
//     const { userId } = useParams();
//     const [showTutorial, setShowTutorial] = useState(true);

//     const handleCloseTutorial = () => {
//         setShowTutorial(false); // Close the tutorial modal
//     };

//     return (
//         <div>
//             {showTutorial && <TutorialModal onClose={handleCloseTutorial} />} {/* Show tutorial modal */}
//             <AnalyticsDashboard />
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Firebase Firestore configuration
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import TutorialModal from '@/components/TutorialModal';
import BusinessDetailsModal from '@/components/BusinessDetailsModal'; // Import the BusinessDetailsModal component

export default function DashboardPage() {
    const { userId } = useParams();
    const [showBusinessDetailsModal, setShowBusinessDetailsModal] = useState(false);
    const [businessDetailsFilled, setBusinessDetailsFilled] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const router = useRouter();

    // Check if the user has filled the business details
    useEffect(() => {
        const checkBusinessDetails = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().businessName) {
                setBusinessDetailsFilled(true); // Business details already filled
            } else {
                setShowBusinessDetailsModal(true); // Show the business details modal
            }
        };

        checkBusinessDetails();
    }, [userId]);

    const handleBusinessFormSubmit = async (businessDetails) => {
        // Save the business details to Firestore
        await setDoc(doc(db, "users", userId), businessDetails, { merge: true });
        setShowBusinessDetailsModal(false);
        setShowTutorial(true); // Show the tutorial modal after form submission
    };

    const handleCloseTutorial = () => {
        setShowTutorial(false);
    };

    return (
        <div>
            {/* Always show the dashboard */}
            <AnalyticsDashboard />

            {/* Show Business Details Modal if not filled */}
            {showBusinessDetailsModal && (
                <BusinessDetailsModal onSubmit={handleBusinessFormSubmit} />
            )}

            {/* Show tutorial modal after business details are filled */}
            {showTutorial && <TutorialModal onClose={handleCloseTutorial} />}
        </div>
    );
}
