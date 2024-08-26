"use client"
import ImportPage from "@/components/Import";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useParams } from "next/navigation";

const Contacts = () => {
  const { userId } = useParams();
  if (!userId) return <p>Loading...</p>;
  return (
    <ProtectedRoute>
      <ImportPage userId={userId}/>
    </ProtectedRoute>
  );
};

export default Contacts;
