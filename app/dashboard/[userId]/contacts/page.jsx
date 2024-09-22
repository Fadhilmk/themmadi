// "use client"
// import ImportPage from "@/components/Import";
// import Preloader from "@/components/Preloader";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { useParams } from "next/navigation";

// const Contacts = () => {
//   const { userId } = useParams();
//   if (!userId) return <Preloader />;
//   return (
//     <ProtectedRoute>
//       <ImportPage userId={userId}/>
//     </ProtectedRoute>
//   );
// };

// export default Contacts;

"use client";
import ImportPage from "@/components/Import";
import Preloader from "@/components/Preloader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the path if needed

const Contacts = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isTrial, setIsTrial] = useState(null);

  useEffect(() => {
    const fetchAccountStatus = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setIsTrial(userDoc.data().isTrial || false);
        }
      } catch (error) {
        console.error("Error fetching account status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountStatus();
  }, [userId]);

  if (!userId || loading) return <Preloader />;

  return (
    <ProtectedRoute>
      <ImportPage userId={userId} isTrial={isTrial} />
    </ProtectedRoute>
  );
};

export default Contacts;
