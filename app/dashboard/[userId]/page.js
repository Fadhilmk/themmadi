// "use client";
// import AnalyticsDashboard from '@/components/AnalyticsDashboard';
// import { useParams } from 'next/navigation';

// export default function DashboardPage() {
//     const { userId } = useParams();
    
//     return (
//         <div>
//             <AnalyticsDashboard />
//         </div>
//     );
// }

"use client";
import { useState } from "react";
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useParams } from 'next/navigation';
import TutorialModal from '@/components/TutorialModal'; // Import the TutorialModal component

export default function DashboardPage() {
    const { userId } = useParams();
    const [showTutorial, setShowTutorial] = useState(true);

    const handleCloseTutorial = () => {
        setShowTutorial(false); // Close the tutorial modal
    };

    return (
        <div>
            {showTutorial && <TutorialModal onClose={handleCloseTutorial} />} {/* Show tutorial modal */}
            <AnalyticsDashboard />
        </div>
    );
}
